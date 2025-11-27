import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { CreditCard, Plus, Edit, Trash2, ArrowLeft, Check } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Payments = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    cardholderName: '',
    last4: '',
    brand: 'visa',
    expiryMonth: '',
    expiryYear: '',
    isDefault: false,
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCards();
  }, [user, navigate]);

  const fetchCards = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/cards`, { withCredentials: true });
      setCards(response.data.cards || []);
    } catch (error) {
      console.error('Error fetching cards:', error);
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
          `${API_URL}/user/cards/${editingId}`,
          formData,
          { withCredentials: true }
        );
      } else {
        await axios.post(`${API_URL}/user/cards`, formData, { withCredentials: true });
      }
      fetchCards();
      resetForm();
    } catch (error) {
      console.error('Error saving card:', error);
    }
  };

  const handleEdit = (card) => {
    setFormData(card);
    setEditingId(card._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this card?')) return;
    try {
      await axios.delete(`${API_URL}/user/cards/${id}`, { withCredentials: true });
      fetchCards();
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      cardholderName: '',
      last4: '',
      brand: 'visa',
      expiryMonth: '',
      expiryYear: '',
      isDefault: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const getBrandIcon = (brand) => {
    const brandColors = {
      visa: 'text-blue-400',
      mastercard: 'text-red-400',
      amex: 'text-green-400',
    };
    return brandColors[brand] || 'text-gold';
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
            <h1 className="heading-section text-gold mb-4">Payment Methods</h1>
            <p className="text-luxury">Manage your saved payment cards</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Card
            </button>
          )}
        </div>

        {showForm && (
          <div className="bg-charcoal-light border border-gold/20 rounded-sm p-8 mb-8">
            <h2 className="text-xl font-serif text-gold mb-6">
              {editingId ? 'Edit Card' : 'Add New Card'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-warmWhite/80 text-sm font-medium mb-2 uppercase tracking-wider">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  name="cardholderName"
                  value={formData.cardholderName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-charcoal border border-gold/20 text-warmWhite rounded-sm focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-warmWhite/80 text-sm font-medium mb-2 uppercase tracking-wider">
                    Last 4 Digits
                  </label>
                  <input
                    type="text"
                    name="last4"
                    value={formData.last4}
                    onChange={handleChange}
                    required
                    maxLength={4}
                    pattern="[0-9]{4}"
                    className="w-full px-4 py-3 bg-charcoal border border-gold/20 text-warmWhite rounded-sm focus:outline-none focus:border-gold transition-colors"
                    placeholder="1234"
                  />
                </div>
                <div>
                  <label className="block text-warmWhite/80 text-sm font-medium mb-2 uppercase tracking-wider">
                    Card Brand
                  </label>
                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-charcoal border border-gold/20 text-warmWhite rounded-sm focus:outline-none focus:border-gold transition-colors"
                  >
                    <option value="visa">Visa</option>
                    <option value="mastercard">Mastercard</option>
                    <option value="amex">American Express</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-warmWhite/80 text-sm font-medium mb-2 uppercase tracking-wider">
                    Expiry Month
                  </label>
                  <input
                    type="text"
                    name="expiryMonth"
                    value={formData.expiryMonth}
                    onChange={handleChange}
                    required
                    maxLength={2}
                    placeholder="MM"
                    className="w-full px-4 py-3 bg-charcoal border border-gold/20 text-warmWhite rounded-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-warmWhite/80 text-sm font-medium mb-2 uppercase tracking-wider">
                    Expiry Year
                  </label>
                  <input
                    type="text"
                    name="expiryYear"
                    value={formData.expiryYear}
                    onChange={handleChange}
                    required
                    maxLength={4}
                    placeholder="YYYY"
                    className="w-full px-4 py-3 bg-charcoal border border-gold/20 text-warmWhite rounded-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isDefaultCard"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleChange}
                  className="w-4 h-4 text-gold bg-charcoal border-gold/20 rounded focus:ring-gold"
                />
                <label htmlFor="isDefaultCard" className="text-warmWhite/80 text-sm">
                  Set as default payment method
                </label>
              </div>

              <div className="flex gap-4">
                <button type="submit" className="btn-primary">
                  {editingId ? 'Update Card' : 'Add Card'}
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
          <div className="text-center text-warmWhite/60">Loading cards...</div>
        ) : cards.length === 0 ? (
          <div className="bg-charcoal-light border border-gold/20 rounded-sm p-12 text-center">
            <CreditCard className="w-16 h-16 text-gold/50 mx-auto mb-4" />
            <p className="text-warmWhite/60 mb-4">No payment methods saved yet</p>
            <button onClick={() => setShowForm(true)} className="btn-primary">
              Add Your First Card
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card) => (
              <div
                key={card._id}
                className="bg-charcoal-light border border-gold/20 rounded-sm p-6 relative"
              >
                {card.isDefault && (
                  <div className="absolute top-4 right-4 bg-gold/20 text-gold text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Default
                  </div>
                )}
                <div className="flex items-center gap-4 mb-4">
                  <CreditCard className={`w-8 h-8 ${getBrandIcon(card.brand)}`} />
                  <div>
                    <h3 className="font-serif text-gold text-lg">{card.cardholderName}</h3>
                    <p className="text-warmWhite/60 text-sm uppercase">{card.brand}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-warmWhite/80 text-2xl font-mono tracking-wider">
                    •••• •••• •••• {card.last4}
                  </p>
                  <p className="text-warmWhite/60 text-sm mt-2">
                    Expires {card.expiryMonth}/{card.expiryYear}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(card)}
                    className="text-gold hover:text-gold-light transition-colors flex items-center gap-1 text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(card._id)}
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

export default Payments;

