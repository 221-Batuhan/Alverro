const iyzipay = require('iyzipay');
const crypto = require('crypto');

// Iyzico Sandbox Configuration
const iyzipayConfig = {
  apiKey: process.env.IYZICO_API_KEY || 'sandbox-api-key',
  secretKey: process.env.IYZICO_SECRET_KEY || 'sandbox-secret-key',
  uri: 'https://sandbox-api.iyzipay.com',
};

// Initialize Iyzico client
const iyzipayClient = new iyzipay(iyzipayConfig);

/**
 * Create payment request with Iyzico
 * @param {Object} paymentData - Payment information
 * @returns {Promise<Object>} Payment response
 */
const createPaymentRequest = async (paymentData) => {
  const {
    price,
    currency = 'TRY',
    basketId,
    buyer,
    shippingAddress,
    billingAddress,
    basketItems,
    cardHolderName,
    cardNumber,
    expireMonth,
    expireYear,
    cvc,
    installment = 1,
  } = paymentData;

  const request = {
    locale: 'tr',
    conversationId: basketId,
    price: price.toString(),
    paidPrice: price.toString(),
    currency: currency,
    installment: installment.toString(),
    basketId: basketId,
    paymentChannel: 'WEB',
    paymentGroup: 'PRODUCT',
    callbackUrl: process.env.IYZICO_CALLBACK_URL || 'http://localhost:5000/api/payments/iyzico/callback',
    enabledInstallments: [1, 2, 3, 6, 9],
    buyer: {
      id: buyer.id,
      name: buyer.name,
      surname: buyer.surname || '',
      gsmNumber: buyer.phone,
      email: buyer.email,
      identityNumber: buyer.identityNumber || '11111111111',
      lastLoginDate: new Date().toISOString(),
      registrationDate: new Date().toISOString(),
      registrationAddress: billingAddress.addressLine1,
      ip: buyer.ip || '127.0.0.1',
      city: billingAddress.city,
      country: billingAddress.country || 'Turkey',
      zipCode: billingAddress.zipCode,
    },
    shippingAddress: {
      contactName: shippingAddress.fullName,
      city: shippingAddress.city,
      country: shippingAddress.country || 'Turkey',
      address: shippingAddress.addressLine1,
      zipCode: shippingAddress.zipCode,
    },
    billingAddress: {
      contactName: billingAddress.fullName,
      city: billingAddress.city,
      country: billingAddress.country || 'Turkey',
      address: billingAddress.addressLine1,
      zipCode: billingAddress.zipCode,
    },
    basketItems: basketItems,
    paymentCard: {
      cardHolderName: cardHolderName,
      cardNumber: cardNumber.replace(/\s/g, ''),
      expireMonth: expireMonth.padStart(2, '0'),
      // Iyzico expects 2-digit year (YY format)
      expireYear: expireYear.length === 4 ? expireYear.slice(-2) : expireYear.padStart(2, '0'),
      cvc: cvc,
      registerCard: '0',
    },
  };

  return new Promise((resolve, reject) => {
    iyzipayClient.payment.create(request, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

/**
 * Retrieve payment result
 * @param {String} paymentId - Iyzico payment ID
 * @returns {Promise<Object>} Payment result
 */
const retrievePayment = async (paymentId) => {
  const request = {
    locale: 'tr',
    paymentId: paymentId,
  };

  return new Promise((resolve, reject) => {
    iyzipayClient.payment.retrieve(request, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

/**
 * Extract safe payment data from Iyzico response
 * @param {Object} iyzicoResponse - Response from Iyzico
 * @returns {Object} Safe payment data
 */
const extractSafePaymentData = (iyzicoResponse) => {
  if (!iyzicoResponse || iyzicoResponse.status !== 'success') {
    return null;
  }

  const payment = iyzicoResponse.paymentItems?.[0] || {};
  const card = iyzicoResponse.card || {};

  return {
    last4Digits: card.lastFourDigits || '',
    cardType: card.cardType || '',
    paidAmount: parseFloat(iyzicoResponse.paidPrice || 0),
    iyzicoPaymentId: iyzicoResponse.paymentId || '',
    iyzicoConversationId: iyzicoResponse.conversationId || '',
  };
};

module.exports = {
  createPaymentRequest,
  retrievePayment,
  extractSafePaymentData,
};

