// components/SettingsForm.js
import React from 'react';
import styles from '../styles/SettingsForm.module.css';

function SettingsForm({ settings, handleInputChange, handleSave, category }) {
  return (
    <div className={styles.container}>
      <h2>{category === 'rental' ? 'הגדרות השכרת רכב' : 'הגדרות כלליות'}</h2>
      <form className={styles.form}>
        {category === 'rental' && (
          <>
            <div className={styles.formGroup}>
              <label className={styles.label}>דמי טיפול - דוחות תעבורה</label>
              <input
                className={styles.input}
                type="text"
                name="toll_fee"
                value={settings.toll_fee}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>דמי טיפול - כבישי אגרה</label>
              <input
                className={styles.input}
                type="text"
                name="traffic_fee"
                value={settings.traffic_fee}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>החזרה באותו זמן כמו איסוף</label>
              <input
                className={styles.checkbox}
                type="checkbox"
                name="return_same_time_as_pickup"
                checked={settings.return_same_time_as_pickup === 'yes'}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>שעת החזרה ברירת מחדל</label>
              <input
                className={styles.input}
                type="text"
                name="default_return_time"
                value={settings.default_return_time}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}
        {category === 'general' && (
          <div className={styles.formGroup}>
            <label className={styles.label}>אחוז מע"מ</label>
            <input
              className={styles.input}
              type="text"
              name="vat_percentage"
              value={settings.vat_percentage}
              onChange={handleInputChange}
            />
          </div>
        )}
        <button type="button" onClick={handleSave} className={styles.saveButton}>
          שמור הגדרות
        </button>
      </form>
    </div>
  );
}

export default SettingsForm;
