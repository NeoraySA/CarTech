import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const { settings, loading: settingsLoading } = useSettings();

  const [rentalDetails, setRentalDetails] = useState({
    order_id: '',
    car_id: '',
    customer_id: '',
    start_date: new Date(),
    status: '1',
    estimated_return: new Date(),
    billing_basis_id: '',
    current_km: '',
    current_fuel_level: ''
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatedDetails, setCalculatedDetails] = useState(null);
  const [carDetails, setCarDetails] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '', onConfirm: null });

  useEffect(() => {
    const fetchCalculation = async () => {
      if (rentalDetails.start_date && rentalDetails.estimated_return && rentalDetails.car_id && rentalDetails.billing_basis_id && !isCalculating) {
        setIsCalculating(true);
        try {
          await onSummaryChange(rentalDetails.start_date, rentalDetails.estimated_return, rentalDetails.car_id, rentalDetails.billing_basis_id)
            .then(data => {
              if (data) {
                setCalculatedDetails(data);
              } else {
                console.error('Failed to receive calculation data');
              }
            });
        } catch (error) {
          console.error('Error fetching calculation data:', error);
        } finally {
          setIsCalculating(false);
        }
      }
    };

    fetchCalculation();
  }, [rentalDetails.start_date, rentalDetails.estimated_return, rentalDetails.car_id, rentalDetails.billing_basis_id, onSummaryChange]);

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
    const contractIssuer = localStorage.getItem('user_id');

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
      contract_issuer: contractIssuer,
      km_pickup: rentalDetails.current_km,
      fuel_pickup: rentalDetails.current_fuel_level,

      km_limit_per_unit: calculatedDetails.kmLimitPerUnit,
      km_units: calculatedDetails.kmCalculationDays,

      price_per_km: calculatedDetails.extraKmPrice,
      traffic_fee: calculatedDetails.trafficFee,
      toll_fee: calculatedDetails.tollFee
    };

    try {
      const response = await axios.post(`${apiUrl}/api/rentals`, rentalData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 201) {
        setNotification({ message: 'ההשכרה נוספה בהצלחה!', type: 'success' });
        router.push(`/rentals/${response.data.rental_id}`);
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
    </div>
  );
}

export default AddRentalForm;

// פונקציה לעיצוב תאריך לפורמט MySQL
function formatDateForMySQL(date) {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  the_hours = ('0' + date.getHours()).slice(-2);
  the_minutes = ('0' + date.getMinutes()).slice(-2);
  the_seconds = ('0' + date.getSeconds()).slice(-2);
  return `${year}-${month}-${day} ${the_hours}:${the_minutes}:${the_seconds}`;
}
