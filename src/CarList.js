import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CarList.css'; // יבוא קובץ ה־CSS

function CarList() {
  const [cars, setCars] = useState([]);

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

  return (
    <div className="car-list-container">
      <header className="section-bar-header">
        <div className="section-bar-header-right">
          <div className="section-bar-header-right-title"><b>רשימת רכבים</b></div>
          <div className="section-bar-header-right-info">| רשימה</div>
        </div>
        <div className='section-bar-header-left'>
          <div className="search-box">
            <label>חיפוש:</label>
            <input type="text" placeholder="חיפוש רכב..." />
          </div>
          <div>
            <a className="ico-section-bar-header" href="#" title="ניקוי חיפוש"></a>
            <a className="ico-section-bar-header" href="#" title="חיפוש"></a>
          </div>
        </div>
      </header>

      <div className="div-table">
        <table className="car-list">
          <thead>
            <tr>
              <th>מס' רישוי</th>
              <th>יצרן</th>
              <th>דגם</th>
              <th>צבע</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={index}>
                <td>{car.license_number}</td>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.color}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="section-bar-footer">
        <div className="section-bar-footer-left">
          <div className="section-bar-footer-left-title">סה"כ רכבים:</div>
          <div className="section-bar-footer-left-info"><b>{cars.length}</b></div>
        </div>
      </footer>
    </div>
  );
}

export default CarList;
