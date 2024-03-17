import React from 'react';
import './Header.css'; // ייבוא של קובץ ה-CSS

function Header() {
  return (
    <header className="header">
      <img src="/images/logo.png" alt="Logo" className="logo" />

      <nav>
        <ul className="nav-links">
          <li><a href="/">דף הבית</a></li>
          <li><a href="/about">אודות</a></li>
          <li><a href="/services">שירותים</a></li>
          <li><a href="/contact">צור קשר</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
