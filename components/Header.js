import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Header({ toggleSidebar }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      const filteredSuggestions = pages.filter(page =>
        page.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = () => {
    setSearchTerm('');
    setSuggestions([]);
  };

  const handleLogout = (event) => {
    event.preventDefault(); // מניעת הגשת הטופס
    event.stopPropagation(); // מניעת התפשטות האירוע
    console.log("Logout button clicked");  // הדפסה לבדיקה
  
    localStorage.removeItem('token');  // מחיקת הטוקן מהאחסון המקומי
    router.push('/Login');  // הפניה לדף ההתחברות
  };
  
  // בשימוש בקוד הכפתור:
  <button type="button" onClick={handleLogout} className="icon-button">
    <FontAwesomeIcon icon={faSignOutAlt} />
  </button>
  

  return (
    <header className="header">
      <div className='div-menu-toggle'>
        <button onClick={toggleSidebar} className="menu-toggle">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <Link href="/" className="logo-link">
        <img src="/images/logo.png" alt="Logo" className="logo" />
      </Link>
      <div className="header-search">
        <input
          className='header-search-input'
          type="text"
          placeholder="חיפוש..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <span><FontAwesomeIcon icon={faSearch} /></span>
        {suggestions.length > 0 && (
          <div className="search-suggestions">
            {suggestions.map((suggestion, index) => (
              <Link
                key={index}
                href={suggestion.path}
                onClick={handleSuggestionClick}
                className="suggestion"
              >
                <div className="suggestion-content">
                  <span className="icon"></span>
                  <div className="text-content">
                    <div>{suggestion.name}</div>
                    <div className="description">{suggestion.description}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="header-icons">
        <button type="button" onClick={handleLogout} className="icon-button"> {/* ודא שהtype של הכפתור מוגדר כbutton */}
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
        <i className="fas fa-cog icon"></i>
        <i className="fas fa-envelope icon"></i>
      </div>
    </header>
  );
}

export default Header;
