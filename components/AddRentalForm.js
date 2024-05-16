import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Notification from './Notification';
import CarSelector from './CarSelector';
import styles from '../styles/AddForm.module.css';

function AddRentalForm({ companyId, onSummaryChange }) {
  const [rentalDetails, setRentalDetails] = useState({
    order_id: '',
    car_id: '',
    customer_id: '',
    start_date: '',
    end_date: '',
    status: '',
    estimated_return: '',
    km_pickup: '',
    fuel_pickup: '',
    pickup_branch: '',
    km_units: '1',
    km_limit_per_unit: '300',
    price_per_km: '1.50',
    additional_km: '',
    custom_km: '',
    toll_fee: '',
    traffic_fee: '',
    contract_issuer: '',
    notes: '',
    print_notes: ''
  });

  const [notification, setNotification] = useState({ message: '', type: '', onConfirm: null });

  // Calculate summary only when relevant details change
  useEffect(() => {
    const calculateSummary = () => {
      const startDate = new Date(rentalDetails.start_date);
      const endDate = new Date(rentalDetails.end_date);
      if (!isNaN(startDate) && !isNaN(endDate) && startDate < endDate) {
        const totalDays = ((endDate - startDate) / (1000 * 60 * 60 * 24)).toFixed(1);
        const totalKmRentalRaw = rentalDetails.km_units * rentalDetails.km_limit_per_unit;
        const totalKmRental = totalKmRentalRaw > 0 ? totalKmRentalRaw.toFixed(0) : '0';
        onSummaryChange({
          totalDays,
          totalKmRental
        });
      }
    };
    calculateSummary();
  }, [rentalDetails.start_date, rentalDetails.end_date, rentalDetails.km_units, rentalDetails.km_limit_per_unit, onSummaryChange]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRentalDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleCarChange = car => {
    setRentalDetails(prevDetails => ({
      ...prevDetails,
      car_id: car.value
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
    setNotification({ message: 'מוסיף השכרה...', type: 'info' });
    try {
      const response = await axios.post(`${apiUrl}/api/rentals`, rentalDetails, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 201) {
        setNotification({ message: 'ההשכרה נוספה בהצלחה!', type: 'success' });
      }
    } catch (error) {
      console.error('Failed to add the rental:', error);
      setNotification({ message: 'הוספת ההשכרה נכשלה!', type: 'error' });
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
            <label className={styles.label}>מספר הזמנה:</label>
            <input className={styles.input} type="text" name="order_id" value={rentalDetails.order_id} onChange={handleInputChange} />
          </div>
          <div className={styles.formGroup}>
    <label className={styles.label}>בחירת רכב:</label>
    <CarSelector 
        companyId={companyId} 
        branchId={rentalDetails.pickup_branch} 
        filters={{ available: true }} // שימוש ב'filters' במקום 'filter'
        onChange={handleCarChange} 
    />
</div>

          <div className={styles.formGroup}>
            <label className={styles.label}>בחירת לקוח:</label>
            <input className={styles.input} type="text" name="customer_id" value={rentalDetails.customer_id} onChange={handleInputChange} required />
          </div>
        </div>

        <div className={styles.section}>
          <h2>תאריכים</h2>
          <div className={styles.formGroup}>
            <label className={styles.label}>תאריך איסוף:</label>
            <input className={styles.input} type="datetime-local" name="start_date" value={rentalDetails.start_date} onChange={handleInputChange} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>תאריך החזרה משוער:</label>
            <input className={styles.input} type="datetime-local" name="estimated_return" value={rentalDetails.estimated_return} onChange={handleInputChange} />
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
            <input className={styles.input} type="text" name="fuel_pickup" value={rentalDetails.fuel_pickup} onChange={handleInputChange} />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>סניף איסוף:</label>
            <input className={styles.input} type="text" name="pickup_branch" value={rentalDetails.pickup_branch} onChange={handleInputChange} />
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
        </div>

        <div className={styles.section}>
          <div className={styles.formGroup}>
            <label className={styles.label}>עמלת נסיעה בכבישי אגרה:</label>
            <input className={styles.input} type="number" name="toll_fee" value={rentalDetails.toll_fee} onChange={handleInputChange} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>עמלת דוחות תעבורה:</label>
            <input className={styles.input} type="number" name="traffic_fee" value={rentalDetails.traffic_fee} onChange={handleInputChange} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>מזהה הנציג שהפיק את החוזה:</label>
            <input className={styles.input} type="text" name="contract_issuer" value={rentalDetails.contract_issuer} onChange={handleInputChange} />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.formGroup}>
            <label className={styles.label}>הערות:</label>
            <textarea className={styles.input} name="notes" value={rentalDetails.notes} onChange={handleInputChange}></textarea>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>הערות להדפסה:</label>
            <textarea className={styles.input} name="print_notes" value={rentalDetails.print_notes} onChange={handleInputChange}></textarea>
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>הוסף השכרה</button>
      </form>
    </div>
  );
}

export default AddRentalForm;
