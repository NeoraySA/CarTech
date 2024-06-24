import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ListHeader from '../components/ListHeader';
import SearchDetails from '../components/SearchDetails';
import styles from '../styles/Availability.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faGasPump, faCalendarAlt, faPalette } from '@fortawesome/free-solid-svg-icons';
import { formatNumber, formatCurrency, formatLicensePlate, formatDateTime, formatDateOnly } from '../utils/formatUtils';

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
          <ul className={styles.carList}>
            {availabilityData.cars.map((car, index) => (
              <li key={index} className={styles.carItem}>
                <div className={styles.carInfo}>
                  <div className={styles.carTopInfo}>
                    <div className={styles.carTopInfoRow}>
                      <div className={styles.carTopInfoRight}>
                        <span className={styles.carName}>{car.make} {car.model}</span>
                      </div>
                      <div className={styles.licensePlate}>{formatLicensePlate(car.license_number)}</div>
                    </div>
                    <div className={styles.carAdditionalInfo}>
                      <span><FontAwesomeIcon icon={faCalendarAlt} className="iconWithSpace" /> {car.year}</span>
                      <span><FontAwesomeIcon icon={faPalette} className="iconWithSpace" /> {car.color || 'לא זמין'}</span>
                    </div>
                  </div>
                  <div className={styles.carImageContainer}>
                    <img src={car.image_url} alt={`${car.make} ${car.model}`} className={styles.carImage} />
                  </div>
                  <div className={styles.carIcons}>
                    <div>
                      <FontAwesomeIcon icon={faTachometerAlt} className="iconWithSpace" />
                      <span>{formatNumber(car.current_km)}</span>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faGasPump} className="iconWithSpace" />
                      <span>{car.current_fuel_level}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.carStats}>
                  <div className={styles.carStatsColumn}>
                    <div className={styles.carStat}>
                      <div className={styles.carStatLabel}>ק"מ ליום:</div>
                      <div className={styles.carStatValue}>{formatNumber(car.kmLimitPerUnit)}</div>
                    </div>
                    <div className={styles.carStat}>
                      <div className={styles.carStatLabel}>ק"מ לכל התקופה:</div>
                      <div className={styles.carStatValue}>{formatNumber(car.totalKmLimit)}</div>
                    </div>
                    <div className={styles.carStat}>
                      <div className={styles.carStatLabel}>מחיר לק"מ נוסף:</div>
                      <div className={styles.carStatValue}>{formatCurrency(car.extraKmPrice)}</div>
                    </div>
                  </div>
                  <div className={styles.carStatsColumn}>
                    <div className={styles.carStat}>
                      <div className={styles.carStatLabel}>מחיר יומי:</div>
                      <div className={styles.carStatValue}>{formatCurrency(car.pricePerDay)}</div>
                    </div>
                    <div className={styles.carStat}>
                      <div className={styles.carStatLabel}>מחיר לשבת/חג:</div>
                      <div className={styles.carStatValue}>{formatCurrency(car.saturdayHolidayPrice)}</div>
                    </div>
                  </div>
                  <div className={styles.carStatsColumn}>
                    <div className={styles.carStat}>
                      <div className={styles.carStatLabel}>תוספת נהג חדש/צעיר:</div>
                      <div className={styles.carStatValue}>{formatCurrency(car.additionalCost)}</div>
                    </div>
                  </div>
                </div>
                <div className={styles.carPriceContainer}>
                  <div className={styles.carPriceLabel}>מחיר כולל:</div>
                  <div className={styles.carPrice}>{formatCurrency(car.totalPrice)}</div>
                </div>
                <div className={styles.carButton}>
                  <button onClick={() => handleCarSelection(car.id)}>בחר רכב</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>לא נמצאו רכבים זמינים בתאריכים המבוקשים.</p>
        )}
      </div>
    </div>
  );
}

export default RentalAvailability;
