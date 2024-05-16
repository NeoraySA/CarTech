import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import CarTable from '../components/CarTable';
import ListHeader from '../components/ListHeader';
import ListFooter from '../components/ListFooter';

function CarsList() {
  const [cars, setCars] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const token = localStorage.getItem('token');
      const company_id = localStorage.getItem('company_id');
      const branch_id = localStorage.getItem('branch_id');

      try {
        const response = await axios.get(`${apiUrl}/api/cars`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-Company-ID': company_id, // שליחת מזהה החברה בכותרות
            'X-Branch-ID': branch_id  // שליחת מזהה הסניף בכותרות
          }
        });
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const clearSearch = () => setFilter("");

  const filteredCars = filter.trim() ? cars.filter(car => 
    Object.values(car).some(value => 
      String(value).toLowerCase().includes(filter.toLowerCase())
    )
  ) : cars;

  return (
    <div className="car-list-container">
      <Head>
        <title>רשימת רכבים</title>
      </Head>
      <ListHeader
        title="רכבים"
        subtitle="רשימת הרכבים במערכת"
        filter={filter}
        setFilter={setFilter}
        clearSearch={clearSearch}
      />

      <CarTable data={filteredCars} />

      <ListFooter
        title='סה"כ רכבים:'
        content={filteredCars.length}
      />
    </div>
  );
}

export default CarsList;
