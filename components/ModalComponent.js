import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/ModalComponent.module.css';

const ModalComponent = ({ isOpen, onClose, title, children }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser || !isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <button onClick={onClose} className={styles.closeButton}>X</button>
          <h4 className={styles.title}>{title}</h4>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.inputFields}>
            {children}
          </div>
        </div>
        <div className={styles.modalFooter}>
          <div className={styles.footerText}></div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default ModalComponent;
