import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

import { pages } from '../src/pagesConfig';

function Header({ toggleSidebar }) {
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

  const handleSuggestionClick = () => {
    setSearchTerm(''); // Resets the search box content
    setSuggestions([]); // Clears the suggestions
  };

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
        {/* Ensure you use FontAwesomeIcon or an equivalent for these icons */}
        <i className="fas fa-user icon"></i>
        <i className="fas fa-cog icon"></i>
        <i className="fas fa-envelope icon"></i>
      </div>
    </header>
  );
}

export default Header;
