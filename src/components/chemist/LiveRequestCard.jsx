import React, { useState } from 'react';

const LiveRequestCard = ({ onProcessOrder }) => {
  const [liveQueue, setLiveQueue] = useState([
    { id: 'REQ-501', patient: 'Neha Sharma', medicine: 'Paracetamol 650mg', time: '2 mins ago', status: 'Waiting' },
    { id: 'REQ-502', patient: 'Aman Gupta', medicine: 'Insulin Glargine', time: '5 mins ago', status: 'Waiting' },
  ]);

  const handleProcess = (id) => {
    setLiveQueue(prev => prev.filter(req => req.id !== id));
    if (onProcessOrder) onProcessOrder(id);
  };

  return (
    <div className="live-request-card">
      <style>{`
        .live-request-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .live-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .live-header h3 {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .live-pulse-badge {
          background: #dcfce7;
          color: #16a34a;
          font-size: 12px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background-color: #16a34a;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(22, 163, 74, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); }
        }

        .live-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .live-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f8fafc;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .live-info h4 {
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 4px 0;
        }

        .live-info p {
          font-size: 12px;
          color: #64748b;
          margin: 0;
        }

        .accept-btn {
          background: #0284c7;
          color: #ffffff;
          border: none;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .accept-btn:hover {
          background: #0369a1;
        }

        .empty-live {
          text-align: center;
          color: #94a3b8;
          font-size: 14px;
          padding: 20px 0;
        }
      `}</style>

      <div className="live-header">
        <h3>🔴 Live Patient Requests</h3>
        <div className="live-pulse-badge">
          <span className="pulse-dot"></span> Real-time Sync
        </div>
      </div>

      <div className="live-list">
        {liveQueue.length > 0 ? (
          liveQueue.map((req) => (
            <div className="live-item" key={req.id}>
              <div className="live-info">
                <h4>{req.patient} • <span style={{ color: '#0284c7' }}>{req.medicine}</span></h4>
                <p>Request ID: {req.id} • {req.time}</p>
              </div>
              <button type="button" className="accept-btn" onClick={() => handleProcess(req.id)}>
                Accept & Dispense
              </button>
            </div>
          ))
        ) : (
          <div className="empty-live">No active requests right now. Counter is clear!</div>
        )}
      </div>
    </div>
  );
};

export default LiveRequestCard;