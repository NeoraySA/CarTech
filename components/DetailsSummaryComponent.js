import React from 'react';
import styles from '../styles/DetailsSummaryComponent.module.css';
import { format } from 'date-fns';
import labelTranslations from '../src/translations'; // ייבוא התרגומים מהקובץ המרכזי

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
                              {summaryData && summaryData[field] !== undefined ?
                                  (typeof summaryData[field] === 'object' && !Array.isArray(summaryData[field])
                                      ? JSON.stringify(summaryData[field])
                                      : field.includes('date') && summaryData[field] !== null
                                      ? formatDate(summaryData[field])
                                      : summaryData[field])
                                  : 'לא זמין'}
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
