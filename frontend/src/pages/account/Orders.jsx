import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Package, ArrowLeft, Eye } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/orders`, { withCredentials: true });
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'text-gold',
      processing: 'text-emerald',
      shipped: 'text-gold-light',
      delivered: 'text-emerald-light',
      cancelled: 'text-burgundy',
    };
    return colors[status] || 'text-warmWhite/60';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!user) return null;

  return (
    <div className="section-padding bg-charcoal min-h-screen">
      <div className="container-luxury max-w-6xl">
        <button
          onClick={() => navigate('/account')}
          className="flex items-center gap-2 text-warmWhite/80 hover:text-gold transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="uppercase tracking-wider text-sm">Back to Account</span>
        </button>

        <div className="mb-8">
          <h1 className="heading-section text-gold mb-4">Order History</h1>
          <p className="text-luxury">View all your past orders</p>
        </div>

        {isLoading ? (
          <div className="text-center text-warmWhite/60">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="bg-charcoal-light border border-gold/20 rounded-sm p-12 text-center">
            <Package className="w-16 h-16 text-gold/50 mx-auto mb-4" />
            <p className="text-warmWhite/60 mb-4">You haven't placed any orders yet</p>
            <button onClick={() => navigate('/shop')} className="btn-primary">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-charcoal-light border border-gold/20 rounded-sm p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-gold text-xl mb-2">
                      Order #{order.orderNumber}
                    </h3>
                    <p className="text-warmWhite/60 text-sm">
                      Placed on {formatDate(order.orderDate)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <span className={`font-medium uppercase tracking-wider ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className="text-gold text-xl font-serif">
                      €{order.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gold/10 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {order.items?.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-sm border border-gold/20"
                          />
                        )}
                        <div>
                          <p className="text-warmWhite font-medium text-sm">{item.name}</p>
                          <p className="text-warmWhite/60 text-xs">
                            Qty: {item.quantity} × €{item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {order.items?.length > 3 && (
                    <p className="text-warmWhite/60 text-sm mb-4">
                      +{order.items.length - 3} more item(s)
                    </p>
                  )}
                  <button className="text-gold hover:text-gold-light transition-colors flex items-center gap-2 text-sm">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

