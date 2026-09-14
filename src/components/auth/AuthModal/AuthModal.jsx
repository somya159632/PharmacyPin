import React, { useState } from 'react';
import './AuthModal.css';


const AuthModal = ({ isOpen, onClose }) => {
  // role: null (Role Selector), 'chemist', 'patient'
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  if (!isOpen) return null;

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleGuestAccess = () => {
    console.log("Navigating as Guest from Modal...");
    onClose(); // Modal close kar do aur guest ko app access karne do
  };

  const handleBackToRoles = () => {
    setSelectedRole(null);
  };

  const isChemist = selectedRole === 'chemist';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className={`modal-container ${selectedRole ? 'modal-expanded' : ''}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>✕</button>

        {/* STEP 1: ROLE SELECTION SCREEN */}
        {selectedRole === null && (
          <div className="modal-role-content">
            <div className="modal-header">
              <div className="modal-logo">
                <img src="/logo.png" alt="Pharmacypin Logo" className="logo-img" />
                <span className="logo-text">Pharmacypin</span>
              </div>
              <h2>Welcome to Portal</h2>
              <p>Choose your portal to proceed</p>
            </div>

            <div className="modal-role-grid">
              {/* Chemist Card */}
              <div 
                className="modal-role-card chemist-card"
                onClick={() => handleRoleSelect('chemist')}
              >
                <div className="modal-card-icon">👨‍⚕️</div>
                <h3>Chemist</h3>
                <p>Manage pharmacy & orders</p>
                <span className="role-select-btn chemist-select">Continue →</span>
              </div>

              {/* Patient Card */}
              <div 
                className="modal-role-card patient-card"
                onClick={() => handleRoleSelect('patient')}
              >
                <div className="modal-card-icon">👩‍🦰</div>
                <h3>Patient</h3>
                <p>Find medicines & PIN security</p>
                <span className="role-select-btn patient-select">Continue →</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: AUTH FORM (CHEMIST OR PATIENT) */}
        {selectedRole !== null && (
          <div className="modal-form-content">
            <button className="modal-back-btn" onClick={handleBackToRoles}>
              ← Back to Roles
            </button>

            <div className="modal-form-header">
              <div>
                <h2>{isLogin ? `Welcome Back, ${isChemist ? 'Chemist' : 'Patient'}` : `Create ${isChemist ? 'Chemist' : 'Patient'} Account`}</h2>
                <p className="modal-subtitle">Enter details to access your portal</p>
              </div>

              {/* Login / Sign Up Toggle */}
              <div className="modal-tab-toggle">
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

            <form onSubmit={(e) => e.preventDefault()} className="modal-actual-form">
              {!isLogin && (
                <div className="modal-form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Enter full name" required />
                </div>
              )}

              {!isLogin && isChemist && (
                <div className="modal-form-group">
                  <label>Pharmacy Name</label>
                  <input type="text" placeholder="Enter pharmacy name" required />
                </div>
              )}

              <div className="modal-form-group">
                <label>Email Address</label>
                <input type="email" placeholder="name@example.com" required />
              </div>

              <div className="modal-form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="+91 9876543210" required />
              </div>

              {!isLogin && isChemist && (
                <div className="modal-form-group">
                  <label>Drug License Number</label>
                  <input type="text" placeholder="DL-XXXXX-2026" required />
                </div>
              )}

              <div className="modal-form-group">
                <label>Password</label>
                <input type="password" placeholder="••••••••" required />
              </div>

              <button 
                type="submit" 
                className={`modal-submit-btn ${isChemist ? 'chemist-bg' : 'patient-bg'}`}
              >
                {isLogin ? 'Login to Portal' : `Create ${isChemist ? 'Chemist' : 'Patient'} Account`}
              </button>

              <div className="modal-divider"><span>OR</span></div>

              {/* Continue as Guest */}
              <button 
                type="button" 
                className="modal-guest-btn"
                onClick={handleGuestAccess}
              >
                Continue as Guest (Explore App) →
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;