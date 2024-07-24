import React from 'react';
import styles from '../styles/SearchForm.module.css';

const SearchForm = ({ start, setStart, end, setEnd, phone, setPhone, period, setPeriod, onSearch, loading, labels, setNotification }) => {
  const handlePeriodChange = (e) => {
    const period = e.target.value;
    setPeriod(period);

    const currentDate = new Date();
    let startDate, endDate = new Date();

    switch (period) {
      case 'today':
        startDate = new Date(currentDate.setHours(0, 0, 0, 0));
        endDate = new Date(currentDate.setHours(23, 59, 59, 999));
        break;
      case 'yesterday':
        startDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(startDate);
        endDate.setHours(23, 59, 59, 999);
        break;
      case 'startOfWeek':
        startDate = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date();
        break;
      case 'week':
        startDate = new Date(currentDate.setDate(currentDate.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
        break;
      case '3months':
        startDate = new Date(currentDate.setMonth(currentDate.getMonth() - 3));
        break;
      case '6months':
        startDate = new Date(currentDate.setMonth(currentDate.getMonth() - 6));
        break;
      case 'year':
        startDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1));
        break;
      case 'custom':
        startDate = '';
        endDate = '';
        break;
      default:
        startDate = '';
        endDate = '';
        break;
    }

    if (startDate) {
      startDate = new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    }
    if (endDate) {
      endDate = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    }

    setStart(startDate);
    setEnd(endDate);
  };

  const handleSearchClick = () => {
    if (!start || !end) {
      setNotification({ message: 'נא להזין תאריך התחלה ותאריך סיום!', type: 'error' });
      return;
    }
    onSearch();
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.field}>
          <label className={styles.label}>
            {labels.startTime}:
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className={styles.input}
            />
          </label>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>
            {labels.endTime}:
            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className={styles.input}
            />
          </label>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>
            {labels.period}:
            <select value={period} onChange={handlePeriodChange} className={styles.select}>
              <option value="">בחירת טווח תאריכים</option>
              <option value="today">היום</option>
              <option value="yesterday">אתמול</option>
              <option value="startOfWeek">מתחילת השבוע</option>
              <option value="week">השבוע האחרון</option>
              <option value="month">חודש אחרון</option>
              <option value="3months">3 חודשים אחרונים</option>
              <option value="6months">6 חודשים אחרונים</option>
              <option value="year">שנה אחרונה</option>
              <option value="custom">מותאם אישית</option>
            </select>
          </label>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>
            {labels.phoneNumber}:
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.input}
            />
          </label>
        </div>

        <div className={styles.field}>
        <div className={styles.divBtn}>
      <button onClick={handleSearchClick} disabled={loading} className="Button2">
        {loading ? 'מחפש...' : labels.searchButton}
      </button>
      </div>
        </div>


      </div>
      
    </div>
  );
};

export default SearchForm;
