import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/products', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.success) setProducts(data.products);
      });
  }, []);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-light">Products</h2>
        <button className="bg-black text-white px-6 py-2 text-sm uppercase tracking-widest hover:bg-gray-800 transition">
          + New Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white border border-gray-100 group">
            <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
              {product.images?.[0] ? (
                <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition duration-500" />
              ) : (
                 <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">NO IMAGE</div>
              )}
              {!product.isActive && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] px-2 py-1 uppercase tracking-wider">
                  Hidden
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wide">{product.name}</h3>
                  <p className="text-xs text-gray-500">{product.category}</p>
                </div>
                <p className="text-sm">€{product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default Products;