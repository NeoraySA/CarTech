import React, { useState } from 'react';

export default function LinkShortener() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleShortenClick = async () => {
    setError(''); // ניקוי השגיאות הקודמות
    try {
      // השימוש במשתנה הסביבה כדי להתחבר לשרת
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl: url }),
      });
      const data = await response.json();
      if (response.ok) {
        setShortUrl(new URL(data.shortUrl, apiUrl).href); // מסדר את ה-URL המלא
      } else {
        setError(data.error || 'משהו השתבש');
      }
    } catch (error) {
      setError('שגיאת רשת');
    }
  };

  return (
    <div>
      <h1>מקצר קישורים</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="הזן את ה-URL המקורי"
      />
      <button onClick={handleShortenClick}>קצר קישור</button>
      {shortUrl && <p>קישור קצר: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>}
      {error && <p>שגיאה: {error}</p>}
    </div>
  );
}
