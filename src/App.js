import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import CustomersList from './CustomersList';
import CustomerDetails from './CustomerDetails';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`content ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customersList" element={<CustomersList />} />
            <Route path="/customerDetails/:id" element={<CustomerDetails />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
