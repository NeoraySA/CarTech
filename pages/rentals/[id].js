import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import RentalDetailsForm from '../../components/RentalDetails';
import UniversalTabsComponent from '../../components/UniversalTabsComponent'; // ייבוא הקומפוננטה האוניברסלית
import DetailsSummaryComponent from '../../components/DetailsSummaryComponent';
import ListHeader from '../../components/ListHeader';
import Notification from '../../components/Notification';
import ModalComponent from '../../components/ModalComponent'; // ייבוא המודל
import EditDetailsForm from '../../components/EditDetailsForm'; // ייבוא טופס עריכת הפרטים החדש
import ProcessTracker from '../../components/ProcessTracker'; // ייבוא קומפוננטת ה-ProcessTracker
import styles from '../../styles/DetailsPage.module.css';

const RentalDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [rentalDetails, setRentalDetails] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '', onConfirm: null });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editGroupTitle, setEditGroupTitle] = useState('');

  const steps = ['הקמת חוזה', 'פתיחת חוזה', 'החזרת רכב', 'תשלום', 'סגירת חוזה']; // שלבי התהליך
  const [currentStep, setCurrentStep] = useState(1); // שלב נוכחי ברירת מחדל - 1

  const summaryGroups = [
    {
      title: 'איסוף',
      fields: ['start_date', 'fuel_pickup_level_description', 'km_pickup']
    },
    {
      title: 'החזרה',
      fields: ['end_date', 'fuel_return_level_description', 'km_return']
    },
    {
      title: 'עמלות',
      fields: ['traffic_fee', 'toll_fee']
    },
    {
      title: 'מגבלות ק"מ',
      fields: ['km_limit_per_unit', 'km_calculation_days', 'total_km_limit', 'price_per_km']
    }
  ]; // הגדרת קבוצות השדות

  useEffect(() => {
    if (id) {
      async function fetchRentalDetails() {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get(`${apiUrl}/api/rentals/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.status === 200) {
            setRentalDetails(response.data);
            console.log('Fetched rental details:', response.data);

            // עדכון השלב הנוכחי לפי הערך של status
            const status = response.data.rental.status;
            setCurrentStep(status); // נניח שהערך של status מתאים לשלבים

          } else {
            throw new Error('Failed to fetch rental details');
          }
        } catch (error) {
          console.error('Error fetching rental details:', error);
          setNotification({ message: 'Failed to fetch rental details', type: 'error' });
        }
      }
      fetchRentalDetails();
    }
  }, [id]);

  const openEditModal = (groupTitle) => {
    setEditGroupTitle(groupTitle);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditGroupTitle('');
  };

  if (!id) return <div>טוען...</div>;

  return (
    <div>
      <Head>
        <title>חוזה השכרה</title>
      </Head>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '', onConfirm: null })}
        onConfirm={notification.onConfirm}
      />
      <ListHeader
        title="חוזה השכרה"
        subtitle="צפיה בחוזה ההשכרה"
        showSearchBox={false}
      />
      
      <div className={styles.container}>
        
        {rentalDetails && (
          <>
          
            <div className={styles.formContainer}>
              <div>
                <RentalDetailsForm rentalId={id} rentalDetails={rentalDetails} setRentalDetails={setRentalDetails} />
              </div>
              <div className={styles.section}>
                <UniversalTabsComponent rentalDetails={rentalDetails} customerId={rentalDetails.rental.customer_id} />
              </div>
            </div>
            <div className={styles.summaryContainer}>
            <ProcessTracker steps={steps} currentStep={currentStep - 1} /> {/* הוספת קומפוננטת ה-ProcessTracker */}
              <DetailsSummaryComponent
                summaryData={rentalDetails.rental}
                summaryGroups={summaryGroups}
                onEdit={openEditModal}
              />
            </div>
          </>
        )}
      </div>
      <ModalComponent
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title={`ערוך ${editGroupTitle}`}
      >
        <EditDetailsForm
          rentalDetails={rentalDetails?.rental}
          groupTitle={editGroupTitle}
          onClose={closeEditModal}
          onSave={setRentalDetails}
        />
      </ModalComponent>
    </div>
  );
};

export default RentalDetailsPage;
