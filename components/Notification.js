import React from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';
import styles from '../styles/Notification.module.css';

const Notification = ({ message, type, onClose, onConfirm }) => {
  if (!message) return null;

  let icon;
  switch (type) {
    case 'success':
      icon = <FaCheckCircle className={styles.icon} />;
      break;
    case 'error':
      icon = <FaExclamationCircle className={styles.icon} />;
      break;
    case 'info':
      icon = <FaInfoCircle className={styles.icon} />;
      break;
    default:
      icon = null;
  }

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      {icon}
      <span className={styles.message}>{message}</span>
      {onConfirm ? (
        <div className={styles.buttonGroup}>
          <button className={styles.confirmButton} onClick={onConfirm}>אישור</button>
          <button className={styles.cancelButton} onClick={onClose}>ביטול</button>
        </div>
      ) : (
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
      )}
    </div>
  );
};

export default Notification;
