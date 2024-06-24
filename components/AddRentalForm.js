import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomerSelector from './CustomerSelector';
import styles from '../styles/AddForm.module.css';

function AddRentalForm({ onSubmit }) {
  const [rentalDetails, setRentalDetails] = useState({
    customer_id: '',
    start_date: new Date(),
    estimated_return: new Date(),
    is_new_driver: false,
    is_young_driver: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRentalDetails(prevDetails => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDateChange = (name, date) => {
    setRentalDetails(prevDetails => ({
      ...prevDetails,
      [name]: date
    }));
  };

  const handleCustomerChange = (customer) => {
    setRentalDetails(prevDetails => ({
      ...prevDetails,
      customer_id: customer.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      customer_id: rentalDetails.customer_id,
      startDate: rentalDetails.start_date.toISOString(),
      endDate: rentalDetails.estimated_return.toISOString(),
      isNewDriver: rentalDetails.is_new_driver,
      isYoungDriver: rentalDetails.is_young_driver,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.section}>
        <div className={styles.formGroup}>
          <label className={styles.label}>בחירת לקוח:</label>
          <CustomerSelector onChange={handleCustomerChange} />
        </div>
      </div>
      <div className={styles.section}>
        <h2>תאריכים</h2>
        <div className={styles.formGroup}>
          <label className={styles.label}>תאריך איסוף:</label>
          <DatePicker
            selected={rentalDetails.start_date}
            onChange={(date) => handleDateChange('start_date', date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm"
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>תאריך החזרה משוער:</label>
          <DatePicker
            selected={rentalDetails.estimated_return}
            onChange={(date) => handleDateChange('estimated_return', date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm"
            className={styles.input}
          />
        </div>
      </div>
      <div className={styles.section}>
        <h2>נהג</h2>
        <div className={styles.formGroup}>
          <label className={styles.label}>נהג חדש:</label>
          <input
            type="checkbox"
            name="is_new_driver"
            checked={rentalDetails.is_new_driver}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>נהג צעיר:</label>
          <input
            type="checkbox"
            name="is_young_driver"
            checked={rentalDetails.is_young_driver}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className={styles.container}>
        <button type="submit" className={styles.submitButton}>הבא</button>
      </div>
    </form>
  );
}

export default AddRentalForm;
