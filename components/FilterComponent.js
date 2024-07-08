import React from 'react';
import styles from '../styles/FilterComponent.module.css';

const FilterComponent = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: { ...filters[name], value } });
  };

  return (
    <div className={styles.filterContainer}>
      {Object.keys(filters).map((key) => (
        <div key={key} className={styles.filterItem}>
          <label htmlFor={key} className={styles.filterLabel}>{filters[key].label}</label>
          <input
            id={key}
            name={key}
            type={filters[key].type}
            value={filters[key].value}
            onChange={handleChange}
            className={styles.filterInput}
          />
        </div>
      ))}
    </div>
  );
};

export default FilterComponent;
