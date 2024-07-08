import React, { useState } from 'react';
import styles from '../styles/AddForm.module.css'; // וודא שהנתיב נכון

import CitySelector from './CitySelector';
import StreetSelector from './StreetSelector';
import CustomersCategoriesSelector from './CustomersCategoriesSelector';

function AddCustomerForm({ onClose }) {
  const initialFormData = {
    id_number: '',
    last_name: '',
    first_name: '',
    company_name: '',
    telephone: '',
    cellphone: '',
    fax: '',
    email: '',
    city: '',
    street: '',
    building_number: '',
    country: '',
    gender: '',
    category: '',
    referral: '',
    is_active: false,
    vat_exempt: false,
    deposit_exempt: false,
    notes: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Missing token in local storage");
      }

      await axios.post(`${apiUrl}/api/customers`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setNotification({ message: 'לקוח נוסף בהצלחה', type: 'success' });
      onClose(); // סגירת המודל לאחר הוספת הלקוח בהצלחה

    } catch (error) {
      setNotification({ message: 'Error adding customer: ' + error.message, type: 'error' });
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <div className={styles.formGroup}>
            <label className={styles.label}>תעודת זהות:</label>
            <input className={styles.input} type="text" name="id_number" value={formData.id_number} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>שם משפחה:</label>
            <input className={styles.input} type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>שם פרטי:</label>
            <input className={styles.input} type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>שם החברה:</label>
            <input className={styles.input} type="text" name="company_name" value={formData.company_name} onChange={handleChange} />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.formGroup}>
            <label className={styles.label}>טלפון:</label>
            <input className={styles.input} type="text" name="telephone" value={formData.telephone} onChange={handleChange} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>טלפון נייד:</label>
            <input className={styles.input} type="text" name="cellphone" value={formData.cellphone} onChange={handleChange} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>פקס:</label>
            <input className={styles.input} type="text" name="fax" value={formData.fax} onChange={handleChange} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>דואר אלקטרוני:</label>
            <input className={styles.input} type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.formGroup}>
            <label className={styles.label}>עיר:</label>
            <CitySelector onChange={(option) => handleChange({ target: { name: 'city', value: option ? option.value : '' }})} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>רחוב:</label>
            <StreetSelector city={formData.city} onChange={(option) => handleChange({ target: { name: 'street', value: option ? option.value : '' }})} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>מספר בניין:</label>
            <input className={styles.input} type="text" name="building_number" value={formData.building_number} onChange={handleChange} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>מדינה:</label>
            <input className={styles.input} type="text" name="country" value={formData.country} onChange={handleChange} />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.formGroup}>
            <label className={styles.label}>מין:</label>
            <select className={styles.select} name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">בחר מין</option>
              <option value="1">זכר</option>
              <option value="female">נקבה</option>
              <option value="other">אחר</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>קטגוריה:</label>
            <CustomersCategoriesSelector onChange={(selectedOption) => handleChange({ target: { name: 'category', value: selectedOption.value }})} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>דרכי הגעה:</label>
            <input className={styles.input} type="text" name="referral" value={formData.referral} onChange={handleChange} />
          </div>
        </div>

        <div className={styles.section}>
         
          <div className={styles.formGroup}>
            <label className={styles.label}>פטור מע"מ:</label>
            <input className={styles.checkbox} type="checkbox" name="vat_exempt" checked={formData.vat_exempt} onChange={handleChange} />
          </div>
        </div>

       

        <button className={styles.submitButton} type="submit">הוסף לקוח</button>
      </form>
    </div>
  );
}

export default AddCustomerForm;
