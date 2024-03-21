import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarTable from './CarTable';
import './CarsList.css';

function CarsList() {
  const [cars, setCars] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await axios.get('http://localhost:3001/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    }
    fetchCars();
  }, []);

  // פונקציה לניקוי תיבת החיפוש
  const clearSearch = () => {
    setFilter("");
  };

  return (
    <div className="car-list-container">
      <div className="section-bar-header">
        <div className="section-bar-header-right">
          <div className="section-bar-header-right-title"><b>רכבים</b></div>
          <div className="section-bar-header-right-info">רשימת הרכבים במערכת</div>
        </div>

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
      </div>
      
      <CarTable className='section-table' data={cars} filter={filter} />

      <div className="section-bar-footer">
        <div className='section-bar-footer-left'>
          <div>סה"כ רכבים: {cars.length}</div>
        </div>
      </div>
    </div>
  );
}

export default CarsList;
