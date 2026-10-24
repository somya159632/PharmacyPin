import React from 'react';
import RoleSelector from '../RoleSelector/RoleSelector';
import AuthForm from '../AuthForm/AuthForm';
import './AuthContainer.css';


const AuthContainer = ({
  currentView,
  selectedRole,
  onSelectRole,
  onBackToRoles,
  onGuestAccess,
  onAuthSuccess, // 👈 Missing prop added here
}) => {
  return (
    <div className="auth-container-wrapper">
      {/* 1. ROLE SELECTION SCREEN */}
      {currentView === 'role-selection' && (
        <RoleSelector
          onSelectRole={onSelectRole}
          onGuestAccess={onGuestAccess}
        />
      )}

      {/* 2. DYNAMIC AUTH FORM SCREEN */}
      {currentView === 'auth-form' && (
        <AuthForm
          role={selectedRole}
          onBack={onBackToRoles}
          onGuestAccess={onGuestAccess}
          onAuthSuccess={onAuthSuccess} // 👈 Forwarded to AuthForm
        />
      )}
    </div>
  );
};

export default AuthContainer;