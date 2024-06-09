import React from 'react';
import styles from '../styles/DetailsSummaryComponent.module.css';
import { format } from 'date-fns';

const labelTranslations = {
  traffic_fee: 'עמלת כבישי אגרה',
  toll_fee: 'עמלת דוחות',
  km_limit_per_unit: 'ק"מ ליחידה',
  total_days: 'סה"כ ימים',
  total_km_limit: 'סה"כ ק"מ',
  km_calculation_days: 'יחידות לחישוב ק"מ',
  extra_km_price: 'מחיר לק"מ נוסף',
  total_price: 'מחיר כולל',
  weekdays: 'ימי חול',
  saturdays_and_holidays: 'שבתות וחגים',
  start_date: 'תאריך איסוף',
  end_date: 'תאריך החזרה',
  price_per_km: 'מחיר לק"מ נוסף',
  fuel_pickup_level_description: 'דלק באיסוף',
  fuel_return_level_description: 'דלק בהחזרה',
  km_pickup: 'ק"מ באיסוף',
  km_return: 'ק"מ בהחזרה'
};

const formatDate = (date) => {
  return format(new Date(date), 'dd/MM/yyyy hh:mm');
};

const DetailsSummaryComponent = ({ summaryData, summaryGroups, onEdit }) => {
  return (
    <div className={styles.detailsSummaryComponent}>
      <h2 className={styles.detailsSummaryTitle}>סיכום פרטים</h2>
      {summaryGroups.map((group, groupIndex) => (
        <div key={groupIndex} className={styles.detailsSummaryGroup}>
          <h3 className={styles.detailsSummaryGroupTitle}>{group.title}</h3>
          {group.fields.map((field, index) => (
            <div key={index} className={styles.detailsSummaryItem}>
              <span className={styles.detailsSummaryLabel}>{labelTranslations[field] || field}:</span>
              <span className={styles.detailsSummaryValue}>
                {typeof summaryData[field] === 'object' && summaryData[field] !== null && !Array.isArray(summaryData[field])
                  ? JSON.stringify(summaryData[field])
                  : field.includes('date') && summaryData[field] !== null
                  ? formatDate(summaryData[field])
                  : summaryData[field]}
              </span>
            </div>
          ))}
          <button className={styles.editButton} onClick={() => onEdit(group.title)}>עריכת {group.title}</button>
        </div>
      ))}
    </div>
  );
};

export default DetailsSummaryComponent;
