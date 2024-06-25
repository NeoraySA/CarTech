import React, { useState, useMemo } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import UniversalTableRental from './UniversalTableRental';
import styles from '../styles/TabsComponent.module.css';

const UniversalTabsComponent = ({ details, tabsConfig, renderButtons, modalComponent: ModalComponent, modalProps }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const tabs = useMemo(() => {
    if (!details) return [];

    return tabsConfig.map(tab => ({
      title: tab.title,
      Component: UniversalTableRental,
      props: { data: details[tab.dataKey] || [], columns: tab.columns, tableType: tab.tableType }
    }));
  }, [details, tabsConfig]);

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
            {renderButtons && renderButtons(tab.props.tableType)}
          </TabPanel>
        ))}
      </Tabs>
      {ModalComponent && <ModalComponent {...modalProps} />}
    </div>
  );
};

export default UniversalTabsComponent;
