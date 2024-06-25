import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ListHeader from '../components/ListHeader';
import SearchDetails from '../components/SearchDetails';
import CarAvailabilityList from '../components/CarAvailabilityList';
import styles from '../styles/Availability.module.css';
import { formatDateTime, formatNumber } from '../utils/formatUtils';

function RentalAvailability() {
  const router = useRouter();
  const { data } = router.query;
  const availabilityData = data ? JSON.parse(data) : { startDate: '', endDate: '', totalDays: 0, saturdays: 0, weekdays: 0, cars: [], driverType: 'ותיק' };

  const [sortOption, setSortOption] = useState('price');

  useEffect(() => {
    document.body.classList.add(styles.boxSizing);
    return () => {
      document.body.classList.remove(styles.boxSizing);
    };
  }, []);

  const handleCarSelection = (carId) => {
    console.log(`Car selected: ${carId}`);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    // כאן תוכל לממש לוגיקת מיון לפי הצורך
  };

  return (
    <div>
      <ListHeader
        title="זמינות רכבים"
        subtitle="רכבים פנויים להשכרה"
        showSearchBox={false}
      />
      <SearchDetails 
        startDate={formatDateTime(availabilityData.startDate)} 
        endDate={formatDateTime(availabilityData.endDate)}
        totalDays={formatNumber(availabilityData.totalDays)}
        saturdays={formatNumber(availabilityData.saturdays)}
        weekdays={formatNumber(availabilityData.weekdays)}
        driverType={availabilityData.driverType}
        sortOption={sortOption} 
        onSortChange={handleSortChange} 
      />
      <div className={styles.container}>
        {availabilityData.cars && availabilityData.cars.length > 0 ? (
          <CarAvailabilityList 
            cars={availabilityData.cars}
            handleCarSelection={handleCarSelection}
          />
        ) : (
          <p>לא נמצאו רכבים זמינים בתאריכים המבוקשים.</p>
        )}
      </div>
    </div>
  );
}

export default RentalAvailability;
