import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

function CarSelector({ value, onChange, filters }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    async function fetchCars() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('האסימון אינו נמצא באחסון המקומי');
        return;
      }
      setLoading(true);
      try {
        let query = `${apiUrl}/api/cars`;
        if (filters) {
          const filterParams = [];
          if (filters.available) {
            filterParams.push(`is_available=${filters.available}`);
          }
          if (filters.statusId) {
            filterParams.push(`status_id=${filters.statusId}`);
          }
          if (filterParams.length > 0) {
            query += `?${filterParams.join('&')}`;
          }
        }
        console.log('שולח בקשה אל:', query);
        const response = await axios.get(query, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('תגובה:', response);
        if (response.status === 200 && Array.isArray(response.data)) {
          const carOptions = response.data.map(car => ({
            value: car.id,
            label: `${car.license_number} | ${car.make} ${car.model} | ${car.color}`,
            car // שמירת כל פרטי הרכב
          }));
          setCars(carOptions);
        } else {
          throw new Error('תגובה לא תקינה');
        }
      } catch (error) {
        console.error('נכשל בשליפת רכבים:', error);
        console.error('פרטי השגיאה:', error.response ? error.response.data : 'אין נתוני תגובה');
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [apiUrl, filters]);

  return (
    <Select
      value={cars.find(option => option.value === value)}
      options={cars}
      onChange={option => {
        console.log('נבחר רכב:', option);
        onChange(option.value, option.car);
      }}
      placeholder="בחר רכב..."
      noOptionsMessage={() => 'לא נמצאו תוצאות'}
      isLoading={loading}
    />
  );
}

export default CarSelector;
