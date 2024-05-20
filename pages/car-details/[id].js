// pages/car-details/[id].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import CarDetails from '../../components/CarDetails';

function CarDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [car, setCar] = useState(null);

  useEffect(() => {
    async function fetchCar() {
      if (id) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const token = localStorage.getItem('token'); // קבלת הטוקן מ-localStorage
        try {
          const response = await axios.get(`${apiUrl}/api/cars/${id}`, {
            headers: { Authorization: `Bearer ${token}` } // הוספת הטוקן לכותרות הבקשה
          });
          setCar(response.data);
        } catch (error) {
          console.error('Error fetching car details:', error);
        }
      }
    }
    fetchCar();
  }, [id]);

  return (
    <div>
      {car ? <CarDetails car={car} /> : <p>טוען פרטי רכב...</p>}
    </div>
  );
}

export default CarDetailsPage;
