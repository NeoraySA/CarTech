import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faUsers, faCalendarAlt, faHandshake, faBook, faCog, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const links = [
    { name: "דשבורד", icon: faBook, path: "/dashboard" },
    { name: "הוספת לקוח", icon: faUsers, path: "/addCustomer" },
    { name: "מידע על רכב", icon: faCar, path: "/vehicleInfo" },
    // רשימת הקישורים נמשכת...
  ];

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : "close"}`}>
      <div className="sidebar-content">
        {links.map(({ name, icon, path }, index) => (
          <a key={index} href={path} className="sidebar-link">
            <FontAwesomeIcon icon={icon} />
            <span>{name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
