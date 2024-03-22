// App.js

import React, { useState } from 'react';
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
import CarsList from './CarsList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // הוספת מצב לשליטה על התפריט הצידי
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // הוספת מצב לשליטה על תפריט נייד

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // שינוי מצב התפריט הצידי
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // שינוי מצב התפריט הנייד
  };

  return (
    <Router>
      <div className="App">
        <Header toggleSidebar={toggleSidebar} toggleMobileMenu={toggleMobileMenu} /> {/* הוספת toggleMobileMenu כ-props */}
        <Sidebar isSidebarOpen={isSidebarOpen} /> {/* העברת isSidebarOpen כ-props */}
        <div className={`content ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}> {/* הוספת תנאי עבור פתיחת התפריט הנייד */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addCustomer" element={<AddCustomerForm />} />
            <Route path="/vehicleInfo" element={<VehicleInfo />} />
            <Route path="/customersList" element={<CustomersList />} />
            <Route path="/customerDetails/:id" element={<CustomerDetails />} />
            <Route path="/addCar" element={<AddCar />} />
            <Route path="/carList" element={<CarList />} />
            <Route path="/carsList" element={<CarsList />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
