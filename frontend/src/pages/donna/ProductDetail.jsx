import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Sparkles, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      if (response.data.success) {
        setProduct(response.data.product);
        if (response.data.product.sizes && response.data.product.sizes.length > 0) {
          setSelectedSize(response.data.product.sizes[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      alert('Please select a size');
      return;
    }

    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images && product.images[0] ? product.images[0] : '',
      size: selectedSize,
    });

    // Optional: Show confirmation
    alert('Added to cart');
  };

  if (isLoading) {
    return (
      <div className="section-padding container-luxury min-h-screen">
        <div className="text-center py-20">
          <p className="text-warmWhite/70">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="section-padding container-luxury min-h-screen">
        <div className="text-center py-20">
          <p className="text-warmWhite/70 text-lg mb-4">Product not found</p>
          <button
            onClick={() => navigate('/donna')}
            className="btn-outline"
          >
            Back to Donna
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding container-luxury min-h-screen">
      <button
        onClick={() => navigate('/donna/products')}
        className="flex items-center gap-2 text-warmWhite/70 hover:text-gold transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Collection
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] bg-charcoal rounded-sm border border-emerald/20 overflow-hidden">
            {product.images && product.images[selectedImage] ? (
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-dark/10 to-burgundy-dark/10">
                <span className="text-warmWhite/30">Image Coming Soon</span>
              </div>
            )}
            {product.isLimitedEdition && (
              <div className="absolute top-4 right-4 bg-gold/90 text-charcoal px-4 py-2 text-xs uppercase tracking-wider font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Limited Edition
              </div>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-charcoal rounded-sm border overflow-hidden transition-all ${
                    selectedImage === index
                      ? 'border-gold'
                      : 'border-emerald/20 hover:border-emerald/40'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="heading-section text-warmWhite mb-4">{product.name}</h1>
          
          {product.isLimitedEdition && (
            <div className="flex items-center gap-2 text-gold mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wider">Limited Edition</span>
            </div>
          )}

          <p className="text-3xl font-serif text-gold mb-8">€{product.price.toFixed(2)}</p>

          <div className="mb-8">
            <p className="text-luxury leading-relaxed mb-6">{product.description}</p>
          </div>

          {/* Inspiration Text */}
          {product.inspirationText && (
            <div className="mb-8 p-6 bg-charcoal-light border border-emerald/20 rounded-sm">
              <h3 className="text-warmWhite font-serif text-lg mb-3">Inspiration</h3>
              <p className="text-warmWhite/80 italic leading-relaxed">
                {product.inspirationText}
              </p>
            </div>
          )}

          {/* Craftsmanship Notes */}
          {product.craftsmanshipNotes && (
            <div className="mb-8 p-6 bg-charcoal-light border border-gold/20 rounded-sm">
              <h3 className="text-warmWhite font-serif text-lg mb-3">Craftsmanship</h3>
              <p className="text-warmWhite/80 leading-relaxed">
                {product.craftsmanshipNotes}
              </p>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-8">
              <label className="block text-warmWhite/80 mb-3 uppercase text-sm tracking-wider">
                Size
              </label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border rounded-sm transition-all ${
                      selectedSize === size
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-emerald/20 text-warmWhite/70 hover:border-emerald/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="btn-primary flex-1"
            >
              Add to Cart
            </button>
            <button
              className="btn-outline px-6"
              aria-label="Save to favorites"
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Product Info */}
          <div className="border-t border-emerald/20 pt-6 space-y-3 text-sm text-warmWhite/70">
            {product.category && (
              <div className="flex justify-between">
                <span>Category:</span>
                <span className="text-warmWhite">{product.category}</span>
              </div>
            )}
            {product.stock !== undefined && (
              <div className="flex justify-between">
                <span>Availability:</span>
                <span className={product.stock > 0 ? 'text-emerald' : 'text-burgundy'}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;


