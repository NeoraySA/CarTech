import React, { useState, useEffect } from 'react';
import CarAvailabilityTable from '../components/CarAvailabilityTable';

const CarAvailabilityPage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const exampleCars = [
      { id: 1, name: 'טויוטה קורולה', category: 'קומפקט', bookings: [
        { startDate: '2024-06-10T09:00', endDate: '2024-06-19T19:00', status: 'מוזמן' },
        { startDate: '2024-06-19T08:00', endDate: '2024-06-21T17:00', status: 'מושכר' }
      ] },
      { id: 2, name: 'הונדה סיוויק', category: 'סדאן', bookings: [
        { startDate: '2024-06-10T10:00', endDate: '2024-06-12T14:00', status: 'חסום' },
        { startDate: '2024-06-14T13:00', endDate: '2024-06-16T20:00', status: 'מושכר' }
      ] },
      { id: 3, name: 'הונדה סיוויק', category: 'סדאן', bookings: [] 
        
      },
      // כלל הרכבים כמו שצוין
    ];
    setCars(exampleCars);
  }, []);

  return (
    <div>
      <CarAvailabilityTable cars={cars} />
    </div>
  );
};

export default CarAvailabilityPage;
