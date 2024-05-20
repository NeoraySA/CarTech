import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

function CarSelector({ onChange, filters }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    async function fetchCars() {
      const companyId = localStorage.getItem('company_id');
      const branchId = localStorage.getItem('branch_id');
      if (!companyId || !branchId) {
        console.log('חסר מזהה חברה או מזהה סניף');
        return;
      }
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('האסימון אינו נמצא באחסון המקומי');
        return;
      }
      setLoading(true);
      try {
        let query = `${apiUrl}/api/cars?company_id=${companyId}&branch_id=${branchId}`;
        if (filters) {
          if (filters.available) {
            query += `&is_available=${filters.available}`;
          }
          if (filters.statusId) {
            query += `&status_id=${filters.statusId}`;
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
            current_km: car.current_km,
            current_fuel_level: car.current_fuel_level
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
      options={cars}
      onChange={option => onChange(option.value, option.current_km, option.current_fuel_level)}
      placeholder="בחר רכב..."
      noOptionsMessage={() => 'לא נמצאו תוצאות'}
      isLoading={loading}
    />
  );
}

export default CarSelector;
