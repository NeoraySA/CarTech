import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styles from '../styles/TabsComponent.module.css';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa'; // דוגמה לאייקונים, ניתן להחליף או להוסיף אייקונים לפי הצורך

const UniversalTabsComponent = ({ tabsConfig, renderButtons, ModalComponent, modalProps }) => {
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
            <div>
              {renderButtons && renderButtons(tab.tableType)}
              {tab.Component && <tab.Component {...tab.props} />}
              <div className={styles.buttonRow}>
                {tab.buttons && tab.buttons.map((button, btnIndex) => (
                  <button key={btnIndex} onClick={button.onClick} className={styles.actionButton}>
                    {button.icon && React.createElement(button.icon, { className: styles.buttonIcon })}
                    {button.label}
                  </button>
                ))}
              </div>
            </div>
          </TabPanel>
        ))}
      </Tabs>
      {ModalComponent && (
        <ModalComponent {...modalProps} />
      )}
    </div>
  );
};

export default UniversalTabsComponent;
