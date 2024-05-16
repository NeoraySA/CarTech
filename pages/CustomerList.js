import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import CustomerTable from '../components/CustomerTable';
import ListHeader from '../components/ListHeader';
import ListFooter from '../components/ListFooter';

function CustomersList() {
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'; // שימוש במשתנה סביבה
      const token = localStorage.getItem('token'); // קריאה של הטוקן מ-localStorage

      try {
        const response = await axios.get(`${apiUrl}/api/customers`, {
          headers: {
            Authorization: `Bearer ${token}` // הוספת הטוקן לכותרות הבקשה
          }
        });
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
        // טיפול בשגיאה או הצגת הודעה למשתמש
      }
    };

    fetchCustomers();
  }, []);

  const clearSearch = () => setFilter("");

  const filteredCustomers = filter.trim() ? customers.filter(customer => 
    Object.values(customer).some(value => 
      String(value).toLowerCase().includes(filter.toLowerCase())
    )
  ) : customers;

  return (
    <div className="customer-list-container">
      <Head>
        <title>רשימת לקוחות</title>
      </Head>
      <ListHeader
        title="לקוחות"
        subtitle="רשימת הלקוחות במערכת"
        filter={filter}
        setFilter={setFilter}
        clearSearch={clearSearch}
      />

      <CustomerTable data={filteredCustomers} />

      <ListFooter
        title='סה"כ לקוחות:'
        content={filteredCustomers.length}
      />
    </div>
  );
}

export default CustomersList;
