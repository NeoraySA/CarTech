import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const fetchRentalDetails = async (id, token) => {
  try {
    const response = await axios.get(`${apiUrl}/api/rentals/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch rental details');
  }
};

export const updateRentalDetails = async (id, updatedDetails, token) => {
  try {
    const response = await axios.put(`${apiUrl}/api/rentals/${id}`, updatedDetails, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update rental details');
  }
};

export const calculateRentalDetails = async (startDate, endDate, carId, billingBasisId, token) => {
  try {
    const response = await axios.post(`${apiUrl}/api/rentals/calculate`, {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      carId,
      billingBasisId
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error calculating rental details:', error);
  }
};
