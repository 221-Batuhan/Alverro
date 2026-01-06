import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import axios from 'axios';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Review = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, checkoutData, getTotalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (cart.length === 0) {
      navigate('/checkout/cart');
      return;
    }
    if (!checkoutData.address) {
      navigate('/checkout/address');
      return;
    }
    if (!checkoutData.paymentData) {
      navigate('/checkout/payment');
      return;
    }
  }, [user, cart, checkoutData, navigate]);

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Prepare payment data for backend
      // Iyzico expects 4-digit year (YYYY format)
      const currentYear = new Date().getFullYear();
      const currentCentury = Math.floor(currentYear / 100) * 100;
      const enteredYear = parseInt(checkoutData.paymentData.expireYear);
      const fullYear = enteredYear < 100 ? currentCentury + enteredYear : enteredYear;
      
      const paymentData = {
        cardHolderName: checkoutData.paymentData.cardHolderName,
        cardNumber: checkoutData.paymentData.cardNumber.replace(/\s/g, ''),
        expireMonth: checkoutData.paymentData.expireMonth.padStart(2, '0'),
        expireYear: fullYear.toString(),
        cvc: checkoutData.paymentData.cvc,
      };

      // Prepare request payload
      const payload = {
        products: cart,
        address: checkoutData.address,
        cardData: paymentData,
      };

      // Call backend payment endpoint
      const response = await axios.post(
        `${API_URL}/payments/iyzico/initiate`,
        payload,
        { withCredentials: true }
      );

      if (response.data.success) {
        // Clear cart
        clearCart();
        // Navigate to result page with order data
        navigate('/checkout/result', {
          state: {
            success: true,
            order: response.data.order,
            message: 'Payment successful! Your order has been placed.',
          },
        });
      } else {
        // Payment failed - show error on Review page
        const errorMessage = response.data.message || 'Payment failed. Please try again.';
        setError(errorMessage);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      const errorMessage = 
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'An error occurred. Please try again.';
      setError(errorMessage);
      setIsProcessing(false);
    }
  };

  if (!checkoutData.address || !checkoutData.paymentData) {
    return null;
  }

  return (
    <div className="section-padding container-luxury min-h-screen">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/checkout/payment')}
          className="flex items-center gap-2 text-warmWhite/70 hover:text-gold transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Payment
        </button>

        <h1 className="heading-section text-warmWhite mb-12">Review Your Order</h1>

        <div className="space-y-8">
          {/* Order Items */}
          <div className="bg-charcoal-light border border-emerald/20 p-6 rounded-lg">
            <h2 className="text-xl font-serif text-warmWhite mb-6">Order Items</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.productId} className="flex items-center gap-4 pb-4 border-b border-emerald/10 last:border-0">
                  {item.image && (
                    <div className="w-20 h-20 bg-charcoal rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-warmWhite font-medium">{item.name}</h3>
                    <p className="text-warmWhite/70 text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <p className="text-gold font-semibold">€{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-emerald/20 flex justify-between items-center">
              <span className="text-xl font-serif text-warmWhite">Total</span>
              <span className="text-2xl font-serif text-gold">€{getTotalPrice().toFixed(2)}</span>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-charcoal-light border border-emerald/20 p-6 rounded-lg">
            <h2 className="text-xl font-serif text-warmWhite mb-4">Shipping Address</h2>
            <div className="text-warmWhite/80 space-y-1">
              <p>{checkoutData.address.fullName}</p>
              <p>{checkoutData.address.addressLine1}</p>
              {checkoutData.address.addressLine2 && <p>{checkoutData.address.addressLine2}</p>}
              <p>
                {checkoutData.address.city}, {checkoutData.address.state} {checkoutData.address.zipCode}
              </p>
              <p>{checkoutData.address.country}</p>
              <p>{checkoutData.address.phone}</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-charcoal-light border border-emerald/20 p-6 rounded-lg">
            <h2 className="text-xl font-serif text-warmWhite mb-4">Payment Method</h2>
            <div className="text-warmWhite/80">
              <p>Card ending in {checkoutData.paymentData.cardNumber.replace(/\s/g, '').slice(-4)}</p>
              <p className="text-sm text-warmWhite/60 mt-1">
                {checkoutData.paymentData.cardHolderName}
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-burgundy/20 border border-burgundy p-4 rounded-lg">
              <p className="text-warmWhite">{error}</p>
            </div>
          )}

          {/* Place Order Button */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/checkout/payment')}
              className="btn-outline flex-1"
              disabled={isProcessing}
            >
              Back
            </button>
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Place Order
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;

