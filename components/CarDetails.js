import React from 'react';

function CarDetails({ car }) {
  return (
    <div>
      <h1>פרטי הרכב</h1>
      <p><strong>מספר רישוי:</strong> {car.license_number}</p>
      <p><strong>יצרן:</strong> {car.make}</p>
      <p><strong>דגם:</strong> {car.model}</p>
      <p><strong>שנת יצור:</strong> {car.year}</p>
      <p><strong>צבע:</strong> {car.color}</p>
      <p><strong>סוג הילוכים:</strong> {car.transmission_type}</p>
      <p><strong>סוג דלק:</strong> {car.fuel_type}</p>
      <p><strong>מספר נוסעים:</strong> {car.passenger}</p>
      <p><strong>ק"מ לטיפול הבא:</strong> {car.km_to_next_service}</p>
      <p><strong>תאריך טסט:</strong> {car.test_date}</p>
    </div>
  );
}

export default CarDetails;
