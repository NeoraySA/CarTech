import React, { useState } from 'react';
import axios from 'axios';
import CarCategoriesSelector from './CarCategoriesSelector';
import Notification from './Notification';

import styles from '../styles/AddForm.module.css'; // וודא שהנתיב נכון

function AddCarForm({ companyId }) {
  const [carDetails, setCarDetails] = useState({
    licenseNumber: '',
    make: '',
    model: '',
    year: '',
    color: '',
    transmissionType: 'אוטומט',
    fuelType: '',
    passenger: '',
    kmToNextService: '',
    testDate: '',
    category: '',
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '', onConfirm: null });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleCategoryChange = (selectedOption) => {
    setCarDetails(prevDetails => ({
      ...prevDetails,
      category: selectedOption ? selectedOption.value : ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotification({
      message: 'האם אתה בטוח שברצונך להוסיף את הרכב?',
      type: 'info',
      onConfirm: confirmAddCar
    });
  };

  const confirmAddCar = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const token = localStorage.getItem('token');
    setNotification({ message: 'מוסיף רכב...', type: 'info' });
    try {
      const response = await axios.post(`${apiUrl}/api/cars`, carDetails, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 201) {
        setNotification({ message: 'הרכב נוסף בהצלחה!', type: 'success', onConfirm: null });
      }
    } catch (error) {
      console.error('Failed to add the car:', error);
      setNotification({ message: 'הוספת הרכב נכשלה!', type: 'error', onConfirm: null });
    }
  };

  const fetchCarDetails = async () => {
    setLoading(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${apiUrl}/api/transportMinistryData/vehicle/${carDetails.licenseNumber}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data) {
        const record = response.data;
        setCarDetails(prevDetails => ({
          ...prevDetails,
          make: record.tozar,
          model: record.kinuy_mishari,
          year: record.shnat_yitzur,
          color: record.tzeva_rechev,
          fuelType: record.sug_delek_nm,
          testDate: record.tokef_dt,
          passenger: record.mispar_moshavim
        }));
        setNotification({ message: 'פרטי הרכב התקבלו בהצלחה!', type: 'success', onConfirm: null });
      }
    } catch (error) {
      console.error('Error fetching car details:', error);
      setNotification({ message: 'שגיאה בקבלת פרטי הרכב', type: 'error', onConfirm: null });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '', onConfirm: null })}
        onConfirm={notification.onConfirm}
      />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <div className={styles.formGroup}>
            <label className={styles.label}>מספר רישוי:</label>
            <input className={styles.input} type="text" name="licenseNumber" value={carDetails.licenseNumber} onChange={handleInputChange} required />
            <button type="button" className={styles.linkButton} onClick={fetchCarDetails} disabled={!/^\d{7,8}$/.test(carDetails.licenseNumber)}>
              קבלת פרטי הרכב ממשרד התחבורה {loading && <span className={styles.loader}></span>}
            </button>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>יצרן:</label>
            <input className={styles.input} type="text" name="make" value={carDetails.make} onChange={handleInputChange} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>דגם:</label>
            <input className={styles.input} type="text" name="model" value={carDetails.model} onChange={handleInputChange} required />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.formGroup}>
            <label className={styles.label}>שנת יצור:</label>
            <input className={styles.input} type="number" name="year" value={carDetails.year} onChange={handleInputChange} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>צבע:</label>
            <input className={styles.input} type="text" name="color" value={carDetails.color} onChange={handleInputChange} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>סוג הילוכים:</label>
            <input className={styles.input} type="text" name="transmissionType" value={carDetails.transmissionType} onChange={handleInputChange} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>סוג דלק:</label>
            <input className={styles.input} type="text" name="fuelType" value={carDetails.fuelType} onChange={handleInputChange} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>מספר נוסעים:</label>
            <input className={styles.input} type="number" name="passenger" value={carDetails.passenger} onChange={handleInputChange} required />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.formGroup}>
            <label className={styles.label}>תאריך טסט:</label>
            <input className={styles.input} type="date" name="testDate" value={carDetails.testDate} onChange={handleInputChange} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>ק"מ לטיפול הבא:</label>
            <input className={styles.input} type="number" name="kmToNextService" value={carDetails.kmToNextService} onChange={handleInputChange} required />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.formGroup}>
            <label className={styles.label}>קטגוריה:</label>
            <CarCategoriesSelector companyId={companyId} onChange={handleCategoryChange} required />
          </div>
        </div>  

        <button type="submit" className={styles.submitButton}>הוסף רכב</button>
      </form>
    </div>
  );
}

export default AddCarForm;
