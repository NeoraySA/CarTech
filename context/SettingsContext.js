// context/SettingsContext.js
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const SettingsContext = createContext();

export const SettingsProvider = ({ children, companyId, branchId }) => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${apiUrl}/api/settings/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const settingsData = response.data.reduce((acc, setting) => {
        acc[setting.setting_name] = setting.setting_value;
        return acc;
      }, {});
      setSettings(settingsData);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  }, [companyId, branchId]);

  useEffect(() => {
    if (companyId && branchId !== undefined) {
      fetchSettings();
    }
  }, [fetchSettings, companyId, branchId]);

  return (
    <SettingsContext.Provider value={{ settings, loading, fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
