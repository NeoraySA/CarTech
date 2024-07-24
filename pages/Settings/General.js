// pages/SettingsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import UniversalTabsComponent from '../../components/UniversalTabsComponent';
import SettingsForm from '../../components/SettingsForm';
import Notification from '../../components/Notification';
import ListHeader from '../../components/ListHeader';
import { getCompanyColors, updateCompanyColors } from '../../services/ColorService';
import styles from '../../styles/Page.module.css';

import withAuth from '../../src/hoc/withAuth';



const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

function SettingsPage() {
  const [settings, setSettings] = useState({
    toll_fee: '',
    traffic_fee: '',
    return_same_time_as_pickup: 'no',
    default_return_time: '',
    vat_percentage: '',
    color_1: '',
    color_2: '',
    color_3: '',
    color_4: '',
    color_5: '',
    black_color: '',
    white_color: ''
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

          const colors = await getCompanyColors(token);
          setSettings(prevSettings => ({
            ...prevSettings,
            ...colors
          }));
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
      const settingsToSave = {
        toll_fee: settings.toll_fee,
        traffic_fee: settings.traffic_fee,
        return_same_time_as_pickup: settings.return_same_time_as_pickup,
        default_return_time: settings.default_return_time,
        vat_percentage: settings.vat_percentage
      };
      await axios.put(`${apiUrl}/api/settings`, { settings: settingsToSave }, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      const colorsToSave = {
        color_1: settings.color_1,
        color_2: settings.color_2,
        color_3: settings.color_3,
        color_4: settings.color_4,
        color_5: settings.color_5,
        black_color: settings.black_color,
        white_color: settings.white_color
      };
      const colorUpdateResponse = await updateCompanyColors(token, colorsToSave);
  
      if (colorUpdateResponse) {
        setNotification({ message: 'Settings saved successfully', type: 'success' });
        window.location.reload(); // פקודת הרענון לדפדפן
      }
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
    {
      title: 'צבעים',
      Component: SettingsForm,
      props: { settings, handleInputChange, handleSave, category: 'colors' }
    }
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
        buttons={[
          {
            label: 'שמור',
            onClick: handleSave
          }
        ]}
        secondaryButtons={[
          {
            label: 'רשימת קטגוריות',
            onClick: handleSave
          } 
        ]}
      />
      <div className={styles.mainSection}>
        <div className={styles.section1}>
        <UniversalTabsComponent tabsConfig={tabsConfig} />
        </div>
        <div className={styles.section2}>

        </div>
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

export default withAuth(SettingsPage, ['settings_general']);
