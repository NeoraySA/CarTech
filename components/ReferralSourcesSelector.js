import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

function ReferralSourcesSelector({ onChange }) {
  const [sources, setSources] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    async function fetchSources() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token not found in localStorage');
        return;
      }
      try {
        const response = await axios.get(`${apiUrl}/api/data/referralSources`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Raw response data:', response.data);  // הדפסת התגובה הגולמית מהשרת
        setSources(response.data);  // שמירת הנתונים ישירות מהתגובה
      } catch (error) {
        console.error('Failed to fetch referral sources:', error);
      }
    }

    fetchSources();
  }, []);  // הפעלת useEffect פעם אחת בלבד עם הרכיב נטען

  console.log('Sources to render in Select:', sources);  // הדפסת המקורות לפני ה-Return

  return (
    <Select required
      options={sources}
      onChange={onChange}
      placeholder="בחר דרכי הגעה..."
      noOptionsMessage={() => 'לא נמצאו תוצאות'}
      isLoading={!sources.length}
    />
  );
}

export default ReferralSourcesSelector;
