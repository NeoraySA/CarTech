import React from 'react';
import styles from '../styles/SearchDetails.module.css';
import { formatDateTime, formatNumber } from '../utils/formatUtils';

function SearchDetails({ startDate, endDate, isNewDriver, isYoungDriver, totalDays, saturdays, weekdays }) {
  const driverType = isNewDriver && isYoungDriver ? 'נהג חדש וצעיר' : isNewDriver ? 'נהג חדש' : isYoungDriver ? 'נהג צעיר' : 'ותיק';

  return (
    <div className={styles.searchDetails}>
      <div className={styles.searchDates}>
        <div className={styles.label}>מתאריך: <span className={styles.value}>{formatDateTime(startDate)}</span></div>
        <div className={styles.label}>עד תאריך: <span className={styles.value}>{formatDateTime(endDate)}</span></div>
        <div className={styles.label}>סוג הנהג: <span className={styles.value}>{driverType}</span></div>
      </div>
      <div className={styles.searchSummary}>
        <div className={styles.label}>מספר ימים: <span className={styles.value}>{formatNumber(totalDays)}</span></div>
        <div className={styles.label}>ימי שבת: <span className={styles.value}>{formatNumber(saturdays)}</span></div>
        <div className={styles.label}>ימי חול: <span className={styles.value}>{formatNumber(weekdays)}</span></div>
      </div>
    </div>
  );
}

export default SearchDetails;
