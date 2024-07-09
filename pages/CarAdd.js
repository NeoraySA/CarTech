import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import AddCarForm from '../components/AddCarForm';
import ListHeader from '../components/ListHeader';
import Notification from '../components/Notification';
import { useRouter } from 'next/router';

function CarAdd() {
  const [carDetails, setCarDetails] = useState({
    license_number: '',
    make: '',
    model: '',
    year: '',
    color: '',
    transmission_type: 'אוטומט',
    fuel_type: '',
    passenger: '',
    km_to_next_service: '',
    test_date: '',
    category: '',
    status_id: 1,  // ערך ברירת מחדל
    is_available: true,  // ערך ברירת מחדל
    current_km: 0,  // ערך ברירת מחדל
    current_fuel_level: '',  // ערך ברירת מחדל
    image_url: ''  // ערך ברירת מחדל לתמונה
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '', onConfirm: null });
  const router = useRouter(); // הוספת useRouter מ-Next.js

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleCategoryChange = (selectedOption) => {
    setCarDetails(prevDetails => ({
      ...prevDetails,
      category: selectedOption ? selectedOption.value : ''
    }));
  };

  const handleFuelLevelChange = (selectedOption) => {
    setCarDetails(prevDetails => ({
      ...prevDetails,
      current_fuel_level: selectedOption ? selectedOption.value : ''
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const token = localStorage.getItem('token');
      axios.post(`${apiUrl}/api/upload`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setCarDetails(prevDetails => ({
          ...prevDetails,
          image_url: response.data.imageUrl
        }));
        setNotification({ message: 'התמונה הועלתה בהצלחה!', type: 'success', onConfirm: null });
      })
      .catch(error => {
        console.error('Error uploading image:', error);
        setNotification({ message: 'שגיאה בהעלאת התמונה', type: 'error', onConfirm: null });
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotification({
      message: 'האם אתה בטוח שברצונך להוסיף את הרכב?',
      type: 'info',
      onConfirm: confirmAddCar
    });
  };

  const confirmAddCar = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const token = localStorage.getItem('token');
    setNotification({ message: 'מוסיף רכב...', type: 'info' });
    try {
      const response = await axios.post(`${apiUrl}/api/cars`, carDetails, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 201) {
        setNotification({ message: 'הרכב נוסף בהצלחה!', type: 'success', onConfirm: null });
        const newCarId = response.data.carId; // הנחת שה-ID של הרכב החדש מוחזר מהשרת כ-response.data.carId
        router.push(`/car-details/${newCarId}`); // ניווט לדף פרטי הרכב
      }
    } catch (error) {
      console.error('Failed to add the car:', error);
      setNotification({ message: 'הוספת הרכב נכשלה!', type: 'error', onConfirm: null });
    }
  };

  const fetchCarDetails = async () => {
    setLoading(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${apiUrl}/api/transportMinistryData/vehicle/${carDetails.license_number}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data) {
        const record = response.data;
        setCarDetails(prevDetails => ({
          ...prevDetails,
          make: record.tozar,
          model: record.kinuy_mishari,
          year: record.shnat_yitzur,
          color: record.tzeva_rechev,
          fuel_type: record.sug_delek_nm,
          test_date: record.tokef_dt,
          passenger: record.mispar_moshavim
        }));
        setNotification({ message: 'פרטי הרכב התקבלו בהצלחה!', type: 'success', onConfirm: null });
      }
    } catch (error) {
      console.error('Error fetching car details:', error);
      setNotification({ message: 'שגיאה בקבלת פרטי הרכב', type: 'error', onConfirm: null });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>הוספת רכב חדש</title>
      </Head>
      <ListHeader
        title="הוספת רכב חדש"
        subtitle="מילוי פרטי הרכב"
        showSearchBox={false}  // מונע את הצגת תיבת החיפוש
      />
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '', onConfirm: null })}
        onConfirm={notification.onConfirm}
      />
      <AddCarForm
        carDetails={carDetails}
        handleInputChange={handleInputChange}
        handleCategoryChange={handleCategoryChange}
        handleFuelLevelChange={handleFuelLevelChange}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
        fetchCarDetails={fetchCarDetails}
        loading={loading}
      />
    </div>
  );
}

export default CarAdd;
