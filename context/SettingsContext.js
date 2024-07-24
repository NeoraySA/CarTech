import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPermissions = useCallback(async () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.permissions) {
      console.log('User permissions from localStorage:', userData.permissions);
      setPermissions(userData.permissions);
      setLoading(false);
    } else {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const token = localStorage.getItem('token');
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${apiUrl}/api/users/permissions`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Fetched permissions from server:', response.data.permissions);
        setPermissions(response.data.permissions);
      } catch (error) {
        console.error('Failed to fetch permissions:', error);
        setError('Failed to fetch permissions');
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const updatePermissions = useCallback(() => {
    fetchPermissions();
  }, [fetchPermissions]);

  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);

  const hasPermission = (requiredPermissions) => {
    return requiredPermissions.some(permission => permissions.includes(permission));
  };

  return (
    <SettingsContext.Provider value={{ permissions, loading, error, updatePermissions, hasPermission }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
export default SettingsContext;
