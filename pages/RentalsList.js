import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';
import UniversalTable from '../components/UniversalTable';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ListHeader from '../components/ListHeader';
import FilterComponent from '../components/FilterComponent';
import styles from '../styles/RentalsList.module.css';
import {
  formatNumber,
  formatCurrency,
  formatDateTime,
  formatDateOnly,
  formatLicensePlate
} from '../utils/formatUtils'; // ייבוא הפונקציות מהקובץ formatUtils

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const RentalsList = () => {
  const [rentals, setRentals] = useState([]);
  const [filter, setFilter] = useState(""); // הוספת הגדרה של filter ו-setFilter
  const [error, setError] = useState(null);
  const router = useRouter();
  const [filterValues, setFilterValues] = useState({
    customer_full_name: { label: 'שם הלקוח', type: 'text', value: '' },
    status_name: { label: 'סטטוס', type: 'text', value: '' },
    start_date: { label: 'תאריך התחלה', type: 'date', value: '' },
    end_date: { label: 'תאריך סיום', type: 'date', value: '' },
  });

  useEffect(() => {
    const fetchRentals = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${apiUrl}/api/rentals`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRentals(res.data);
      } catch (error) {
        console.error("Error fetching rentals:", error);
        setError("Error fetching rentals");
      }
    };

    fetchRentals();
  }, []);

  const clearSearch = () => setFilter("");

  const handleFilterChange = (filters) => {
    setFilterValues(filters);
  };

  const applyFilters = (data, filters) => {
    return data.filter((item) => {
      return Object.keys(filters).every((key) => {
        if (!filters[key].value) return true;
        if (key === 'start_date' || key === 'end_date') {
          const itemDate = new Date(item[key]);
          const filterDate = new Date(filters[key].value);
          return key === 'start_date' ? itemDate >= filterDate : itemDate <= filterDate;
        }
        return item[key] && String(item[key]).toLowerCase().includes(filters[key].value.toLowerCase());
      });
    });
  };

  const filteredRentals = applyFilters(rentals, filterValues);

  const columns = [
    { Header: 'מזהה', accessor: 'rental_id' },
    { Header: 'שם הלקוח', accessor: 'customer_full_name' },
    { Header: 'מס רישוי', accessor: 'car_license_number', Cell: ({ value }) => formatLicensePlate(value) },
    { Header: 'יצרן ודגם', accessor: 'car_make_model' },
    { Header: 'תאריך התחלה', accessor: 'start_date', Cell: ({ value }) => formatDateTime(value) },
    { Header: 'תאריך סיום', accessor: 'end_date', Cell: ({ value }) => formatDateTime(value) },
    { Header: 'סטטוס', accessor: 'status_name' }
  ];

  const actionButtons = [
    { 
      label: 'הצגה', 
      icon: FaEdit, 
      onClick: (row) => {
        if (row && row.rental_id) {
          router.push(`/rentals/${row.rental_id}`);
        } else {
          console.error("Rental ID not found", row);
        }
      }
    },
    { label: 'מחק', icon: FaTrash, onClick: (row) => console.log('Delete rental', row) }
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>רשימת השכרות</title>
      </Head>
      <div className={styles.header}>
        <ListHeader
          title="רשימת חוזה השכרה"
          subtitle="רשימת חוזה השכרה במערכת"
          filter={filter}
          setFilter={setFilter}
          clearSearch={clearSearch}
        />
      </div>
      <div className={styles.main}>
        <div className={styles["filter-container"]}>
          <FilterComponent filters={filterValues} onFilterChange={handleFilterChange} />
        </div>
        <div className={styles["table-container"]}>
          {error ? (
            <p>{error}</p>
          ) : (
            <UniversalTable data={filteredRentals} columns={columns} actionButtons={actionButtons} imageAccessor="car_image_url" />
          )}
        </div>
      </div>
    </div>
  );
};

export default RentalsList;
