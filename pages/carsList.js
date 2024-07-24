import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';
import UniversalTable from '../components/UniversalTable';
import { FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';
import ListHeader from '../components/ListHeader';
import FilterComponent from '../components/FilterComponent';
import ListFooter from '../components/ListFooter';
import Notification from '../components/Notification';
import styles from '../styles/PageList.module.css';
import { formatNumber, formatCurrency, formatLicensePlate } from '../utils/formatUtils';

import withAuth from '../src/hoc/withAuth'; // נתיב לקובץ HOC

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '', onConfirm: null });
  const [filterValues, setFilterValues] = useState({
    license_number: { label: 'מספר רישוי', type: 'text', value: '' },
    make: { label: 'יצרן', type: 'text', value: '' },
    model: { label: 'דגם', type: 'text', value: '' },
    year: { label: 'שנה', type: 'number', value: '' },
    color: { label: 'צבע', type: 'text', value: '' },
    category: { label: 'קטגוריה', type: 'select', value: null }
  });
  const router = useRouter();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`${apiUrl}/api/cars`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCars(res.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleDelete = (row) => {
    setNotification({
      message: 'האם אתה בטוח שברצונך למחוק את הרכב?',
      type: 'confirm',
      onConfirm: () => confirmDelete(row.id)
    });
  };

  const confirmDelete = async (id) => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    try {
      await axios.delete(`${apiUrl}/api/cars/${id}`, { headers });
      setCars(cars.filter(car => car.id !== id));
      setNotification({ message: 'הרכב נמחק בהצלחה', type: 'success', onConfirm: null });
    } catch (error) {
      console.error('Error deleting car:', error);
      setNotification({ message: 'שגיאה במחיקת הרכב', type: 'error', onConfirm: null });
    }
  };

  const handleEdit = (row) => {
    if (row.id) {
      router.push(`/car-details/${row.id}`);
    } else {
      console.error("Car ID not found", row);
    }
  };

  const handleFilterChange = (filters) => {
    setFilterValues(filters);
  };

  const applyFilters = (data, filters) => {
    return data.filter((item) => {
      return Object.keys(filters).every((key) => {
        if (!filters[key].value) return true;
        if (key === 'category') {
          return item['category'] === filters[key].value;
        }
        return String(item[key]).toLowerCase().includes(filters[key].value.toLowerCase());
      });
    });
  };

  const filteredCars = applyFilters(cars, filterValues);

  const columns = [
    { Header: 'מס\' רישוי', accessor: 'license_number', Cell: ({ value }) => formatLicensePlate(value) },
    { Header: 'יצרן ודגם', accessor: 'make_and_model' },
    { Header: 'צבע', accessor: 'color' },
    { Header: 'שנה', accessor: 'year' },
    { 
      Header: 'קטגוריה', 
      accessor: 'category_name',
      isHighlighted: true, // הוספת הפרמטר כאן
      Cell: ({ row }) => (
        <span
          className="highlighted-cell"
          onClick={() => router.push(`/CarCategory/${row.original.category}`)}
          
        >
          {row.original.category_name}
        </span>
      )
    },
    { Header: 'זמין להשכרה', accessor: 'is_available', Cell: ({ value }) => value ? 'כן' : 'לא' },
    { 
      Header: 'מס\' השכרות', 
      accessor: 'rental_count',
      isHighlighted: true, // הוספת הפרמטר כאן
      Cell: ({ row }) => (
        <span
          className="highlighted-cell"
          onClick={() => router.push(`/RentalsList?car_license_number=${row.original.license_number}`)}
          
        >
          {row.original.rental_count}
        </span>
      )
    }
  ];

  const actionButtons = [
    {
      label: 'צפיה',
      icon: FaEye,
      onClick: handleEdit,
      permissions: ['edit_car']
    },
    {
      label: 'מחיקה',
      icon: FaTrash,
      onClick: handleDelete,
      permissions: ['delete_car']
    }
  ];

  const headerButtons = [
    {
      label: 'הוספת רכב חדש',
      onClick: () => router.push('/CarAdd'),
      icon: FaPlus,
      permissions: ['add_car']
    }
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>רשימת רכבים</title>
      </Head>
      <div className={styles.header}>
        <ListHeader
          title="רשימת רכבים"
          subtitle="רשימת הרכבים במערכת"
          showSearchBox={false}
          secondaryButtons={headerButtons}
        />
      </div>
      <div className={styles.main}>
        <div className={styles["table-container"]}>
          <UniversalTable
            data={filteredCars}
            columns={columns}
            actionButtons={actionButtons}
            expandable={false}
            imageAccessor="image_url"
          />
        </div>
        <div className={styles["filter-container"]}>
          <FilterComponent filters={filterValues} onFilterChange={handleFilterChange} />
        </div>
      </div>
      <ListFooter
        title='סה"כ רכבים:'
        content={filteredCars.length}
      />
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '', onConfirm: null })}
        onConfirm={notification.onConfirm}
      />
    </div>
  );
};

export default withAuth(CarList, ['cars_list']);