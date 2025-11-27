import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { MapPin, Plus, Edit, Trash2, ArrowLeft, Check } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Addresses = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Italy',
    phone: '',
    isDefault: false,
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchAddresses();
  }, [user, navigate]);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/addresses`, { withCredentials: true });
      setAddresses(response.data.addresses || []);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `${API_URL}/user/addresses/${editingId}`,
          formData,
          { withCredentials: true }
        );
      } else {
        await axios.post(`${API_URL}/user/addresses`, formData, { withCredentials: true });
      }
      fetchAddresses();
      resetForm();
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingId(address._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;
    try {
      await axios.delete(`${API_URL}/user/addresses/${id}`, { withCredentials: true });
      fetchAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Italy',
      phone: '',
      isDefault: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (!user) return null;

  return (
    <div className="section-padding bg-charcoal min-h-screen">
      <div className="container-luxury max-w-4xl">
        <button
          onClick={() => navigate('/account')}
          className="flex items-center gap-2 text-warmWhite/80 hover:text-gold transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="uppercase tracking-wider text-sm">Back to Account</span>
        </button>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="heading-section text-gold mb-4">Address Book</h1>
            <p className="text-luxury">Manage your shipping addresses</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Address
            </button>
          )}
        </div>

        {showForm && (
          <div className="bg-charcoal-light border border-gold/20 rounded-sm p-8 mb-8">
            <h2 className="text-xl font-serif text-gold mb-6">
              {editingId ? 'Edit Address' : 'Add New Address'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-warmWhite/80 text-sm font-medium mb-2 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-charcoal border border-gold/20 text-warmWhite rounded-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-warmWhite/80 text-sm font-medium mb-2 uppercase tracking-wider">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-charcoal border border-gold/20 text-warmWhite rounded-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-warmWhite/80 text-sm font-medium mb-2 uppercase tracking-wider">
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-charcoal border border-gold/20 text-warmWhite rounded-sm focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-warmWhite/80 text-sm font-medium mb-2 uppercase tracking-wider">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-charcoal border border-gold/20 text-warmWhite rounded-sm focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-warmWhite/80 text-sm font-medium mb-2 uppercase tracking-wider">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-charcoal border border-gold/20 text-warmWhite rounded-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-warmWhite/80 text-sm font-medium mb-2 uppercase tracking-wider">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-charcoal border border-gold/20 text-warmWhite rounded-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-warmWhite/80 text-sm font-medium mb-2 uppercase tracking-wider">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-charcoal border border-gold/20 text-warmWhite rounded-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-warmWhite/80 text-sm font-medium mb-2 uppercase tracking-wider">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-charcoal border border-gold/20 text-warmWhite rounded-sm focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleChange}
                  className="w-4 h-4 text-gold bg-charcoal border-gold/20 rounded focus:ring-gold"
                />
                <label htmlFor="isDefault" className="text-warmWhite/80 text-sm">
                  Set as default address
                </label>
              </div>

              <div className="flex gap-4">
                <button type="submit" className="btn-primary">
                  {editingId ? 'Update Address' : 'Add Address'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {isLoading ? (
          <div className="text-center text-warmWhite/60">Loading addresses...</div>
        ) : addresses.length === 0 ? (
          <div className="bg-charcoal-light border border-gold/20 rounded-sm p-12 text-center">
            <MapPin className="w-16 h-16 text-gold/50 mx-auto mb-4" />
            <p className="text-warmWhite/60 mb-4">No addresses saved yet</p>
            <button onClick={() => setShowForm(true)} className="btn-primary">
              Add Your First Address
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((address) => (
              <div
                key={address._id}
                className="bg-charcoal-light border border-gold/20 rounded-sm p-6 relative"
              >
                {address.isDefault && (
                  <div className="absolute top-4 right-4 bg-gold/20 text-gold text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Default
                  </div>
                )}
                <h3 className="font-serif text-gold text-lg mb-4">{address.fullName}</h3>
                <p className="text-warmWhite/80 text-sm mb-2">{address.addressLine1}</p>
                {address.addressLine2 && (
                  <p className="text-warmWhite/80 text-sm mb-2">{address.addressLine2}</p>
                )}
                <p className="text-warmWhite/80 text-sm mb-2">
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p className="text-warmWhite/80 text-sm mb-2">{address.country}</p>
                <p className="text-warmWhite/80 text-sm mb-4">{address.phone}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(address)}
                    className="text-gold hover:text-gold-light transition-colors flex items-center gap-1 text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(address._id)}
                    className="text-burgundy hover:text-burgundy-light transition-colors flex items-center gap-1 text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
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

export default Addresses;

