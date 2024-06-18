import React from 'react';
import styles from '../styles/DetailsPage.module.css';

function CustomerDetails({
  customerDetails,
  onCustomerChange,
  openEditModal
}) {
  const customerFields = [
    {
      group: 'פרטים אישיים',
      fields: [
        { label: 'תעודת זהות', value: customerDetails?.id_number, key: 'id_number' },
        { label: 'שם משפחה', value: customerDetails?.last_name, key: 'last_name' },
        { label: 'שם פרטי', value: customerDetails?.first_name, key: 'first_name' },
        { label: 'שם החברה', value: customerDetails?.company_name, key: 'company_name' },
        { label: 'מגדר', value: customerDetails?.gender, key: 'gender' },
        { label: 'קטגוריה', value: customerDetails?.category, key: 'category' },
      ],
    },
    {
      group: 'כתובת',
      fields: [
        { label: 'עיר', value: customerDetails?.city, key: 'city' },
        { label: 'רחוב', value: customerDetails?.street, key: 'street' },
        { label: 'מספר בניין', value: customerDetails?.building_number, key: 'building_number' },
        { label: 'מדינה', value: customerDetails?.country, key: 'country' },
      ],
    },
    {
      group: 'יצירת קשר',
      fields: [
        { label: 'טלפון בית', value: customerDetails?.telephone, key: 'telephone' },
        { label: 'טלפון נייד', value: customerDetails?.cellphone, key: 'cellphone' },
        { label: 'פקס', value: customerDetails?.fax, key: 'fax' },
        { label: 'דוא"ל', value: customerDetails?.email, key: 'email' },
      ],
    },
    {
      group: 'מידע נוסף',
      fields: [
        { label: 'מקור הפניה', value: customerDetails?.referral, key: 'referral' },
        { label: 'פעיל', value: customerDetails?.is_active ? 'כן' : 'לא', key: 'is_active' },
        { label: 'פטור ממע"מ', value: customerDetails?.vat_exempt ? 'כן' : 'לא', key: 'vat_exempt' },
        { label: 'פטור מהפקדה', value: customerDetails?.deposit_exempt ? 'כן' : 'לא', key: 'deposit_exempt' },
        { label: 'מוסף על ידי', value: customerDetails?.added_by, key: 'added_by' },
        { label: 'תאריך הוספה', value: customerDetails?.date_added, key: 'date_added' },
        { label: 'הערות', value: customerDetails?.notes, key: 'notes' },
      ],
    },
  ];

  if (!customerDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {customerFields.map((group, index) => (
        <div key={index} className={styles.section}>
          <h3 className={styles.groupTitle}>{group.group}</h3>
          <div className={styles.formGroup}>
            {group.fields.map((field, index) => (
              <div key={index} className={styles.field}>
                <span className={styles.label}>{field.label}:</span>
                <span className={styles.value}>{field.value || 'לא זמין'}</span>
              </div>
            ))}
          </div>
          <button type="button" className={styles.linkButton} onClick={() => openEditModal(group)}>ערוך {group.group}</button>
        </div>
      ))}
    </div>
  );
}

export default CustomerDetails;
