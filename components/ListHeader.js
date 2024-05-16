import React from 'react';



function ListHeader({ title, subtitle, showSearchBox = true, filter, setFilter, clearSearch }) {
  return (
    <div className="section-bar-header">
      <div className="section-bar-header-right">
        <div className="section-bar-header-right-title"><b>{title || 'רכבים'}</b></div>
        <div className="section-bar-header-right-info">{subtitle || 'רשימת הרכבים במערכת'}</div>
      </div>

      {showSearchBox && (
        <div className="section-bar-header-left">
          <div className="search-box">
            <input className='input-search-box'
              type="text"
              title="טקסט חיפוש"
              placeholder="חיפוש"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
            <i className="fa fa-times clear-icon" onClick={clearSearch}></i>
          </div>
        </div>
      )}
    </div>
  );
}


export default ListHeader;
