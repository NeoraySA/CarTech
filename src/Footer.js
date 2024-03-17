import React from 'react';
import './Footer.css'; // ייבוא של קובץ ה-CSS

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>צור קשר</h3>
        <p>רחוב דוגמא 123, תל אביב</p>
        <p>Email: info@example.com</p>
      </div>
      <div className="footer-section">
        <h3>מידע נוסף</h3>
        <a href="/privacy-policy">מדיניות פרטיות</a>
        <a href="/terms">תנאי שימוש</a>
      </div>
    </footer>
  );
}

export default Footer;
