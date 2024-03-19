import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faUsers, faCalendarAlt, faHandshake, faBook, faCog, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import './Sidebar.css';

function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const links = [
    { name: "דשבורד", icon: faBook, path: "/dashboard" },
    { name: "הוספת לקוח", icon: faUsers, path: "/addCustomer" },
    { name: "מידע על רכב", icon: faCar, path: "/vehicleInfo" },
    { name: "לקוחות", icon: faUsers, path: "/clients" },
    { name: "רכבים", icon: faCar, path: "/cars" },
    { name: "השכרות", icon: faCalendarAlt, path: "/rentals" },
    { name: "מכירות", icon: faHandshake, path: "/sales" },
    { name: "חשבונאות", icon: faBook, path: "/accounting" },
    { name: "הגדרות", icon: faCog, path: "/settings" },
  ];

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : "close"}`}>
      <div className="sidebar-content">
        {links.map(({ name, icon, path }, index) => (
          <a key={index} href={path} className="sidebar-link">
            <FontAwesomeIcon icon={icon} />
            {isSidebarOpen && <span>{name}</span>}
          </a>
        ))}
      </div>
      <button onClick={toggleSidebar} className="sidebar-toggle">
        {isSidebarOpen ? <FontAwesomeIcon icon={faChevronLeft} /> : <FontAwesomeIcon icon={faChevronRight} />}
      </button>
    </div>
  );
}

export default Sidebar;
