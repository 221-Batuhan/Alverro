import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, ArrowRight, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';

const TestProduct = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const testProduct = {
    productId: 'test-product-001',
    name: 'Luxury Italian Silk Shirt',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80',
    description: 'Premium Italian silk shirt with handcrafted details. Perfect for special occasions.',
    category: 'Shirts',
    size: 'M',
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        productId: testProduct.productId,
        name: testProduct.name,
        price: testProduct.price,
        image: testProduct.image,
        size: testProduct.size,
      });
    }
    
    // Show success message
    alert(`${quantity} item(s) added to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => {
      navigate('/checkout/cart');
    }, 500);
  };

  return (
    <div className="section-padding container-luxury min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 p-4 bg-gold/10 border border-gold/30 rounded-lg">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-gold" />
            <div>
              <p className="text-gold font-semibold text-sm">TEST PRODUCT - ÖDEME DENEMESİ</p>
              <p className="text-warmWhite/80 text-xs mt-1">
                Bu ürün ödeme akışını test etmek için oluşturulmuştur. Sepete ekleyip ödeme işlemini deneyebilirsiniz.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square bg-charcoal-light border border-emerald/20 rounded-lg overflow-hidden">
              <img
                src={testProduct.image}
                alt={testProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-4 right-4 bg-gold/90 text-charcoal px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider">
              Test Product
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="heading-section text-warmWhite mb-4">{testProduct.name}</h1>
            <p className="text-3xl font-serif text-gold mb-6">€{testProduct.price.toFixed(2)}</p>
            
            <p className="text-luxury mb-8 leading-relaxed">
              {testProduct.description}
            </p>

            <div className="mb-6">
              <label className="block text-warmWhite/80 mb-3">Size</label>
              <div className="flex gap-3">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    className={`px-6 py-2 border rounded-lg transition-colors ${
                      testProduct.size === size
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-emerald/20 text-warmWhite/70 hover:border-emerald/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-warmWhite/80 mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 border border-emerald/30 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-warmWhite/80 hover:text-gold transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-6 py-3 text-warmWhite min-w-[4rem] text-center text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-warmWhite/80 hover:text-gold transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-warmWhite/60 text-sm">
                  Subtotal: <span className="text-gold font-semibold">
                    €{(testProduct.price * quantity).toFixed(2)}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex gap-4 mt-auto">
              <button
                onClick={handleAddToCart}
                className="btn-outline flex-1 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                Buy Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Test Info */}
            <div className="mt-8 p-4 bg-emerald/10 border border-emerald/20 rounded-lg">
              <p className="text-warmWhite/80 text-sm mb-2">
                <strong className="text-gold">Hızlı Test:</strong>
              </p>
              <ol className="text-warmWhite/70 text-xs space-y-1 list-decimal list-inside">
                <li>Ürünü sepete ekleyin</li>
                <li>Sepete gidin (/cart)</li>
                <li>Adres seçin</li>
                <li>Ödeme bilgilerini girin (test kartı: 5528 7900 0000 0000)</li>
                <li>Ödemeyi tamamlayın</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestProduct;

