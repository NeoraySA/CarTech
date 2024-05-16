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
        console.log('CompanyId or BranchId is missing');
        return;
      }
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token not found in localStorage');
        return;
      }
      setLoading(true);
      try {
        let query = `${apiUrl}/api/cars?companyId=${companyId}&branchId=${branchId}`;
        if (filters && filters.available) {
          query += `&is_available=${filters.available}`; // התאמה לשם השדה בטבלה
        }
        const response = await axios.get(query, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.status === 200 && Array.isArray(response.data)) {
          const carOptions = response.data.map(car => ({
            value: car.id,
            label: `${car.make} ${car.model} (${car.year})`
          }));
          setCars(carOptions);
        } else {
          throw new Error('Invalid response');
        }
      } catch (error) {
        console.error('Failed to fetch cars:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [apiUrl, filters]); // תלויות כוללות את הפילטרים כדי להבטיח עדכון בשינויים

  return (
    <Select
      options={cars}
      onChange={onChange}
      placeholder="בחר רכב..."
      noOptionsMessage={() => 'לא נמצאו תוצאות'}
      isLoading={loading}
    />
  );
}

export default CarSelector;
