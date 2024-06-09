import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalComponent from './ModalComponent';
import CarSelector from './CarSelector';
import CustomerSelector from './CustomerSelector';
import FuelLevelSelector from './FuelLevelSelector';
import BillingBasisSelector from './BillingBasisSelector';
import styles from '../styles/DetailsPage.module.css';

function RentalDetails({ rentalId }) {
  const [rentalDetails, setRentalDetails] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '', onConfirm: null });
  const [isCarModalOpen, setIsCarModalOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);
  const [isFuelPickupModalOpen, setIsFuelPickupModalOpen] = useState(false);
  const [isFuelReturnModalOpen, setIsFuelReturnModalOpen] = useState(false);

  useEffect(() => {
    async function fetchRentalDetails() {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${apiUrl}/api/rentals/${rentalId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.status === 200) {
          console.log('נתוני ההשכרה שהתקבלו:', response.data);
          const rentalData = response.data.rental;
          rentalData.start_date = rentalData.start_date ? new Date(rentalData.start_date) : null;
          rentalData.end_date = rentalData.end_date ? new Date(rentalData.end_date) : null;
          rentalData.estimated_return = rentalData.estimated_return ? new Date(rentalData.estimated_return) : null;
          setRentalDetails(rentalData);
        } else {
          throw new Error('Failed to fetch rental details');
        }
      } catch (error) {
        console.error('Error fetching rental details:', error);
        setNotification({ message: 'Failed to fetch rental details', type: 'error' });
      }
    }

    fetchRentalDetails();
  }, [rentalId]);

  const handleCarChange = (carId, car) => {
    console.log('רכב שנבחר:', car);
    setRentalDetails(prevDetails => ({
      ...prevDetails,
      car_id: carId,
      car
    }));
    setIsCarModalOpen(false); // סגור את המודל לאחר בחירת הרכב
  };

  const handleCustomerChange = (customer) => {
    console.log('לקוח שנבחר:', customer);
    setRentalDetails(prevDetails => ({
      ...prevDetails,
      customer_id: customer.value,
      customer
    }));
    setIsCustomerModalOpen(false); // סגור את המודל לאחר בחירת הלקוח
  };

  const handleFuelPickupChange = (selectedOption) => {
    console.log('רמת דלק באיסוף שנבחרה:', selectedOption);
    setRentalDetails(prevDetails => ({
      ...prevDetails,
      fuel_pickup: selectedOption ? selectedOption.value : ''
    }));
    setIsFuelPickupModalOpen(false); // סגור את המודל לאחר בחירת הדלק
  };

  const handleFuelReturnChange = (selectedOption) => {
    console.log('רמת דלק בהחזרה שנבחרה:', selectedOption);
    setRentalDetails(prevDetails => ({
      ...prevDetails,
      fuel_return: selectedOption ? selectedOption.value : ''
    }));
    setIsFuelReturnModalOpen(false); // סגור את המודל לאחר בחירת הדלק
  };

  const handleBillingBasisChange = (selectedOption) => {
    console.log('בסיס חיוב שנבחר:', selectedOption);
    setRentalDetails(prevDetails => ({
      ...prevDetails,
      billing_basis_id: selectedOption ? selectedOption.value : ''
    }));
    setIsBillingModalOpen(false); // סגור את המודל לאחר בחירת בסיס החיוב
  };

  if (!rentalDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: '', onConfirm: null })}
          onConfirm={notification.onConfirm}
        />
      )}
      <div className={styles.form}>
        <div className={styles.section}>
          <div className={styles.formGroup}>
            <label className={styles.label}>פרטי רכב:</label>
            {rentalDetails.car_license_number && (
              <div>
                <p>מס' רישוי: {rentalDetails.car_license_number}</p>
                <p>יצרן ודגם: {rentalDetails.car_make} {rentalDetails.car_model}</p>
                <p>צבע: {rentalDetails.car_color}</p>
              </div>
            )}
            <button type="button" className={styles.linkButton} onClick={() => setIsCarModalOpen(true)}>שנה רכב</button>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.formGroup}>
            <label className={styles.label}>פרטי לקוח:</label>
            {rentalDetails.customer_full_name && (
              <div>
                <p>תעודת זהות: {rentalDetails.customer_id_number}</p>
                <p>שם מלא: {rentalDetails.customer_full_name}</p>
                <p>פלאפון: {rentalDetails.customer_phone}</p>
                <p>כתובת: {rentalDetails.customer_address}</p>
              </div>
            )}
            <button type="button" className={styles.linkButton} onClick={() => setIsCustomerModalOpen(true)}>שנה לקוח</button>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.formGroup}>
            <label className={styles.label}>בסיס חיוב:</label>
            <p>{rentalDetails.billing_basis_name}</p>
            <button type="button" className={styles.linkButton} onClick={() => setIsBillingModalOpen(true)}>שנה בסיס חיוב</button>
          </div>
        
        </div>
        
        
       
      </div>
      <ModalComponent isOpen={isCarModalOpen} onClose={() => setIsCarModalOpen(false)} title="בחר רכב">
        <CarSelector onChange={handleCarChange} filters={{ available: 1, statusId: 1 }} />
      </ModalComponent>
      <ModalComponent isOpen={isCustomerModalOpen} onClose={() => setIsCustomerModalOpen(false)} title="בחר לקוח">
        <CustomerSelector onChange={handleCustomerChange} filters={{ isActive: 1 }} />
      </ModalComponent>
      <ModalComponent isOpen={isBillingModalOpen} onClose={() => setIsBillingModalOpen(false)} title="בחר בסיס חיוב">
        <BillingBasisSelector onChange={handleBillingBasisChange} />
      </ModalComponent>
      <ModalComponent isOpen={isFuelPickupModalOpen} onClose={() => setIsFuelPickupModalOpen(false)} title="בחר דלק באיסוף">
        <FuelLevelSelector mode="pickup" onChange={handleFuelPickupChange} />
      </ModalComponent>
      <ModalComponent isOpen={isFuelReturnModalOpen} onClose={() => setIsFuelReturnModalOpen(false)} title="בחר דלק בהחזרה">
        <FuelLevelSelector mode="return" onChange={handleFuelReturnChange} />
      </ModalComponent>
    </div>
  );
}

export default RentalDetails;
