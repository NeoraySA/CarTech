// CustomersList.js

import React from 'react';
import './CustomersList.css'; // יבוא של קובץ ה-CSS

// יצירת רשימת לקוחות כמשתנה
const customersData = [
  { id: 1, name: "לקוח 1", email: "customer1@example.com", phone: "1234567890", address: "רחוב 1", city: "עיר 1" },
  { id: 2, name: "לקוח 2", email: "customer2@example.com", phone: "2345678901", address: "רחוב 2", city: "עיר 2" },
  { id: 3, name: "לקוח 3", email: "customer3@example.com", phone: "3456789012", address: "רחוב 3", city: "עיר 3" },
  { id: 4, name: "לקוח 4", email: "customer4@example.com", phone: "4567890123", address: "רחוב 4", city: "עיר 4" },
  { id: 5, name: "לקוח 5", email: "customer5@example.com", phone: "5678901234", address: "רחוב 5", city: "עיר 5" }
];

// קומפוננטת רשימת לקוחות
function CustomersList() {
  return (
    <div>
      <h2>רשימת לקוחות</h2>
      <table>
        <thead>
          <tr>
            <th>שם</th>
            <th>אימייל</th>
            <th>טלפון</th>
            <th>כתובת</th>
            <th>עיר</th>
          </tr>
        </thead>
        <tbody>
          {customersData.map(customer => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.address}</td>
              <td>{customer.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomersList;
