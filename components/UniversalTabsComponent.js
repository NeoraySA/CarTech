// components/UniversalTabsComponent.js
import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styles from '../styles/TabsComponent.module.css';

const UniversalTabsComponent = ({ tabsConfig }) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className={styles["tabs-container"]}>
      <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
        <TabList>
          {tabsConfig.map((tab, index) => (
            <Tab key={index}>{tab.title}</Tab>
          ))}
        </TabList>
        {tabsConfig.map((tab, index) => (
          <TabPanel key={index}>
            <tab.Component {...tab.props} />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default UniversalTabsComponent;
