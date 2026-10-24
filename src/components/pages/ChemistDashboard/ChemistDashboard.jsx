import React, { useState } from 'react';
// import AddMedicineModal from '../../components/common/AddMedicineModal/AddMedicineModal';
import AddMedicineModal from '../../chemist/AddMedicineModal';
import ExpiryAlertCard from '../../chemist/ExpiryAlertCard';
import LiveRequestCard from '../../chemist/LiveRequestCard';
import './ChemistDashboard.css';

const ChemistDashboard = ({ onLogout }) => {
  const [pinInput, setPinInput] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // 👈 Modal open/close state

  // Mock list of active patient queue items
  const [pendingOrders, setPendingOrders] = useState([
    {
      id: 'ORD-1092',
      patient: 'Rahul Sharma',
      items: 'Azithromycin 500mg (1 Strip)',
      time: '10 mins ago',
      status: 'Pending Verification',
      verified: false,
    },
    {
      id: 'ORD-1091',
      patient: 'Priya Verma',
      items: 'CetriZet 10mg, Metformin 500mg',
      time: '25 mins ago',
      status: 'Ready for Dispense',
      verified: true,
    },
  ]);

  const handleVerifyPin = (e) => {
    e.preventDefault();
    if (pinInput.trim().length !== 4) {
      setVerificationResult({
        success: false,
        message: 'Enter 4-digit numeric security PIN.',
      });
      return;
    }

    if (pinInput === '8492' || pinInput === '1234') {
      setVerificationResult({
        success: true,
        patientName: 'Amit Kumar',
        medicines: ['Paracetamol 500mg (10 tabs)', 'Amoxicillin 250mg (6 caps)'],
        pin: pinInput,
      });
    } else {
      setVerificationResult({
        success: false,
        message: 'PIN not found or already redeemed.',
      });
    }
  };

  const handleClearVerification = () => {
    setPinInput('');
    setVerificationResult(null);
  };

  const handleApproveOrder = (orderId) => {
    setPendingOrders((prev) => {
      return prev.map((order) => {
        if (order.id === orderId) {
          return { ...order, status: 'Dispensed', verified: true };
        }
        return order;
      });
    });
  };

  const handleAddMedicine = (newMed) => {
    console.log('New Medicine Batch Added:', newMed);
  };

  return (
    <div className="chemist-dashboard">
      <header className="chemist-navbar">
        <div className="nav-brand">
          <img src="/logo.png" alt="Pharmacypin Logo" className="dash-logo" />
          <span className="brand-name">Pharmacypin</span>
          <span className="chemist-badge">Chemist Workspace</span>
        </div>

        <div className="nav-actions">
          <button 
            type="button"
            className={`status-toggle-btn ${isStoreOpen ? 'open' : 'closed'}`}
            onClick={() => setIsStoreOpen(!isStoreOpen)}
          >
            <span className="status-dot"></span>
            {isStoreOpen ? 'Counter Active' : 'Counter Offline'}
          </button>
          
          <button type="button" className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-container">
        {/* Metric Cards */}
        <section className="stats-grid">
          <div className="stat-card">
            <span className="stat-icon">📦</span>
            <div>
              <h3>{pendingOrders.length + 22}</h3>
              <p>Total Counter Orders</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">⏳</span>
            <div>
              <h3>{pendingOrders.filter((o) => !o.verified).length}</h3>
              <p>Unverified PINs</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">💊</span>
            <div>
              <h3>142</h3>
              <p>Active Inventory SKUs</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">₹</span>
            <div>
              <h3>4,850</h3>
              <p>Daily Settlement</p>
            </div>
          </div>
        </section>

        {/* Action Panel */}
        <div className="chemist-main-grid">
          {/* PIN Verification Desk */}
          <div className="dash-card pin-verifier-card">
            <div className="card-header">
              <h2>Redeem Patient PIN</h2>
            </div>
            <p className="card-desc">
              Validate patient OTP/PIN received at counter to unlock digital prescription details.
            </p>

            <form onSubmit={handleVerifyPin} className="pin-form">
              <input
                type="text"
                maxLength="4"
                placeholder="4-Digit PIN"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                className="pin-input"
              />
              <button type="submit" className="verify-btn">Verify</button>
            </form>

            {verificationResult && (
              <div className={`verification-box ${verificationResult.success ? 'success' : 'error'}`}>
                {verificationResult.success ? (
                  <div>
                    <div className="result-header">✓ Record Matched</div>
                    <p><strong>Patient:</strong> {verificationResult.patientName}</p>
                    <p><strong>Prescription:</strong> {verificationResult.medicines.join(', ')}</p>
                    <div className="result-actions">
                      <button 
                        type="button" 
                        className="complete-order-btn"
                        onClick={handleClearVerification}
                      >
                        Confirm & Release Inventory
                      </button>
                      <button 
                        type="button" 
                        className="cancel-btn"
                        onClick={handleClearVerification}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="result-header">❌ {verificationResult.message}</div>
                    <button 
                      type="button" 
                      className="retry-btn"
                      onClick={handleClearVerification}
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Direct Tools */}
          <div className="dash-card quick-actions-card">
            <div className="card-header">
              <h2>Inventory Controls</h2>
            </div>
            <div className="chemist-action-btns">
              <button 
                type="button" 
                className="action-tile"
                onClick={() => setIsAddModalOpen(true)} // 👈 Opens Add Medicine Modal
              >
                <span className="tile-icon">➕</span>
                <span>Update Stock Batch</span>
              </button>
              <button type="button" className="action-tile">
                <span className="tile-icon">📋</span>
                <span>View Full Catalog</span>
              </button>
              <button type="button" className="action-tile">
                <span className="tile-icon">📜</span>
                <span>DL Registry #DL-2026-99</span>
              </button>
            </div>
          </div>
        </div>

        {/* Counter Orders Queue */}
        <section className="dash-card orders-section">
          <div className="card-header">
            <h2>Incoming Counter Orders</h2>
          </div>
          
          <div className="orders-table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Patient Name</th>
                  <th>Requested Medicines</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="font-bold">{order.id}</td>
                    <td>{order.patient}</td>
                    <td>{order.items}</td>
                    <td className="text-muted">{order.time}</td>
                    <td>
                      <span className={`status-badge ${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      {order.status !== 'Dispensed' ? (
                        <button 
                          type="button"
                          className="table-action-btn"
                          onClick={() => handleApproveOrder(order.id)}
                        >
                          Process
                        </button>
                      ) : (
                        <span className="done-text">✓ Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Render Add Medicine Modal */}
      <AddMedicineModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAddMedicine={handleAddMedicine} 
      />
    </div>
  );
};

export default ChemistDashboard;