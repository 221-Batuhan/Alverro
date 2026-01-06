import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import axios from 'axios';
import { MapPin, ArrowLeft, ArrowRight, Plus } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AddressSelection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { checkoutData, setCheckoutAddress } = useCart();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Italy',
    phone: '',
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
      // Pre-select default address or first address
      const defaultAddress = response.data.addresses?.find(addr => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress._id);
        setCheckoutAddress(defaultAddress);
      } else if (response.data.addresses?.length > 0) {
        setSelectedAddressId(response.data.addresses[0]._id);
        setCheckoutAddress(response.data.addresses[0]);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/user/addresses`, formData, { withCredentials: true });
      fetchAddresses();
      setShowForm(false);
      setFormData({
        fullName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'Italy',
        phone: '',
      });
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Failed to save address. Please try again.');
    }
  };

  const handleSelectAddress = (address) => {
    setSelectedAddressId(address._id);
    setCheckoutAddress(address);
  };

  const handleContinue = () => {
    if (!selectedAddressId) {
      alert('Please select an address or create a new one');
      return;
    }
    navigate('/checkout/payment');
  };

  if (isLoading) {
    return (
      <div className="section-padding container-luxury min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-warmWhite/70">Loading addresses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding container-luxury min-h-screen">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/checkout/cart')}
          className="flex items-center gap-2 text-warmWhite/70 hover:text-gold transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Cart
        </button>

        <h1 className="heading-section text-warmWhite mb-12">Select Address</h1>

        <div className="space-y-6 mb-8">
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <div
                key={address._id}
                onClick={() => handleSelectAddress(address)}
                className={`bg-charcoal-light border-2 p-6 rounded-lg cursor-pointer transition-all ${
                  selectedAddressId === address._id
                    ? 'border-gold bg-emerald/10'
                    : 'border-emerald/20 hover:border-emerald/40'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${
                    selectedAddressId === address._id ? 'bg-gold' : 'bg-emerald/20'
                  }`}>
                    <MapPin className={`w-5 h-5 ${
                      selectedAddressId === address._id ? 'text-charcoal' : 'text-emerald'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-serif text-warmWhite mb-2">{address.fullName}</h3>
                    <p className="text-warmWhite/80 mb-1">{address.addressLine1}</p>
                    {address.addressLine2 && (
                      <p className="text-warmWhite/80 mb-1">{address.addressLine2}</p>
                    )}
                    <p className="text-warmWhite/80 mb-1">
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                    <p className="text-warmWhite/80 mb-1">{address.country}</p>
                    <p className="text-warmWhite/80">{address.phone}</p>
                    {address.isDefault && (
                      <span className="inline-block mt-2 px-3 py-1 bg-emerald/20 text-emerald text-sm rounded">
                        Default
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-warmWhite/70 text-center py-8">No addresses found. Please add one below.</p>
          )}

          {showForm && (
            <div className="bg-charcoal-light border border-emerald/20 p-6 rounded-lg">
              <h3 className="text-xl font-serif text-warmWhite mb-6">Add New Address</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-warmWhite/80 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full bg-charcoal border border-emerald/20 rounded-lg px-4 py-3 text-warmWhite focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-warmWhite/80 mb-2">Address Line 1</label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    required
                    className="w-full bg-charcoal border border-emerald/20 rounded-lg px-4 py-3 text-warmWhite focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-warmWhite/80 mb-2">Address Line 2</label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    className="w-full bg-charcoal border border-emerald/20 rounded-lg px-4 py-3 text-warmWhite focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-warmWhite/80 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full bg-charcoal border border-emerald/20 rounded-lg px-4 py-3 text-warmWhite focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-warmWhite/80 mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full bg-charcoal border border-emerald/20 rounded-lg px-4 py-3 text-warmWhite focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-warmWhite/80 mb-2">Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      className="w-full bg-charcoal border border-emerald/20 rounded-lg px-4 py-3 text-warmWhite focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-warmWhite/80 mb-2">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="w-full bg-charcoal border border-emerald/20 rounded-lg px-4 py-3 text-warmWhite focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-warmWhite/80 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-charcoal border border-emerald/20 rounded-lg px-4 py-3 text-warmWhite focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="flex gap-4">
                  <button type="submit" className="btn-primary">
                    Save Address
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="btn-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full border-2 border-dashed border-emerald/30 hover:border-emerald/50 rounded-lg p-6 text-warmWhite/70 hover:text-warmWhite transition-colors flex items-center justify-center gap-2 mb-8"
          >
            <Plus className="w-5 h-5" />
            Add New Address
          </button>
        )}

        <div className="flex gap-4">
          <button
            onClick={() => navigate('/checkout/cart')}
            className="btn-outline flex-1"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            className="btn-primary flex-1 flex items-center justify-center gap-2"
          >
            Continue to Payment
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressSelection;

