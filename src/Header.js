import React from 'react';
import { Link } from 'react-router-dom'; // ייבוא של הקישור

import './Header.css'; // ייבוא של קובץ ה-CSS



function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo-link"> {/* הוספת קישור סביב הלוגו */}
        <img src="https://www.hoshencar.co.il/app/web/upload/medium/logo-2492-1697054780.png" alt="Logo" className="logo" />
      </Link>

      <div className="header-search">
        <input type="text" placeholder="חיפוש..." />
        <span><i className="fas fa-search"></i></span>
      </div>

      <div className="header-icons"> {/* תיבת אייקונים */}
        <i className="fas fa-user icon"></i> {/* Font Awesome User icon */}
        <i className="fas fa-cog icon"></i>  {/* Font Awesome Cog icon */}
        <i className="fas fa-envelope icon"></i>  {/* Font Awesome Envelope icon */}
      </div>
    </header>
  );
}

export default Header;
