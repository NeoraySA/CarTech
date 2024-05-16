import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import AddRentalForm from '../components/AddRentalForm';
import ListHeader from '../components/ListHeader';
import DetailsSummaryComponent from '../components/DetailsSummaryComponent'; // ייבוא הקומפוננטה החדשה
import styles from '../styles/AddForm.module.css'; // ודא שהנתיב נכון

function RentalAdd() {
  const [companyId, setCompanyId] = useState('');
  const [summaryData, setSummaryData] = useState({

    totalDays: 0,
    totalKmRental: 0
  });

  useEffect(() => {
    const storedCompanyId = localStorage.getItem('company_id');
    if (storedCompanyId) {
      setCompanyId(storedCompanyId);
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
          <AddRentalForm companyId={companyId} onSummaryChange={handleSummaryChange} />
        </div>
        <div className={styles.summaryContainer}>
          <DetailsSummaryComponent summaryData={summaryData} />
        </div>
      </div>
    </div>
  );
}

export default RentalAdd;
