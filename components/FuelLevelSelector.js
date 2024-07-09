import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function FuelLevelSelector({ value, onChange, placeholder }) {
  const [fuelLevels, setFuelLevels] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    async function fetchFuelLevels() {
      setLoading(true);
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${apiUrl}/api/data/fuel_levels`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          const levels = response.data.map(level => ({
            value: level.value,
            label: level.label
          }));
          setFuelLevels(levels);
        } else {
          throw new Error('Failed to fetch fuel levels');
        }
      } catch (error) {
        console.error('Error fetching fuel levels:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFuelLevels();
  }, [apiUrl]);

  return (
    <Select
      value={fuelLevels.find(option => option.value === value)}
      options={fuelLevels}
      isLoading={loading}
      placeholder={placeholder || 'בחר רמת דלק'}
      noOptionsMessage={() => 'לא נמצאו רמות דלק'}
      onChange={onChange}
    />
  );
}

export default FuelLevelSelector;
