import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import ListHeader from '../../components/ListHeader';
import Notification from '../../components/Notification';
import UniversalForm from '../../components/UniversalForm'; // Assuming you have a UniversalForm component
import styles from '../../styles/Page.module.css';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const BranchSettings = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${apiUrl}/api/branches`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBranches(response.data);
      if (response.data.length > 0) {
        setSelectedBranch(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
      setNotification({ message: 'Error fetching branches', type: 'error' });
    }
  };

  const handleSaveSettings = async (formData) => {
    const token = localStorage.getItem('token');
    const plainData = Object.fromEntries(formData.entries());

    if (!plainData.name) {
      setNotification({ message: 'Branch name cannot be empty', type: 'error' });
      return;
    }

    try {
      await axios.put(`${apiUrl}/api/branches/${selectedBranch.id}`, plainData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotification({ message: 'Branch settings updated successfully', type: 'success' });
      fetchBranches();
    } catch (error) {
      console.error('Error saving branch settings:', error);
      setNotification({ message: 'Error saving branch settings', type: 'error' });
    }
  };

  const formFields = [
    { name: 'name', label: 'שם סניף', type: 'text' },
    { name: 'street', label: 'רחוב', type: 'text' },
    { name: 'city', label: 'עיר', type: 'text' },
    { name: 'phone', label: 'טלפון', type: 'text' },
    { name: 'fax', label: 'פקס', type: 'text' },
    { name: 'email', label: 'אימייל', type: 'email' },
    { name: 'image_url', label: 'תמונה', type: 'file' }
  ];

  return (
    <div>
      <Head>
        <title>ניהול הגדרות סניף</title>
      </Head>
      <ListHeader
        title="ניהול הגדרות סניף"
        subtitle="עריכת הגדרות הסניף"
        showSearchBox={false}
      />
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />
      <div className={styles.mainSection}>
        {selectedBranch && (
          <UniversalForm
            initialValues={selectedBranch}
            fields={formFields}
            onSubmit={handleSaveSettings}
            buttonText="שמור הגדרות"
          />
        )}
      </div>
    </div>
  );
};

export default BranchSettings;
