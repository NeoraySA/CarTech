import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

function DriverSelector({ value, onChange, customerId }) {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    async function fetchDrivers() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('האסימון אינו נמצא באחסון המקומי');
        return;
      }
      setLoading(true);
      try {
        const query = `${apiUrl}/api/customers/drivers?customerId=${customerId}`;
        console.log('שולח בקשה אל:', query);
        const response = await axios.get(query, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('תגובה:', response);
        if (response.status === 200 && Array.isArray(response.data)) {
          const driverOptions = response.data.map(driver => ({
            value: driver.driver_id,
            label: `${driver.first_name} ${driver.last_name} (${driver.license_number})`,
            driver // שמירת כל פרטי הנהג
          }));
          setDrivers(driverOptions);
          console.log('אופציות נהגים:', driverOptions);
        } else {
          console.error('תגובה לא תקינה:', response);
          throw new Error('תגובה לא תקינה');
        }
      } catch (error) {
        console.error('נכשל בשליפת נהגים:', error);
        console.error('פרטי השגיאה:', error.response ? error.response.data : 'אין נתוני תגובה');
      } finally {
        setLoading(false);
      }
    }

    if (customerId) {
      console.log('מזהה הלקוח:', customerId);
      fetchDrivers();
    } else {
      console.log('מזהה הלקוח אינו מוגדר');
    }
  }, [apiUrl, customerId]);

  return (
    <Select
  value={drivers.find(option => option.value === value)}
  options={drivers}
  onChange={option => {
    console.log('נבחר נהג:', option);
    onChange(option); // שינוי כאן, מעבירים את האובייקט כולו
  }}
  placeholder="בחר נהג..."
  noOptionsMessage={() => 'לא נמצאו תוצאות'}
  isLoading={loading}
/>

  );
}

export default DriverSelector;
