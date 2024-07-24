import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

const RateTypeSelector = ({ selectedValue, onChange }) => {
  const [rateTypes, setRateTypes] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    const fetchRateTypes = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token not found in localStorage');
        return;
      }
      try {
        const response = await axios.get(`${apiUrl}/api/data/rateTypes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRateTypes(response.data);
      } catch (error) {
        console.error('Failed to fetch rate types:', error);
      }
    };

    fetchRateTypes();
  }, []);

  const options = rateTypes.map((type) => ({
    value: type.value,
    label: type.label,
  }));

  return (
    <Select
      value={options.find((option) => option.value === selectedValue)}
      onChange={onChange}
      options={options}
      placeholder="בחר סוג תעריף..."
      noOptionsMessage={() => 'לא נמצאו תוצאות'}
    />
  );
};

export default RateTypeSelector;
