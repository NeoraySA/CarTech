// pages/_app.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Notification from '../components/Notification';
import { SettingsProvider } from '../context/SettingsContext';

import '../styles/index.css';
import '../styles/Header.css';
import '../styles/Footer.css';
import '../styles/Sidebar.css';
import '../styles/App.css';
import '../styles/CarsList.css';
import '../styles/CarTable.css';
import '../styles/ListFooter.css';
import '../styles/Dashboard.css';
import '../styles/ListHeader.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const companyId = 1;
  const branchId = 1;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && router.pathname !== '/Login') {
      router.push('/Login');
    }

    const handleStart = (url) => {
      if (url !== router.pathname) {
        setLoading(true);
      }
    };

    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const showMenus = router.pathname !== '/Login';

  return (
    <SettingsProvider companyId={companyId} branchId={branchId}>
      {showMenus && (
        <>
          <Header toggleSidebar={toggleSidebar} toggleMobileMenu={toggleMobileMenu} />
          <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </>
      )}
      <div className={`content ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <Component {...pageProps} />
      </div>
      {showMenus}
      {loading && <Notification message="טוען..." type="info" />}
    </SettingsProvider>
  );
}

export default MyApp;
