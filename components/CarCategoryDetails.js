// components/CarCategoryDetails.js
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/AddForm.module.css'; // וודא שהנתיב נכון

function CarCategoryDetails({ category, setNotification }) {
  const [categoryDetails, setCategoryDetails] = useState(category);
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryDetails({
      ...categoryDetails,
      [name]: value,
    });
    console.log(`Field changed: ${name}, Value: ${value}`);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    console.log('Image file selected:', e.target.files[0]);
  };

  const confirmUpdate = () => {
    setNotification({
      message: 'האם אתה בטוח שברצונך לעדכן את הקטגוריה?',
      type: 'info',
      onConfirm: handleSave,
    });
  };

  const handleSave = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const token = localStorage.getItem('token');
    
    // Handle image upload if a file is selected
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);

      try {
        const response = await axios.post(`${apiUrl}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        categoryDetails.image_url = response.data.filePath; // Assuming the server returns the file path
        console.log('Image uploaded:', response.data.filePath);
      } catch (error) {
        console.error('Error uploading image:', error);
        setNotification({ message: 'שגיאה בהעלאת התמונה', type: 'error', onConfirm: null });
        return;
      }
    }

    console.log('Sending updated category details:', categoryDetails);
    try {
      await axios.put(`${apiUrl}/api/carCategories/${categoryDetails.category_id}`, categoryDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotification({ message: 'קטגוריה עודכנה בהצלחה', type: 'success', onConfirm: null });
      setTimeout(() => {
        setNotification({ message: '', type: '', onConfirm: null });
        router.push('/CarCategories');
      }, 3000); // Change this value to adjust the delay before redirecting
    } catch (error) {
      console.error('Error updating category:', error);
      setNotification({ message: 'שגיאה בעדכון הקטגוריה', type: 'error', onConfirm: null });
    }
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
                value={categoryDetails.category_name}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="description">תיאור</label>
              <textarea
                id="description"
                name="description"
                value={categoryDetails.description}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="image">תמונה</label>
              <input type="file" id="image" onChange={handleImageChange} />
              {categoryDetails.image_url && <img src={categoryDetails.image_url} alt="Category" className={styles.imagePreview} />}
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="price_per_day">מחיר יומי</label>
              <input
                type="number"
                step="0.01"
                id="price_per_day"
                name="price_per_day"
                value={categoryDetails.price_per_day}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="saturday_holiday_price">מחיר לשבתות וחגים</label>
              <input
                type="number"
                step="0.01"
                id="saturday_holiday_price"
                name="saturday_holiday_price"
                value={categoryDetails.saturday_holiday_price}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="new_driver_price_increase">תוספת לנהג חדש</label>
              <input
                type="number"
                step="0.01"
                id="new_driver_price_increase"
                name="new_driver_price_increase"
                value={categoryDetails.new_driver_price_increase}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="young_driver_price_increase">תוספת לנהג צעיר</label>
              <input
                type="number"
                step="0.01"
                id="young_driver_price_increase"
                name="young_driver_price_increase"
                value={categoryDetails.young_driver_price_increase}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="include_new_young_driver_on_saturday_holiday">
                תוספת נהג חדש/צעיר בשבתות וחגים
              </label>
              <input
                type="checkbox"
                id="include_new_young_driver_on_saturday_holiday"
                name="include_new_young_driver_on_saturday_holiday"
                checked={categoryDetails.include_new_young_driver_on_saturday_holiday}
                onChange={(e) => handleChange({ target: { name: e.target.name, value: e.target.checked } })}
                className={styles.checkbox}
              />
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="km_limit_per_unit">מגבלת ק"מ ליחידה</label>
              <input
                type="number"
                id="km_limit_per_unit"
                name="km_limit_per_unit"
                value={categoryDetails.km_limit_per_unit}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="extra_km_price">מחיר לק"מ נוסף</label>
              <input
                type="number"
                step="0.01"
                id="extra_km_price"
                name="extra_km_price"
                value={categoryDetails.extra_km_price}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>
          <div className={styles.section}>
            <button type="button" className={styles.submitButton} onClick={confirmUpdate}>
              שמור
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CarCategoryDetails;
