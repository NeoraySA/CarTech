import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const getCategoryDetails = async (id, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.get(`${apiUrl}/api/carCategories/${id}`, { headers });
  return response.data;
};

export const updateCategoryDetails = async (categoryDetails, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  await axios.put(`${apiUrl}/api/carCategories/${categoryDetails.category_id}`, categoryDetails, { headers });
};

export const uploadImage = async (imageFile, token) => {
  const formData = new FormData();
  formData.append('file', imageFile);
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.post(`${apiUrl}/upload`, formData, { headers });
  return response.data.filePath; // Assuming the server returns the file path
};

export const getSpecialRates = async (categoryId, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.get(`${apiUrl}/api/carCategories/car-special-rates/${categoryId}`, { headers });
  return response.data;
};

export const saveSpecialRate = async (rateDetails, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  const { id, category_id } = rateDetails;
  const url = id ? `${apiUrl}/api/carCategories/car-special-rates/${id}` : `${apiUrl}/api/carCategories/car-special-rates/${category_id}`;
  const method = id ? 'put' : 'post';
  await axios[method](url, rateDetails, { headers });
};

export const deleteSpecialRate = async (id, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  await axios.delete(`${apiUrl}/api/carCategories/car-special-rates/${id}`, { headers });
};

export const getCars = async (categoryId, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.get(`${apiUrl}/api/cars?category_id=${categoryId}`, { headers });
  return response.data;
};

export const saveCar = async (carDetails, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  const { id } = carDetails;
  const url = id ? `${apiUrl}/api/cars/${id}` : `${apiUrl}/api/cars`;
  const method = id ? 'put' : 'post';
  await axios[method](url, carDetails, { headers });
};

export const deleteCar = async (id, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  await axios.delete(`${apiUrl}/api/cars/${id}`, { headers });
};

export const getCategoryRates = async (categoryId, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.get(`${apiUrl}/api/carCategories/category-rate-details/${categoryId}`, { headers });
  return response.data;
};

export const saveCategoryRate = async (rateDetails, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  const { id, category_id } = rateDetails;
  const url = id ? `${apiUrl}/api/carCategories/category-rate-details/${id}` : `${apiUrl}/api/carCategories/category-rate-details/${category_id}`;
  const method = id ? 'put' : 'post';
  await axios[method](url, rateDetails, { headers });
};

export const deleteCategoryRate = async (id, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  await axios.delete(`${apiUrl}/api/carCategories/category-rate-details/${id}`, { headers });
};
