import React, { useState } from 'react';
import styles from '../styles/FilterComponent.module.css';



import CarCategoriesSelector from './CarCategoriesSelector';
import { FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';

const FilterComponent = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: { ...filters[name], value } });
  };

  const handleCategoryChange = (selectedOption) => {
    onFilterChange({ ...filters, category: { ...filters.category, value: selectedOption ? selectedOption.value : '' } });
  };

  const clearFilter = (key) => {
    onFilterChange({ ...filters, [key]: { ...filters[key], value: '' } });
  };

  const resetFilters = () => {
    const resetFilters = Object.keys(filters).reduce((acc, key) => {
      acc[key] = { ...filters[key], value: '' };
      return acc;
    }, {});
    onFilterChange(resetFilters);
  };

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.Header} onClick={toggleFilters}>
      <div className={styles.section1}>

        <span className={styles.titleDescription}>ניתן לבחור אפשרויות סינון</span>
       </div>
       <div className={styles.section2}>
        <span className={styles.toggleIcon}>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
        </div>
      </div>
      {isOpen && (
        <div className={styles.filters}>
          {Object.keys(filters).map((key) => (
            <div key={key} className={styles.filterItem}>
              <label htmlFor={key} className={styles.filterLabel}>{filters[key].label}</label>
              <div className={styles.inputWrapper}>
                {key === 'category' ? (
                  <div className={styles.selectWrapper}>
                    <CarCategoriesSelector onChange={handleCategoryChange} />
                  </div>
                ) : (
                  <input
                    id={key}
                    name={key}
                    type={filters[key].type}
                    value={filters[key].value}
                    onChange={handleChange}
                    className={styles.filterInput}
                  />
                )}
                {filters[key].value && (
                  <FaTimes className={styles.clearIcon} onClick={() => clearFilter(key)} />
                )}
              </div>
            </div>
          ))}
          <div className={styles.buttonSection}>
          <button onClick={resetFilters} className="Button1">איפוס פילטרים</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
