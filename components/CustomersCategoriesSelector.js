import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

function CustomersCategoriesSelector({ onChange }) {
  const [categories, setCategories] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'; // קביעת כתובת ה-API

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/data/customersCategories`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // השימוש בטוקן מ-localStorage
          }
        });
        setCategories(response.data); // השימוש ישירות בנתונים מהשרת
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, [apiUrl]); // תלויות useEffect כוללות גם את apiUrl

  return (
    <Select
      options={categories}
      onChange={onChange}
      placeholder="בחר קטגוריה..."
      noOptionsMessage={() => 'לא נמצאו תוצאות'}
      isLoading={!categories.length}
    />
  );
}

export default CustomersCategoriesSelector;
