import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { User, Mail, Save, ArrowLeft } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setFormData({
      name: user.name || '',
      email: user.email || '',
    });
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.put(
        `${API_URL}/user/profile`,
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        updateUser(response.data.user);
        setMessage('Profile updated successfully');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="section-padding bg-charcoal min-h-screen">
      <div className="container-luxury max-w-2xl">
        <button
          onClick={() => navigate('/account')}
          className="flex items-center gap-2 text-warmWhite/80 hover:text-gold transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="uppercase tracking-wider text-sm">Back to Account</span>
        </button>

        <div className="mb-8">
          <h1 className="heading-section text-gold mb-4">Personal Information</h1>
          <p className="text-luxury">Update your personal details</p>
        </div>

        <div className="bg-charcoal-light border border-gold/20 rounded-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
              <div
                className={`p-4 rounded-sm text-sm ${
                  message.includes('successfully')
                    ? 'bg-emerald/20 border border-emerald/50 text-warmWhite'
                    : 'bg-burgundy/20 border border-burgundy/50 text-warmWhite'
                }`}
              >
                {message}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-warmWhite/80 text-sm font-medium mb-2 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gold/50" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-charcoal border border-gold/20 text-warmWhite rounded-sm focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-warmWhite/80 text-sm font-medium mb-2 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gold/50" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-charcoal border border-gold/20 text-warmWhite rounded-sm focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
              {!isLoading && <Save className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

