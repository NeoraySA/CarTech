import React from 'react';
import styles from '../styles/SearchDetails.module.css';

function SearchDetails({ startDate, endDate, totalDays, saturdays, weekdays, driverType, sortOption, onSortChange }) {
  return (
    <div className={styles.searchDetails}>
      <div className={styles.searchDates}>
        <div>מתאריך: {startDate}</div>
        <div>עד תאריך: {endDate}</div>
        <div>סוג הנהג: {driverType}</div>
      </div>
      <div className={styles.searchSummary}>
        <div>סה"כ ימים: {totalDays}</div>
        <div>ימי חול: {weekdays}</div>
        <div>שבתות וחגים: {saturdays}</div>
      </div>
      <div className={styles.sortOptions}>
        <label htmlFor="sort">מיין לפי:</label>
        <select id="sort" value={sortOption} onChange={onSortChange}>
          <option value="price">מחיר</option>
          <option value="make">יצרן</option>
          <option value="model">דגם</option>
        </select>
      </div>
    </div>
  );
}

export default SearchDetails;
