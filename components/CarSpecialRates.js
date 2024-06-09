import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/AddForm.module.css'; // נניח שיש לך קובץ CSS Modules מתאים

const CarSpecialRates = ({ categoryId }) => {
  const [specialRates, setSpecialRates] = useState([]);
  const [newRate, setNewRate] = useState({
    rate_name: '',
    start_date: '',
    end_date: '',
    daily_rate: ''
  });

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    if (categoryId) {
      console.log('Fetching special rates for category ID:', categoryId);
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      axios.get(`${apiBaseUrl}/api/carCategories/car-special-rates/${categoryId}`, { headers })
        .then(response => {
          console.log('Special rates fetched:', response.data);
          setSpecialRates(response.data);
        })
        .catch(error => console.error('Error fetching special rates:', error));
    }
  }, [categoryId, apiBaseUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRate(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    console.log('Adding special rate for category ID:', categoryId);
    axios.post(`${apiBaseUrl}/api/carCategories/car-special-rates/${categoryId}`, newRate, { headers })
      .then(response => {
        console.log('Special rate added:', response.data);
        setSpecialRates([...specialRates, response.data]);
        setNewRate({ rate_name: '', start_date: '', end_date: '', daily_rate: '' });
      })
      .catch(error => console.error('Error adding special rate:', error));
  };

  return (
    <div className={styles.section}>
      <h2>תעריפים מיוחדים</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>שם התעריף:</label>
          <input
            type="text"
            name="rate_name"
            value={newRate.rate_name}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>תאריך התחלה:</label>
          <input
            type="date"
            name="start_date"
            value={newRate.start_date}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>תאריך סיום:</label>
          <input
            type="date"
            name="end_date"
            value={newRate.end_date}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>תעריף יומי:</label>
          <input
            type="number"
            name="daily_rate"
            value={newRate.daily_rate}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.submitButton}>הוסף תעריף</button>
      </form>
      <ul className={styles.list}>
        {specialRates.map(rate => (
          <li key={rate.id} className={styles.listItem}>
            {rate.rate_name}: {rate.start_date} - {rate.end_date} ({rate.daily_rate} ש"ח ליום)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarSpecialRates;
