import React from 'react';
import ModalComponent from './ModalComponent';
import CarSelector from './CarSelector';
import CustomerSelector from './CustomerSelector';
import FuelLevelSelector from './FuelLevelSelector';
import BillingBasisSelector from './BillingBasisSelector';
import styles from '../styles/DetailsPage.module.css';

function RentalDetails({
  rentalDetails,
  onCarChange,
  onCustomerChange,
  onFuelPickupChange,
  onFuelReturnChange,
  onBillingBasisChange,
  isCarModalOpen,
  setIsCarModalOpen,
  isCustomerModalOpen,
  setIsCustomerModalOpen,
  isBillingModalOpen,
  setIsBillingModalOpen,
  isFuelPickupModalOpen,
  setIsFuelPickupModalOpen,
  isFuelReturnModalOpen,
  setIsFuelReturnModalOpen
}) {

  if (!rentalDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.section}>
          <div className={styles.formGroup}>
            <label className={styles.label}>פרטי הרכב:</label>
            {rentalDetails.car_license_number && (
              <div>
                <p>מס' רישוי: {rentalDetails.car_license_number}</p>
                <p>יצרן ודגם: {rentalDetails.car_make} {rentalDetails.car_model}</p>
                <p>צבע: {rentalDetails.car_color}</p>
              </div>
            )}
            <button type="button" className={styles.linkButton} onClick={() => setIsCarModalOpen(true)}>שינוי רכב</button>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.formGroup}>
            <label className={styles.label}>פרטי הלקוח:</label>
            {rentalDetails.customer_full_name && (
              <div>
                <p>תעודת זהות: {rentalDetails.customer_id_number}</p>
                <p>שם מלא: {rentalDetails.customer_full_name}</p>
                <p>פלאפון: {rentalDetails.customer_phone}</p>
                <p>כתובת: {rentalDetails.customer_address}</p>
              </div>
            )}
            <button type="button" className={styles.linkButton} onClick={() => setIsCustomerModalOpen(true)}>שינוי לקוח</button>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.formGroup}>
            <label className={styles.label}>בסיס חיוב:</label>
            <p>{rentalDetails.billing_basis_name}</p>
            <button type="button" className={styles.linkButton} onClick={() => setIsBillingModalOpen(true)}>שינוי בסיס חיוב</button>
          </div>
        </div>
      </div>
      <ModalComponent isOpen={isCarModalOpen} onClose={() => setIsCarModalOpen(false)} title="בחר רכב">
        <CarSelector onChange={onCarChange} filters={{ available: 1, statusId: 1 }} />
      </ModalComponent>
      <ModalComponent isOpen={isCustomerModalOpen} onClose={() => setIsCustomerModalOpen(false)} title="בחר לקוח">
        <CustomerSelector onChange={onCustomerChange} filters={{ isActive: 1 }} />
      </ModalComponent>
      <ModalComponent isOpen={isBillingModalOpen} onClose={() => setIsBillingModalOpen(false)} title="בחר בסיס חיוב">
        <BillingBasisSelector onChange={onBillingBasisChange} />
      </ModalComponent>
      <ModalComponent isOpen={isFuelPickupModalOpen} onClose={() => setIsFuelPickupModalOpen(false)} title="בחר דלק באיסוף">
        <FuelLevelSelector mode="pickup" onChange={onFuelPickupChange} />
      </ModalComponent>
      <ModalComponent isOpen={isFuelReturnModalOpen} onClose={() => setIsFuelReturnModalOpen(false)} title="בחר דלק בהחזרה">
        <FuelLevelSelector mode="return" onChange={onFuelReturnChange} />
      </ModalComponent>
    </div>
  );
}

export default RentalDetails;
