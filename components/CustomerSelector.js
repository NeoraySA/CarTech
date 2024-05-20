import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

function CustomerSelector({ onChange, filters }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    async function fetchCustomers() {
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
        let query = `${apiUrl}/api/customers?company_id=${companyId}&branch_id=${branchId}`;
        if (filters && filters.isActive) {
          query += `&is_active=${filters.isActive}`;
        }
        console.log('Sending request to:', query); // Log the full query URL
        const response = await axios.get(query, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Response:', response); // Log the response object
        if (response.status === 200 && Array.isArray(response.data)) {
          const customerOptions = response.data.map(customer => ({
            value: customer.customer_id,
            label: `${customer.last_name} ${customer.first_name} | ${customer.id_number}`
          }));
          setCustomers(customerOptions);
        } else {
          throw new Error('Invalid response');
        }
      } catch (error) {
        console.error('Failed to fetch customers:', error);
        console.error('Error details:', error.response ? error.response.data : 'No response data'); // Log the error response if available
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, [apiUrl, filters]); // Add filters to dependencies array

  return (
    <Select
      options={customers}
      onChange={onChange}
      placeholder="בחר לקוח..."
      noOptionsMessage={() => 'לא נמצאו תוצאות'}
      isLoading={loading}
    />
  );
}

export default CustomerSelector;
