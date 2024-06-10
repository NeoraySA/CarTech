import React from 'react';
import styles from '../styles/DetailsSummaryComponent.module.css';
import { format } from 'date-fns';
import labelTranslations from '../src/translations'; // ייבוא התרגומים מהקובץ המרכזי

const formatDate = (date) => {
  return format(new Date(date), 'dd/MM/yyyy hh:mm');
};

const renderValue = (key, value) => {
  if (typeof value === 'object' && value !== null) {
    if (Array.isArray(value)) {
      return value.map((item, index) => <div key={index}>{renderValue(key, item)}</div>);
    } else {
      return (
        <div>
          {Object.entries(value).map(([subKey, subVal]) => (
            <div key={subKey} className={styles.detailsSummaryItem}>
              <strong>{labelTranslations[subKey] || subKey}:</strong> {renderValue(subKey, subVal)}
            </div>
          ))}
        </div>
      );
    }
  }
  return value;
};

const renderRateBreakdown = (rates, title) => {
  if (!Array.isArray(rates)) {
    return null;
  }
  return (
    <div>
      <h3 className={styles.detailsSummaryGroupTitle}>{title}</h3>
      <table className={styles.rateTable}>
        <thead>
          <tr>
            <th>{labelTranslations.rateName || 'rateName'}</th>
            <th>{labelTranslations.rateType || 'rateType'}</th>
            <th>{labelTranslations.dailyRate || 'dailyRate'}</th>
            <th>{labelTranslations.quantity || 'quantity'}</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((rate, index) => (
            <tr key={index}>
              <td>{rate.rateName}</td>
              <td>{rate.rateType}</td>
              <td>{rate.dailyRate}</td>
              <td>{rate.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const DetailsSummaryComponent = ({ summaryData, summaryGroups, onEdit }) => {
  return (
    <div className={styles.detailsSummaryComponent}>
      <p className={styles.detailsSummaryTitle}>סיכום פרטים</p>
      {summaryGroups && summaryGroups.map((group, groupIndex) => (
        <div key={groupIndex} className={styles.detailsSummaryGroup}>
          <h3 className={styles.detailsSummaryGroupTitle}>{group.title}</h3>
          {group.fields.map((field, index) => (
            field !== 'rateBreakdown' && field !== 'specialRates' && (
              <div key={index} className={styles.detailsSummaryItem}>
                <span className={styles.detailsSummaryLabel}>{labelTranslations[field] || field}:</span>
                <span className={styles.detailsSummaryValue}>
                  {summaryData && summaryData[field] !== undefined ?
                    (field.includes('date') && summaryData[field] !== null
                      ? formatDate(summaryData[field])
                      : renderValue(field, summaryData[field]))
                    : 'לא זמין'}
                </span>
              </div>
            )
          ))}
          {summaryData.rateBreakdown && renderRateBreakdown(summaryData.rateBreakdown, 'פירוט תעריפים')}
          {summaryData.specialRates && renderRateBreakdown(summaryData.specialRates, 'תעריפים מיוחדים')}
          <button className={styles.editButton} onClick={() => onEdit(group.title)}>עריכת {group.title}</button>
        </div>
      ))}
    </div>
  );
};

export default DetailsSummaryComponent;
