// components/CarCategoryDetails.js
import React from 'react';
import styles from '../styles/AddForm.module.css';

function CarCategoryDetails({ category, setCategoryDetails, setImageFile }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryDetails({
      ...category,
      [name]: value,
    });
    console.log(`Field changed: ${name}, Value: ${value}`);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    console.log('Image file selected:', e.target.files[0]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <div className={styles.section}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="category_name">שם קטגוריה</label>
              <input
                type="text"
                id="category_name"
                name="category_name"
                value={category.category_name}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="description">תיאור</label>
              <textarea
                id="description"
                name="description"
                value={category.description}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="image">תמונה</label>
              <input type="file" id="image" onChange={handleImageChange}  />
              {category.image_url && <img src={category.image_url} alt="Category" className={styles.imagePreview} />}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CarCategoryDetails;
