import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { fetchRentalDetails, updateRentalDetails } from '../../services/rentalService';
import RentalDetailsForm from '../../components/RentalDetails'; 
import UniversalTabsComponent from '../../components/UniversalTabsComponent';
import DetailsSummaryComponent from '../../components/DetailsSummaryComponent';
import UniversalTable from '../../components/UniversalTable'; // שינוי שם הקומפוננטה
import ListHeader from '../../components/ListHeader';
import Notification from '../../components/Notification';
import ModalComponent from '../../components/ModalComponent';
import EditDetailsForm from '../../components/EditDetailsForm';
import ProcessTracker from '../../components/ProcessTracker';
import DriverRentalSelector from '../../components/DriverRentalSelector';
import styles from '../../styles/DetailsPage.module.css';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

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
  const [editGroup, setEditGroup] = useState(null);

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
    const group = summaryGroups.find(g => g.title === groupTitle);
    setEditGroup(group);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditGroupTitle('');
    setEditGroup(null);
  };

  const handleSave = async (updatedDetails) => {
    try {
      const filteredDetails = editGroup.fields.reduce((obj, field) => {
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

  const summaryGroups = [
    { title: 'איסוף', fields: ['start_date', 'fuel_pickup_level_description', 'km_pickup'] },
    { title: 'החזרה', fields: ['end_date', 'fuel_return_level_description', 'km_return', 'estimated_return'] },
    { title: 'עמלות', fields: ['traffic_fee', 'toll_fee'] },
    { title: 'מגבלות ק"מ', fields: ['km_limit_per_unit', 'km_units', 'total_km_limit', 'price_per_km'] },
    { title: 'מעמ', fields: ['vat_percentage'] }
  ];

  const filteredSummaryGroups = summaryGroups.map(group => {
    if (group.title === 'החזרה') {
      return {
        ...group,
        fields: rentalDetails?.rental?.status >= 3 
          ? group.fields.filter(field => field !== 'estimated_return')
          : ['estimated_return']
      };
    }
    return group;
  });

  const tabsConfig = [
    {
      title: 'חיובים',
      Component: UniversalTable,
      props: {
        data: rentalDetails?.charges,
        columns: columns.charges,
        tableType: 'charges',
        actionButtons: [
          { label: 'ערוך', icon: FaEdit, onClick: (row) => console.log('Edit charge', row) },
          { label: 'מחק', icon: FaTrash, onClick: (row) => console.log('Delete charge', row) }
        ]
      },
      buttons: [
        { label: 'הוסף', icon: FaPlus, onClick: () => console.log('Add charge') }
      ]
    },
    {
      title: 'נהגים מורשים',
      Component: UniversalTable,
      props: {
        data: rentalDetails?.drivers,
        columns: columns.drivers,
        tableType: 'drivers',
        actionButtons: [
          { label: 'ערוך', icon: FaEdit, onClick: (row) => console.log('Edit driver', row) },
          { label: 'מחק', icon: FaTrash, onClick: (row) => console.log('Delete driver', row) }
        ]
      },
      buttons: [
        { label: 'הוסף', icon: FaPlus, onClick: () => console.log('Add driver') }
      ]
    },
    {
      title: 'בטחונות אשראי',
      Component: UniversalTable,
      props: {
        data: rentalDetails?.securities,
        columns: columns.securities,
        tableType: 'securities',
        actionButtons: [
          { label: 'ערוך', icon: FaEdit, onClick: (row) => console.log('Edit security', row) },
          { label: 'מחק', icon: FaTrash, onClick: (row) => console.log('Delete security', row) }
        ]
      },
      buttons: [
        { label: 'הוסף', icon: FaPlus, onClick: () => console.log('Add security') }
      ]
    },
    {
      title: 'ביטוחים',
      Component: UniversalTable,
      props: {
        data: rentalDetails?.insurances,
        columns: columns.insurances,
        tableType: 'insurances',
        actionButtons: [
          { label: 'ערוך', icon: FaEdit, onClick: (row) => console.log('Edit insurance', row) },
          { label: 'מחק', icon: FaTrash, onClick: (row) => console.log('Delete insurance', row) }
        ]
      },
      buttons: [
        { label: 'הוסף', icon: FaPlus, onClick: () => console.log('Add insurance') }
      ]
    },
    {
      title: 'כבישי אגרה',
      Component: UniversalTable,
      props: {
        data: rentalDetails?.tollTravels,
        columns: columns.tollTravels,
        tableType: 'tollTravels',
        actionButtons: [
          { label: 'ערוך', icon: FaEdit, onClick: (row) => console.log('Edit toll travel', row) },
          { label: 'מחק', icon: FaTrash, onClick: (row) => console.log('Delete toll travel', row) }
        ]
      },
      buttons: [
        { label: 'הוסף', icon: FaPlus, onClick: () => console.log('Add toll travel') }
      ]
    },
    {
      title: 'דוחות תנועה',
      Component: UniversalTable,
      props: {
        data: rentalDetails?.trafficReports,
        columns: columns.trafficReports,
        tableType: 'trafficReports',
        actionButtons: [
          { label: 'ערוך', icon: FaEdit, onClick: (row) => console.log('Edit traffic report', row) },
          { label: 'מחק', icon: FaTrash, onClick: (row) => console.log('Delete traffic report', row) }
        ]
      },
      buttons: [
        { label: 'הוסף', icon: FaPlus, onClick: () => console.log('Add traffic report') }
      ]
    },
    {
      title: 'נזקים ברכב',
      Component: UniversalTable,
      props: {
        data: rentalDetails?.vehicleDamages,
        columns: columns.vehicleDamages,
        tableType: 'vehicleDamages',
        actionButtons: [
          { label: 'ערוך', icon: FaEdit, onClick: (row) => console.log('Edit vehicle damage', row) },
          { label: 'מחק', icon: FaTrash, onClick: (row) => console.log('Delete vehicle damage', row) }
        ]
      },
      buttons: [
        { label: 'הוסף', icon: FaPlus, onClick: () => console.log('Add vehicle damage') }
      ]
    },
    {
      title: 'תקבולים',
      Component: UniversalTable,
      props: {
        data: rentalDetails?.payments,
        columns: columns.payments,
        tableType: 'payments',
        actionButtons: [
          { label: 'ערוך', icon: FaEdit, onClick: (row) => console.log('Edit payment', row) },
          { label: 'מחק', icon: FaTrash, onClick: (row) => console.log('Delete payment', row) }
        ]
      },
      buttons: [
        { label: 'הוסף', icon: FaPlus, onClick: () => console.log('Add payment') }
      ]
    }
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
                summaryGroups={filteredSummaryGroups}
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
          details={rentalDetails?.rental}
          group={editGroup}
          onClose={closeEditModal}
          onSave={handleSave}
        />
      </ModalComponent>
    </div>
  );
};

export default RentalDetailsPage;
