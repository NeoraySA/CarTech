import React, { useState } from 'react';
import styles from '../styles/LinkShortener.module.css';
import ListHeader from '../components/ListHeader';
import LinkTable from '../components/LinkTable';

export default function LinkShortener() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [refreshTable, setRefreshTable] = useState(false);

  const handleShortenClick = async () => {
    setError('');
    try {
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
        setShortUrl(new URL(data.shortUrl, apiUrl).href);
        setRefreshTable(!refreshTable); // Toggle to refresh the table
      } else {
        setError(data.error || 'משהו השתבש');
      }
    } catch (error) {
      setError('שגיאת רשת');
    }
  };

  return (
    <div className={styles.container}>
      <ListHeader
        title="יצירת קישור מקוצר"
        subtitle="ניתן ליצור קישור מקוצר. זה נראה טוב יותר בעין וזה נותן את האפשרות לעקוב אחר לחיצות על הקישור"
        showSearchBox={false}
      />
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="הזן את ה-URL המקורי"
          className={styles.input}
        />
        <button onClick={handleShortenClick} className={styles.button}>קצר קישור</button>
      </div>
      {shortUrl && <p className={styles.linkMessage}>קישור קצר: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>}
      {error && <p className={styles.errorMessage}>שגיאה: {error}</p>}
      <LinkTable apiUrl={process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'} refresh={refreshTable} />
    </div>
  );
}
