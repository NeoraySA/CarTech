import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import AddCustomerForm from './AddCustomerForm';
import VehicleInfo from './VehicleInfo';
import CustomersList from './CustomersList';
import CustomerDetails from './CustomerDetails';
import AddCar from './AddCar';
import CarList from './CarList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  // אתחול המצב בהתאם למה שנשמר ב-localStorage או false כברירת מחדל
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    JSON.parse(localStorage.getItem('isSidebarOpen')) || false
  );

  // עדכון ה-localStorage בכל פעם שהמצב של התפריט הצידי משתנה
  useEffect(() => {
    localStorage.setItem('isSidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Sidebar className="sidebar" isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`content ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addCustomer" element={<AddCustomerForm />} />
            <Route path="/vehicleInfo" element={<VehicleInfo />} />
            <Route path="/customersList" element={<CustomersList />} />
            <Route path="/customerDetails/:id" element={<CustomerDetails />} />
            <Route path="/addCar" element={<AddCar />} />
            <Route path="/carList" element={<CarList />} />

            {/* Add more routes as needed */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
