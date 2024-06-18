// services/customerService.js
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function fetchCustomerDetails(id, token) {
    try {
        const response = await axios.get(`${apiUrl}/api/customers/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching customer details:', error);
        throw new Error('Failed to fetch customer details');
    }
}

export async function updateCustomerDetails(id, updatedDetails, token) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedDetails)
      });
  
      if (!response.ok) {
        throw new Error('Failed to update customer details');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error updating customer details:', error);
      throw error;
    }
  }
  