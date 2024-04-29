import React from 'react';

function ListFooter({ title, content }) {
  return (
    <div className="section-bar-footer">
      <div className='section-bar-footer-left'>
        <div className="footer-title">{title}</div>
        {/* הוספת תגית span לתוכן */}
        <span className="footer-content">{content}</span>
      </div>
    </div>
  );
}

export default ListFooter;
