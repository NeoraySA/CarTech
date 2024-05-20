import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Notification from '../components/Notification'; // ייבוא הקומפוננטה של ההודעות
import styles from '../styles/LoginForm.module.css'; // ייבוא עיצוב ה-CSS

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification({ message: '', type: '' });

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'; // שימוש במשתנה סביבה

    try {
      const response = await fetch(`${apiUrl}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful', data);
        localStorage.setItem('token', data.token); // שמירת הטוקן ב-localStorage
        localStorage.setItem('user_id', data.userId); // שמירת מזהה המשתמש ב-localStorage
        localStorage.setItem('company_id', data.companyId); // שמירת מזהה החברה ב-localStorage
        localStorage.setItem('branch_id', data.branchId); // שמירת מזהה הסניף ב-localStorage
        setNotification({ message: 'התחברת בהצלחה!', type: 'success' });
        router.push('/dashboard'); // הפניה לדף הדאשבורד או לדף הבית לאחר התחברות
      } else {
        setNotification({ message: data.error || 'Failed to login', type: 'error' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setNotification({ message: 'Network error', type: 'error' });
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.loginButton}>Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
