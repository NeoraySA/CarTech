import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

import { pages } from './pagesConfig';

function Header({ toggleSidebar }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      // דוגמה למידע הדמיוני, וודא שיש לך מערך דומה או צור פתרון אחר להצגת הצעות
      const filteredSuggestions = pages.filter(page =>
        page.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <header className="header">
      <button onClick={toggleSidebar} className="menu-toggle">
        <FontAwesomeIcon icon={faBars} />
      </button>
      <Link to="/" className="logo-link">
        <img src="logo.png" alt="Logo" className="logo" />
      </Link>
      <div className="header-search">
        <input
          type="text"
          placeholder="חיפוש..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <span><FontAwesomeIcon icon={faSearch} /></span>
        {suggestions.length > 0 && (
          <div className="search-suggestions">
            {suggestions.map((suggestion, index) => (
              <Link key={index} to={suggestion.path} className="suggestion" onClick={() => setSearchTerm('')}>
                <div className="suggestion-content">
                  <span className="icon">{/* תצוגת אייקון */}</span>
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
        <i className="fas fa-user icon"></i>
        <i className="fas fa-cog icon"></i>
        <i className="fas fa-envelope icon"></i>
      </div>
    </header>
  );
}

export default Header;
