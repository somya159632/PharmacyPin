import React from 'react';

const ExpiryAlertCard = ({ expiredItems = [] }) => {
  // Mock data if no items are passed as props
  const items = expiredItems.length > 0 ? expiredItems : [
    { id: 1, name: 'Amoxicillin 250mg', batch: 'AMX-109', expiry: '2026-11-15', status: 'Expiring Soon' },
    { id: 2, name: 'Pantoprazole 40mg', batch: 'PAN-882', expiry: '2026-10-28', status: 'Critical' },
  ];

  return (
    <div className="expiry-alert-card">
      {/* Embedded CSS directly inside JSX */}
      <style>{`
        .expiry-alert-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid #fee2e2;
          box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.05);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .expiry-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .expiry-header h3 {
          font-size: 18px;
          font-weight: 700;
          color: #991b1b;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .expiry-badge {
          background: #fee2e2;
          color: #dc2626;
          font-size: 12px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
        }

        .expiry-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .expiry-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #fff5f5;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid #fecaca;
          transition: transform 0.2s;
        }

        .expiry-item:hover {
          border-color: #fca5a5;
        }

        .expiry-info h4 {
          font-size: 14px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 4px 0;
        }

        .expiry-info p {
          font-size: 12px;
          color: #64748b;
          margin: 0;
        }

        .action-clearance-btn {
          background: #dc2626;
          color: #ffffff;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .action-clearance-btn:hover {
          background: #b91c1c;
        }
      `}</style>

      <div className="expiry-header">
        <h3>⚠️ Expiry Alerts</h3>
        <span className="expiry-badge">{items.length} Items At Risk</span>
      </div>

      <div className="expiry-list">
        {items.map((item) => (
          <div className="expiry-item" key={item.id}>
            <div className="expiry-info">
              <h4>{item.name}</h4>
              <p>
                Batch: <strong>{item.batch}</strong> • Expiry:{' '}
                <span style={{ color: '#dc2626', fontWeight: 600 }}>{item.expiry}</span>
              </p>
            </div>
            <button 
              type="button" 
              className="action-clearance-btn" 
              onClick={() => alert(`Batch ${item.batch} marked for clearance sale.`)}
            >
              Clearance
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpiryAlertCard;