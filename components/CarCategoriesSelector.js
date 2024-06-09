import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

function CarCategoriesSelector({ onChange }) {
  const [categories, setCategories] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    async function fetchCategories() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token not found in localStorage');
        return;
      }
      try {
        const response = await axios.get(`${apiUrl}/api/data/carCategories`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Raw response data:', response.data);  // הדפסת התגובה הגולמית מהשרת
        setCategories(response.data);  // שמירת הנתונים ישירות מהתגובה
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    }

    fetchCategories();
  }, []);  // הפעלת useEffect פעם אחת בלבד עם הרכיב נטען

  console.log('Categories to render in Select:', categories);  // הדפסת הקטגוריות לפני ה-Return

  return (
    <Select required
      options={categories}
      onChange={onChange}
      placeholder="בחר קטגוריה..."
      noOptionsMessage={() => 'לא נמצאו תוצאות'}
      isLoading={!categories.length}
    />
  );
}

export default CarCategoriesSelector;
