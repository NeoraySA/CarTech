// pages/_app.js
import React, { useState } from 'react';
import { useRouter } from 'next/router'; // יבוא של useRouter מ Next.js

import Header from '../components/Header'; // שנה את הנתיב בהתאם למיקום הקובץ
import Footer from '../components/Footer'; // שנה את הנתיב בהתאם למיקום הקובץ
import Sidebar from '../components/Sidebar'; // שנה את הנתיב בהתאם למיקום הקובץ

import '../styles/index.css';

import '../styles/Header.css'; // ודא שהנתיב נכון
import '../styles/Footer.css'; // ודא שהנתיב נכון
import '../styles/Sidebar.css'; // ודא שהנתיב נכון
import '../styles/App.css'; // הנחתי שהסגנונות שלך מאוחסנים כאן, שנה את הנתיב בהתאם למיקום הקובץ המדויק שלך

import '../styles/CarsList.css';
import '../styles/CarTable.css';
import '../styles/ListFooter.css';

import '../styles/Dashboard.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter(); // קבלת הראוטר הנוכחי

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // בדיקה אם הנתיב הנוכחי הוא לא הדף של הלוגין
  const showMenus = router.pathname !== '/Login';

  return (
    <>
      {/* הצגת התפריטים רק אם לא מדובר בדף ההתחברות */}
      {showMenus && (
        <>
          <Header toggleSidebar={toggleSidebar} toggleMobileMenu={toggleMobileMenu} />
          <Sidebar isSidebarOpen={isSidebarOpen} />
          <Footer />
        </>
      )}
      {/* תצוגת התוכן של הדף */}
      <div className={`content ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
