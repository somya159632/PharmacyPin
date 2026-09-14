import React, { useState } from 'react';
import './AuthForm.css';


const AuthForm = ({ role, onBack, onGuestAccess }) => {
  const [isLogin, setIsLogin] = useState(false);
  const isChemist = role === 'chemist';

  return (
    <div className="auth-form-page">
      {/* Left Branding Banner */}
      <div className={`auth-banner ${isChemist ? 'chemist-theme' : 'patient-theme'}`}>
        <div>
          <button className="back-link" onClick={onBack}>
            ← Back to Role Selection
          </button>

          <div className="banner-logo flex items-center gap-2 mt-6">
            <img src="/logo.png" alt="Pharmacypin Logo" className="logo-img" />
            <span className="logo-text font-bold text-2xl">Pharmacypin</span>
          </div>
        </div>

        <div className="banner-content">
          <span className="banner-tag">
            {isChemist ? 'Chemist Portal' : 'Patient Portal'}
          </span>
          <h1>
            {isChemist ? 'Trusted Pharmacy Partner' : 'Your Health, Our Priority'}
          </h1>
          <p>
            {isChemist 
              ? 'Manage your pharmacy, connect with patients and grow your business with secure PIN verification.' 
              : 'Find nearby pharmacies, get medicines conveniently, and manage your secure health PINs.'}
          </p>

          <div className="banner-features">
            <div className="feature-item">
              <span>{isChemist ? '✓ Verified Drug Licensing' : '📍 Nearby Pharmacies'}</span>
            </div>
            <div className="feature-item">
              <span>{isChemist ? '📦 Smart Inventory Sync' : '💊 Easy Medicine Search'}</span>
            </div>
            <div className="feature-item">
              <span>🔒 Encrypted PIN Security</span>
            </div>
          </div>
        </div>

        <div className="banner-footer">
          <p>© 2026 Pharmacypin. All rights reserved.</p>
        </div>
      </div>

      {/* Right Form Container */}
      <div className="auth-form-container">
        <div className="form-header">
          <div>
            <h2>
              {isLogin 
                ? (isChemist ? 'Welcome Back, Chemist' : 'Welcome Back, Patient') 
                : (isChemist ? 'Create Chemist Account' : 'Create Patient Account')}
            </h2>
            <p className="form-subtitle">
              {isLogin ? 'Enter your credentials to access your portal' : 'Fill in the details below to get started'}
            </p>
          </div>

          {/* Toggle Login vs Sign Up */}
          <div className="tab-toggle">
            <button 
              type="button"
              className={!isLogin ? 'active' : ''} 
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
            <button 
              type="button"
              className={isLogin ? 'active' : ''} 
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
          </div>
        </div>

        {/* Dynamic Form Body */}
        <form onSubmit={(e) => e.preventDefault()} className="actual-form">
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your full name" required />
            </div>
          )}

          {!isLogin && isChemist && (
            <div className="form-group">
              <label>Pharmacy Name</label>
              <input type="text" placeholder="Enter pharmacy business name" required />
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="name@example.com" required />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" placeholder="+91 9876543210" required />
          </div>

          {!isLogin && isChemist && (
            <div className="form-group">
              <label>Drug License Number</label>
              <input type="text" placeholder="e.g. DL-XXXXX-2026" required />
            </div>
          )}

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" required />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="••••••••" required />
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className={`submit-btn ${isChemist ? 'chemist-submit' : 'patient-submit'}`}>
            {isLogin 
              ? 'Login to Account' 
              : (isChemist ? 'Create Chemist Account →' : 'Create Patient Account →')}
          </button>

          {/* Divider */}
          <div className="divider">
            <span>OR</span>
          </div>

          {/* Guest Access Button */}
          <button 
            type="button" 
            className="guest-btn"
            onClick={onGuestAccess}
          >
            Continue as Guest (Explore App) →
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;