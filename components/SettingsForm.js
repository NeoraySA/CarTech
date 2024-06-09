import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/SettingsForm.module.css';

function SettingsForm({ companyId, branchId }) {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${apiUrl}/api/settings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.status === 200) {
          setSettings(response.data);
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
  }, [apiUrl, companyId, branchId]);

  const handleInputChange = (e, settingName) => {
    const { value } = e.target;
    setSettings(prevSettings => 
      prevSettings.map(setting => 
        setting.setting_name === settingName 
          ? { ...setting, setting_value: value } 
          : setting
      )
    );
  };

  const handleSave = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
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

  return (
    <div className={styles.container}>
      {notification.message && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          {notification.message}
        </div>
      )}
      <h2>Settings</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form className={styles.form}>
          {settings.map(setting => (
            <div key={setting.setting_name} className={styles.formGroup}>
              <label className={styles.label}>{setting.setting_name}</label>
              <input
                className={styles.input}
                type="text"
                value={setting.setting_value}
                onChange={(e) => handleInputChange(e, setting.setting_name)}
              />
            </div>
          ))}
          <button type="button" onClick={handleSave} className={styles.saveButton}>
            Save Settings
          </button>
        </form>
      )}
    </div>
  );
}

export default SettingsForm;
