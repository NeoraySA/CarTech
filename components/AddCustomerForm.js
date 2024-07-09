import React from 'react';
import styles from '../styles/AddForm.module.css'; // וודא שהנתיב נכון

import CitySelector from './CitySelector';
import StreetSelector from './StreetSelector';
import CustomersCategoriesSelector from './CustomersCategoriesSelector';
import ReferralSourcesSelector from './ReferralSourcesSelector';
import GenderSelector from './GenderSelector';

function AddCustomerForm({ formData, handleChange, handleSubmit }) {
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
            <GenderSelector onChange={(selectedOption) => handleChange({ target: { name: 'gender_id', value: selectedOption ? selectedOption.value : '' }})} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>קטגוריה:</label>
            <CustomersCategoriesSelector onChange={(selectedOption) => handleChange({ target: { name: 'category', value: selectedOption ? selectedOption.value : '' }})} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>דרכי הגעה:</label>
            <ReferralSourcesSelector onChange={(selectedOption) => handleChange({ target: { name: 'referral', value: selectedOption ? selectedOption.value : '' }})} />
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
