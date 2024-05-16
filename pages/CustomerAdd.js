import React, { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import AddCustomerForm from '../components/AddCustomerForm'; // קומפוננטה שתיצור להוספת הטופס
import ListHeader from '../components/ListHeader';
import ListFooter from '../components/ListFooter';


function AddCustomerPage() {
  const [formData, setFormData] = useState({
    last_name: '',
    first_name: '',
    company_name: '',
    street: '',
    building_number: '',
    city: '',
    country: '',
    telephone: '',
    cellphone: '',
    fax: '',
    email: '',
    gender: '',
    category: '',
    referral: '',
    is_active: false,
    vat_exempt: false,
    deposit_exempt: false,
    branch: '',
    added_by: '',
    notes: ''
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const token = localStorage.getItem('token'); // קריאה של הטוקן מ-localStorage

    try {
      const response = await axios.post(`${apiUrl}/api/customers`, formData, {
        headers: {
          Authorization: `Bearer ${token}` // הוספת הטוקן לכותרות הבקשה
        }
      });
      if (response.status === 201) {
        alert('הלקוח נוסף בהצלחה!');
      }
    } catch (error) {
      console.error('Failed to add customer:', error);
      alert('Failed to add customer');
    }
  };

  return (
    <div>
      <Head>
        <title>הוספת לקוח חדש</title>
      </Head>
      <ListHeader
        title="הוספת לקוח חדש"
        subtitle="מילוי פרטי הלקוח"
        showSearchBox={false}  // מונע את הצגת תיבת החיפוש
      />

      <AddCustomerForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
}

export default AddCustomerPage;
