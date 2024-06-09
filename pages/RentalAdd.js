import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';

import AddRentalForm from '../components/AddRentalForm';
import ListHeader from '../components/ListHeader';
import DetailsSummaryComponent from '../components/DetailsSummaryComponent'; // ייבוא הקומפוננטה החדשה
import styles from '../styles/AddForm.module.css'; // ודא שהנתיב נכון

function RentalAdd() {
  const [summaryData, setSummaryData] = useState({
    totalDays: 0,
    totalKmRental: 0
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const handleSummaryChange = (newSummary) => {
    setSummaryData(prevSummary => ({
      ...prevSummary,
      ...newSummary
    }));
  };

  return (
    <div>
      <Head>
        <title>הוספת השכרה חדשה</title>
      </Head>
      <ListHeader
        title="הוספת השכרה חדשה"
        subtitle="מילוי פרטי השכרה"
        showSearchBox={false}  // מונע את הצגת תיבת החיפוש
      />
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <AddRentalForm onSummaryChange={handleSummaryChange} />
        </div>
        <div className={styles.summaryContainer}>
          <DetailsSummaryComponent summaryData={summaryData} />
        </div>
      </div>
    </div>
  );
}

export default RentalAdd;
