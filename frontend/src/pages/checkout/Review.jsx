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
    if (!user) { navigate('/login'); return; }
    if (cart.length === 0) { navigate('/checkout/cart'); return; }
    if (!checkoutData.address) { navigate('/checkout/address'); return; }
    if (!checkoutData.paymentData) { navigate('/checkout/payment'); return; }
  }, [user, cart, checkoutData, navigate]);

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Logic to split the user name for Iyzico's mandatory surname requirement
      const fullName = user?.name || "Alverro Client";
      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "Client";

      // Prepare 4-digit year for Iyzico
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

      const payload = {
        products: cart,
        address: checkoutData.address,
        cardData: paymentData,
        surname: lastName, // Sending explicit surname
        firstName: firstName
      };

      const response = await axios.post(
        `${API_URL}/payments/iyzico/initiate`,
        payload,
        { withCredentials: true }
      );

      if (response.data.success) {
        clearCart();
        navigate('/checkout/result', {
          state: {
            success: true,
            order: response.data.order,
            message: 'Payment successful! Your shipment is being prepared.',
          },
        });
      } else {
        setError(response.data.message || 'Payment failed. Please try again.');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
      setIsProcessing(false);
    }
  };

  if (!checkoutData.address || !checkoutData.paymentData) return null;

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
          {/* Order Summary */}
          <div className="bg-charcoal-light border border-gold/10 p-6 rounded-sm">
            <h2 className="text-xl font-serif text-warmWhite mb-6">Order Items</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.productId} className="flex items-center gap-4 pb-4 border-b border-gold/5 last:border-0">
                  <div className="flex-1">
                    <h3 className="text-warmWhite font-medium">{item.name}</h3>
                    <p className="text-warmWhite/50 text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <p className="text-gold font-serif">€{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gold/20 flex justify-between items-center">
              <span className="text-xl font-serif text-warmWhite">Total</span>
              <span className="text-2xl font-serif text-gold">€{getTotalPrice().toFixed(2)}</span>
            </div>
          </div>

          {error && (
            <div className="bg-burgundy/10 border border-burgundy/50 p-4 rounded-sm">
              <p className="text-warmWhite text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button onClick={() => navigate('/checkout/payment')} className="btn-outline flex-1" disabled={isProcessing}>Back</button>
            <button onClick={handlePlaceOrder} disabled={isProcessing} className="btn-primary flex-1 flex items-center justify-center gap-2">
              {isProcessing ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : <><Check className="w-5 h-5" /> Place Order</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;