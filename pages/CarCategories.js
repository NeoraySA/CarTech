import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';
import UniversalTable from '../components/UniversalTable';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import ListHeader from '../components/ListHeader';
import FilterComponent from '../components/FilterComponent';
import ListFooter from '../components/ListFooter';
import Notification from '../components/Notification';
import ModalComponent from '../components/ModalComponent';
import EditDetailsForm from '../components/EditDetailsForm';
import styles from '../styles/RentalsList.module.css';
import { formatNumber, formatCurrency } from '../utils/formatUtils';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const CarCategories = () => {
  const [categories, setCategories] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '', onConfirm: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({});
  const [filterValues, setFilterValues] = useState({
    category_name: { label: 'שם קטגוריה', type: 'text', value: '' },
    description: { label: 'תיאור', type: 'text', value: '' },
    km_limit_per_unit: { label: 'מגבלת ק"מ ליחידה', type: 'number', value: '' },
    extra_km_price: { label: 'מחיר לק"מ נוסף', type: 'number', value: '' },
    price_per_day: { label: 'תעריף יומי', type: 'number', value: '' },
    saturday_holiday_price: { label: 'תעריף שבת וחג', type: 'number', value: '' }
  });
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`${apiUrl}/api/carCategories`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleDelete = (row) => {
    setNotification({
      message: 'האם אתה בטוח שברצונך למחוק את הקטגוריה?',
      type: 'confirm',
      onConfirm: () => confirmDelete(row.id)
    });
  };

  const confirmDelete = async (id) => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    try {
      await axios.delete(`${apiUrl}/api/carCategories/${id}`, { headers });
      setCategories(categories.filter(category => category.id !== id));
      setNotification({ message: 'קטגוריה נמחקה בהצלחה', type: 'success', onConfirm: null });
    } catch (error) {
      console.error('Error deleting category:', error);
      setNotification({ message: 'שגיאה במחיקת הקטגוריה', type: 'error', onConfirm: null });
    }
  };

  const handleEdit = (row) => {
    if (row.id) {
      router.push(`/CarCategory/${row.id}`);
    } else {
      console.error("Category ID not found", row);
    }
  };

  const handleFilterChange = (filters) => {
    setFilterValues(filters);
  };

  const applyFilters = (data, filters) => {
    return data.filter((item) => {
      return Object.keys(filters).every((key) => {
        if (!filters[key].value) return true;
        return String(item[key]).toLowerCase().includes(filters[key].value.toLowerCase());
      });
    });
  };

  const handleSave = async (formData) => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    // נוודא שהשדה include_new_young_driver_on_saturday_holiday יהיה 0 או 1
    const updatedFormData = {
      ...formData,
      include_new_young_driver_on_saturday_holiday: formData.include_new_young_driver_on_saturday_holiday ? 1 : 0
    };

    try {
      await axios.post(`${apiUrl}/api/carCategories`, updatedFormData, { headers });
      setNotification({ message: 'קטגוריה נוספה בהצלחה', type: 'success', onConfirm: null });
      setIsModalOpen(false);
      fetchCategories(); // Refresh data after successful addition
    } catch (error) {
      console.error('Error saving category:', error);
      setNotification({ message: 'שגיאה בהוספת הקטגוריה', type: 'error', onConfirm: null });
    }
  };

  const filteredCategories = applyFilters(categories, filterValues);

  const columns = [
    { Header: 'שם קטגוריה', accessor: 'category_name' },
    { Header: 'תיאור', accessor: 'description' },
    { Header: 'מגבלת ק"מ ליחידה', accessor: 'km_limit_per_unit', Cell: ({ value }) => formatNumber(value) },
    { Header: 'מחיר לק"מ נוסף', accessor: 'extra_km_price', Cell: ({ value }) => formatCurrency(value) },
    { Header: 'תעריף יומי', accessor: 'price_per_day', Cell: ({ value }) => formatCurrency(value) },
    { Header: 'תעריף שבת וחג', accessor: 'saturday_holiday_price', Cell: ({ value }) => formatCurrency(value) }
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

  const headerButtons = [
    {
      label: 'הוסף קטגוריה חדשה',
      onClick: () => setIsModalOpen(true),
      icon: FaPlus
    }
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>קטגוריות רכבים</title>
      </Head>
      <div className={styles.header}>
        <ListHeader
          title="קטגוריות רכבים"
          subtitle="רשימת קטגוריות רכבים"
          showSearchBox={false}
          buttons={headerButtons}
        />
      </div>
      <div className={styles.main}>
        <div className={styles["filter-container"]}>
          <FilterComponent filters={filterValues} onFilterChange={handleFilterChange} />
        </div>
        <div className={styles["table-container"]}>
          <UniversalTable data={filteredCategories} columns={columns} actionButtons={actionButtons} expandable={false} />
        </div>
      </div>
      <ListFooter
        title='סה"כ קטגוריות:'
        content={filteredCategories.length}
      />
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '', onConfirm: null })}
        onConfirm={notification.onConfirm}
      />
      <ModalComponent isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="הוסף/ערוך קטגוריה">
        <EditDetailsForm
          details={newCategory}
          group={{
            fields: [
              'category_name', 'description', 'km_limit_per_unit', 'price_per_day', 'saturday_holiday_price',
              'extra_km_price', 'new_driver_price_increase', 'young_driver_price_increase',
              'include_new_young_driver_on_saturday_holiday'
            ]
          }}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      </ModalComponent>
    </div>
  );
};

export default CarCategories;
