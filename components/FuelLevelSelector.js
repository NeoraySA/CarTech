import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function FuelLevelSelector({ mode, value, onChange }) {
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
    <div>
      {mode === 'pickup' && (
        <div>
          <Select
            value={fuelLevels.find(option => option.value === value)}
            options={fuelLevels}
            isLoading={loading}
            placeholder="בחר רמת דלק באיסוף"
            noOptionsMessage={() => 'לא נמצאו רמות דלק'}
            onChange={onChange}
          />
        </div>
      )}
      {mode === 'return' && (
        <div>
          <Select
            value={fuelLevels.find(option => option.value === value)}
            options={fuelLevels}
            isLoading={loading}
            placeholder="בחר רמת דלק בהחזרה"
            noOptionsMessage={() => 'לא נמצאו רמות דלק'}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );
}

export default FuelLevelSelector;
