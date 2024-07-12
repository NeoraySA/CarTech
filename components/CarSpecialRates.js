import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import UniversalTable from './UniversalTable';
import ModalComponent from './ModalComponent';
import EditDetailsForm from './EditDetailsForm';
import Notification from './Notification';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from '../styles/SpecialRates.module.css';
import { formatDateOnly, formatCurrency } from '../utils/formatUtils';
import labelTranslations from '../src/translations';

const CarSpecialRates = ({ categoryId }) => {
  const [specialRates, setSpecialRates] = useState([]);
  const [newRate, setNewRate] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '', onConfirm: null });

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    if (categoryId) {
      fetchSpecialRates();
    }
  }, [categoryId]);

  const fetchSpecialRates = async () => {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    try {
      const response = await axios.get(`${apiBaseUrl}/api/carCategories/car-special-rates/${categoryId}`, { headers });
      setSpecialRates(response.data);
    } catch (error) {
      console.error('Error fetching special rates:', error);
    }
  };

  const handleSave = async (formData) => {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    // הגדרה של include_saturday_holiday כ-0 או 1 והמרת תאריכים לפורמט ISO
    const updatedFormData = {
      ...formData,
      include_saturday_holiday: formData.include_saturday_holiday ? 1 : 0,
      start_date: moment(formData.start_date).format('YYYY-MM-DD'),
      end_date: moment(formData.end_date).format('YYYY-MM-DD')
    };

    try {
      if (updatedFormData.id) {
        await axios.put(`${apiBaseUrl}/api/carCategories/car-special-rates/${updatedFormData.id}`, updatedFormData, { headers });
        setNotification({ message: 'תעריף עודכן בהצלחה', type: 'success', onConfirm: null });
      } else {
        await axios.post(`${apiBaseUrl}/api/carCategories/car-special-rates/${categoryId}`, updatedFormData, { headers });
        setNotification({ message: 'תעריף נוסף בהצלחה', type: 'success', onConfirm: null });
      }

      setNewRate({});
      setIsModalOpen(false);
      fetchSpecialRates(); // רענון הנתונים לאחר הוספה מוצלחת או עדכון
    } catch (error) {
      console.error('Error saving special rate:', error);
      setNotification({ message: 'שגיאה בשמירת התעריף', type: 'error', onConfirm: null });
    }
  };

  const handleEdit = (row) => {
    setNewRate(row);
    setIsModalOpen(true);
  };

  const handleDelete = (row) => {
    setNotification({
      message: 'האם אתה בטוח שברצונך למחוק את התעריף?',
      type: 'confirm',
      onConfirm: () => confirmDelete(row.id)
    });
  };

  const confirmDelete = async (id) => {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    try {
      await axios.delete(`${apiBaseUrl}/api/carCategories/car-special-rates/${id}`, { headers });
      setSpecialRates(specialRates.filter(rate => rate.id !== id));
      setNotification({ message: 'תעריף נמחק בהצלחה', type: 'success', onConfirm: null });
      fetchSpecialRates(); // רענון הנתונים לאחר מחיקה מוצלחת
    } catch (error) {
      console.error('Error deleting special rate:', error);
      setNotification({ message: 'שגיאה במחיקת התעריף', type: 'error', onConfirm: null });
    }
  };

  const columns = [
    {
      Header: 'שם תעריף ותאריכים',
      accessor: 'rate_name',
      Cell: ({ row }) => (
        <div>
          <div>{row.original.rate_name}</div>
          <span>{`${formatDateOnly(row.original.start_date)} - ${formatDateOnly(row.original.end_date)}`}</span>
        </div>
      )
    },
    { Header: labelTranslations['daily_rate'] || 'תעריף יומי', accessor: 'daily_rate', Cell: ({ value }) => formatCurrency(value) },
    { Header: labelTranslations['include_saturday_holiday'] || 'כולל שבתות וחגים', accessor: 'include_saturday_holiday', Cell: ({ value }) => value ? 'כן' : 'לא' }
  ];

  const actionButtons = [
    {
      label: 'ערוך',
      icon: FaEdit,
      onClick: handleEdit
    },
    {
      label: 'מחק',
      icon: FaTrash,
      onClick: handleDelete
    }
  ];

  return (
    <div className={styles.section}>
      <h2>תעריפים מיוחדים</h2>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '', onConfirm: null })}
        onConfirm={notification.onConfirm}
      />
      <ModalComponent isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="הוסף/ערוך תעריף">
        <EditDetailsForm
          details={newRate}
          group={{ fields: ['rate_name', 'start_date', 'end_date', 'daily_rate', 'include_saturday_holiday'] }}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      </ModalComponent>
      <UniversalTable data={specialRates} columns={columns} actionButtons={actionButtons} expandable={false} />
      <button onClick={() => setIsModalOpen(true)} className={styles.submitButton}>הוסף תעריף חדש</button>
    </div>
  );
};

export default CarSpecialRates;
