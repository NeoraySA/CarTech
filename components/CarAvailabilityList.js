import React from 'react';
import styles from '../styles/Availability.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faGasPump, faCalendarAlt, faPalette } from '@fortawesome/free-solid-svg-icons';
import { formatNumber, formatCurrency, formatLicensePlate } from '../utils/formatUtils';

function CarAvailabilityList({ cars, onSelectCar }) {
  return (
    <ul className={styles.carList}>
      {cars.map((car, index) => (
        <li key={index} className={styles.carItem}>
          <div className={styles.carInfo}>
            <div className={styles.carTopInfo}>
              <div className={styles.carTopInfoRow}>
                <div className={styles.carTopInfoRight}>
                  <span className={styles.carName}>{car.make} {car.model}</span>
                </div>
                <div className={styles.licensePlate}>{formatLicensePlate(car.license_number)}</div>
              </div>
              
            </div>
            <div className={styles.carImageContainer}>
              <img src={car.image_url} alt={`${car.make} ${car.model}`} className={styles.carImage} />
            </div>
            <div className={styles.carAdditionalInfo}>
                <span><FontAwesomeIcon icon={faCalendarAlt} className="iconWithSpace" /> {car.year}</span>
                <span><FontAwesomeIcon icon={faPalette} className="iconWithSpace" /> {car.color || 'לא זמין'}</span>
                <span><FontAwesomeIcon icon={faTachometerAlt} className="iconWithSpace" /> {formatNumber(car.current_km)}</span>
                <span><FontAwesomeIcon icon={faGasPump} className="iconWithSpace" /> {car.current_fuel_level}</span>
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
            <button onClick={() => onSelectCar(car)}>בחר רכב</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CarAvailabilityList;
