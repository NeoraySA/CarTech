import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { fetchRentalDetails, updateRentalDetails } from '../../services/rentalService';
import RentalDetailsForm from '../../components/RentalDetails'; 
import UniversalTabsComponent from '../../components/UniversalTabsComponent';
import DetailsSummaryComponent from '../../components/DetailsSummaryComponent';
import UniversalTableRental from '../../components/UniversalTableRental'; // ייבוא הקומפוננטה החסרה
import ListHeader from '../../components/ListHeader';
import Notification from '../../components/Notification';
import ModalComponent from '../../components/ModalComponent';
import EditDetailsForm from '../../components/EditDetailsForm';
import ProcessTracker from '../../components/ProcessTracker';
import DriverRentalSelector from '../../components/DriverRentalSelector';
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
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tokenFromStorage = localStorage.getItem('token');
      setToken(tokenFromStorage);
    }
  }, []);

  useEffect(() => {
    if (id && token) {
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

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  const columns = {
    drivers: [
      { Header: 'שם הנהג', accessor: 'name' },
      { Header: 'מתאריך', accessor: 'start_date', Cell: ({ value }) => formatDate(value) },
      { Header: 'עד תאריך', accessor: 'end_date', Cell: ({ value }) => formatDate(value) },
      { Header: 'הערות', accessor: 'notes' },
    ],
    charges: [
      { Header: 'Charge ID', accessor: 'charge_id' },
      { Header: 'Description', accessor: 'description' },
      { Header: 'Amount', accessor: 'amount' },
    ],
    insurances: [
      { Header: 'Insurance ID', accessor: 'insurance_id' },
      { Header: 'Type', accessor: 'type' },
      { Header: 'Coverage Amount', accessor: 'coverage_amount' },
    ],
    securities: [
      { Header: 'Security ID', accessor: 'security_id' },
      { Header: 'Credit Card Number', accessor: 'credit_card_number' },
      { Header: 'Hold Amount', accessor: 'hold_amount' },
    ],
    trafficReports: [
      { Header: 'Report ID', accessor: 'report_id' },
      { Header: 'Report Date', accessor: 'report_date', Cell: ({ value }) => formatDate(value) },
      { Header: 'Location', accessor: 'location' },
      { Header: 'Report Type', accessor: 'report_type' },
      { Header: 'Amount', accessor: 'amount' }
    ],
    tollTravels: [
      { Header: 'Travel ID', accessor: 'travel_id' },
      { Header: 'Travel Date', accessor: 'travel_date', Cell: ({ value }) => formatDate(value) },
      { Header: 'Road Type', accessor: 'road_type' },
      { Header: 'Toll Amount', accessor: 'toll_amount' }
    ],
    vehicleDamages: [
      { Header: 'Damage ID', accessor: 'damage_id' },
      { Header: 'Damage Date', accessor: 'damage_date', Cell: ({ value }) => formatDate(value) },
      { Header: 'Description', accessor: 'description' },
      { Header: 'Repair Cost', accessor: 'repair_cost' }
    ],
    payments: [
      { Header: 'Payment ID', accessor: 'payment_id' },
      { Header: 'Payment Date', accessor: 'payment_date', Cell: ({ value }) => formatDate(value) },
      { Header: 'Amount Received', accessor: 'amount_received' },
      { Header: 'Payment Method', accessor: 'payment_method' }
    ]
  };

  const tabsConfig = [
    { title: 'חיובים', Component: UniversalTableRental, props: { data: rentalDetails?.charges, columns: columns.charges, tableType: 'charges' } },
    { title: 'נהגים מורשים', Component: UniversalTableRental, props: { data: rentalDetails?.drivers, columns: columns.drivers, tableType: 'drivers' } },
    { title: 'בטחונות אשראי', Component: UniversalTableRental, props: { data: rentalDetails?.securities, columns: columns.securities, tableType: 'securities' } },
    { title: 'ביטוחים', Component: UniversalTableRental, props: { data: rentalDetails?.insurances, columns: columns.insurances, tableType: 'insurances' } },
    { title: 'כבישי אגרה', Component: UniversalTableRental, props: { data: rentalDetails?.tollTravels, columns: columns.tollTravels, tableType: 'tollTravels' } },
    { title: 'דוחות תנועה', Component: UniversalTableRental, props: { data: rentalDetails?.trafficReports, columns: columns.trafficReports, tableType: 'trafficReports' } },
    { title: 'נזקים ברכב', Component: UniversalTableRental, props: { data: rentalDetails?.vehicleDamages, columns: columns.vehicleDamages, tableType: 'vehicleDamages' } },
    { title: 'תקבולים', Component: UniversalTableRental, props: { data: rentalDetails?.payments, columns: columns.payments, tableType: 'payments' } }
  ];

  const summaryGroups = [
    { title: 'איסוף', fields: ['start_date', 'fuel_pickup_level_description', 'km_pickup'] },
    { title: 'החזרה', fields: ['end_date', 'fuel_return_level_description', 'km_return'] },
    { title: 'עמלות', fields: ['traffic_fee', 'toll_fee'] },
    { title: 'מגבלות ק"מ', fields: ['km_limit_per_unit', 'km_units', 'total_km_limit', 'price_per_km'] }
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
              <RentalDetailsForm rentalId={id} rentalDetails={rentalDetails.rental} setRentalDetails={setRentalDetails} />
              <div className={styles.section}>
                <UniversalTabsComponent details={rentalDetails} tabsConfig={tabsConfig} />
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
