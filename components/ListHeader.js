import React from 'react';
import { useSettings } from '../context/SettingsContext'; // ייבוא useSettings

function ListHeader({ title, subtitle, buttons = [], secondaryButtons = [] }) {
  const { permissions } = useSettings(); // שימוש ב-useSettings כדי לקבל הרשאות

  // פונקציה לבדוק אם יש הרשאה מסוימת
  const hasPermission = (requiredPermissions) => {
    return requiredPermissions.some(permission => permissions.includes(permission));
  };

  return (
    <div className="section-bar-header">
      <div className="section-bar-header-right">
        <div className="section-bar-header-right-title"><b>{title || 'רכבים'}</b></div>
        <div className="section-bar-header-right-info">{subtitle || 'רשימת הרכבים במערכת'}</div>
      </div>

      <div className="section-bar-header-left">
        <div className="buttons-container">
          {buttons.map((button, index) => {
            // אם הכפתור מכיל שדה permissions, נבדוק אם יש הרשאות להצגה
            if (button.permissions && !hasPermission(button.permissions)) {
              return null;
            }
            return (
              <button key={index} className="Button1" onClick={button.onClick}>
                {button.label}
              </button>
            );
          })}
        </div>
        <div className="secondary-buttons-container">
          {secondaryButtons.map((button, index) => {
            // אם הכפתור מכיל שדה permissions, נבדוק אם יש הרשאות להצגה
            if (button.permissions && !hasPermission(button.permissions)) {
              return null;
            }
            return (
              <button key={index} className="Button2" onClick={button.onClick}>
                {button.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ListHeader;
