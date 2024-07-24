// components/SettingsForm.js
import React from 'react';
import styles from '../styles/AddForm.module.css';

function SettingsForm({ settings, handleInputChange, handleSave, category }) {
  return (
    <div className={styles.container}>
      
      <form className={styles.form}>
        <div className={styles.section}>
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
        </div>
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
        {category === 'colors' && (
          <>
            <div className={styles.formGroup}>
              <label className={styles.label}>צבע 1</label>
              <input
                className={`${styles.input} ${styles.colorInput}`}
                type="color"
                name="color_1"
                value={settings.color_1}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>צבע 2</label>
              <input
                className={`${styles.input} ${styles.colorInput}`}
                type="color"
                name="color_2"
                value={settings.color_2}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>צבע 3</label>
              <input
                className={`${styles.input} ${styles.colorInput}`}
                type="color"
                name="color_3"
                value={settings.color_3}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>צבע 4</label>
              <input
                className={`${styles.input} ${styles.colorInput}`}
                type="color"
                name="color_4"
                value={settings.color_4}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>צבע 5</label>
              <input
                className={`${styles.input} ${styles.colorInput}`}
                type="color"
                name="color_5"
                value={settings.color_5}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>צבע שחור</label>
              <input
                className={`${styles.input} ${styles.colorInput}`}
                type="color"
                name="black_color"
                value={settings.black_color}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>צבע לבן</label>
              <input
                className={`${styles.input} ${styles.colorInput}`}
                type="color"
                name="white_color"
                value={settings.white_color}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default SettingsForm;
