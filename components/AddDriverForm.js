import React, { useState } from 'react';
import styles from '../styles/AddDriverForm.module.css';

const AddDriverForm = ({ customerId, token, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    license_number: '',
    license_expiry: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/${customerId}/drivers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // הוסף את הטוקן מפרופס
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to add driver');
      }

      const result = await response.json();
      onSave(result);
      onClose();
    } catch (error) {
      console.error('Failed to add driver', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="first_name">שם פרטי</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="last_name">שם משפחה</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="license_number">מספר רישיון נהיגה</label>
        <input
          type="text"
          id="license_number"
          name="license_number"
          value={formData.license_number}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="license_expiry">תוקף רישיון</label>
        <input
          type="date"
          id="license_expiry"
          name="license_expiry"
          value={formData.license_expiry}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="phone">מספר טלפון</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button type="submit" className={styles.saveButton}>שמור</button>
        <button type="button" onClick={onClose} className={styles.cancelButton}>בטל</button>
      </div>
    </form>
  );
};

export default AddDriverForm;
