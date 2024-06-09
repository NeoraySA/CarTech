import React from 'react';
import styles from '../styles/ProcessTracker.module.css';
import { FaCheckCircle } from 'react-icons/fa'; // ייבוא אייקון הסימון

const ProcessTracker = ({ steps, currentStep }) => {
  return (
    <div className={styles.processTracker}>
      {steps.map((step, index) => (
        <div key={index} className={styles.step}>
          <div className={`${styles.circle} ${index <= currentStep ? styles.completed : ''}`}>
            {index <= currentStep && <FaCheckCircle className={styles.icon} />}
          </div>
          <div className={styles.label}>{step}</div>
        </div>
      ))}
    </div>
  );
};

export default ProcessTracker;
