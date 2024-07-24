// components/HighlightedCell.js
import React from 'react';
import styles from '../styles/HighlightedCell.module.css';

const HighlightedCell = ({ children }) => {
  return <span className={styles.highlighted}>{children}</span>;
};

export default HighlightedCell;
