import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Notification from '../components/Notification';
import { SettingsProvider } from '../context/SettingsContext';
import { getCompanyColors } from '../services/ColorService';

import '../src/icons';

// Import all CSS files
import '../styles/General.css';
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loadingColors, setLoadingColors] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
      if (!token && router.pathname !== '/Login') {
        router.replace('/Login');
      } else if (token) {
        fetchColors(token);
      }
    };

    checkAuth();
    router.events.on('routeChangeComplete', checkAuth);

    return () => {
      router.events.off('routeChangeComplete', checkAuth);
    };
  }, [router]);

  useEffect(() => {
    const handleStart = (url) => {
      if (url !== router.pathname) {
        setLoadingColors(true);
      }
    };

    const handleComplete = () => {
      setLoadingColors(false);
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

  const fetchColors = async (token) => {
    if (!token) return;

    try {
      setLoadingColors(true);
      const colors = await getCompanyColors(token);
      console.log('Setting colors:', colors);
      Object.entries(colors).forEach(([key, value]) => {
        const cssVariable = `--${key.split('_')[1]}-color`;
        document.documentElement.style.setProperty(cssVariable, value);
      });
    } catch (error) {
      console.error('Error fetching company colors:', error);
    } finally {
      setLoadingColors(false);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const isLoginPage = router.pathname === '/Login';

  if (!isAuthenticated && !isLoginPage) {
    return null; // או תוכל להחזיר קומפוננטת טעינה כאן
  }

  if (isLoginPage) {
    return (
      <SettingsProvider>
        <Component {...pageProps} />
        {loadingColors && <Notification message="טוען..." type="info" />}
      </SettingsProvider>
    );
  }

  return (
    <SettingsProvider>
      <Header toggleSidebar={toggleSidebar} toggleMobileMenu={toggleMobileMenu} />
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`content ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <Component {...pageProps} />
      </div>
      <Footer />
      {loadingColors && <Notification message="טוען..." type="info" />}
    </SettingsProvider>
  );
}

export default MyApp;