import React, { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';
import AddRentalForm from '../components/AddRentalForm';
import ListHeader from '../components/ListHeader';
import styles from '../styles/AddForm.module.css';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

function RentalAdd() {
  const router = useRouter();

  const handleRentalSubmit = async (rentalDetails) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error("Missing token in local storage");
      }

      const response = await axios.post(`${apiUrl}/api/rentals/availability`, rentalDetails, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Response from server:', response.data); // הצגת התשובה בקונסול

      // הפניית המשתמש לדף התוצאות עם נתוני הזמינות
      router.push({
        pathname: '/RentalAvailability',
        query: { data: JSON.stringify(response.data) }
      });
    } catch (error) {
      console.error('Error fetching rental availability:', error);
      alert('Error fetching rental availability: ' + error.message);
    }
  };

  return (
    <div>
      <Head>
        <title>הוספת השכרה חדשה</title>
      </Head>
      <ListHeader
        title="הוספת השכרה חדשה"
        subtitle="מילוי פרטי השכרה"
        showSearchBox={false}
      />
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <AddRentalForm onSubmit={handleRentalSubmit} />
        </div>
      </div>
    </div>
  );
}

export default RentalAdd;
