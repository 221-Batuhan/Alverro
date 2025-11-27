import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { User, MapPin, CreditCard, Package, Settings, LogOut } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AccountDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    addresses: 0,
    cards: 0,
    orders: 0,
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Fetch user stats
    const fetchStats = async () => {
      try {
        const [addressesRes, cardsRes, ordersRes] = await Promise.all([
          axios.get(`${API_URL}/user/addresses`, { withCredentials: true }),
          axios.get(`${API_URL}/user/cards`, { withCredentials: true }),
          axios.get(`${API_URL}/user/orders`, { withCredentials: true }),
        ]);

        setStats({
          addresses: addressesRes.data.addresses?.length || 0,
          cards: cardsRes.data.cards?.length || 0,
          orders: ordersRes.data.orders?.length || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, [user, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) return null;

  const menuItems = [
    { icon: User, label: 'Profile', path: '/account/profile', color: 'text-gold' },
    { icon: MapPin, label: 'Addresses', path: '/account/addresses', count: stats.addresses },
    { icon: CreditCard, label: 'Payment Methods', path: '/account/payments', count: stats.cards },
    { icon: Package, label: 'Order History', path: '/account/orders', count: stats.orders },
    { icon: Settings, label: 'Settings', path: '/account/settings' },
  ];

  return (
    <div className="section-padding bg-charcoal min-h-screen">
      <div className="container-luxury">
        <div className="mb-12">
          <h1 className="heading-section text-gold mb-4">My Account</h1>
          <p className="text-luxury">Welcome back, {user.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="group bg-charcoal-light border border-gold/20 hover:border-gold/50 rounded-sm p-6 transition-all duration-300 hover:shadow-lg hover:shadow-gold/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <Icon className={`w-8 h-8 ${item.color || 'text-gold'} group-hover:scale-110 transition-transform`} />
                  {item.count !== undefined && (
                    <span className="bg-gold/20 text-gold text-xs px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  )}
                </div>
                <h3 className="text-warmWhite font-serif text-xl mb-2 group-hover:text-gold transition-colors">
                  {item.label}
                </h3>
                <p className="text-warmWhite/60 text-sm">Manage your {item.label.toLowerCase()}</p>
              </Link>
            );
          })}
        </div>

        <div className="bg-charcoal-light border border-gold/20 rounded-sm p-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-warmWhite/80 hover:text-burgundy transition-colors group"
          >
            <LogOut className="w-5 h-5 group-hover:rotate-180 transition-transform" />
            <span className="uppercase tracking-wider text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDashboard;

