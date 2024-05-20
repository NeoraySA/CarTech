import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Notification from './Notification';
import CarSelector from './CarSelector';
import CustomerSelector from './CustomerSelector';
import FuelLevelSelector from './FuelLevelSelector';
import { useSettings } from '../context/SettingsContext';
import { zonedTimeToUtc } from 'date-fns-tz';
import { format } from 'date-fns';
import styles from '../styles/AddForm.module.css';

function AddRentalForm({ companyId, onSummaryChange }) {
  const { settings, loading: settingsLoading } = useSettings();

  const [rentalDetails, setRentalDetails] = useState({
    order_id: '',
    car_id: '',
    customer_id: '',
    start_date: new Date(),
    status: '1',
    estimated_return: '',
    km_pickup: '',
    fuel_pickup: '',
    km_units: '',
    km_limit_per_unit: '',
    price_per_km: '',
    additional_km: '',
    custom_km: '',
    toll_fee: '',
    traffic_fee: '',
    notes: '',
    print_notes: ''
  });

  const [notification, setNotification] = useState({ message: '', type: '', onConfirm: null });

  useEffect(() => {
    if (settings && Object.keys(settings).length > 0) {
      setRentalDetails(prevDetails => ({
        ...prevDetails,
        km_units: settings.km_units || '1',
        km_limit_per_unit: settings.km_limit_per_unit || '300',
        price_per_km: settings.price_per_km || '1.50',
        toll_fee: settings.toll_fee || '',
        traffic_fee: settings.traffic_fee || ''
      }));
    }
  }, [settings]);

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

  const handleFuelLevelChange = (selectedOption) => {
    setRentalDetails(prevDetails => ({
      ...prevDetails,
      fuel_pickup: selectedOption ? selectedOption.value : ''
    }));
    console.log("Selected fuel level:", selectedOption);
  };

  const handleCarChange = (carId, currentKm, currentFuelLevel) => {
    console.log("Car ID:", carId);
    console.log("Current KM:", currentKm);
    console.log("Current Fuel Level:", currentFuelLevel);
    setRentalDetails(prevDetails => ({
      ...prevDetails,
      car_id: carId,
      km_pickup: currentKm,
      fuel_pickup: currentFuelLevel
    }));
  };

  const handleCustomerChange = (customer) => {
    setRentalDetails(prevDetails => ({
      ...prevDetails,
      customer_id: customer.value
    }));
  };

  const formatDateForMySQL = (date) => {
    const timeZone = 'Asia/Jerusalem'; // Change to your local time zone
    const utcDate = zonedTimeToUtc(date, timeZone);
    return format(utcDate, 'yyyy-MM-dd HH:mm:ss');
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
    const branchId = localStorage.getItem('branch_id');
    const companyId = localStorage.getItem('company_id');
    const contractIssuer = localStorage.getItem('user_id');

    if (!contractIssuer) {
      setNotification({ message: 'משתמש לא מחובר. נא להתחבר מחדש.', type: 'error' });
      return;
    }

    const detailsWithAdditionalInfo = {
      ...rentalDetails,
      start_date: formatDateForMySQL(rentalDetails.start_date),
      end_date: rentalDetails.end_date ? formatDateForMySQL(rentalDetails.end_date) : null,
      estimated_return: formatDateForMySQL(rentalDetails.estimated_return),
      pickup_branch: branchId,
      company_id: companyId,
      contract_issuer: contractIssuer
    };

    console.log("Sending data to server:", detailsWithAdditionalInfo);

    setNotification({ message: 'מוסיף השכרה...', type: 'info' });
    try {
      const response = await axios.post(`${apiUrl}/api/rentals`, detailsWithAdditionalInfo, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 201) {
        setNotification({ message: 'ההשכרה נוספה בהצלחה!', type: 'success' });
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
            <p className={styles.instruction}>נא לבחור את הלקוח והרכב הרצויים:</p>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>בחירת לקוח:</label>
            <CustomerSelector
              filters={{ isActive: 1 }}
              onChange={handleCustomerChange}
            />
            
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>בחירת רכב:</label>
            <CarSelector
              filters={{ available: 1, statusId: 1 }}
              onChange={handleCarChange}
            />
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
              required
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
          <h2>נתוני איסוף</h2>
          <div className={styles.formGroup}>
            <label className={styles.label}>מד ק"מ באיסוף:</label>
            <input className={styles.input} type="number" name="km_pickup" value={rentalDetails.km_pickup} onChange={handleInputChange} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>רמת דלק באיסוף:</label>
            <FuelLevelSelector value={rentalDetails.fuel_pickup} onChange={handleFuelLevelChange} />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.formGroup}>
            <label className={styles.label}>יחידות לחישוב ק"מ:</label>
            <input className={styles.input} type="number" name="km_units" value={rentalDetails.km_units} onChange={handleInputChange} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>הגבלת ק"מ לכל יחידת זמן:</label>
            <input className={styles.input} type="number" name="km_limit_per_unit" value={rentalDetails.km_limit_per_unit} onChange={handleInputChange} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>מחיר לק"מ נוסף:</label>
            <input className={styles.input} type="number" name="price_per_km" value={rentalDetails.price_per_km} onChange={handleInputChange} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>תוספת ק"מ ידנית:</label>
            <input className={styles.input} type="number" name="additional_km" value={rentalDetails.additional_km} onChange={handleInputChange} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>ק"מ מותאם אישית:</label>
            <input className={styles.input} type="number" name="custom_km" value={rentalDetails.custom_km} onChange={handleInputChange} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>עמלת נסיעה בכבישי אגרה:</label>
            <input className={styles.input} type="number" name="toll_fee" value={rentalDetails.toll_fee} onChange={handleInputChange} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>עמלת דוחות תעבורה:</label>
            <input className={styles.input} type="number" name="traffic_fee" value={rentalDetails.traffic_fee} onChange={handleInputChange} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>מספר הזמנה:</label>
            <input className={styles.input} type="text" name="order_id" value={rentalDetails.order_id} onChange={handleInputChange} />
          </div>
        </div>
        

        <div className={styles.container}>
          <button type="submit" className={styles.submitButton}>הוסף השכרה</button>
        </div>
      
      </form>
    </div>
  );
}

export default AddRentalForm;
