import React from 'react';
import styles from '../styles/DetailsSummaryComponent.module.css';

const labelTranslations = {
  totalRentals: 'סה"כ השכרות',
  totalRevenue: 'סה"כ הכנסות',
  totalDays: 'סה"כ ימים',
  totalKmRental: 'סה"כ ק"מ לשכירות'
};

function DetailsSummaryComponent({ summaryData }) {
  return (
    <div className={styles.detailsSummaryComponent}>
      <h2 className={styles.detailsSummaryTitle}>סיכום פרטים</h2>
      {Object.entries(summaryData).map(([label, value], index) => (
        <div key={index} className={styles.detailsSummaryItem}>
          <span className={styles.detailsSummaryLabel}>{labelTranslations[label] || label}:</span>
          <span className={styles.detailsSummaryValue}>{value}</span>
        </div>
      ))}
    </div>
  );
}

export default DetailsSummaryComponent;
