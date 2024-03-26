import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarTable from './CarTable';
import ListHeader from './ListHeader';
import ListFooter from './ListFooter';
import './CarsList.css';

function CarsList() {
  const [cars, setCars] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await axios.get('http://localhost:3001/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    }
    fetchCars();
  }, []);

  const clearSearch = () => {
    setFilter("");
  };

  const filteredCars = filter.trim() ? cars.filter(car =>
    Object.values(car).some(value => 
      String(value).toLowerCase().includes(filter.toLowerCase())
    )
  ) : cars;

  return (
    <div className="car-list-container">
      <ListHeader
        title="רכבים"
        subtitle="רשימת הרכבים במערכת"
        filter={filter}
        setFilter={setFilter}
        clearSearch={clearSearch}
      />
      
      <CarTable data={filteredCars} />

      <ListFooter footerText={`סה"כ רכבים: ${filteredCars.length}`} />
    </div>
  );
}

export default CarsList;
