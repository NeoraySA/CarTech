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
    { Header: 'מספר רישוי', accessor: 'license_number' },
    { Header: 'דגם', accessor: 'model' },
    { Header: 'יצרן', accessor: 'make' },
    { Header: 'שנה', accessor: 'year' }
  ];


  return (
    <div className={styles.container}>
      <h3>רשימת רכבים</h3>
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
