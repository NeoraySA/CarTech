import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UniversalTable from './UniversalTable';
import Notification from './Notification';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from '../styles/CarList.module.css'; // וודא שהנתיב נכון

const CarList = ({ categoryId }) => {
  const [cars, setCars] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '', onConfirm: null });

  useEffect(() => {
    const fetchCars = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const token = localStorage.getItem('token');
      try {
        setNotification({ message: 'טוען רשימת רכבים...', type: 'info', onConfirm: null });
        const response = await axios.get(`${apiUrl}/api/cars?category_id=${categoryId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCars(response.data);
        setNotification({ message: '', type: '', onConfirm: null }); // Clear notification
      } catch (error) {
        console.error('Error fetching cars data:', error);
        setNotification({ message: 'שגיאה בשליפת רשימת הרכבים', type: 'error', onConfirm: null });
      }
    };

    fetchCars();
  }, [categoryId]);

  const columns = [
    { Header: 'מס\' רישוי', accessor: 'license_number' },
    { Header: 'יצרן ודגם', accessor: 'make_and_model' },
    { Header: 'צבע', accessor: 'color' },
    { Header: 'שנה', accessor: 'year' }
  ];


  return (
    <div className={styles.container}>
      <h2>רשימת רכבים</h2>
      <p>רשימת הרכבים המשויכים לקטגוריה זו</p>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '', onConfirm: null })}
        onConfirm={notification.onConfirm}
      />
      <UniversalTable data={cars} columns={columns} expandable={false} />
    </div>
  );
};

export default CarList;
