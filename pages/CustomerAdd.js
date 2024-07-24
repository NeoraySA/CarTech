import React, { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';
import AddCustomerForm from '../components/AddCustomerForm';
import ListHeader from '../components/ListHeader';
import ListFooter from '../components/ListFooter';
import Notification from '../components/Notification';
import ModalComponent from '../components/ModalComponent'; // ייבוא קומפוננטת המודל
import FileUploadComponent from '../components/FileUploadComponent'; // ייבוא קומפוננטת העלאת הקובץ

import withAuth from '../src/hoc/withAuth'; // נתיב לקובץ HOC

function AddCustomerPage() {
  const [formData, setFormData] = useState({
    id_number: '',
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
    gender_id: '',  // עדכון לשדה gender_id
    category: '',
    referral: '',
    vat_exempt: false
  });

  const [notification, setNotification] = useState({ message: '', type: '' });
  const [isModalOpen, setIsModalOpen] = useState(false); // ניהול מצב המודל
  const router = useRouter();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
    if (!formData.id_number) {
      setNotification({ message: 'נא להזין תעודת זהות!', type: 'error' });
      return false;
    }
    if (!formData.last_name) {
      setNotification({ message: 'נא להזין שם משפחה!', type: 'error' });
      return false;
    }
    if (!formData.first_name) {
      setNotification({ message: 'נא להזין שם פרטי!', type: 'error' });
      return false;
    }
    if (!formData.city) {
      setNotification({ message: 'נא לבחור עיר!', type: 'error' });
      return false;
    }
    if (!formData.street) {
      setNotification({ message: 'נא לבחור רחוב!', type: 'error' });
      return false;
    }
    if (!formData.building_number) {
      setNotification({ message: 'נא להזין מספר בניין!', type: 'error' });
      return false;
    }
    if (!formData.gender_id) {  // עדכון לשדה gender_id
      setNotification({ message: 'נא לבחור את מגדר הלקוח!', type: 'error' });
      return false;
    }
    if (!formData.category) {
      setNotification({ message: 'נא לבחור קטגוריה!', type: 'error' });
      return false;
    }
    if (!formData.referral) {
      setNotification({ message: 'נא לבחור דרכי הגעה!', type: 'error' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const token = localStorage.getItem('token'); 

    try {
      const response = await axios.post(`${apiUrl}/api/customers`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 201) {
        setNotification({ message: 'הלקוח נוסף בהצלחה!', type: 'success' });
        const newCustomerId = response.data.customerId; // הנחת שה-ID של הלקוח החדש מוחזר מהשרת כ-response.data.customerId
        router.push(`/CustomerDetails/${newCustomerId}`); // ניווט לדף פרטי הלקוח
      }
    } catch (error) {
      console.error('Failed to add customer:', error);
      setNotification({ message: 'הוספת הלקוח נכשלה!', type: 'error' });
    }
  };

  const headerButtons = [
    {
      label: 'רשימת לקוחות',
      onClick: () => router.push('/CustomerList'),
      permissions: ['customers_list']
    },
    {
      label: 'העלאת קובץ',
      onClick: () => setIsModalOpen(true),
      permissions: ['upload_file_ai']
    }
  ];

  return (
    <div>
      <Head>
        <title>הוספת לקוח חדש</title>
      </Head>
      <ListHeader
        title="הוספת לקוח חדש"
        subtitle="מילוי פרטי הלקוח"
        showSearchBox={false}
        secondaryButtons={headerButtons}
      />
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: '' })} />
      <AddCustomerForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
      <ListFooter />
      <ModalComponent isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <FileUploadComponent onClose={() => setIsModalOpen(false)} setFormData={setFormData} />
      </ModalComponent>
    </div>
  );
}

export default withAuth(AddCustomerPage, ['add_customer']);
