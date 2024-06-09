import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import DriverSelector from './DriverSelector';
import axios from 'axios';
import styles from '../styles/ModalComponent.module.css';

const DriverRentalSelector = ({ rentalId, customerId, onClose }) => {
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [isPrimaryDriver, setIsPrimaryDriver] = useState(false); // נהג ראשי
  const [notes, setNotes] = useState('');

  const handleSaveClick = async () => {
    console.log('Attempting to save driver...');
    console.log('Selected Driver:', selectedDriver ? selectedDriver.label : 'None selected'); // Show more descriptive info
    console.log('From Date:', fromDate.toISOString());
    console.log('To Date:', toDate.toISOString());
    console.log('Notes:', notes);
    console.log('Is Primary Driver:', isPrimaryDriver);

    if (!selectedDriver) {
      console.error('No driver selected');
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const token = localStorage.getItem('token');

    // Format dates to 'YYYY-MM-DD' for MySQL compatibility
    const formattedFromDate = fromDate.toISOString().split('T')[0];
    const formattedToDate = toDate.toISOString().split('T')[0];

    try {
      const postData = {
        driver_id: selectedDriver.value,
        rental_id: rentalId,
        start_date: formattedFromDate,
        end_date: formattedToDate,
        is_primary_driver: isPrimaryDriver,
        notes
      };

      console.log('Sending data to server:', postData);

      const response = await axios.post(`${apiUrl}/api/rentals/${rentalId}/drivers`, postData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('Response from server:', response);
      if (response.status === 201) {
        console.log('Driver added successfully:', response.data);
        onClose(); // Close the modal after success
      } else {
        console.error('Failed to add driver - Status Code:', response.status);
      }
    } catch (error) {
      console.error('Error adding driver:', error);
    }
  };

  return (
    <div>
      <div className={styles.inputField}>
        <label>נהג:</label>
        <DriverSelector
          value={selectedDriver}
          onChange={setSelectedDriver}
          customerId={customerId}
          classNamePrefix="react-select" /* Ensure class names are applied correctly */
        />
      </div>
      <div className={styles.inputField}>
        <label>תאריך התחלה:</label>
        <DatePicker selected={fromDate} onChange={date => setFromDate(date)} />
      </div>
      <div className={styles.inputField}>
        <label>תאריך סיום:</label>
        <DatePicker selected={toDate} onChange={date => setToDate(date)} />
      </div>
      <div className={styles.inputField}>
        <label>נהג ראשי:</label>
        <input
          type="checkbox"
          checked={isPrimaryDriver}
          onChange={() => setIsPrimaryDriver(!isPrimaryDriver)}
          className={styles.checkbox}
        />
      </div>
      <div className={styles.inputField}>
        <label>הערות:</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="הערות" />
      </div>
      <button onClick={handleSaveClick} className={styles.confirmButton}>הוסף נהג</button>
    </div>
  );
};

export default DriverRentalSelector;
