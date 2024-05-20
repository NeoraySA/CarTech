import React, { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import AddCustomerForm from '../components/AddCustomerForm';
import ListHeader from '../components/ListHeader';
import ListFooter from '../components/ListFooter';
import Notification from '../components/Notification';

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
    notes: ''
  });

  const [notification, setNotification] = useState({ message: '', type: '' });

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
    const token = localStorage.getItem('token'); 
    const company_id = localStorage.getItem('company_id');
    const branch_id = localStorage.getItem('branch_id');
    const added_by = localStorage.getItem('user_id');

    const completeFormData = {
      ...formData,
      company_id,
      branch_id,
      added_by,
      is_active: formData.is_active ? 1 : 0,
      vat_exempt: formData.vat_exempt ? 1 : 0,
      deposit_exempt: formData.deposit_exempt ? 1 : 0
    };

    try {
      const response = await axios.post(`${apiUrl}/api/customers`, completeFormData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 201) {
        setNotification({ message: 'הלקוח נוסף בהצלחה!', type: 'success' });
      }
    } catch (error) {
      console.error('Failed to add customer:', error);
      setNotification({ message: 'הוספת הלקוח נכשלה!', type: 'error' });
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
        showSearchBox={false}
      />
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: '' })} />
      <AddCustomerForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
      <ListFooter />
    </div>
  );
}

export default AddCustomerPage;
