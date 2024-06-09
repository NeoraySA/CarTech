import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CarAvailabilityCalendar = ({ cars }) => {
  const events = cars.flatMap(car =>
    car.bookings.map(booking => ({
      title: `${booking.status}`, // ניתן להוסיף פרטים נוספים כאן
      start: new Date(booking.startDate),
      end: new Date(booking.endDate),
      resourceId: car.id,
      color: booking.status === 'מוזמן' ? '#FFA500' :
             booking.status === 'מושכר' ? '#008000' :
             '#FF0000' // אדום
    }))
  );

  const resources = cars.map(car => ({
    resourceId: car.id,
    resourceTitle: `${car.name} (${car.category})`
  }));

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.color,
      opacity: 0.8,
      color: 'white',
      borderRadius: '0px',
      border: 'none'
    }
  });

  return (
    <div style={{ height: '100vh' }}>
      <h2>זמינות רכבים לשבוע הקרוב</h2>
      <Calendar
        localizer={localizer}
        events={events}
        resources={resources}
        resourceIdAccessor="resourceId"
        resourceTitleAccessor="resourceTitle"
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        defaultView="week"
        style={{ height: 500, margin: '50px' }}
        messages={{
          next: "הבא",
          previous: "הקודם",
          today: "היום",
          month: "חודש",
          week: "שבוע",
          day: "יום"
        }}
      />
    </div>
  );
};

export default CarAvailabilityCalendar;
