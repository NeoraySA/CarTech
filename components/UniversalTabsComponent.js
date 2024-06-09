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

    return [
      { title: 'חיובים', data: rentalDetails.charges, columns: columns.charges, tableType: 'charges' },
      { title: 'נהגים מורשים', data: rentalDetails.drivers, columns: columns.drivers, tableType: 'drivers' },
      { title: 'בטחונות אשראי', data: rentalDetails.securities, columns: columns.securities, tableType: 'securities' },
      { title: 'ביטוחים', data: rentalDetails.insurances, columns: columns.insurances, tableType: 'insurances' },

      { title: 'כבישי אגרה', data: rentalDetails.tollTravels, columns: columns.tollTravels, tableType: 'tollTravels' },
      { title: 'דוחות תנועה', data: rentalDetails.trafficReports, columns: columns.trafficReports, tableType: 'trafficReports' },
      
      { title: 'נזקים ברכב', data: rentalDetails.vehicleDamages, columns: columns.vehicleDamages, tableType: 'vehicleDamages' },
      { title: 'תקבולים', data: rentalDetails.payments, columns: columns.payments, tableType: 'payments' }
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
      case 'trafficReports':
        return (
          <div className={styles["table-buttons"]}>
            <button className={styles["btn"]}>הוסף דוח תנועה</button>
            <button className={styles["btn"]}>הסר דוח תנועה</button>
          </div>
        );
      case 'tollTravels':
        return (
          <div className={styles["table-buttons"]}>
            <button className={styles["btn"]}>הוסף נסיעה בכביש אגרה</button>
            <button className={styles["btn"]}>הסר נסיעה בכביש אגרה</button>
          </div>
        );
      case 'vehicleDamages':
        return (
          <div className={styles["table-buttons"]}>
            <button className={styles["btn"]}>הוסף נזק ברכב</button>
            <button className={styles["btn"]}>הסר נזק ברכב</button>
          </div>
        );
      case 'payments':
        return (
          <div className={styles["table-buttons"]}>
            <button className={styles["btn"]}>הוסף תקבול</button>
            <button className={styles["btn"]}>הסר תקבול</button>
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
