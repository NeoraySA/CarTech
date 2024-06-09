import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Header({ toggleSidebar }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [companyLogo, setCompanyLogo] = useState('/images/logo.png'); // לוגו ברירת מחדל
  const router = useRouter();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.company_logo) {
      setCompanyLogo(userData.company_logo);
    }
  }, []);

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
    localStorage.removeItem('user');   // מחיקת פרטי המשתמש מהאחסון המקומי
    router.push('/Login');  // הפניה לדף ההתחברות
  };

  return (
    <header className="header">
      <div className='div-menu-toggle'>
        <button onClick={toggleSidebar} className="menu-toggle">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <Link href="/" className="logo-link">
        <img src={companyLogo} alt="Logo" className="logo" />
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
        <button type="button" onClick={handleLogout} className="icon-button">
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
        <i className="fas fa-cog icon"></i>
        <i className="fas fa-envelope icon"></i>
      </div>
    </header>
  );
}

export default Header;
