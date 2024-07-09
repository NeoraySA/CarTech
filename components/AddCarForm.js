import React from 'react';
import CarCategoriesSelector from './CarCategoriesSelector';
import FuelLevelSelector from './FuelLevelSelector';
import styles from '../styles/AddForm.module.css'; // וודא שהנתיב נכון

function AddCarForm({
  carDetails,
  handleInputChange,
  handleCategoryChange,
  handleFuelLevelChange,
  handleImageChange,
  handleSubmit,
  fetchCarDetails,
  loading
}) {
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <div className={styles.formGroup}>
            <label className={styles.label}>מספר רישוי:</label>
            <input className={styles.input} type="text" name="license_number" value={carDetails.license_number} onChange={handleInputChange} required />
            <button type="button" className={styles.linkButton} onClick={fetchCarDetails} disabled={!/^\d{7,8}$/.test(carDetails.license_number)}>
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
          <div className={styles.formGroup}>
            <label className={styles.label}>קטגוריה:</label>
            <CarCategoriesSelector companyId={carDetails.company_id} onChange={handleCategoryChange} required />
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
            <input className={styles.input} type="text" name="transmission_type" value={carDetails.transmission_type} onChange={handleInputChange} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>סוג דלק:</label>
            <input className={styles.input} type="text" name="fuel_type" value={carDetails.fuel_type} onChange={handleInputChange} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>מספר נוסעים:</label>
            <input className={styles.input} type="number" name="passenger" value={carDetails.passenger} onChange={handleInputChange} required />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.formGroup}>
            <label className={styles.label}>תאריך טסט:</label>
            <input className={styles.input} type="date" name="test_date" value={carDetails.test_date} onChange={handleInputChange} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>ק"מ לטיפול הבא:</label>
            <input className={styles.input} type="number" name="km_to_next_service" value={carDetails.km_to_next_service} onChange={handleInputChange} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>ק"מ נוכחי:</label>
            <input className={styles.input} type="number" name="current_km" value={carDetails.current_km} onChange={handleInputChange} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>מד דלק נוכחי:</label>
            <FuelLevelSelector value={carDetails.current_fuel_level} onChange={handleFuelLevelChange} placeholder="בחר רמת דלק נוכחי" />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.formGroup}>
            <label className={styles.label}>תמונה:</label>
            <input className={styles.input} type="file" accept="image/*" onChange={handleImageChange} />
          </div>
        </div>  

        <button type="submit" className={styles.submitButton}>הוסף רכב</button>
      </form>
    </div>
  );
}

export default AddCarForm;
