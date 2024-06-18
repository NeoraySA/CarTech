import React, { useState, useEffect } from 'react';
import styles from '../styles/EditDetailsForm.module.css';
import labelTranslations from '../src/translations';

const EditDetailsForm = ({ details, group, onClose, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (group && details) {
      const groupFields = group.fields.reduce((acc, field) => {
        acc[field.key] = details[field.key] || '';
        return acc;
      }, {});
      setFormData(groupFields);
    }
  }, [group, details]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
  };

  const renderFields = () => {
    return group?.fields.map((field, index) => (
      <div key={index} className={styles.inputField}>
        <label>{labelTranslations[field.key] || field.label}:</label>
        <input
          type="text"
          name={field.key}
          value={formData[field.key] || ''}
          onChange={handleChange}
        />
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
