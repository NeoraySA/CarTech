import React, { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import UniversalTableRental from './UniversalTableRental';
import ModalComponent from './ModalComponent';
import DriverRentalSelector from './DriverRentalSelector';
import styles from '../styles/TabsComponent.module.css';

const UniversalTabsComponent = ({ rentalDetails, customerId }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log('UniversalTabsComponent received customerId:', customerId);
    console.log('UniversalTabsComponent received rentalId:', rentalDetails?.rental?.rental_id);
  }, [customerId, rentalDetails]);

  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy');
  };

  const tabs = useMemo(() => {
    if (!rentalDetails) return [];

    const columns = {
      drivers: [
        { Header: 'שם', accessor: 'name' },
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
      ]
    };

    return [
      { title: 'נהגים מורשים', data: rentalDetails.drivers, columns: columns.drivers, tableType: 'drivers' },
      { title: 'חיובים', data: rentalDetails.charges, columns: columns.charges, tableType: 'charges' },
      { title: 'ביטוחים', data: rentalDetails.insurances, columns: columns.insurances, tableType: 'insurances' },
      { title: 'בטחונות אשראי', data: rentalDetails.securities, columns: columns.securities, tableType: 'securities' }
    ].map(tab => ({
      title: tab.title,
      Component: UniversalTableRental,
      props: { data: tab.data || [], columns: tab.columns, tableType: tab.tableType }
    }));
  }, [rentalDetails]);

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
      case 'charges':
        return (
          <div className={styles["table-buttons"]}>
            <button className={styles["btn"]}>הוסף חיוב</button>
            <button className={styles["btn"]}>הסר חיוב</button>
          </div>
        );
      case 'insurances':
        return (
          <div className={styles["table-buttons"]}>
            <button className={styles["btn"]}>הוסף ביטוח</button>
            <button className={styles["btn"]}>הסר ביטוח</button>
          </div>
        );
      case 'securities':
        return (
          <div className={styles["table-buttons"]}>
            <button className={styles["btn"]}>הוסף בטחון</button>
            <button className={styles["btn"]}>הסר בטחון</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles["tabs-container"]}>
      <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
        <TabList>
          {tabs.map((tab, index) => (
            <Tab key={index}>{tab.title}</Tab>
          ))}
        </TabList>
        {tabs.map((tab, index) => (
          <TabPanel key={index}>
            <tab.Component {...tab.props} />
            {renderButtons(tab.props.tableType)}
          </TabPanel>
        ))}
      </Tabs>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={closeModal}
        title="הוסף נהג חדש"
        description="הזן את פרטי הנהג החדש."
        footerText="שים לב: כל הנהגים החדשים חייבים לעמוד בתנאי השימוש."
      >
        <DriverRentalSelector onClose={closeModal} rentalId={rentalDetails?.rental?.rental_id} customerId={customerId} />
      </ModalComponent>
    </div>
  );
};

export default UniversalTabsComponent;
