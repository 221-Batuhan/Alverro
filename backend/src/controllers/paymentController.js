const Order = require('../models/Order');
const User = require('../models/User');
const {
  createPaymentRequest,
  retrievePayment,
  extractSafePaymentData,
} = require('../services/paymentService');

/**
 * @desc    Initiate payment with Iyzico
 * @route   POST /api/payments/iyzico/initiate
 * @access  Private
 */
exports.initiatePayment = async (req, res) => {
  try {
    const { products, address, cardData } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Products are required',
      });
    }

    if (!address) {
      return res.status(400).json({
        success: false,
        message: 'Address is required',
      });
    }

    if (!cardData || !cardData.cardNumber || !cardData.cardHolderName || !cardData.expireMonth || !cardData.expireYear || !cardData.cvc) {
      return res.status(400).json({
        success: false,
        message: 'Card data is required',
      });
    }

    // Calculate total price
    let totalPrice = 0;
    products.forEach(product => {
      totalPrice += (product.price * product.quantity);
    });

    // Validate prices server-side
    if (totalPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid total price',
      });
    }

    // Get user data
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Prepare basket items for Iyzico
    const basketItems = products.map((product, index) => ({
      id: product.productId || `BI${index + 1}`,
      name: product.name,
      category1: 'Fashion',
      category2: 'Clothing',
      itemType: 'PHYSICAL',
      price: (product.price * product.quantity).toFixed(2),
    }));

    // Generate unique basket ID
    const basketId = `BASKET-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Prepare payment data
    const paymentData = {
      price: totalPrice.toFixed(2),
      currency: 'TRY',
      basketId: basketId,
      buyer: {
        id: userId.toString(),
        name: user.name.split(' ')[0] || user.name,
        surname: user.name.split(' ').slice(1).join(' ') || '',
        email: user.email,
        phone: address.phone || user.phone || '+905551234567',
        ip: req.ip || req.connection.remoteAddress || '127.0.0.1',
      },
      shippingAddress: address,
      billingAddress: address,
      basketItems: basketItems,
      cardHolderName: cardData.cardHolderName,
      cardNumber: cardData.cardNumber,
      expireMonth: cardData.expireMonth,
      expireYear: cardData.expireYear,
      cvc: cardData.cvc,
    };

    // Create payment request with Iyzico
    const iyzicoResponse = await createPaymentRequest(paymentData);

    // Check if payment was successful
    if (iyzicoResponse.status === 'success') {
      // Extract safe payment data
      const safePaymentData = extractSafePaymentData(iyzicoResponse);

      // Create order record
      const order = await Order.create({
        user: userId,
        products: products,
        totalPrice: totalPrice,
        address: address,
        paymentMethod: 'Iyzico',
        paymentStatus: 'completed',
        orderStatus: 'pending',
        paymentDetails: safePaymentData,
      });

      return res.status(200).json({
        success: true,
        message: 'Payment successful',
        order: order,
        paymentResponse: {
          status: iyzicoResponse.status,
          paymentId: iyzicoResponse.paymentId,
        },
      });
    } else {
      // Payment failed
      const errorMessage = iyzicoResponse.errorMessage || 'Payment failed';
      const errorCode = iyzicoResponse.errorCode || 'UNKNOWN_ERROR';

      // Create order record with failed status
      const order = await Order.create({
        user: userId,
        products: products,
        totalPrice: totalPrice,
        address: address,
        paymentMethod: 'Iyzico',
        paymentStatus: 'failed',
        orderStatus: 'cancelled',
      });

      return res.status(400).json({
        success: false,
        message: errorMessage,
        errorCode: errorCode,
        order: order,
      });
    }
  } catch (error) {
    console.error('Payment initiation error:', error);
    
    // Handle Iyzico SDK errors
    let errorMessage = 'Payment initiation failed';
    let errorCode = 'UNKNOWN_ERROR';
    
    if (error.message) {
      errorMessage = error.message;
    }
    
    // Check if error has Iyzico response structure
    if (error.errorMessage) {
      errorMessage = error.errorMessage;
      errorCode = error.errorCode || 'IYZICO_ERROR';
    }
    
    // Handle network or SDK errors
    if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      errorMessage = 'Payment service is temporarily unavailable. Please try again later.';
      errorCode = 'SERVICE_UNAVAILABLE';
    }
    
    return res.status(500).json({
      success: false,
      message: errorMessage,
      errorCode: errorCode,
    });
  }
};

/**
 * @desc    Handle Iyzico callback
 * @route   POST /api/payments/iyzico/callback
 * @access  Public (Iyzico will call this)
 */
exports.handleCallback = async (req, res) => {
  try {
    const { paymentId, conversationId } = req.body;

    if (!paymentId) {
      return res.status(400).json({
        success: false,
        message: 'Payment ID is required',
      });
    }

    // Retrieve payment from Iyzico
    const paymentResult = await retrievePayment(paymentId);

    if (paymentResult.status === 'success') {
      // Extract safe payment data
      const safePaymentData = extractSafePaymentData(paymentResult);

      // Find and update order
      const order = await Order.findOne({
        'paymentDetails.iyzicoConversationId': conversationId,
      });

      if (order) {
        order.paymentStatus = 'completed';
        order.orderStatus = 'processing';
        order.paymentDetails = safePaymentData;
        await order.save();
      }

      return res.status(200).json({
        success: true,
        message: 'Payment verified',
        payment: paymentResult,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: paymentResult.errorMessage || 'Payment verification failed',
      });
    }
  } catch (error) {
    console.error('Payment callback error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Payment callback failed',
    });
  }
};

/**
 * @desc    Get payment status
 * @route   GET /api/payments/status/:orderId
 * @access  Private
 */
exports.getPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({
      _id: orderId,
      user: userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    return res.status(200).json({
      success: true,
      order: order,
    });
  } catch (error) {
    console.error('Get payment status error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to get payment status',
    });
  }
};

