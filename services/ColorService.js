// services/ColorService.js
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const getCompanyColors = async (token) => {
  const headers = { Authorization: `Bearer ${token}` };
  console.log('Fetching company colors with headers:', headers);

  try {
    const response = await axios.get(`${apiUrl}/api/colors/companyColors`, { headers });
    console.log('Received company colors response:', response.data);
    
    // צבעים ברירת מחדל במקרה ואין נתונים מהשרת
    const defaultColors = {
      'color_1': '#02112e',
      'color_2': '#f24806',
      'color_3': '#9ac0f9',
      'color_4': '#fec0aa',
      'color_5': '#063e04',
      'black_color': '#000000',
      'white_color': '#ffffff'
    };

    return response.data || defaultColors;
  } catch (error) {
    console.error('Error fetching company colors:', error);
    return defaultColors;
  }
};

export const updateCompanyColors = async (token, colors) => {
  const headers = { Authorization: `Bearer ${token}` };
  console.log('Updating company colors with headers:', headers, 'and colors:', colors);

  try {
    const response = await axios.put(`${apiUrl}/api/colors/companyColors`, colors, { headers });
    console.log('Company colors updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating company colors:', error);
    throw error;
  }
};
