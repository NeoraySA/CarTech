import React from 'react';
import styles from '../styles/CarAvailabilityTable.module.css'; // וודא שהנתיב נכון

const CarAvailabilityTable = ({ cars }) => {
  const daysOfWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  const today = new Date();
  const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));

  const weekDates = daysOfWeek.map((_, idx) => {
    const day = new Date(firstDayOfWeek);
    day.setDate(day.getDate() + idx);
    return day;
  });

  return (
    <div>
      <h2>זמינות רכבים לשבוע הקרוב</h2>
      <table className={styles.availabilityTable}>
        <thead>
          <tr>
            <th>רכב</th>
            {weekDates.map((date, idx) => (
              <th key={idx}>{daysOfWeek[idx]} ({date.toISOString().slice(0, 10)})</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car.id}>
              <td>{car.name} ({car.category})</td>
              {weekDates.map((day, idx) => (
                <td key={idx} className={styles.bookingCell}>
                  {car.bookings.map((booking, bIdx) => {
                    const startDate = new Date(booking.startDate);
                    const endDate = new Date(booking.endDate);
                    if (startDate <= day && day <= endDate) {
                      const isFirstDay = startDate.toISOString().slice(0, 10) === day.toISOString().slice(0, 10);
                      const isLastDay = endDate.toISOString().slice(0, 10) === day.toISOString().slice(0, 10);
                      const startHour = isFirstDay ? startDate.getHours() : 0;
                      const endHour = isLastDay ? endDate.getHours() : 24;
                      const duration = endHour - startHour;
                      const position = (startHour / 24) * 100;
                      const width = (duration / 24) * 100;
                      return (
                        <div key={bIdx} className={styles.bookingBlock} style={{
                          left: `${position}%`,
                          width: `${width}%`,
                          backgroundColor: booking.status === 'מוזמן' ? '#FFA500' :
                                           booking.status === 'מושכר' ? '#008000' :
                                           '#FF0000'
                        }}>
                          {booking.status}
                        </div>
                      );
                    }
                    return null;
                  })}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarAvailabilityTable;
