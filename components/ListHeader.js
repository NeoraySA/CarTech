import React from 'react';

function ListHeader({ title, subtitle, buttons = [] }) {
  return (
    <div className="section-bar-header">
      <div className="section-bar-header-right">
        <div className="section-bar-header-right-title"><b>{title || 'רכבים'}</b></div>
        <div className="section-bar-header-right-info">{subtitle || 'רשימת הרכבים במערכת'}</div>
      </div>

      <div className="section-bar-header-left">
        <div className="buttons-container">
          {buttons.map((button, index) => (
            <button key={index} className="custom-button" onClick={button.onClick}>
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListHeader;
