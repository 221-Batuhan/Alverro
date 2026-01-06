import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

const CartReview = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="section-padding container-luxury min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="heading-section text-warmWhite mb-6">Your Cart is Empty</h1>
          <p className="text-warmWhite/70 mb-8">Add some luxury items to your cart to continue.</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding container-luxury min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="heading-section text-warmWhite mb-12">Review Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.productId}
                className="bg-charcoal-light border border-emerald/20 p-6 rounded-lg flex flex-col md:flex-row gap-6"
              >
                {item.image && (
                  <div className="w-full md:w-32 h-32 bg-charcoal rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-serif text-warmWhite mb-2">{item.name}</h3>
                  <p className="text-gold text-lg mb-4">€{item.price.toFixed(2)}</p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 border border-emerald/30 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="p-2 text-warmWhite/80 hover:text-gold transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 text-warmWhite min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="p-2 text-warmWhite/80 hover:text-gold transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-warmWhite/60 hover:text-burgundy transition-colors p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <p className="text-warmWhite/80">
                    Subtotal: <span className="text-gold font-semibold">€{(item.price * item.quantity).toFixed(2)}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-charcoal-light border border-emerald/20 p-6 rounded-lg sticky top-8">
              <h2 className="text-2xl font-serif text-warmWhite mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-warmWhite/80">
                  <span>Items ({getTotalItems()})</span>
                  <span>€{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-warmWhite/80">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-emerald/20 pt-4 flex justify-between">
                  <span className="text-xl font-serif text-warmWhite">Total</span>
                  <span className="text-2xl font-serif text-gold">€{getTotalPrice().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout/address')}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                Continue to Address
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartReview;

