import React, { useState } from 'react';
import RoleSelector from './components/auth/RoleSelector/RoleSelector';
import AuthForm from './components/auth/AuthForm/AuthForm';
import AuthModal from './components/auth/AuthModal/AuthModal';
import './App.css';

function App() {
  // currentView: 'role-selection', 'auth-form', 'guest-dashboard', 'chemist-dashboard', 'patient-dashboard'
  const [currentView, setCurrentView] = useState('role-selection');
  const [selectedRole, setSelectedRole] = useState(null);
  
  // State for Modal control (if triggering from headers/landing pages)
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle Role Selected from RoleSelector Component
  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setCurrentView('auth-form');
  };

  // Back to Role Selection
  const handleBackToRoles = () => {
    setSelectedRole(null);
    setCurrentView('role-selection');
  };

  // Handle Guest Flow
  const handleGuestAccess = () => {
    setCurrentView('guest-dashboard');
  };

  return (
    <div className="app-container">
      {/* 1. ROLE SELECTION SCREEN */}
      {currentView === 'role-selection' && (
        <RoleSelector 
          onSelectRole={handleSelectRole} 
          onGuestAccess={handleGuestAccess} 
        />
      )}

      {/* 2. AUTH FORM SCREEN */}
      {currentView === 'auth-form' && (
        <AuthForm 
          role={selectedRole} 
          onBack={handleBackToRoles} 
          onGuestAccess={handleGuestAccess} 
        />
      )}

      {/* 3. DUMMY DASHBOARD VIEW (Guest / Logged In State) */}
      {(currentView === 'guest-dashboard' || currentView === 'dashboard') && (
        <div className="dashboard-preview">
          <header className="dash-header">
            <h2 className="dash-title">Pharmacypin Preview</h2>
            <div className="dash-actions">
              <span className="badge">
                {currentView === 'guest-dashboard' ? 'Guest Mode' : `${selectedRole} Account`}
              </span>
              <button className="open-modal-btn" onClick={() => setIsModalOpen(true)}>
                Login / Switch Account
              </button>
              <button className="reset-btn" onClick={handleBackToRoles}>
                Exit Preview
              </button>
            </div>
          </header>

          <main className="dash-content">
            <h3>Welcome to Pharmacypin! 👋</h3>
            <p>
              {currentView === 'guest-dashboard' 
                ? 'Aap Guest User ke tarah platform explore kar rahe hain. Complete features ke liye Login/Sign Up karein.' 
                : `Logged in as ${selectedRole}.`}
            </p>
          </main>
        </div>
      )}

      {/* GLOBAL AUTH MODAL COMPONENT */}
      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default App;