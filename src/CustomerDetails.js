import React from 'react';
import './CustomerDetails.css'; // ייבוא של קובץ ה-CSS

function CustomerDetails({ customer }) {
  // משתנים דמויינים עבור פרטי הלקוח
  const customerData = {
    name: "דוד כהן",
    email: "david@example.com",
    phone: "054-1234567",
    address: "רחוב הרצל 1, תל אביב"
  };

  return (
    <div className="customer-details-container">
      <h2 className="customer-details-title">פרטי הלקוח</h2>
      <div className="customer-details">
        <div className="detail">
          <span className="detail-label">שם:</span>
          <span className="detail-value">{customerData.name}</span>
        </div>
        <div className="detail">
          <span className="detail-label">אימייל:</span>
          <span className="detail-value">{customerData.email}</span>
        </div>
        <div className="detail">
          <span className="detail-label">טלפון:</span>
          <span className="detail-value">{customerData.phone}</span>
        </div>
        <div className="detail">
          <span className="detail-label">כתובת:</span>
          <span className="detail-value">{customerData.address}</span>
        </div>
        {/* נוסיף כאן עוד פרטים לפי הצורך */}
      </div>
    </div>
  );
}

export default CustomerDetails;
