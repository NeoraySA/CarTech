import React from 'react';
import styles from '../styles/DetailsSummaryComponent.module.css';
import { formatDateTime, formatNumber, formatCurrency, formatLicensePlate } from '../utils/formatUtils';
import labelTranslations from '../src/translations'; // ייבוא התרגומים מהקובץ המרכזי

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

  if (key.includes('date') || key.includes('estimated_return') ) {
    return formatDateTime(value);
  }

  if (key.includes('amount') || key.includes('price') || key.includes('fee')) {
    return formatCurrency(value);
  }

  if (key.includes('km') || key.includes('count')) {
    return formatNumber(value);
  }

  if (key.includes('license')) {
    return formatLicensePlate(value);
  }

  return value;
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
                    renderValue(field, summaryData[field])
                    : 'לא זמין'}
                </span>
              </div>
            )
          ))}
          <button className={styles.editButton} onClick={() => onEdit(group.title)}>עריכת {group.title}</button>
        </div>
      ))}
    </div>
  );
};

export default DetailsSummaryComponent;
