import React, { useState } from 'react';

const AddMedicineModal = ({ isOpen, onClose, onAddMedicine }) => {
  const [medicineData, setMedicineData] = useState({
    name: '',
    salt: '',
    batchNo: '',
    quantity: '',
    expiryDate: '',
    price: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setMedicineData({ ...medicineData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddMedicine) {
      onAddMedicine(medicineData);
    }
    setMedicineData({
      name: '',
      salt: '',
      batchNo: '',
      quantity: '',
      expiryDate: '',
      price: '',
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Embedded CSS directly inside JSX */}
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .modal-content.add-med-modal {
          background: #ffffff;
          width: 100%;
          max-width: 520px;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          animation: modalSlideIn 0.25s ease-out;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .modal-header h2 {
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .close-modal-btn {
          background: none;
          border: none;
          font-size: 24px;
          color: #64748b;
          cursor: pointer;
          line-height: 1;
        }

        .close-modal-btn:hover {
          color: #0f172a;
        }

        .modal-desc {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 20px;
          margin-top: 0;
        }

        .add-med-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-size: 13px;
          font-weight: 700;
          color: #334155;
        }

        .form-group input {
          padding: 12px 16px;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          color: #0f172a;
          background-color: #f8fafc;
          outline: none;
          transition: all 0.2s ease;
        }

        .form-group input:focus {
          background-color: #ffffff;
          border-color: #0284c7;
          box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          margin-top: 10px;
        }

        .cancel-btn {
          flex: 1;
          background: #f1f5f9;
          border: none;
          color: #475569;
          padding: 12px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .cancel-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        .submit-btn.chemist-submit {
          flex: 1;
          background-color: #0284c7;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          padding: 12px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }

        .submit-btn.chemist-submit:hover {
          background-color: #0369a1;
        }
      `}</style>

      <div className="modal-content add-med-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Medicine to Stock</h2>
          <button type="button" className="close-modal-btn" onClick={onClose}>×</button>
        </div>
        <p className="modal-desc">Enter stock details to update your active pharmacy inventory.</p>

        <form onSubmit={handleSubmit} className="add-med-form">
          <div className="form-group">
            <label>Medicine Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Paracetamol 500mg"
              value={medicineData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Salt / Formula</label>
            <input
              type="text"
              name="salt"
              required
              placeholder="e.g. Acetaminophen"
              value={medicineData.salt}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Batch Number</label>
              <input
                type="text"
                name="batchNo"
                required
                placeholder="e.g. BATCH-9921"
                value={medicineData.batchNo}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Quantity (Units)</label>
              <input
                type="number"
                name="quantity"
                required
                placeholder="e.g. 100"
                value={medicineData.quantity}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="date"
                name="expiryDate"
                required
                value={medicineData.expiryDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Price per Unit (₹)</label>
              <input
                type="number"
                name="price"
                required
                placeholder="e.g. 45"
                value={medicineData.price}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn chemist-submit">
              Save & Add to Inventory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicineModal;