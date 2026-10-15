import React, { useState } from 'react';
import './AuthForm.css';

const AuthForm = ({ role, onBack, onGuestAccess, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(false);
  const isChemist = role === 'chemist';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    licenseNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAuthSuccess) {
      onAuthSuccess();
    }
  };

  return (
    <div className="auth-form-page">
      {/* Left Banner */}
      <div className={`auth-banner ${isChemist ? 'chemist-bg' : 'patient-bg'}`}>
        <div className="banner-content">
          <span className="role-tag">{isChemist ? 'Chemist Portal' : 'Patient Portal'}</span>
          <h1>{isChemist ? 'Trusted Pharmacy Partner' : 'Your Health, Simplified'}</h1>
          <p>
            {isChemist 
              ? 'Manage your pharmacy, connect with patients and grow your business with secure PIN verification.'
              : 'Find verified local pharmacies near you and verify prescriptions instantly using secure PIN.'}
          </p>

          <div className="feature-list">
            <div className="feature-item">
              <span>✓</span> {isChemist ? 'Verified Drug Licensing' : 'Instant Pharmacy Matching'}
            </div>
            <div className="feature-item">
              <span>📦</span> {isChemist ? 'Smart Inventory Sync' : 'Digital Prescription Vault'}
            </div>
            <div className="feature-item">
              <span>🔒</span> Encrypted PIN Security
            </div>
          </div>

          <p className="copyright">© 2026 Pharmacypin. All rights reserved.</p>
        </div>
      </div>

      {/* Right Form */}
      <div className="auth-form-container">
        <div className="form-header">
          <button type="button" className="back-link" onClick={onBack}>
            ← Change Role
          </button>
          <h2>{isLogin ? 'Welcome Back' : (isChemist ? 'Register Pharmacy' : 'Create Patient Account')}</h2>
          <p>
            {isLogin ? 'Enter your credentials to access your dashboard' : 'Fill in the details below to get started'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="actual-form">
          {!isLogin && (
            <div className="form-group">
              <label>{isChemist ? 'Pharmacy Name' : 'Full Name'}</label>
              <input
                type="text"
                name="name"
                required
                placeholder={isChemist ? 'e.g. Dixit Medical Store' : 'e.g. Somya Dixit'}
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              required
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="Enter 10-digit mobile number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          )}

          {!isLogin && isChemist && (
            <div className="form-group">
              <label>Drug License Number</label>
              <input
                type="text"
                name="licenseNumber"
                required
                placeholder="e.g. DL-2026-XXXXX"
                value={formData.licenseNumber}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                required
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          )}

          <button 
            type="submit" 
            className={`submit-btn ${isChemist ? 'chemist-submit' : 'patient-submit'}`}
          >
            {isLogin 
              ? 'Login to Account' 
              : (isChemist ? 'Create Chemist Account →' : 'Create Patient Account →')}
          </button>
        </form>

        <div className="form-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button" 
              className="toggle-auth-btn" 
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>

          <div className="divider"><span>OR</span></div>

          <button type="button" className="guest-btn" onClick={onGuestAccess}>
            Continue as Guest (Explore App) →
          </button>
        </div>
      </div>
    </div>
  );
};

// 🔴 Fix: Adding the missing default export!
export default AuthForm;