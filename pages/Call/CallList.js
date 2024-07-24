// pages/Call/CdrsListPage.js
import React, { useState, useMemo } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ListHeader from '../../components/ListHeader';
import UniversalTable from '../../components/UniversalTable';
import SearchForm from '../../components/SearchForm';
import Notification from '../../components/Notification';
import { formatDateTime, formatPhoneNumber } from '../../utils/formatUtils';
import translations from '../../src/translations'; // ייבוא התרגומים
import { FaInfoCircle } from 'react-icons/fa';

import styles from '../../styles/PageList.module.css';

import withAuth from '../../src/hoc/withAuth'; // נתיב לקובץ HOC


const CdrsListPage = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [phone, setPhone] = useState('');
  const [period, setPeriod] = useState('');
  const [cdrs, setCdrs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  const fetchCdrs = async () => {
    if (!start || !end) {
      setNotification({ message: 'נא להזין תאריך התחלה ותאריך סיום!', type: 'error' });
      return;
    }

    setLoading(true);
    setNotification({ message: 'טוען רשימת שיחות...', type: 'loading' });

    const token = localStorage.getItem('token');

    const currentDate = new Date();
    let startDate, endDate;

    switch (period) {
      case 'week':
        startDate = new Date(currentDate.setDate(currentDate.getDate() - 7));
        break;
      case '3months':
        startDate = new Date(currentDate.setMonth(currentDate.getMonth() - 3));
        break;
      case 'year':
        startDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1));
        break;
      default:
        startDate = start ? new Date(start) : undefined;
        endDate = end ? new Date(end) : undefined;
        break;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/api/pbx/cdrs/list`,
        {
          start: startDate ? Math.floor(startDate.getTime() / 1000) : undefined,
          end: endDate ? Math.floor(endDate.getTime() / 1000) : undefined,
          caller_number: phone
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Response from server:', response.data);
      setCdrs(Array.isArray(response.data) ? response.data : []);
      setNotification({ message: 'השיחות נטענו בהצלחה!', type: 'success' });
    } catch (err) {
      if (err.response) {
        console.error('Error response from server:', err.response);
        setNotification({ message: `שגיאה בטעינת השיחות!: ${err.response.data.error} - ${JSON.stringify(err.response.data.details)}`, type: 'error' });
      } else {
        setNotification({ message: 'שגיאה בטעינת השיחות מהשרת!', type: 'error' });
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const columns = useMemo(() => [
    { Header: 'מס\' מתקשר', accessor: 'callerid_external', Cell: ({ value }) => formatPhoneNumber(value) },
    { Header: 'ד', accessor: 'dnumber' },
    { Header: 'התחלה', accessor: 'start', Cell: ({ value }) => formatDateTime(value * 1000) },
    { Header: 'סיום', accessor: 'end', Cell: ({ value }) => formatDateTime(value * 1000) },
    { Header: 'משך שיחה', accessor: 'duration', Cell: ({ row }) => formatDuration(row.original.end - row.original.start) },
    { Header: 'סוג מענה', accessor: 'stype', Cell: ({ value }) => translations.stype_values[value] || value },
    { Header: 'עונה', accessor: 'dnumber_name' },
    { Header: 'סטטוס', accessor: 'status', Cell: ({ value }) => translations.status_values[value] || value },
  ], []);

  const actionButtons = [
    {
      label: 'פרטי השיחה',
      onClick: (row) => router.push(`/Call/${row.uniqueid}`),
      icon: FaInfoCircle,
      permissions: ['cars_list']
    }
  ];

  const headerButtons = [
    {
      label: 'רשימת רכבים',
      onClick: () => router.push('/carsList'),
      permissions: ['cars_list']
    }
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>רשימת שיחות</title>
      </Head>
      <ListHeader
        title="רשימת שיחות"
        subtitle="פרטי השיחות המתקבלות"
        showSearchBox={false}  // מונע את הצגת תיבת החיפוש
        secondaryButtons={headerButtons}
      />
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />
      <div className={styles.main2}>
      <SearchForm
        start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
        phone={phone}
        setPhone={setPhone}
        period={period}
        setPeriod={setPeriod}
        onSearch={fetchCdrs}
        loading={loading}
        labels={{
          startTime: 'תאריך התחלה',
          endTime: 'תאריך סיום',
          phoneNumber: 'מספר טלפון',
          period: 'טווח תאריכים',
          searchButton: 'חיפוש'
        }}
        setNotification={setNotification}
      />
      <div className={styles.main}>
        
        
      <div className={styles["table-container"]}>
      <UniversalTable data={cdrs} columns={columns} tableType="cdrs" actionButtons={actionButtons} />
      </div>


      </div>
      </div>
    </div>
  );
};

export default withAuth(CdrsListPage, ['call_list']);
