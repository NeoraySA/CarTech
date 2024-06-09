import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

function BillingBasisSelector({ value, onChange }) {
  const [billingBases, setBillingBases] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    async function fetchBillingBases() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token not found in localStorage');
        return;
      }
      try {
        const response = await axios.get(`${apiUrl}/api/data/billingBasis`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Raw response data:', response.data);
        const billingBasisOptions = response.data.map(basis => ({
          value: basis.value,
          label: basis.label
        }));
        setBillingBases(billingBasisOptions);
      } catch (error) {
        console.error('Failed to fetch billing bases:', error);
      }
    }

    fetchBillingBases();
  }, []);

  console.log('Billing bases to render in Select:', billingBases);

  return (
    <Select
      value={billingBases.find(option => option.value === value)}
      options={billingBases}
      onChange={onChange}
      placeholder="בחר בסיס חיוב..."
      noOptionsMessage={() => 'לא נמצאו תוצאות'}
      isLoading={!billingBases.length}
    />
  );
}

export default BillingBasisSelector;
