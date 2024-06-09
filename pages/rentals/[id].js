import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { fetchRentalDetails, updateRentalDetails } from '../../services/rentalService'; // ייבוא שירות ה-API
import RentalDetailsForm from '../../components/RentalDetails';
import UniversalTabsComponent from '../../components/UniversalTabsComponent';
import DetailsSummaryComponent from '../../components/DetailsSummaryComponent';
import ListHeader from '../../components/ListHeader';
import Notification from '../../components/Notification';
import ModalComponent from '../../components/ModalComponent';
import EditDetailsForm from '../../components/EditDetailsForm';
import ProcessTracker from '../../components/ProcessTracker';
import styles from '../../styles/DetailsPage.module.css';

const RentalDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [rentalDetails, setRentalDetails] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '', onConfirm: null });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editGroupTitle, setEditGroupTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchRentalDetails(id, token)
        .then(data => {
          setRentalDetails(data);
          setLoading(false);
        })
        .catch(err => {
          setError('Failed to fetch rental details');
          setLoading(false);
          setNotification({ message: 'Failed to fetch rental details', type: 'error' });
        });
    }
  }, [id, token]);

  const openEditModal = (groupTitle) => {
    setEditGroupTitle(groupTitle);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditGroupTitle('');
  };

  const handleSave = async (updatedDetails) => {
    try {
      const filteredDetails = summaryGroups.find(group => group.title === editGroupTitle)?.fields.reduce((obj, field) => {
        if (updatedDetails[field] !== rentalDetails.rental[field]) {
          obj[field] = updatedDetails[field];
        }
        return obj;
      }, {});

      if (Object.keys(filteredDetails).length === 0) {
        setNotification({ message: 'לא נמצאו שינויים לעדכון!', type: 'info' });
        return;
      }

      await updateRentalDetails(id, filteredDetails, token);
      setRentalDetails(prev => ({
        ...prev,
        rental: { ...prev.rental, ...filteredDetails }
      }));
      setNotification({ message: 'נתוני השכירות עודכנו בהצלחה!', type: 'success' });
      closeEditModal();
    } catch (error) {
      console.error('Failed to save rental details:', error);
      setNotification({ message: 'Failed to save rental details', type: 'error' });
    }
  };

  const summaryGroups = [
    { title: 'איסוף', fields: ['start_date', 'fuel_pickup_level_description', 'km_pickup'] },
    { title: 'החזרה', fields: ['end_date', 'fuel_return_level_description', 'km_return'] },
    { title: 'עמלות', fields: ['traffic_fee', 'toll_fee'] },
    { title: 'מגבלות ק"מ', fields: ['km_limit_per_unit', 'km_calculation_days', 'total_km_limit', 'price_per_km'] }
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
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
              <RentalDetailsForm rentalId={id} rentalDetails={rentalDetails} setRentalDetails={setRentalDetails} />
              <div className={styles.section}>
                <UniversalTabsComponent rentalDetails={rentalDetails} customerId={rentalDetails.rental.customer_id} />
              </div>
            </div>
            <div className={styles.summaryContainer}>
              <ProcessTracker steps={['הקמת חוזה', 'פתיחת חוזה', 'החזרת רכב', 'תשלום', 'סגירת חוזה']} currentStep={rentalDetails.rental.status - 1} />
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
          onSave={handleSave}
          summaryGroups={summaryGroups}
        />
      </ModalComponent>
    </div>
  );
};

export default RentalDetailsPage;
