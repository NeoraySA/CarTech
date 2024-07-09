import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

function GenderSelector({ onChange }) {
  const [genders, setGenders] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    async function fetchGenders() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token not found in localStorage');
        return;
      }
      try {
        const response = await axios.get(`${apiUrl}/api/data/genders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Raw response data:', response.data);  // הדפסת התגובה הגולמית מהשרת
        setGenders(response.data);  // שמירת הנתונים ישירות מהתגובה
      } catch (error) {
        console.error('Failed to fetch genders:', error);
      }
    }

    fetchGenders();
  }, []);  // הפעלת useEffect פעם אחת בלבד עם הרכיב נטען

  console.log('Genders to render in Select:', genders);  // הדפסת המגדרים לפני ה-Return

  return (
    <Select required
      options={genders}
      onChange={onChange}
      placeholder="בחר מגדר..."
      noOptionsMessage={() => 'לא נמצאו תוצאות'}
      isLoading={!genders.length}
    />
  );
}

export default GenderSelector;
