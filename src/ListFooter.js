import React from 'react';

function ListFooter({ totalCars }) {
  return (
    <div className="section-bar-footer">
      <div className='section-bar-footer-left'>
        <div>סה"כ רכבים: {totalCars}</div>
      </div>
    </div>
  );
}

export default ListFooter;
