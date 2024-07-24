import React, { useState, useEffect } from 'react';
import styles from '../styles/UniversalForm.module.css';

const UniversalForm = ({ initialValues, fields, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(initialValues || {});
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      dataToSubmit.append(key, value === '' ? '' : value);
    });
    onSubmit(dataToSubmit);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className={styles.formGroup}>
          <label htmlFor={field.name} className={styles.label}>
            {field.label}:
          </label>
          {field.type === 'text' || field.type === 'email' ? (
            <input
              type={field.type}
              name={field.name}
              id={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              className={styles.input}
            />
          ) : field.type === 'file' ? (
            <input
              type="file"
              name={field.name}
              id={field.name}
              onChange={handleChange}
              className={styles.input}
            />
          ) : (
            <textarea
              name={field.name}
              id={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              className={styles.input}
            />
          )}
        </div>
      ))}
      <button type="submit" className={styles.button}>
        {buttonText}
      </button>
    </form>
  );
};

export default UniversalForm;
