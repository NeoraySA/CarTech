// Dashboard.js
import React from 'react';
import DashboardCarCard from '../components/DashboardCarCard'; // וודא שהנתיב נכון לקובץ



function Dashboard() {
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <p>זהו המקום להצגת מידע חשוב וסקירה כוללת של המערכת.</p>
        {/* הוספת קומפוננטת DashboardCarCard */}
        <div className="dashboard-cards">
          <DashboardCarCard />
          {/* ניתן להוסיף כאן יותר תוכן או קומפוננטות נוספות כמו גרפים, טבלאות וכו'. */}
        </div>
      </div>
    );
}
  
export default Dashboard;
