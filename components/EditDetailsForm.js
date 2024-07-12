import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../styles/EditDetailsForm.module.css';
import labelTranslations from '../src/translations';

const EditDetailsForm = ({ details, group, onClose, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (group && details) {
      const groupFields = group.fields.reduce((acc, field) => {
        acc[field] = details[field] || '';
        return acc;
      }, {});
      if (details.id) {
        groupFields.id = details.id; // הוספת ID אם קיים
      }
      setFormData(groupFields);
    }
  }, [group, details]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (name, date) => {
    setFormData({ ...formData, [name]: date });
  };

  const handleSave = () => {
    onSave(formData);
  };

  const renderFields = () => {
    return group?.fields.map((field, index) => (
      <div key={index} className={styles.inputField}>
        <label>{labelTranslations[field] || field}:</label>
        {field.includes('date') ? (
          <DatePicker
            selected={formData[field] ? new Date(formData[field]) : null}
            onChange={(date) => handleDateChange(field, date)}
            dateFormat="dd/MM/yyyy"
            className={styles.input}
            minDate={field === 'end_date' ? formData['start_date'] ? new Date(formData['start_date']) : null : null}
          />
        ) : field === 'include_saturday_holiday' || field === 'include_new_young_driver_on_saturday_holiday' ? (
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              name={field}
              checked={formData[field] === 1}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.checked ? 1 : 0 })}
              className={styles.checkbox}
            />
          </div>
        ) : (
          <input
            type="text"
            name={field}
            value={formData[field] || ''}
            onChange={handleChange}
            className={styles.input}
          />
        )}
      </div>
    ));
  };

  return (
    <div className={styles.editDetailsForm}>
      <div className={styles.inputFieldsContainer}>
        {renderFields()}
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handleSave} className={styles.saveButton}>שמור</button>
        <button onClick={onClose} className={styles.cancelButton}>בטל</button>
      </div>
    </div>
  );
};

export default EditDetailsForm;
