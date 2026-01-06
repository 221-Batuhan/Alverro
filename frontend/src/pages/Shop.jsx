import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext'; //
import jacketImage from '../assets/shop/jacket-001.png';
import suitImage from '../assets/shop/suit-001.png';
import trouserImage from '../assets/shop/trouser-001.png';

const Shop = () => {
  const { addToCart } = useCart(); //
  const [addedId, setAddedId] = React.useState(null);

  // Your manually managed products
  const products = [
    {
      productId: 'jacket-001',
      name: 'Heritage Wool Jacket',
      price: 890.00,
      category: 'Jackets',
      image: jacketImage, // Placeholder for your manual upload
      description: 'Timeless structure for the modern gentleman.'
    },
    {
      productId: 'suit-001',
      name: 'Classic Italian Suit',
      price: 2450.00,
      category: 'Suits',
      image: suitImage, // Placeholder for your manual upload
      description: 'A masterpiece of Neapolitan tailoring.'
    },
    {
      productId: 'trouser-001',
      name: 'Tailored Slim Trousers',
      price: 420.00,
      category: 'Trousers',
      image: trouserImage, // Placeholder for your manual upload
      description: 'Perfectly cut from premium Italian wool.'
    }
  ];

  const handleAddToCart = (product) => {
    addToCart({
      productId: product.productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    }); //
    
    // Brief visual feedback
    setAddedId(product.productId);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-charcoal">
      <div className="container-luxury section-padding">
        <div className="mb-16 text-center">
          <h1 className="heading-section text-warmWhite mb-4">The Collection</h1>
          <p className="text-luxury max-w-2xl mx-auto">
            Experience the pinnacle of Italian tailoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product) => (
            <div key={product.productId} className="group">
              <div className="relative aspect-[3/4] bg-charcoal-light border border-gold/10 overflow-hidden mb-6 flex items-center justify-center">
                <div className="text-center p-8 w-full h-full">                  
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
                </div>
                
                {/* Add to Cart Overlay */}
                <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-4">
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="btn-primary py-2 px-6 text-xs flex items-center gap-2"
                  >
                    {addedId === product.productId ? (
                      <><Check className="w-4 h-4" /> Added</>
                    ) : (
                      <><ShoppingBag className="w-4 h-4" /> Add to Cart</>
                    )}
                  </button>
                </div>
              </div>

              <div className="text-center">
                <span className="text-gold/60 text-xs uppercase tracking-[0.2em] mb-2 block">
                  {product.category}
                </span>
                <h3 className="text-warmWhite font-serif text-xl mb-2 group-hover:text-gold transition-colors">
                  {product.name}
                </h3>
                <p className="text-gold font-medium">€{product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;