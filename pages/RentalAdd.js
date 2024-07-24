import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';
import AddRentalForm from '../components/AddRentalForm';
import ListHeader from '../components/ListHeader';
import ModalComponent from '../components/ModalComponent';
import SearchDetails from '../components/SearchDetails';
import CarAvailabilityList from '../components/CarAvailabilityList';
import Notification from '../components/Notification';
import AddCustomerForm from '../components/AddCustomerForm';
import styles from '../styles/AddForm.module.css';

import withAuth from '../src/hoc/withAuth'; // נתיב לקובץ HOC

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

function RentalAdd() {
  const router = useRouter();
  const [isCarModalOpen, setIsCarModalOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [availableCars, setAvailableCars] = useState([]);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [rentalDetails, setRentalDetails] = useState({
    customer_id: '',
    pickup_date: new Date(),
    pickup_time: new Date(),
    return_date: new Date(),
    return_time: new Date(),
    is_new_driver: false,
    is_young_driver: false,
  });
  const [notification, setNotification] = useState({ message: '', type: '', onConfirm: null });
  const [formData, setFormData] = useState({
    id_number: '',
    last_name: '',
    first_name: '',
    company_name: '',
    telephone: '',
    cellphone: '',
    fax: '',
    email: '',
    city: '',
    street: '',
    building_number: '',
    country: '',
    gender_id: '',
    category: '',
    referral: '',
    vat_exempt: false,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${apiUrl}/api/settings/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const settingsData = response.data;
        setSettings(settingsData);

        if (settingsData.return_same_time_as_pickup === 'yes') {
          setRentalDetails(prevDetails => ({
            ...prevDetails,
            return_time: prevDetails.pickup_time
          }));
        } else if (settingsData.default_return_time) {
          const defaultReturnTime = new Date();
          const [hours, minutes] = settingsData.default_return_time.split(':');
          defaultReturnTime.setHours(hours);
          defaultReturnTime.setMinutes(minutes);
          setRentalDetails(prevDetails => ({
            ...prevDetails,
            return_time: defaultReturnTime
          }));
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch settings:', error);
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const validateForm = () => {
    const { customer_id, pickup_date, pickup_time, return_date, return_time } = rentalDetails;

    if (!customer_id) {
      setNotification({ message: 'נא לבחור לקוח.', type: 'error' });
      return false;
    }
    if (!pickup_date) {
      setNotification({ message: 'נא לבחור תאריך איסוף.', type: 'error' });
      return false;
    }
    if (!pickup_time) {
      setNotification({ message: 'נא לבחור שעת איסוף.', type: 'error' });
      return false;
    }
    if (!return_date) {
      setNotification({ message: 'נא לבחור תאריך החזרה.', type: 'error' });
      return false;
    }
    if (!return_time) {
      setNotification({ message: 'נא לבחור שעת החזרה.', type: 'error' });
      return false;
    }
    return true;
  };

  const handleRentalSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Missing token in local storage");
      }

      const startDateTime = new Date(rentalDetails.pickup_date);
      startDateTime.setHours(rentalDetails.pickup_time.getHours());
      startDateTime.setMinutes(rentalDetails.pickup_time.getMinutes());

      const endDateTime = new Date(rentalDetails.return_date);
      endDateTime.setHours(rentalDetails.return_time.getHours());
      endDateTime.setMinutes(rentalDetails.return_time.getMinutes());

      const response = await axios.post(`${apiUrl}/api/rentals/availability`, {
        startDate: startDateTime.toISOString(),
        endDate: endDateTime.toISOString(),
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
        weekdays: response.data.weekdays,
        pickup_date: new Date(response.data.startDate),
        return_date: new Date(response.data.endDate)
      }));
      setIsCarModalOpen(true);

    } catch (error) {
      setNotification({ message: 'Error fetching rental availability: ' + error.message, type: 'error' });
    }
  };

  const handleDateChange = (name, date) => {
    setRentalDetails(prevDetails => ({
      ...prevDetails,
      [name]: date
    }));
    if (name === 'pickup_date' && settings.return_same_time_as_pickup === 'yes') {
      setRentalDetails(prevDetails => ({
        ...prevDetails,
        return_date: date,
        return_time: prevDetails.pickup_time
      }));
    }
  };

  const handleCarSelection = (selectedCar) => {
    setRentalDetails(prevDetails => ({
      ...prevDetails,
      selected_car: selectedCar,
      km_limit_per_unit: selectedCar.kmLimitPerUnit,
      km_units: selectedCar.kmUnits,
      price_per_km: selectedCar.extraKmPrice,
      current_km: selectedCar.current_km,
      current_fuel_level: selectedCar.current_fuel_level,
      toll_fee: selectedCar.toll_fee,
      traffic_fee: selectedCar.traffic_fee,
      vat_percentage: selectedCar.vat_percentage
    }));
    setIsCarModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRentalDetails(prevDetails => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value
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
        start_date: rentalDetails.pickup_date.toISOString(),
        end_date: rentalDetails.return_date.toISOString(),
        car_id: rentalDetails.selected_car.id,
        km_pickup: rentalDetails.selected_car.current_km,
        fuel_pickup: rentalDetails.selected_car.current_fuel_level,
        km_limit_per_unit: rentalDetails.km_limit_per_unit,
        km_units: rentalDetails.km_units,
        price_per_km: rentalDetails.price_per_km,
        company_id: rentalDetails.company_id,
        branch_id: rentalDetails.branch_id,
        pickup_branch: rentalDetails.branch_id,
        toll_fee: rentalDetails.toll_fee,
        traffic_fee: rentalDetails.traffic_fee,
        vat_percentage: rentalDetails.vat_percentage

      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      router.push(`/rentals/${response.data.rental_id}`);
    } catch (error) {
      setNotification({ message: 'Error submitting rental: ' + error.message, type: 'error' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rentalDetails.selected_car) {
      setNotification({ message: "נא לבחור את הרכב הרצוי!", type: 'error' });
      return;
    }
    setNotification({
      message: 'האם אתה בטוח שברצונך להקים חוזה השכרה?',
      type: 'info',
      onConfirm: confirmSubmit,
      onClose: () => setNotification({ message: '', type: '', onConfirm: null })
    });
  };

  const handleCustomerSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error("Missing token in local storage");
      }

      const response = await axios.post(`${apiUrl}/api/customers`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setNotification({ message: 'לקוח נוסף בהצלחה', type: 'success' });
      setIsCustomerModalOpen(false);

      // Update rental details with new customer
      handleCustomerChange({ value: response.data.customer_id });
    } catch (error) {
      setNotification({ message: 'Error adding customer: ' + error.message, type: 'error' });
    }
  };

  const rentalsList = () => {
    router.push('/RentalsList');
  };

  if (loading) {
    return <div>טוען נתונים...</div>;
  }

  return (
    <div>
      <Head>
        <title>הוספת השכרה חדשה</title>
      </Head>
      <ListHeader
        title="פתיחת חוזה"
        subtitle="נא לבחור את הלקוח, התאריכים והרכב הרצויים"
        showSearchBox={false}
        buttons={[
          {
            label: 'הקמת חוזה',
            onClick: handleSubmit
          }
        ]}
        secondaryButtons={[
          {
            label: 'רשימת חוזים',
            onClick: rentalsList,
            permissions: ['rentals_list']
          }
        ]}
      />
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <AddRentalForm
            rentalDetails={rentalDetails}
            onInputChange={handleInputChange}
            onDateChange={handleDateChange}
            onCustomerChange={handleCustomerChange}
            onOpenModal={handleRentalSubmit}
            onAddCustomerClick={() => setIsCustomerModalOpen(true)}
            onSubmit={handleSubmit}
            settings={settings}
          />
        </div>
      </div>
      <ModalComponent isOpen={isCarModalOpen} onClose={() => setIsCarModalOpen(false)} title="בחירת רכב">
        {rentalDetails && (
          <>
            <SearchDetails 
              startDate={rentalDetails.pickup_date.toISOString()}
              endDate={rentalDetails.return_date.toISOString()}
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

      <ModalComponent isOpen={isCustomerModalOpen} onClose={() => setIsCustomerModalOpen(false)} title="הוספת לקוח חדש">
        <AddCustomerForm 
          formData={formData}
          handleChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          handleSubmit={handleCustomerSubmit}
        />
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

export default withAuth(RentalAdd, ['add_rental']);
