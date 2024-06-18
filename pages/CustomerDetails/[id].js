import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { fetchCustomerDetails, updateCustomerDetails } from '../../services/customerService';
import CustomerDetailsComponent from '../../components/CustomerDetails';
import DetailsSummaryComponent from '../../components/DetailsSummaryComponent';
import Notification from '../../components/Notification';
import ListHeader from '../../components/ListHeader';
import ModalComponent from '../../components/ModalComponent';
import EditDetailsForm from '../../components/EditDetailsForm';
import ProcessTracker from '../../components/ProcessTracker';
import UniversalTabsComponent from '../../components/UniversalTabsComponent';
import AddDriverForm from '../../components/AddDriverForm';
import styles from '../../styles/DetailsPage.module.css';

const CustomerDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [customerDetails, setCustomerDetails] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    if (id && token) {
      setLoading(true);
      fetchCustomerDetails(id, token)
        .then(data => {
          setCustomerDetails(data);
          setLoading(false);
        })
        .catch(err => {
          setError('Failed to fetch customer details');
          setLoading(false);
          setNotification({ message: 'Failed to fetch customer details', type: 'error' });
        });
    }
  }, [id, token, router.isReady]);

  const openEditModal = (group) => {
    setCurrentGroup(group);
    setIsCustomerModalOpen(true);
  };

  const closeEditModal = () => {
    setIsCustomerModalOpen(false);
    setCurrentGroup(null);
  };

  const handleSave = async (updatedDetails) => {
    try {
      const updatedCustomerDetails = { ...customerDetails, ...updatedDetails };
      await updateCustomerDetails(id, updatedCustomerDetails, token);
      setCustomerDetails(updatedCustomerDetails);
      setIsCustomerModalOpen(false);
      setNotification({ message: 'פרטי הלקוח עודכנו בהצלחה!', type: 'success' });
    } catch (error) {
      setNotification({ message: 'Failed to update customer details', type: 'error' });
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  const columns = {
    drivers: [
      { Header: 'שם הנהג', accessor: 'first_name' },
      { Header: 'שם משפחה', accessor: 'last_name' },
      { Header: 'מספר רישיון נהיגה', accessor: 'license_number' },
      { Header: 'תוקף רישיון', accessor: 'license_expiry', Cell: ({ value }) => formatDate(value) },
      { Header: 'מספר טלפון', accessor: 'phone' }
    ],
    creditCards: [
      { Header: 'מספר כרטיס', accessor: 'card_number' },
      { Header: 'שם בעל הכרטיס', accessor: 'card_holder_name' },
      { Header: 'תעודת זהות בעל הכרטיס', accessor: 'card_holder_id_number' },
      { Header: 'תוקף', accessor: 'expiration_date', Cell: ({ value }) => formatDate(value) },
      { Header: 'CVV', accessor: 'cvv' },
      { Header: 'כתובת לחיוב', accessor: 'billing_street' },
      { Header: 'מספר בניין לחיוב', accessor: 'billing_building_number' },
      { Header: 'עיר לחיוב', accessor: 'billing_city' },
      { Header: 'מדינה לחיוב', accessor: 'billing_country' },
      { Header: 'האם כרטיס הלקוח', accessor: 'is_customer_card', Cell: ({ value }) => (value ? 'כן' : 'לא') },
      { Header: 'תמונת כרטיס', accessor: 'card_image_path' },
      { Header: 'תמונת תעודת זהות', accessor: 'id_image_path' },
      { Header: 'מסמך ערב', accessor: 'guarantor_document_path' },
      { Header: 'הערות', accessor: 'notes' }
    ]
  };

  const tabsConfig = [
    { title: 'נהגים', dataKey: 'drivers', columns: columns.drivers, tableType: 'drivers' },
    { title: 'כרטיסי אשראי', dataKey: 'creditCards', columns: columns.creditCards, tableType: 'creditCards' }
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const renderButtons = (tableType) => {
    switch (tableType) {
      case 'drivers':
        return (
          <div className={styles["table-buttons"]}>
            <button onClick={openModal} className={styles["btn"]}>הוסף נהג</button>
            <button className={styles["btn"]}>הסר נהג</button>
          </div>
        );
      case 'creditCards':
        return (
          <div className={styles["table-buttons"]}>
            <button className={styles["btn"]}>הוסף כרטיס אשראי</button>
            <button className={styles["btn"]}>הסר כרטיס אשראי</button>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Head>
        <title>פרטי לקוח</title>
      </Head>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />
      <ListHeader
        title="כרטיס לקוח"
        subtitle="צפיה בפרטי הלקוח"
        showSearchBox={false}
      />
      <div className={styles.container}>
        {customerDetails && (
          <>
            <div className={styles.formContainer}>
              <CustomerDetailsComponent
                customerDetails={customerDetails}
                onCustomerChange={setCustomerDetails}
                openEditModal={openEditModal}
              />
              <div className={styles.section}>
                <UniversalTabsComponent
                  details={customerDetails}
                  tabsConfig={tabsConfig}
                  renderButtons={renderButtons}
                  ModalComponent={ModalComponent}
                  modalProps={{
                    isOpen: isModalOpen,
                    onClose: closeModal,
                    title: "הוספת נהג",
                    description: "הזן את פרטי הנהג החדש.",
                    footerText: "שים לב: כל הנהגים החדשים חייבים לעמוד בתנאי השימוש.",
                    children: <AddDriverForm customerId={id} token={token} onClose={closeModal} onSave={setCustomerDetails} />
                  }}
                />
              </div>
            </div>
            <div className={styles.summaryContainer}>
              <ProcessTracker steps={['הקמת פרטי לקוח', 'פתיחת פרטי לקוח', 'עריכת פרטי לקוח', 'סגירת פרטי לקוח']} currentStep={0} />
              <DetailsSummaryComponent
                summaryData={customerDetails}
                summaryGroups={customerDetails.summaryGroups || []}
                onEdit={openEditModal}
              />
            </div>
          </>
        )}
      </div>
      <ModalComponent
        isOpen={isCustomerModalOpen}
        onClose={closeEditModal}
        title={`עדכן ${currentGroup?.group}`}
      >
        <EditDetailsForm
          details={customerDetails}
          group={currentGroup}
          onSave={handleSave}
        />
      </ModalComponent>
    </div>
  );
};

export default CustomerDetailsPage;
