import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Settings as SettingsIcon, ArrowLeft, Bell, Shield, Globe } from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

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

        <div className="mb-8">
          <h1 className="heading-section text-gold mb-4">Account Settings</h1>
          <p className="text-luxury">Manage your account preferences</p>
        </div>

        <div className="space-y-6">
          {/* Notifications Section */}
          <div className="bg-charcoal-light border border-gold/20 rounded-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-6 h-6 text-gold" />
              <h2 className="text-xl font-serif text-gold">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-warmWhite font-medium">Email Notifications</p>
                  <p className="text-warmWhite/60 text-sm">Receive updates about your orders</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-charcoal peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gold rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-warmWhite after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-warmWhite font-medium">Marketing Emails</p>
                  <p className="text-warmWhite/60 text-sm">Receive special offers and updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-charcoal peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gold rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-warmWhite after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy Section */}
          <div className="bg-charcoal-light border border-gold/20 rounded-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-gold" />
              <h2 className="text-xl font-serif text-gold">Privacy & Security</h2>
            </div>
            <div className="space-y-4">
              <button className="btn-outline w-full text-left">
                Change Password
              </button>
              <button className="btn-outline w-full text-left">
                Two-Factor Authentication
              </button>
              <button className="btn-outline w-full text-left">
                Download My Data
              </button>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-charcoal-light border border-gold/20 rounded-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-gold" />
              <h2 className="text-xl font-serif text-gold">Preferences</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-warmWhite/80 text-sm font-medium mb-2 uppercase tracking-wider">
                  Language
                </label>
                <select className="w-full px-4 py-3 bg-charcoal border border-gold/20 text-warmWhite rounded-sm focus:outline-none focus:border-gold transition-colors">
                  <option value="en">English</option>
                  <option value="it">Italiano</option>
                  <option value="fr">Français</option>
                </select>
              </div>
              <div>
                <label className="block text-warmWhite/80 text-sm font-medium mb-2 uppercase tracking-wider">
                  Currency
                </label>
                <select className="w-full px-4 py-3 bg-charcoal border border-gold/20 text-warmWhite rounded-sm focus:outline-none focus:border-gold transition-colors">
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-charcoal-light border border-burgundy/30 rounded-sm p-6">
            <h2 className="text-xl font-serif text-burgundy mb-4">Danger Zone</h2>
            <button className="btn-outline border-burgundy text-burgundy hover:bg-burgundy hover:text-warmWhite">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

