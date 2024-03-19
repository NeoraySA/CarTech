import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import { pages } from './pagesConfig';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

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

  // פונקציה זו תקרא כאשר ישנה לחיצה על הצעה
  const handleSuggestionClick = () => {
    setSearchTerm(''); // איפוס תיבת החיפוש
    setSuggestions([]); // איפוס רשימת ההצעות
  };

  return (
    <header className="header">
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
        <span><i className="fas fa-search"></i></span>
        {suggestions.length > 0 && (
          <div className="search-suggestions">
            {suggestions.map((suggestion, index) => (
              <Link key={index} to={suggestion.path} className="suggestion" onClick={handleSuggestionClick}>
                <div className="suggestion-content">
                  <span className="icon">{suggestion.icon}</span>
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
