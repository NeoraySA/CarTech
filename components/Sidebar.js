import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { categoriesConfig } from '../src/pagesConfig';

const userDemo = {
  name: "לוי רחמים",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTardcKgEVE-N-mq7NhQhs3HPWdHlMQNnW3Jc75QRG--z8ilTk2P699__-2xCZKSev0wlE&usqp=CAU",
};

function Sidebar({ isSidebarOpen }) {
  const [openCategories, setOpenCategories] = useState({});

  const toggleCategory = (name) => {
    setOpenCategories((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : "close"}`}>
      <div className="sidebar-header">
        <h2>חושן קאר</h2>
        <p>סניף בני ברק</p>
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
                  <Link key={name} href={path}>
                    {name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <img src={userDemo.image} alt="User" className="user-image" />
        <span>{userDemo.name}</span>
      </div>
    </div>
  );
}

export default Sidebar;
