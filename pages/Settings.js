// pages/SettingsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import UniversalTabsComponent from '../components/UniversalTabsComponent';
import SettingsForm from '../components/SettingsForm';
import Notification from '../components/Notification';
import ListHeader from '../components/ListHeader';
import styles from '../styles/SettingsPage.module.css';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

function SettingsPage() {
  const [settings, setSettings] = useState({
    toll_fee: '',
    traffic_fee: '',
    return_same_time_as_pickup: 'no',
    default_return_time: '',
    vat_percentage: ''
  });
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchSettings = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${apiUrl}/api/settings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.status === 200) {
          const fetchedSettings = response.data || {};
          setSettings({
            toll_fee: fetchedSettings.toll_fee || '',
            traffic_fee: fetchedSettings.traffic_fee || '',
            return_same_time_as_pickup: fetchedSettings.return_same_time_as_pickup || 'no',
            default_return_time: fetchedSettings.default_return_time || '',
            vat_percentage: fetchedSettings.vat_percentage || ''
          });
        } else {
          throw new Error('Failed to fetch settings');
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
        setNotification({ message: 'Failed to fetch settings', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? (checked ? 'yes' : 'no') : value
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      await axios.put(`${apiUrl}/api/settings`, { settings }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotification({ message: 'Settings saved successfully', type: 'success' });
    } catch (error) {
      console.error('Error saving settings:', error);
      setNotification({ message: 'Failed to save settings', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const tabsConfig = [
    {
      title: 'השכרת רכב',
      Component: SettingsForm,
      props: { settings, handleInputChange, handleSave, category: 'rental' }
    },
    {
      title: 'כללי',
      Component: SettingsForm,
      props: { settings, handleInputChange, handleSave, category: 'general' }
    },
    // You can add more tabs configurations here
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>הוספת השכרה חדשה</title>
      </Head>
      <ListHeader
        title="הגדרות מערכת"
        subtitle="ניהול והגדרות מערכת שונות"
        showSearchBox={false}
      />
      <div className={styles.container}>
      <UniversalTabsComponent tabsConfig={tabsConfig} />
      </div>

      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: '' })}
        />
      )}
      
    </div>
  );
}

export default SettingsPage;
