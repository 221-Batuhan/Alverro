import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ArrowLeft, Lock } from 'lucide-react';

const Payment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, checkoutData, setCheckoutPaymentData, getTotalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardHolderName: '',
    cardNumber: '',
    expireMonth: '',
    expireYear: '',
    cvc: '',
  });
  const [errors, setErrors] = useState({});

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
  }, [user, cart, checkoutData.address, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
    }

    // Format expiry month
    if (name === 'expireMonth') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 2) formattedValue = formattedValue.slice(0, 2);
      if (formattedValue && parseInt(formattedValue) > 12) formattedValue = '12';
    }

    // Format expiry year
    if (name === 'expireYear') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 2) formattedValue = formattedValue.slice(0, 2);
    }

    // Format CVC
    if (name === 'cvc') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 3) formattedValue = formattedValue.slice(0, 3);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.cardHolderName.trim()) {
      newErrors.cardHolderName = 'Card holder name is required';
    }

    const cardNumberClean = formData.cardNumber.replace(/\s/g, '');
    if (cardNumberClean.length < 13 || cardNumberClean.length > 19) {
      newErrors.cardNumber = 'Invalid card number';
    }

    if (!formData.expireMonth || formData.expireMonth.length !== 2) {
      newErrors.expireMonth = 'Invalid month';
    }

    if (!formData.expireYear || formData.expireYear.length !== 2) {
      newErrors.expireYear = 'Invalid year';
    }

    if (!formData.cvc || formData.cvc.length !== 3) {
      newErrors.cvc = 'Invalid CVC';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Save payment data to context
    setCheckoutPaymentData(formData);

    // Navigate to review page
    navigate('/checkout/review');
    setIsProcessing(false);
  };

  return (
    <div className="section-padding container-luxury min-h-screen">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/checkout/address')}
          className="flex items-center gap-2 text-warmWhite/70 hover:text-gold transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Address
        </button>

        <h1 className="heading-section text-warmWhite mb-12">Payment Information</h1>

        <div className="bg-charcoal-light border border-emerald/20 p-8 rounded-lg">
          {/* Demo Payment Notice */}
          <div className="mb-6 p-4 bg-gold/10 border border-gold/30 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <Lock className="w-5 h-5 text-gold" />
              </div>
              <div className="flex-1">
                <p className="text-gold font-semibold text-sm mb-1">DEMO PAYMENT SYSTEM</p>
                <p className="text-warmWhite/80 text-sm">
                  This is a simulation using Iyzico Sandbox. No real transactions will be processed. Use test cards provided below.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-warmWhite/70 mb-6">
            <Lock className="w-5 h-5" />
            <span className="text-sm">Your payment information is secure and encrypted</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-warmWhite/80 mb-2">Card Holder Name</label>
              <input
                type="text"
                name="cardHolderName"
                value={formData.cardHolderName}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className={`w-full bg-charcoal border rounded-lg px-4 py-3 text-warmWhite focus:outline-none transition-colors ${
                  errors.cardHolderName ? 'border-burgundy' : 'border-emerald/20 focus:border-gold'
                }`}
              />
              {errors.cardHolderName && (
                <p className="text-burgundy text-sm mt-1">{errors.cardHolderName}</p>
              )}
            </div>

            <div>
              <label className="block text-warmWhite/80 mb-2">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                required
                className={`w-full bg-charcoal border rounded-lg px-4 py-3 text-warmWhite focus:outline-none transition-colors ${
                  errors.cardNumber ? 'border-burgundy' : 'border-emerald/20 focus:border-gold'
                }`}
              />
              {errors.cardNumber && (
                <p className="text-burgundy text-sm mt-1">{errors.cardNumber}</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-warmWhite/80 mb-2">Month</label>
                <input
                  type="text"
                  name="expireMonth"
                  value={formData.expireMonth}
                  onChange={handleChange}
                  placeholder="MM"
                  required
                  className={`w-full bg-charcoal border rounded-lg px-4 py-3 text-warmWhite focus:outline-none transition-colors ${
                    errors.expireMonth ? 'border-burgundy' : 'border-emerald/20 focus:border-gold'
                  }`}
                />
                {errors.expireMonth && (
                  <p className="text-burgundy text-sm mt-1">{errors.expireMonth}</p>
                )}
              </div>
              <div>
                <label className="block text-warmWhite/80 mb-2">Year</label>
                <input
                  type="text"
                  name="expireYear"
                  value={formData.expireYear}
                  onChange={handleChange}
                  placeholder="YY"
                  required
                  className={`w-full bg-charcoal border rounded-lg px-4 py-3 text-warmWhite focus:outline-none transition-colors ${
                    errors.expireYear ? 'border-burgundy' : 'border-emerald/20 focus:border-gold'
                  }`}
                />
                {errors.expireYear && (
                  <p className="text-burgundy text-sm mt-1">{errors.expireYear}</p>
                )}
              </div>
              <div>
                <label className="block text-warmWhite/80 mb-2">CVC</label>
                <input
                  type="text"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleChange}
                  placeholder="123"
                  required
                  className={`w-full bg-charcoal border rounded-lg px-4 py-3 text-warmWhite focus:outline-none transition-colors ${
                    errors.cvc ? 'border-burgundy' : 'border-emerald/20 focus:border-gold'
                  }`}
                />
                {errors.cvc && (
                  <p className="text-burgundy text-sm mt-1">{errors.cvc}</p>
                )}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isProcessing}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {isProcessing ? 'Processing...' : 'Continue to Review'}
              </button>
            </div>
          </form>
        </div>

        {/* Test Cards Information */}
        <div className="mt-8 p-6 bg-emerald/10 border border-emerald/30 rounded-lg">
          <h3 className="text-gold font-semibold mb-4 text-sm uppercase tracking-wider">Iyzico Sandbox Test Cards</h3>
          <div className="space-y-3 text-sm">
            <div className="bg-charcoal/50 p-3 rounded border border-emerald/20">
              <p className="text-warmWhite font-medium mb-1">Visa</p>
              <p className="text-warmWhite/80 font-mono">5400 0100 0000 0004</p>
              <p className="text-warmWhite/60 text-xs mt-1">Expiry: Any future date (e.g., 12/25) • CVC: Any 3 digits (e.g., 123)</p>
            </div>
            <div className="bg-charcoal/50 p-3 rounded border border-emerald/20">
              <p className="text-warmWhite font-medium mb-1">Mastercard</p>
              <p className="text-warmWhite/80 font-mono">5456 1600 0000 0000</p>
              <p className="text-warmWhite/60 text-xs mt-1">Expiry: Any future date (e.g., 12/25) • CVC: Any 3 digits (e.g., 123)</p>
            </div>
            <p className="text-warmWhite/60 text-xs italic mt-3">
              All test cards are accepted in sandbox mode regardless of expiry date or CVC.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
