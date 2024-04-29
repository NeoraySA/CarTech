import React from 'react';

import styles from '../styles/DashboardCarCard.module.css';


function DashboardCarCard() {
  // הנחה שפונקציה זו מקבלת מצב נתונים ומחזירה את המידע הנדרש
  const carInfo = {
    totalCars: 120,
    carsInUse: 80,
    availableCars: 40,
  };

  // חישוב האחוזים
  const usedPercentage = Math.round((carInfo.carsInUse / carInfo.totalCars) * 100);
  const availablePercentage = Math.round((carInfo.availableCars / carInfo.totalCars) * 100);

  return (
    <div className="car-card">
      <div className="car-card-content">
        <h3>מידע על הרכבים</h3>
        <p className="percentage">{usedPercentage}%</p>
        <div className="details">
          <p>סה"כ רכבים: {carInfo.totalCars}</p>
          <p>רכבים בשימוש: {carInfo.carsInUse}</p>
          <p>רכבים זמינים: {carInfo.availableCars}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardCarCard;
