// pages/_app.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

import '../styles/index.css';
import '../styles/Header.css';
import '../styles/Footer.css';
import '../styles/Sidebar.css';
import '../styles/App.css';
import '../styles/CarsList.css';
import '../styles/CarTable.css';
import '../styles/ListFooter.css';
import '../styles/Dashboard.css';
import '../styles/ListHeader.css'; // וודא שהנתיב נכון

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Redirect to login page if not logged in
    const token = localStorage.getItem('token');
    if (!token && router.pathname !== '/Login') {
      router.push('/Login');
    }
  }, []); // הוספת תלות ריקה כדי שה-Effect ירוץ רק פעם אחת בעת טעינת הקומפוננטה

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const showMenus = router.pathname !== '/Login';

  return (
    <>
      {showMenus && (
        <>
          <Header toggleSidebar={toggleSidebar} toggleMobileMenu={toggleMobileMenu} />
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </>
      )}
      <div className={`content ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <Component {...pageProps} />
      </div>
      {showMenus && <Footer />}
    </>
  );
}

export default MyApp;
