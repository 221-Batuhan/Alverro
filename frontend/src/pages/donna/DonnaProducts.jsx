import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Sparkles } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const DonnaProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    featured: false,
    isLimitedEdition: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.featured) params.append('featured', 'true');
      if (filters.isLimitedEdition) params.append('isLimitedEdition', 'true');

      const response = await axios.get(
        `${API_URL}/products/donna?${params.toString()}`
      );
      if (response.data.success) {
        setProducts(response.data.products || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (filterName) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  return (
    <div className="section-padding container-luxury min-h-screen">
      <button
        onClick={() => navigate('/donna')}
        className="flex items-center gap-2 text-warmWhite/70 hover:text-gold transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Donna
      </button>

      <div className="mb-12">
        <h1 className="heading-section text-warmWhite mb-4">Donna Collection</h1>
        <p className="text-luxury text-lg max-w-2xl">
          Original women's designs created from sketches and transformed into final garments.
          Each piece is a work of art, limited in production and crafted with uncompromising attention to detail.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-12 flex flex-wrap gap-4">
        <button
          onClick={() => handleFilterChange('featured')}
          className={`px-6 py-2 border rounded-sm transition-all ${
            filters.featured
              ? 'border-gold bg-gold/10 text-gold'
              : 'border-emerald/20 text-warmWhite/70 hover:border-emerald/40'
          }`}
        >
          Featured
        </button>
        <button
          onClick={() => handleFilterChange('isLimitedEdition')}
          className={`px-6 py-2 border rounded-sm transition-all flex items-center gap-2 ${
            filters.isLimitedEdition
              ? 'border-gold bg-gold/10 text-gold'
              : 'border-emerald/20 text-warmWhite/70 hover:border-emerald/40'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Limited Edition
        </button>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="text-center py-20">
          <p className="text-warmWhite/70">Loading collection...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-warmWhite/70 text-lg mb-4">No products found</p>
          <p className="text-warmWhite/50">Check back soon for new arrivals</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/donna/products/${product._id}`}
              className="group"
            >
              <div className="relative aspect-[3/4] bg-charcoal rounded-sm border border-emerald/20 hover:border-gold/50 transition-all duration-500 overflow-hidden mb-4">
                {product.images && product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-dark/10 to-burgundy-dark/10">
                    <span className="text-warmWhite/30 text-sm">Image Coming Soon</span>
                  </div>
                )}
                {product.isLimitedEdition && (
                  <div className="absolute top-4 right-4 bg-gold/90 text-charcoal px-3 py-1 text-xs uppercase tracking-wider font-medium">
                    Limited
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <h3 className="text-warmWhite font-serif text-lg mb-1">{product.name}</h3>
                    <p className="text-gold font-semibold">€{product.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <div className="px-2">
                <h3 className="text-warmWhite font-serif text-lg mb-1 group-hover:text-gold transition-colors">
                  {product.name}
                </h3>
                {product.inspirationText && (
                  <p className="text-warmWhite/60 text-sm mb-2 line-clamp-2 italic">
                    {product.inspirationText}
                  </p>
                )}
                <p className="text-gold font-semibold">€{product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonnaProducts;


