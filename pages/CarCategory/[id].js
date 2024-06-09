import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import CarCategoryDetails from '../../components/CarCategoryDetails';
import CarSpecialRates from '../../components/CarSpecialRates';
import ListHeader from '../../components/ListHeader';
import Notification from '../../components/Notification';

function CarCategoryPage() {
  const router = useRouter();
  const { id } = router.query;
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '', onConfirm: null });

  useEffect(() => {
    async function fetchCategoryDetails() {
      if (id) {
        console.log('All parameters are loaded, including ID:', id);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const token = localStorage.getItem('token');
        try {
          setNotification({ message: 'טוען פרטי קטגוריה...', type: 'info', onConfirm: null });
          const response = await axios.get(`${apiUrl}/api/carCategories/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log('Category details fetched:', response.data);
          setCategoryDetails(response.data);
          setNotification({ message: '', type: '', onConfirm: null }); // Clear notification
        } catch (error) {
          console.error('Error fetching category data:', error);
          setNotification({ message: 'שגיאה בשליפת פרטי הקטגוריה', type: 'error', onConfirm: null });
        }
      } else {
        console.log('No ID found after router is fully ready.');
      }
    }

    fetchCategoryDetails();
  }, [id]);

  return (
    <div>
      <Head>
        <title>עריכת קטגוריית רכב</title>
      </Head>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '', onConfirm: null })}
        onConfirm={notification.onConfirm}
      />
      {categoryDetails && (
        <>
          <ListHeader
            title="עריכת סוג רכב"
            subtitle="מילוי פרטי הלקוח"
            showSearchBox={false}
          />
          <CarCategoryDetails category={categoryDetails} setNotification={setNotification} />
          <CarSpecialRates categoryId={categoryDetails.category_id} />
        </>
      )}
    </div>
  );
}

export default CarCategoryPage;
