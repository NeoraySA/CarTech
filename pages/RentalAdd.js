import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';

import AddRentalForm from '../components/AddRentalForm';
import ListHeader from '../components/ListHeader';
import DetailsSummaryComponent from '../components/DetailsSummaryComponent'; // ייבוא הקומפוננטה החדשה
import styles from '../styles/AddForm.module.css'; // ודא שהנתיב נכון

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

function RentalAdd() {
  const [summaryData, setSummaryData] = useState(null); // עדכון לאובייקט עם נתוני החישוב

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const handleSummaryChange = async (startDate, estimatedReturn, carId, billingBasisId) => {
    if (!startDate || !estimatedReturn) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${apiUrl}/api/rentals/calculate`, {
        startDate: startDate.toISOString(),
        endDate: estimatedReturn.toISOString(),
        carId,
        billingBasisId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSummaryData(response.data);
    } catch (error) {
      console.error('Error calculating rental details:', error);
    }
  };

  const renderValue = (value) => {
    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        return value.map((item, index) => <div key={index}>{renderValue(item)}</div>);
      } else {
        return (
          <div>
            {Object.entries(value).map(([key, val]) => (
              <div key={key}>
                <strong>{key}:</strong> {renderValue(val)}
              </div>
            ))}
          </div>
        );
      }
    }
    return value;
  };

  const generateSummaryGroups = (data) => {
    const group = {
      title: 'פרטי השכרה',
      fields: Object.keys(data)
    };
    return [group];
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
          {summaryData && (
            <DetailsSummaryComponent
              summaryData={summaryData}
              summaryGroups={generateSummaryGroups(summaryData)}
              onEdit={(groupTitle) => {
                console.log(`Edit ${groupTitle}`);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default RentalAdd;
