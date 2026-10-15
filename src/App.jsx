import React, { useState, useEffect } from 'react';
import RoleSelector from './components/auth/RoleSelector/RoleSelector';
import AuthForm from './components/auth/AuthForm/AuthForm';
import AuthModal from './components/auth/AuthModal/AuthModal';
// import PatientDashboard from './pages/PatientDashboard/PatientDashboard';
// import ChemistDashboard from './pages/ChemistDashboard/ChemistDashboard';
import ChemistDashboard from './components/pages/ChemistDashboard/ChemistDashboard';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('role-selection');
  const [selectedRole, setSelectedRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Custom Navigation function with Browser History (Back button fix)
  const navigateTo = (view, role = selectedRole) => {
    setSelectedRole(role);
    setCurrentView(view);
    window.history.pushState({ view, role }, '');
  };

  // Browser Back/Forward buttons handler
  useEffect(() => {
    window.history.replaceState({ view: 'role-selection', role: null }, '');

    const handlePopState = (event) => {
      if (event.state) {
        setCurrentView(event.state.view || 'role-selection');
        setSelectedRole(event.state.role || null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Role selection
  const handleSelectRole = (role) => {
    navigateTo('auth-form', role);
  };

  // Back to roles screen
  const handleBackToRoles = () => {
    navigateTo('role-selection', null);
  };

  // Guest access mode
  const handleGuestAccess = () => {
    navigateTo('guest-dashboard', selectedRole);
  };

  // Login/Signup completion handler
  const handleAuthSuccess = () => {
    if (selectedRole === 'chemist') {
      navigateTo('chemist-dashboard', selectedRole);
    } else if (selectedRole === 'patient') {
      navigateTo('patient-dashboard', selectedRole);
    } else {
      navigateTo('guest-dashboard', selectedRole);
    }
  };

  // Logout reset handler
  const handleLogout = () => {
    navigateTo('role-selection', null);
  };

  return (
    <div className="app-container">
      {/* 1. Role Selection Screen */}
      {currentView === 'role-selection' && (
        <RoleSelector 
          onSelectRole={handleSelectRole} 
          onGuestAccess={handleGuestAccess} 
        />
      )}

      {/* 2. Authentication Form */}
      {currentView === 'auth-form' && (
        <AuthForm 
          role={selectedRole} 
          onBack={handleBackToRoles} 
          onGuestAccess={handleGuestAccess} 
          onAuthSuccess={handleAuthSuccess}
        />
      )}

      {/* 3. Patient Dashboard View */}
      {currentView === 'patient-dashboard' && (
        <PatientDashboard onLogout={handleLogout} />
      )}

      {/* 4. Chemist Dashboard View */}
      {currentView === 'chemist-dashboard' && (
        <ChemistDashboard onLogout={handleLogout} />
      )}

      {/* 5. Guest Preview Mode */}
      {currentView === 'guest-dashboard' && (
        <div className="dashboard-preview">
          <header className="dash-header">
            <h2 className="dash-title">Pharmacypin Preview</h2>
            <div className="dash-actions">
              <span className="badge">Guest Mode</span>
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
            <p>Guest view mode me hain. Dashboard access ke liye Login karein.</p>
          </main>
        </div>
      )}

      {/* Global Auth Switcher Modal */}
      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSelectRole={handleSelectRole}
      />
    </div>
  );
}

export default App;