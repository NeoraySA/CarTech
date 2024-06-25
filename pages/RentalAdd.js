import React, { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';
import AddRentalForm from '../components/AddRentalForm';
import ListHeader from '../components/ListHeader';
import ModalComponent from '../components/ModalComponent';
import SearchDetails from '../components/SearchDetails';
import CarAvailabilityList from '../components/CarAvailabilityList';
import Notification from '../components/Notification';
import styles from '../styles/AddForm.module.css';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

function RentalAdd() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableCars, setAvailableCars] = useState([]);
  const [rentalDetails, setRentalDetails] = useState({
    customer_id: '',
    start_date: new Date(),
    estimated_return: new Date(),
    is_new_driver: false,
    is_young_driver: false,
  });
  const [notification, setNotification] = useState({ message: '', type: '', onConfirm: null });

  const handleRentalSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
  
      if (!token) {
        throw new Error("Missing token in local storage");
      }
  
      const response = await axios.post(`${apiUrl}/api/rentals/availability`, {
        startDate: rentalDetails.start_date.toISOString(),
        endDate: rentalDetails.estimated_return.toISOString(),
        isNewDriver: rentalDetails.is_new_driver,
        isYoungDriver: rentalDetails.is_young_driver,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      setAvailableCars(response.data.cars);
      setRentalDetails(prevDetails => ({
        ...prevDetails,
        totalDays: response.data.totalDays,
        saturdays: response.data.saturdays,
        weekdays: response.data.weekdays
      }));
      setIsModalOpen(true);
  
    } catch (error) {
      setNotification({ message: 'Error fetching rental availability: ' + error.message, type: 'error' });
    }
  };
  

  const handleCarSelection = (selectedCar) => {
    setRentalDetails(prevDetails => ({
      ...prevDetails,
      selected_car: selectedCar,
      km_limit_per_unit: selectedCar.kmLimitPerUnit,
      km_units: selectedCar.kmUnits, // Assuming km_units is totalKmLimit, adjust if necessary
      price_per_km: selectedCar.extraKmPrice,
      current_km: selectedCar.current_km,
      current_fuel_level: selectedCar.current_fuel_level
    }));
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRentalDetails(prevDetails => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDateChange = (name, date) => {
    setRentalDetails(prevDetails => ({
      ...prevDetails,
      [name]: date
    }));
  };

  const handleCustomerChange = (customer) => {
    setRentalDetails(prevDetails => ({
      ...prevDetails,
      customer_id: customer.value
    }));
  };

  const confirmSubmit = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error("Missing token in local storage");
      }

      const response = await axios.post(`${apiUrl}/api/rentals`, {
        customer_id: rentalDetails.customer_id,
        start_date: rentalDetails.start_date.toISOString(),
        end_date: rentalDetails.estimated_return.toISOString(),
        car_id: rentalDetails.selected_car.id,
        km_pickup: rentalDetails.selected_car.current_km,
        fuel_pickup: rentalDetails.selected_car.current_fuel_level,
        km_limit_per_unit: rentalDetails.km_limit_per_unit,
        km_units: rentalDetails.km_units,
        price_per_km: rentalDetails.price_per_km,
        company_id: rentalDetails.company_id,
        branch_id: rentalDetails.branch_id,
        pickup_branch: rentalDetails.branch_id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      router.push(`/rentals/${response.data.rental_id}`); // Redirect to rentals page after successful submission
    } catch (error) {
      setNotification({ message: 'Error submitting rental: ' + error.message, type: 'error' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rentalDetails.selected_car) {
      setNotification({ message: "Please select a car before submitting.", type: 'info' });
      return;
    }
    setNotification({
      message: 'Are you sure you want to add this rental?',
      type: 'info',
      onConfirm: confirmSubmit,
      onClose: () => setNotification({ message: '', type: '', onConfirm: null })
    });
  };

  return (
    <div>
      <Head>
        <title>הוספת השכרה חדשה</title>
      </Head>
      <ListHeader
        title="הוספת השכרה חדשה"
        subtitle="מילוי פרטי השכרה"
        showSearchBox={false}
      />
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <AddRentalForm
            rentalDetails={rentalDetails}
            onInputChange={handleInputChange}
            onDateChange={handleDateChange}
            onCustomerChange={handleCustomerChange}
            onOpenModal={handleRentalSubmit}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
      <ModalComponent isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="בחירת רכב">
  {rentalDetails && (
    <>
      <SearchDetails 
        startDate={rentalDetails.start_date.toISOString()}
        endDate={rentalDetails.estimated_return.toISOString()}
        isNewDriver={rentalDetails.is_new_driver}
        isYoungDriver={rentalDetails.is_young_driver}
        totalDays={rentalDetails.totalDays}
        saturdays={rentalDetails.saturdays}
        weekdays={rentalDetails.weekdays}
      />
      <CarAvailabilityList cars={availableCars} onSelectCar={handleCarSelection} />
    </>
  )}
</ModalComponent>

      <Notification
        message={notification.message}
        type={notification.type}
        onClose={notification.onClose}
        onConfirm={notification.onConfirm}
      />
    </div>
  );
}

export default RentalAdd;
