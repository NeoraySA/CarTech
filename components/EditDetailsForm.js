import React, { useState } from 'react';
import styles from '../styles/EditDetailsForm.module.css';

const EditDetailsForm = ({ rentalDetails, groupTitle, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...rentalDetails });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // ביצוע שמירת הפרטים
    onSave({ ...rentalDetails, ...formData });
    onClose();
  };

  const renderFields = () => {
    const fields = summaryGroups.find(group => group.title === groupTitle)?.fields || [];
    return fields.map((field, index) => (
      <div key={index} className={styles.inputField}>
        <label>{labelTranslations[field] || field}:</label>
        <input
          type="text"
          name={field}
          value={formData[field] || ''}
          onChange={handleChange}
        />
      </div>
    ));
  };

  return (
    <div className={styles.editDetailsForm}>
      {renderFields()}
      <button onClick={handleSave} className={styles.saveButton}>שמור</button>
      <button onClick={onClose} className={styles.cancelButton}>בטל</button>
    </div>
  );
};

export default EditDetailsForm;
