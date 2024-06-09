import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // ייבוא useRouter
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Notification from './Notification';
import CarSelector from './CarSelector';
import CustomerSelector from './CustomerSelector';
import BillingBasisSelector from './BillingBasisSelector';
import FuelLevelSelector from './FuelLevelSelector';
import { useSettings } from '../context/SettingsContext';
import styles from '../styles/AddForm.module.css';

function AddRentalForm({ companyId, onSummaryChange }) {
  const router = useRouter(); // שימוש ב-useRouter להפניה
  const { settings, loading: settingsLoading } = useSettings();

  const [rentalDetails, setRentalDetails] = useState({
    order_id: '',
    car_id: '',
    customer_id: '',
    start_date: new Date(),
    status: '1',
    estimated_return: '',
    billing_basis_id: '', // שדה לבסיס החיוב
    current_km: '',
    current_fuel_level: ''
  });

  const [carDetails, setCarDetails] = useState(null); // סטייט לפרטי הרכב הנבחר
  const [notification, setNotification] = useState({ message: '', type: '', onConfirm: null });
  const [calculatedDetails, setCalculatedDetails] = useState(null);

  useEffect(() => {
    if (rentalDetails.start_date && rentalDetails.estimated_return && rentalDetails.car_id && rentalDetails.billing_basis_id) {
      calculateRentalDetails(rentalDetails.start_date, rentalDetails.estimated_return);
    }
  }, [rentalDetails.start_date, rentalDetails.estimated_return, rentalDetails.car_id, rentalDetails.billing_basis_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRentalDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleDateChange = (name, date) => {
    setRentalDetails(prevDetails => ({
      ...prevDetails,
      [name]: date
    }));
  };

  const handleCarChange = (carId, car) => {
    setRentalDetails(prevDetails => ({
      ...prevDetails,
      car_id: carId,
      current_km: car.current_km,
      current_fuel_level: car.current_fuel_level
    }));
    setCarDetails(car);
  };

  const handleCustomerChange = (customer) => {
    setRentalDetails(prevDetails => ({
      ...prevDetails,
      customer_id: customer.value
    }));
  };

  const handleBillingBasisChange = (selectedOption) => {
    setRentalDetails(prevDetails => ({
      ...prevDetails,
      billing_basis_id: selectedOption ? selectedOption.value : ''
    }));
  };

  const calculateRentalDetails = async (startDate, estimatedReturn) => {
    if (!startDate || !estimatedReturn) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const token = localStorage.getItem('token');
      const response = await axios.post(`${apiUrl}/api/rentals/calculate`, {
        startDate: startDate.toISOString(),
        endDate: estimatedReturn.toISOString(),
        carId: rentalDetails.car_id,
        billingBasisId: rentalDetails.billing_basis_id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCalculatedDetails(response.data);
    } catch (error) {
      console.error('Error calculating rental details:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotification({
      message: 'האם אתה בטוח שברצונך להוסיף את ההשכרה?',
      type: 'info',
      onConfirm: confirmAddRental
    });
  };

  const confirmAddRental = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const token = localStorage.getItem('token');
    const contractIssuer = localStorage.getItem('user_id'); // הבאת מזהה המשתמש מה-localStorage

    if (!contractIssuer) {
      setNotification({ message: 'משתמש לא מחובר. נא להתחבר מחדש.', type: 'error' });
      return;
    }

    const rentalData = {
      car_id: rentalDetails.car_id,
      customer_id: rentalDetails.customer_id,
      start_date: formatDateForMySQL(rentalDetails.start_date),
      estimated_return: formatDateForMySQL(rentalDetails.estimated_return),
      billing_basis_id: rentalDetails.billing_basis_id,
      contract_issuer: contractIssuer, // הוספת מזהה המשתמש
      km_pickup: rentalDetails.current_km, // הוספת ק"מ נוכחי
      fuel_pickup: rentalDetails.current_fuel_level, // הוספת דלק נוכחי
      km_limit_per_unit: calculatedDetails.kmLimitPerUnit, // הוספת km_limit_per_unit
      km_units: calculatedDetails.kmCalculationDays, // הוספת km_units
      price_per_km: calculatedDetails.extraKmPrice, // הוספת price_per_km
      traffic_fee: calculatedDetails.trafficFee, // הוספת traffic_fee
      toll_fee: calculatedDetails.tollFee // הוספת toll_fee
    };

    try {
      const response = await axios.post(`${apiUrl}/api/rentals`, rentalData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 201) {
        setNotification({ message: 'ההשכרה נוספה בהצלחה!', type: 'success' });
        router.push(`/rentals/${response.data.rental_id}`); // הפניה לדף פרטי ההשכרה
      }
    } catch (error) {
      console.error('נכשל בהוספת ההשכרה:', error);
      setNotification({ message: 'הוספת ההשכרה נכשלה!', type: 'error' });
    }
  };

  if (settingsLoading) {
    return <div>טוען הגדרות...</div>;
  }

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
            <label className={styles.label}>בחירת לקוח:</label>
            <CustomerSelector
              filters={{ isActive: 1 }}
              onChange={handleCustomerChange}
            />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.formGroup}>
            <label className={styles.label}>בחירת רכב:</label>
            <CarSelector
              filters={{ available: 1, statusId: 1 }}
              onChange={handleCarChange}
            />
          </div>
          {carDetails && (
            <div className={styles.carDetails}>
              <p>מס' רישוי: {carDetails.license_number}</p>
              <p>יצרן ודגם: {carDetails.make} {carDetails.model}</p>
              <p>צבע: {carDetails.color}</p>
              <div className={styles.formGroup}>
                <label className={styles.label}>ק"מ נוכחי:</label>
                <input className={styles.input}
                  type="number"
                  name="current_km"
                  value={rentalDetails.current_km}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>דלק נוכחי:</label>
                <FuelLevelSelector
                  value={rentalDetails.current_fuel_level}
                  onChange={(option) => handleInputChange({ target: { name: 'current_fuel_level', value: option.value } })}
                />
              </div>
            </div>
          )}
        </div>
        <div className={styles.section}>
          <div className={styles.formGroup}>
            <label className={styles.label}>בסיס חיוב:</label>
            <BillingBasisSelector
              onChange={handleBillingBasisChange}
            />
          </div>
          <h2>תאריכים</h2>
          <div className={styles.formGroup}>
            <label className={styles.label}>תאריך איסוף:</label>
            <DatePicker required
              selected={rentalDetails.start_date}
              onChange={(date) => handleDateChange('start_date', date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="dd/MM/yyyy HH:mm"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>תאריך החזרה משוער:</label>
            <DatePicker required
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
        <div className={styles.container}>
          <button type="submit" className={styles.submitButton}>הוספת חוזה השכרה</button>
        </div>
      </form>
      {calculatedDetails && (
        <div className={styles.details}>
          <p>סה"כ ימים: {calculatedDetails.totalDays}</p>
          <p>ימי חול: {calculatedDetails.weekdays}</p>
          <p>שבתות וחגים: {calculatedDetails.saturdaysAndHolidays}</p>
          <p>הגבלת ק"מ ליום: {calculatedDetails.kmLimitPerUnit}</p>
          <p>סה"כ ק"מ: {calculatedDetails.totalKmLimit}</p>
          <p>ימים לחישוב ק"מ: {calculatedDetails.kmCalculationDays}</p>
          <p>מחיר לק"מ נוסף: {calculatedDetails.extraKmPrice}</p>
          <p>מחיר כולל: {calculatedDetails.totalPrice}</p>
          <h3>פירוט תעריפים:</h3>
          <ul>
            {calculatedDetails.rateBreakdown.map((rate, index) => (
              <li key={index}>
                {rate.rateType === 'מיוחד' ? `תעריף מיוחד (${rate.rateName})` : rate.rateName}: {rate.dailyRate} ש"ח | כמות: {rate.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AddRentalForm;

// פונקציה לעיצוב תאריך לפורמט MySQL
function formatDateForMySQL(date) {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
