import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faUsers, faCalendarAlt, faHandshake, faBook, faCog, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const [isOpen, setIsOpen] = useState({});

  const toggleSection = (event, key) => {
    event.stopPropagation();
    // בדיקה אם יש פעולות לפני שמנסים לפתוח או לסגור סקציה
    if (categories.find(category => category.key === key).actions.length > 0) {
      setIsOpen(prevState => ({
        ...prevState,
        [key]: !prevState[key]
      }));
    }
  };

  // שימו לב לשינוי במבנה למערך
  const categories = [
    {
      key: 'dashboard',
      name: "דשבורד",
      icon: faBook,
      actions: []
    },
    {
      key: 'clients',
      name: "לקוחות",
      icon: faUsers,
      actions: ["הוספת לקוח", "רשימת לקוחות"]
    },
    {
      key: 'cars',
      name: "רכבים",
      icon: faCar,
      actions: ["הוספת רכב", "רכבים פעילים", "מעקב טיפולים"]
    },
    {
      key: 'rentals',
      name: "השכרות",
      icon: faCalendarAlt,
      actions: ["פתיחת חוזה", "חוזים פתוחים"]
    },
    {
      key: 'sales',
      name: "מכירות",
      icon: faHandshake,
      actions: ["חוזה מכירה"]
    },
    {
      key: 'accounting',
      name: "חשבונאות",
      icon: faBook,
      actions: ["הכנסות", "הוצאות"]
    },
    {
      key: 'settings',
      name: "הגדרות",
      icon: faCog,
      actions: ["משתמשים"]
    }
  ];

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : "close"}`}>
      <div className="sidebar-content">
        {categories.map(({ key, name, icon, actions }) => (
          <div key={key}>
            <div 
              className={`sidebar-section ${isOpen[key] ? "open" : ""}`} 
              onClick={(event) => toggleSection(event, key)}
            >
              <FontAwesomeIcon icon={icon} />
              {isSidebarOpen && <span>{name}</span>}
            </div>
            {isOpen[key] && actions.length > 0 && (
              <div className="sidebar-dropdown-content">
                {actions.map((action, index) => (
                  <a key={index} href={`/${key}/${action.replace(/ /g, "-")}`}>
                    {action}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={toggleSidebar} className="sidebar-toggle">
        {isSidebarOpen ? <FontAwesomeIcon icon={faChevronLeft} /> : <FontAwesomeIcon icon={faChevronRight} />}
      </button>
    </div>
  );
}

export default Sidebar;
