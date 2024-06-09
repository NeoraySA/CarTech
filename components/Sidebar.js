import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { categoriesConfig } from '../src/pagesConfig';

function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const [openCategories, setOpenCategories] = useState({});
  const [user, setUser] = useState({ name: '', image: '', companyName: '', branchName: '' });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser({
        name: userData.user_name || 'שם לא זמין',
        image: userData.profile_image_url || 'https://via.placeholder.com/150',
        companyName: userData.company_name || 'שם החברה לא זמין',
        branchName: userData.branch_name || 'סניף לא זמין'
      });
    }
  }, []);

  const toggleCategory = (name) => {
    setOpenCategories((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : "close"}`}>
      <div className="sidebar-header">
        <h2>{user.companyName}</h2>
        <p>סניף {user.branchName}</p>
      </div>

      <div className="sidebar-content">
        {categoriesConfig.map(({ name, icon, items }) => (
          <div key={name}>
            <a className="sidebar-link" onClick={() => toggleCategory(name)}>
              <FontAwesomeIcon icon={icon} className="sidebar-icon" />
              <span>{name}</span>
              <FontAwesomeIcon icon={openCategories[name] ? faChevronUp : faChevronDown} className="sidebar-chevron" />
            </a>
            {openCategories[name] && (
              <div className="sidebar-sublinks">
                {items.map(({ name, path }) => (
                  <Link key={name} href={path} onClick={toggleSidebar}>
                    {name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <img src={user.image} alt="User" className="user-image" />
        <span>{user.name}</span>
      </div>
    </div>
  );
}

export default Sidebar;
