import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Phone, Save, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AccountPage() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile({ name, phone, address, avatar: name.charAt(0).toUpperCase() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="account-page">
      <div className="page-container">
        <motion.div
          className="account-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="account-header">
            <div className="account-avatar">{user?.avatar}</div>
            <div>
              <h1>Account Settings</h1>
              <p>Manage your profile and preferences</p>
            </div>
          </div>

          <div className="account-form">
            <div className="form-group">
              <label htmlFor="account-name">
                <User size={16} /> Full Name
              </label>
              <input
                type="text"
                id="account-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="account-email">
                <Mail size={16} /> Email
              </label>
              <input
                type="email"
                id="account-email"
                value={email}
                disabled
                className="input-disabled"
              />
            </div>

            <div className="form-group">
              <label htmlFor="account-phone">
                <Phone size={16} /> Phone
              </label>
              <input
                type="tel"
                id="account-phone"
                placeholder="(555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="account-address">
                <MapPin size={16} /> Default Address
              </label>
              <input
                type="text"
                id="account-address"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={handleSave}
              id="save-profile-btn"
            >
              {saved ? (
                <span className="btn-loading">
                  <Check size={18} /> Saved!
                </span>
              ) : (
                <span className="btn-loading">
                  <Save size={18} /> Save Changes
                </span>
              )}
            </button>
          </div>

          <div className="account-section">
            <h3>Account Info</h3>
            <div className="account-info-grid">
              <div className="account-info-item">
                <span className="account-info-label">Member since</span>
                <span className="account-info-value">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'Recently'}
                </span>
              </div>
              <div className="account-info-item">
                <span className="account-info-label">Account ID</span>
                <span className="account-info-value">{user?.id}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
