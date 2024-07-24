import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';
import UniversalTable from '../components/UniversalTable';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ListHeader from '../components/ListHeader';
import FilterComponent from '../components/FilterComponent';
import ListFooter from '../components/ListFooter';
import styles from '../styles/PageList.module.css';

import withAuth from '../src/hoc/withAuth'; // נתיב לקובץ HOC

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const [filterValues, setFilterValues] = useState({
    first_name: { label: 'שם פרטי', type: 'text', value: '' },
    last_name: { label: 'שם משפחה', type: 'text', value: '' },
    city: { label: 'עיר', type: 'text', value: '' },
    country: { label: 'מדינה', type: 'text', value: '' },
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${apiUrl}/api/customers`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCustomers(res.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setError("Error fetching customers");
      }
    };

    fetchCustomers();
  }, []);

  const clearSearch = () => setFilter("");

  const handleFilterChange = (filters) => {
    setFilterValues(filters);
  };

  const applyFilters = (data, filters) => {
    return data.filter((item) => {
      return Object.keys(filters).every((key) => {
        if (!filters[key].value) return true;
        return item[key] && String(item[key]).toLowerCase().includes(filters[key].value.toLowerCase());
      });
    });
  };

  const filteredCustomers = applyFilters(customers, filterValues);

  const columns = [
    { Header: 'שם פרטי', accessor: 'first_name' },
    { Header: 'שם משפחה', accessor: 'last_name' },
    { Header: 'טלפון נייד', accessor: 'cellphone' },
    { Header: 'דוא"ל', accessor: 'email' },
    { Header: 'עיר', accessor: 'city' },
    { Header: 'מדינה', accessor: 'country' },
  ];

  const actionButtons = [
    { 
      label: 'הצגה', 
      icon: FaEdit, 
      onClick: (row) => {
        if (row && row.customer_id) {
          router.push(`/CustomerDetails/${row.customer_id}`);
        } else {
          console.error("Customer ID not found", row);
        }
      }
    },
    { label: 'מחק', icon: FaTrash, onClick: (row) => console.log('Delete customer', row) }
  ];


  const headerButtons = [
    {
      label: 'הוספת לקוח חדש',
      onClick: () => router.push('/CustomerAdd'),
      
      permissions: ['add_customer']
    }
  ];


  return (
    <div className={styles.container}>
      <Head>
        <title>רשימת לקוחות</title>
      </Head>
      <div className={styles.header}>
        <ListHeader
          title="רשימת לקוחות"
          subtitle="רשימת הלקוחות במערכת"
          showSearchBox={false} // הוספת showSearchBox={false}
          secondaryButtons={headerButtons}
        />
      </div>
      <div className={styles.main}>
        
        <div className={styles["table-container"]}>
          {error ? (
            <p>{error}</p>
          ) : (
            <UniversalTable data={filteredCustomers} columns={columns} actionButtons={actionButtons} expandable={false} />
          )}
        </div>
        <div className={styles["filter-container"]}>
          <FilterComponent filters={filterValues} onFilterChange={handleFilterChange} />
        </div>
      </div>
      <ListFooter
        title='סה"כ לקוחות:'
        content={filteredCustomers.length}
      />
    </div>
  );
};

export default withAuth(CustomersList, ['customers_list']);

