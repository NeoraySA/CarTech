import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/ModalComponent.module.css'; // עיצוב כללי למודל

const ModalComponent = ({ isOpen, onClose, title, children, onSave, description, footerText }) => {
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
        <p className={styles.description}>{description}</p>
        <div className={styles.inputField}>
          {children}
        </div>
        <div className={styles.modalFooter}>
          <div className={styles.footerText}>{footerText}</div>
          <div>
            <button onClick={onSave} className={styles.confirmButton}>אישור</button>
            <button onClick={onClose} className={styles.cancelButton}>ביטול</button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default ModalComponent;
