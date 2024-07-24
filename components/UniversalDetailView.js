// components/UniversalDetailView.js
import React from 'react';
import styles from '../styles/UniversalDetailView.module.css';
import translations from '../src/translations'; // נניח שהקובץ translations נמצא בתקיית src

const renderDetailItem = (key, value) => {
  if (key === 'status' && typeof value === 'string') {
    return (
      <div key={key} className={styles['detail-item']}>
        <strong>{translations[key] || key}:</strong>
        <span>{translations.status[value] || value}</span>
      </div>
    );
  }

  if (typeof value === 'object' && value !== null) {
    if (Array.isArray(value)) {
      return (
        <div key={key} className={styles['nested-details']}>
          <strong>{translations[key] || key}:</strong>
          <div className={styles['nested-container']}>
            {value.map((item, index) => (
              <div key={index} className={styles['detail-item']}>
                {typeof item === 'object' ? JSON.stringify(item) : item}
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div key={key} className={styles['nested-details']}>
          <strong>{translations[key] || key}:</strong>
          <div className={styles['nested-container']}>
            {Object.entries(value).map(([nestedKey, nestedValue]) => renderDetailItem(nestedKey, nestedValue))}
          </div>
        </div>
      );
    }
  } else {
    return (
      <div key={key} className={styles['detail-item']}>
        <strong>{translations[key] || key}:</strong>
        <span>{value}</span>
      </div>
    );
  }
};

const UniversalDetailView = ({ details }) => {
  console.log('Rendering details:', details); // הוסף לוג כדי לוודא שהנתונים מגיעים

  return (
    <div className={styles['details-container']}>
      {Object.entries(details).map(([key, value]) => renderDetailItem(key, value))}
    </div>
  );
};

export default UniversalDetailView;
