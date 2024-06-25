import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomerSelector from './CustomerSelector';
import styles from '../styles/AddForm.module.css';

function AddRentalForm({ rentalDetails, onInputChange, onDateChange, onCustomerChange, onOpenModal, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.section}>
        <div className={styles.formGroup}>
          <label className={styles.label}>בחירת לקוח:</label>
          <CustomerSelector onChange={onCustomerChange} />
        </div>
      </div>
      <div className={styles.section}>
        <h2>תאריכים</h2>
        <div className={styles.formGroup}>
          <label className={styles.label}>תאריך איסוף:</label>
          <DatePicker
            selected={rentalDetails.start_date}
            onChange={(date) => onDateChange('start_date', date)}
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
            onChange={(date) => onDateChange('estimated_return', date)}
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
            onChange={onInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>נהג צעיר:</label>
          <input
            type="checkbox"
            name="is_young_driver"
            checked={rentalDetails.is_young_driver}
            onChange={onInputChange}
          />
        </div>
      </div>
      <div className={styles.section}>
        <h2>בחירת רכב</h2>
        <button type="button" onClick={onOpenModal} className={styles.selectCarButton}>
          בחר רכב
        </button>
        {rentalDetails.selected_car && (
          <div className={styles.selectedCarDetails}>
            <p>רכב נבחר: {rentalDetails.selected_car.make} {rentalDetails.selected_car.model}</p>
          </div>
        )}
      </div>
      <div className={styles.container}>
        <button type="submit" className={styles.submitButton}>הבא</button>
      </div>
    </form>
  );
}

export default AddRentalForm;
