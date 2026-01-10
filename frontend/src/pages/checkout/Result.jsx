import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, XCircle, ArrowRight, Package, Truck } from 'lucide-react';

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { success, order, message } = location.state || {};

  useEffect(() => {
    if (!location.state) {
      navigate('/');
    }
  }, [location.state, navigate]);

  if (!location.state) return null;

  return (
    <div className="section-padding container-luxury min-h-screen">
      <div className="max-w-2xl mx-auto text-center">
        {success ? (
          <div className="animate-fade-in">
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center border border-gold/30">
                <CheckCircle className="w-12 h-12 text-gold" />
              </div>
            </div>
            
            <span className="text-gold uppercase tracking-[0.3em] text-sm mb-4 block">Order Confirmed</span>
            <h1 className="heading-section text-warmWhite mb-6">Thank you for your purchase</h1>
            <p className="text-luxury text-lg mb-8">
              Your Alverro pieces are now being prepared by our master artisans. 
              <span className="block text-gold mt-2 font-serif italic">Your shipment is being prepared.</span>
            </p>

            {order && (
              <div className="bg-charcoal-light border border-gold/10 p-8 rounded-sm mb-12 text-left">
                <div className="flex items-center gap-3 mb-6 border-b border-gold/10 pb-4">
                  <Package className="w-5 h-5 text-gold" />
                  <h2 className="text-xl font-serif text-warmWhite">Order Details</h2>
                </div>
                <div className="space-y-3 text-warmWhite/80">
                  <p className="flex justify-between">
                    <span className="text-warmWhite/40 uppercase text-xs tracking-widest">Order Number</span>
                    <span className="text-gold font-medium">{order.orderNumber}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-warmWhite/40 uppercase text-xs tracking-widest">Total Amount</span>
                    <span className="text-warmWhite">€{order.totalPrice.toFixed(2)}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-warmWhite/40 uppercase text-xs tracking-widest">Status</span>
                    <span className="text-emerald uppercase text-xs font-bold tracking-tighter">Preparing Shipment</span>
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/account/orders')}
                className="btn-primary flex items-center justify-center gap-2 px-8"
              >
                Track Order
                <Truck className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/')}
                className="btn-outline px-8"
              >
                Return to Gallery
              </button>
            </div>
          </div>
        ) : (
          /* ... failure state stays as is ... */
          <div className="animate-fade-in">
             <XCircle className="w-12 h-12 text-burgundy mx-auto mb-6" />
             <h1 className="heading-section text-warmWhite mb-4">Payment Unsuccessful</h1>
             <p className="text-luxury mb-8">{message || 'Please verify your payment details and try again.'}</p>
             <button onClick={() => navigate('/checkout/payment')} className="btn-primary">Try Again</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;