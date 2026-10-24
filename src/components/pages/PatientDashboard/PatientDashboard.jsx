import React, { useState } from 'react';
import './PatientDashboard.css';

const PatientDashboard = ({ onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [securityPin, setSecurityPin] = useState('8492');
  const [copied, setCopied] = useState(false);

  // Dummy Pharmacies Data
  const pharmacies = [
    {
      id: 1,
      name: 'Apollo Pharmacy',
      distance: '0.8 km away',
      address: 'Civil Lines, Main Market',
      status: 'Open 24/7',
      rating: '4.8',
    },
    {
      id: 2,
      name: 'MedPlus Chemist',
      distance: '1.4 km away',
      address: 'Station Road, Near Bus Stand',
      status: 'Open (Closes 10 PM)',
      rating: '4.6',
    },
    {
      id: 3,
      name: 'HealthCare Medical Store',
      distance: '2.1 km away',
      address: 'Green Park Avenue',
      status: 'Open (Closes 11 PM)',
      rating: '4.5',
    },
  ];

  // Generate new 4-digit Security PIN
  const handleGeneratePin = () => {
    const newPin = Math.floor(1000 + Math.random() * 9000).toString();
    setSecurityPin(newPin);
    setCopied(false);
  };

  // Copy Security PIN to Clipboard
  const handleCopyPin = () => {
    navigator.clipboard.writeText(securityPin);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="patient-dashboard">
      {/* Top Navbar */}
      <header className="patient-navbar">
        <div className="nav-brand">
          <img src="/logo.png" alt="Pharmacypin Logo" className="dash-logo" />
          <span className="brand-name">Pharmacypin</span>
          <span className="user-role-badge">Patient Workspace</span>
        </div>
        <div className="nav-user">
          <span className="welcome-text">Hello, <strong>Patient</strong></span>
          <button type="button" className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="dashboard-content">
        
        {/* Search Header Banner */}
        <section className="search-banner">
          <h1>Find Medicines & Nearby Pharmacies</h1>
          <p>Connect with verified local chemists using your secure PIN.</p>

          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search medicine name, pharmacy, or salt formula..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="button" className="search-btn">Search</button>
          </div>
        </section>

        {/* Dashboard Grid Sections */}
        <div className="dashboard-grid">
          
          {/* Security PIN Card */}
          <div className="dash-card pin-card">
            <div className="card-header">
              <h3>🔒 Security Verification PIN</h3>
              <span className="info-tag">Share with Chemist</span>
            </div>
            <p className="pin-desc">
              Share this PIN with your chemist at counter checkout to verify your medicine request.
            </p>
            <div className="pin-display-box">
              <span className="pin-number">{securityPin}</span>
              <button type="button" className="copy-btn" onClick={handleCopyPin}>
                {copied ? '✓ Copied' : '📋 Copy PIN'}
              </button>
            </div>
            <button type="button" className="generate-btn" onClick={handleGeneratePin}>
              ↻ Generate New PIN
            </button>
          </div>

          {/* Quick Services Grid */}
          <div className="quick-actions-container">
            <div className="action-card">
              <span className="action-icon">📄</span>
              <div className="action-info">
                <h4>Upload Prescription</h4>
                <p>Send Rx directly to nearby chemists</p>
              </div>
            </div>

            <div className="action-card">
              <span className="action-icon">📦</span>
              <div className="action-info">
                <h4>My Active Requests</h4>
                <p>Track active & past medicine orders</p>
              </div>
            </div>

            <div className="action-card emergency">
              <span className="action-icon">🚨</span>
              <div className="action-info">
                <h4>Emergency Support</h4>
                <p>Locate 24/7 pharmacies instantly</p>
              </div>
            </div>
          </div>

        </div>

        {/* Nearby Pharmacies Section */}
        <section className="pharmacies-section">
          <div className="section-header">
            <h2>Nearby Verified Pharmacies</h2>
            <span className="see-all">View All ({pharmacies.length}) →</span>
          </div>

          <div className="pharmacy-cards-list">
            {pharmacies.map((pharmacy) => (
              <div className="pharmacy-item-card" key={pharmacy.id}>
                <div className="pharmacy-main-info">
                  <div className="pharmacy-avatar">🏥</div>
                  <div>
                    <h3>{pharmacy.name}</h3>
                    <p className="pharmacy-address">📍 {pharmacy.address} • <strong>{pharmacy.distance}</strong></p>
                    <span className="pharmacy-status">{pharmacy.status}</span>
                  </div>
                </div>
                <div className="pharmacy-actions">
                  <span className="rating-badge">⭐ {pharmacy.rating}</span>
                  <button type="button" className="connect-btn">
                    Connect & Send PIN
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default PatientDashboard;