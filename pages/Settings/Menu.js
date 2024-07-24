import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import ListHeader from '../../components/ListHeader';
import Notification from '../../components/Notification';
import UniversalDataList from '../../components/UniversalDataList';
import styles from '../../styles/Page.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const fetchCategories = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${apiUrl}/api/menu/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Fetched categories:', response.data);
      setCategories(response.data);
      if (selectedCategory) {
        const updatedSelectedCategory = response.data.find(category => category.id === selectedCategory.id);
        setSelectedCategory(updatedSelectedCategory);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setNotification({ message: 'Failed to fetch categories', type: 'error' });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSaveCategory = async (formData) => {
    const token = localStorage.getItem('token');
    try {
      if (formData.id) {
        await axios.put(`${apiUrl}/api/menu/categories/${formData.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${apiUrl}/api/menu/categories`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setNotification({ message: 'Category saved successfully', type: 'success' });
      fetchCategories();
    } catch (error) {
      console.error('Failed to save category:', error);
      setNotification({ message: 'Failed to save category', type: 'error' });
    }
  };

  const handleDeleteCategory = async (category) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${apiUrl}/api/menu/categories/${category.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotification({ message: 'Category deleted successfully', type: 'success' });
      fetchCategories();
    } catch (error) {
      console.error('Failed to delete category:', error);
      setNotification({ message: 'Failed to delete category', type: 'error' });
    }
  };

  const handleSaveItem = async (formData) => {
    const token = localStorage.getItem('token');
    const itemData = { ...formData, category_id: selectedCategory.id }; // הוספת category_id
    try {
      if (formData.id) {
        await axios.put(`${apiUrl}/api/menu/items/${formData.id}`, itemData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${apiUrl}/api/menu/items`, itemData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setNotification({ message: 'Item saved successfully', type: 'success' });
      fetchCategories();
    } catch (error) {
      console.error('Failed to save item:', error);
      setNotification({ message: 'Failed to save item', type: 'error' });
    }
  };

  const handleDeleteItem = async (item) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${apiUrl}/api/menu/items/${item.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotification({ message: 'הפריט בתפריט הוסר בהצלחה!', type: 'success' });
      fetchCategories();
    } catch (error) {
      console.error('Failed to delete item:', error);
      setNotification({ message: 'שגיאה בהסרת הפריט!', type: 'error' });
    }
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setSelectedCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const categoryColumns = [
    { Header: 'שם קטגוריה', accessor: 'name' },
    { Header: 'אייקון', accessor: 'icon' },
    { Header: 'הרשאות', accessor: 'permissions' }
  ];

  const itemColumns = [
    { Header: 'שם פריט', accessor: 'name' },
    { Header: 'נתיב', accessor: 'path' },
    { Header: 'הרשאות', accessor: 'permissions' }
  ];

  useEffect(() => {
    if (selectedCategory) {
      console.log('Selected category updated:', selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <div>
      <Head>
        <title>עריכת תפריט</title>
      </Head>
      <ListHeader
        title="עריכת תפריט"
        subtitle="ניהול קטגוריות ופריטים בתפריט"
        showSearchBox={false}
      />
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />
      <div className={styles.mainSection}>
        <div className={styles.section1}>
          <div className={styles.card}>
            <UniversalDataList 
              data={categories}
              formFields={['name', 'icon', 'permissions']}
              columns={categoryColumns}
              title="קטגוריות"
              description="עריכת קטגוריות בתפריט"
              addButtonLabel="הוסף קטגוריה"
              addButtonPermissions={['add_category_menu']}
              actionButtons={[
                {
                  label: 'עריכת פריטים',
                  icon: FaEdit,
                  onClick: (row) => {
                    console.log('Row data:', row);
                    setSelectedCategory(row);
                  },
                  permissions: ['edit_category_menu']
                },
                {
                  label: 'מחק',
                  icon: FaTrash,
                  onClick: handleDeleteCategory,
                  permissions: ['delete_category_menu']
                }
              ]}
              onSave={handleSaveCategory}
              notification={notification}
              setNotification={setNotification}
            />
          </div>
        </div>
        <div className={styles.section2}>
          {selectedCategory && (
            <div className={styles.card}>
              <UniversalDataList 
                data={selectedCategory.items || []}
                formFields={['name', 'path', 'permissions']}
                columns={itemColumns}
                title={`עריכת קטגוריית ${selectedCategory.name}`}
                description="עריכת פריטים בתפריט"
                addButtonLabel="הוסף פריט"
                addButtonPermissions={['add_item_menu']}
                actionButtons={[
                  {
                    label: 'עריכת פריט',
                    icon: FaEdit,
                    onClick: (row) => {
                      console.log('Editing item:', row);
                      handleSaveItem(row);
                    },
                    permissions: ['edit_item_menu']
                  },
                  {
                    label: 'מחיקה',
                    icon: FaTrash,
                    onClick: handleDeleteItem,
                    permissions: ['delete_item_menu']
                  }
                ]}
                onSave={handleSaveItem}
                notification={notification}
                setNotification={setNotification}
                showEditForm={true} // הצגת טופס העריכה
                editFormFields={[
                  { name: 'name', label: 'שם קטגוריה', type: 'text' },
                  { name: 'icon', label: 'אייקון', type: 'text' },
                  { name: 'permissions', label: 'הרשאות', type: 'text' }
                ]}
                editFormData={selectedCategory}
                onEditFormChange={handleCategoryChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
