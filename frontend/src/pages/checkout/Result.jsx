import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { success, order, message } = location.state || {};

  useEffect(() => {
    // If no state, redirect to home
    if (!location.state) {
      navigate('/');
    }
  }, [location.state, navigate]);

  if (!location.state) {
    return null;
  }

  return (
    <div className="section-padding container-luxury min-h-screen">
      <div className="max-w-2xl mx-auto text-center">
        {success ? (
          <>
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 bg-emerald/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-emerald" />
              </div>
            </div>
            <h1 className="heading-section text-warmWhite mb-6">Payment Successful!</h1>
            <p className="text-warmWhite/80 text-lg mb-8">{message || 'Your order has been placed successfully.'}</p>

            {order && (
              <div className="bg-charcoal-light border border-emerald/20 p-6 rounded-lg mb-8 text-left">
                <h2 className="text-xl font-serif text-warmWhite mb-4">Order Details</h2>
                <div className="space-y-2 text-warmWhite/80">
                  <p>
                    <span className="text-warmWhite/60">Order Number:</span>{' '}
                    <span className="text-gold font-semibold">{order.orderNumber}</span>
                  </p>
                  <p>
                    <span className="text-warmWhite/60">Total Amount:</span>{' '}
                    <span className="text-gold font-semibold">€{order.totalPrice.toFixed(2)}</span>
                  </p>
                  <p>
                    <span className="text-warmWhite/60">Payment Status:</span>{' '}
                    <span className="text-emerald capitalize">{order.paymentStatus}</span>
                  </p>
                  <p>
                    <span className="text-warmWhite/60">Order Status:</span>{' '}
                    <span className="text-gold capitalize">{order.orderStatus}</span>
                  </p>
                  {order.paymentDetails?.last4Digits && (
                    <p>
                      <span className="text-warmWhite/60">Card:</span>{' '}
                      <span className="text-warmWhite">**** {order.paymentDetails.last4Digits}</span>
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/account/orders')}
                className="btn-primary flex items-center gap-2"
              >
                View Orders
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/')}
                className="btn-outline"
              >
                Continue Shopping
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 bg-burgundy/20 rounded-full flex items-center justify-center">
                <XCircle className="w-12 h-12 text-burgundy" />
              </div>
            </div>
            <h1 className="heading-section text-warmWhite mb-6">Payment Failed</h1>
            <p className="text-warmWhite/80 text-lg mb-8">
              {message || 'Your payment could not be processed. Please try again.'}
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/checkout/payment')}
                className="btn-primary flex items-center gap-2"
              >
                Try Again
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/checkout/cart')}
                className="btn-outline"
              >
                Back to Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Result;

