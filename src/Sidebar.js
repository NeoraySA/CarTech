import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faUsers, faCalendarAlt, faHandshake, faBook, faCog, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

function Sidebar({ toggleSidebar }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const links = [
    { name: "דשבורד", icon: faBook, path: "/dashboard" },
    { name: "הוספת לקוח", icon: faUsers, path: "/addCustomer" },
    { name: "מידע על רכב", icon: faCar, path: "/vehicleInfo" },
    // רשימת הקישורים נמשכת...
  ];

  const handleMobileToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
    toggleSidebar(); // קריאה לפונקציה toggleSidebar המועברת ב-props
  };

  return (
    <div className={`sidebar ${isMobileSidebarOpen ? "open" : "close"}`}>
      <div className="sidebar-content">
        {links.map(({ name, icon, path }, index) => (
          <a key={index} href={path} className="sidebar-link">
            <FontAwesomeIcon icon={icon} />
            <span>{name}</span>
          </a>
        ))}
      </div>
      <button onClick={handleMobileToggle} className="mobile-sidebar-toggle">
        {isMobileSidebarOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faChevronLeft} />}
      </button>
    </div>
  );
}

export default Sidebar;
