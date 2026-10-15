import React from 'react'
import './RoleSelector.css';

const RoleSelector = ({ onSelectRole }) => {
  return (
    <div className="role-selector-page">
      {/* Header */}
      <header className="role-header">

        <div className="brand-logo">
                    <img src="/logo.png" alt="Pharmacypin Logo" className='logo-img'/>
                <span className="logo-text">Pharmacypin</span>
        </div>
        <div className="header-tagline">Smarter Access | Better Healthcare</div>
      </header>

      {/* Main Content */}
        
         <main className='main-content'>
{/* Main Content */}
      
        <div className="welcome-badge">Welcome to</div>
        <h1 className="main-heading">
          Pharmacypin <span>Portal</span>
        </h1>
        <p className="sub-heading">
          Select your portal to continue to registration or login.
        </p>

        {/* Only 2 Role Cards */}
        <div className="cards-grid">
          {/* Chemist Card */}
          <div className="role-card chemist-card">
            {/* <div className="card-illustration">👨‍⚕️</div>  RoleSelectorLogoChemist.jpg*/}

            <div className="illustration-box chemist-bg">
            <img src="RoleSelectorLogoChemist.jpg" alt="Chemist" className="card-illustration-img" />
          </div>
            <h2>Chemist</h2>
            <p>Manage your pharmacy, connect with patients and grow your business.</p>
            <button 
              className="role-btn chemist-btn"
              onClick={() => onSelectRole('chemist')}
            >
              Continue as Chemist →
            </button>
          </div>

          {/* Patient Card */}
          <div className="role-card patient-card">
            {/* <div className="card-illustration">👩‍🦰</div> */}
            <div className="illustration-box chemist-bg">
            <img src="RoleSelectorLogoPatient.jpg" alt="Chemist" className="card-illustration-img" />
          </div>
            <h2>Patient</h2>
            <p>Find nearby pharmacies, get medicines conveniently, and manage security PINs.</p>
            <button 
              className="role-btn patient-btn"
              onClick={() => onSelectRole('patient')}
            >
              Continue as Patient →
            </button>
          </div>
        </div>
      
         </main>
         {/* footer */}
        <footer className="role-footer">
        <div className="footer-feature">✓ Verified Pharmacies</div>
        <div className="footer-feature">📍 Nearby Locations</div>
        <div className="footer-feature">💚 Better Health for All</div>
      </footer>

    </div>
    
  )
}

export default RoleSelector