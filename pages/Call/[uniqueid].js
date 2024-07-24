// pages/Call/[uniqueid].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import ListHeader from '../../components/ListHeader';
import Notification from '../../components/Notification';
import UniversalDetailView from '../../components/UniversalDetailView'; // קובץ הקומפוננטה החדשה


import withAuth from '../../src/hoc/withAuth'; // נתיב לקובץ HOC

const CallDetailsPage = () => {
  const router = useRouter();
  const { uniqueid } = router.query;
  const [callDetails, setCallDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    if (uniqueid) {
      fetchCallDetails(uniqueid);
    }
  }, [uniqueid]);

  const fetchCallDetails = async (id) => {
    setLoading(true);
    setNotification({ message: 'טוען פרטי שיחה...', type: 'loading' });

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        `${apiUrl}/api/pbx/cdrs/get`,
        {
          uniqueid: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Response from server:', response.data);

      if (response.data) {
        setCallDetails(response.data);
        console.log('Call Details:', response.data);
      }

      setNotification({ message: 'פרטי השיחה נטענו בהצלחה!', type: 'success' });
    } catch (err) {
      if (err.response) {
        console.error('Error response from server:', err.response);
        setNotification({ message: `שגיאה בטעינת פרטי השיחה!: ${err.response.data.error} - ${JSON.stringify(err.response.data.details)}`, type: 'error' });
      } else {
        setNotification({ message: 'שגיאה בטעינת פרטי השיחה מהשרת!', type: 'error' });
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const headerButtons = [
    {
      label: 'רשימת שיחות',
      onClick: () => router.push('/Call/CallList'),
      permissions: ['call_list']
    }
  ];

  return (
    <div>
      <Head>
        <title>פרטי שיחה</title>
      </Head>
      <ListHeader
        title="פרטי שיחה"
        subtitle="כאן מוצגים פרטי השיחה"
        showSearchBox={false}
        secondaryButtons={headerButtons}
      />
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />
      {loading ? (
        <p>טוען...</p>
      ) : (
        callDetails && <UniversalDetailView details={callDetails} />
      )}
    </div>
  );
};


export default withAuth(CallDetailsPage, ['call_details']);
