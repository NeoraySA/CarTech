import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomerSelector from './CustomerSelector';
import styles from '../styles/AddForm.module.css';
import { formatCurrency, formatLicensePlate } from '../utils/formatUtils';

function AddRentalForm({ rentalDetails, onInputChange, onDateChange, onCustomerChange, onOpenModal, onAddCustomerClick, onSubmit, settings }) {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.section}>
        <h2>פרטי הלקוח:</h2>
        <div className={styles.formGroup}>
          <label className={styles.label}>בחירת לקוח:</label>
          <CustomerSelector onChange={onCustomerChange} />
          <button type="button" className={styles.selectButton} onClick={onAddCustomerClick}>הוסף לקוח חדש</button>
        </div>
        <h2>סוג נהג:</h2>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            <input
              type="checkbox"
              name="is_new_driver"
              checked={rentalDetails.is_new_driver}
              onChange={onInputChange}
              className={styles.checkbox}
            />
            נהג חדש
          </label>
          <div>נא לבחור במידה ולנהג יש וותק נהיגה של פחות משנתיים.</div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            <input
              type="checkbox"
              name="is_young_driver"
              checked={rentalDetails.is_young_driver}
              onChange={onInputChange}
              className={styles.checkbox}
            />
            נהג צעיר
          </label>
          <div>נא לבחור במידה והנהג מתחת לגיל 21.</div>
        </div>
      </div>
      <div className={styles.section}>
        <h2>תאריכי השכרה:</h2>
        <div className={styles.formGroup}>
          <label className={styles.label}>תאריך איסוף:</label>
          <DatePicker
            selected={rentalDetails.pickup_date}
            onChange={(date) => onDateChange('pickup_date', date)}
            dateFormat="dd/MM/yyyy"
            className={styles.input}
          />
          <DatePicker
            selected={rentalDetails.pickup_time}
            onChange={(time) => onDateChange('pickup_time', time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="HH:mm"
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>תאריך החזרה משוער:</label>
          <DatePicker
            selected={rentalDetails.return_date}
            onChange={(date) => onDateChange('return_date', date)}
            dateFormat="dd/MM/yyyy"
            className={styles.input}
          />
          <DatePicker
            selected={rentalDetails.return_time}
            onChange={(time) => onDateChange('return_time', time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="HH:mm"
            className={styles.input}
          />
        </div>
      </div>
      <div className={styles.section}>
        <h2>פרטי הרכב:</h2>
        {rentalDetails.selected_car && (
          <div className={styles.selectedCarDetails}>
            <p>{rentalDetails.selected_car.make} {rentalDetails.selected_car.model}</p>
            <p>{formatLicensePlate(rentalDetails.selected_car.license_number)}</p>
            <div className={styles.priceContainer}>
              <p className={styles.totalPrice}>{formatCurrency(rentalDetails.selected_car.totalPrice)}</p>
            </div>
            <img src={rentalDetails.selected_car.image_url} alt={`${rentalDetails.selected_car.make} ${rentalDetails.selected_car.model}`} className={styles.carImage} />
          </div>
        )}
        <button type="button" onClick={onOpenModal} className={styles.selectButton}>
          בחירת רכב
        </button>
      </div>
      <div className={styles.container}>
        <button type="submit" className={styles.submitButton}>הבא</button>
      </div>
    </form>
  );
}

export default AddRentalForm;
