import React, { useState, useEffect } from 'react';
import CarAvailabilityCalendar from '../components/CarAvailabilityCalendar';

const CarAvailabilityPage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const exampleCars = [
      { id: 1, name: 'טויוטה קורולה', category: 'קומפקט', bookings: [
        { startDate: '2024-06-15', endDate: '2024-06-18', status: 'מוזמן' },
        { startDate: '2024-06-19', endDate: '2024-06-21', status: 'מושכר' }
      ] },
      { id: 2, name: 'הונדה סיוויק', category: 'סדאן', bookings: [
        { startDate: '2024-06-10', endDate: '2024-06-12', status: 'חסום' },
        { startDate: '2024-06-14', endDate: '2024-06-16', status: 'מושכר' }
      ] },
      { id: 3, name: 'פורד פוקוס', category: 'סדאן', bookings: [
        { startDate: '2024-06-22', endDate: '2024-06-24', status: 'מוזמן' },
        { startDate: '2024-06-25', endDate: '2024-06-30', status: 'חסום' }
      ] },
      { id: 4, name: 'ניסאן מיקרה', category: 'קומפקט', bookings: [
        { startDate: '2024-06-01', endDate: '2024-06-03', status: 'מושכר' },
        { startDate: '2024-06-05', endDate: '2024-06-08', status: 'מוזמן' }
      ] }
    ];
    setCars(exampleCars);
  }, []);

  return (
    <div>
      <CarAvailabilityCalendar cars={cars} />
    </div>
  );
};

export default CarAvailabilityPage;
