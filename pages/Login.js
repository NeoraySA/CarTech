import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Notification from '../components/Notification';
import styles from '../styles/LoginForm.module.css';
import SettingsContext from '../context/SettingsContext'; // ייבוא SettingsContext

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });
  const router = useRouter();
  const { updatePermissions } = useContext(SettingsContext); // שימוש בקונטקסט של ההגדרות

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification({ message: '', type: '' });

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    try {
      const response = await fetch(`${apiUrl}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      console.log("Response Data:", data);

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log("Saved to localStorage:", data.user);
        updatePermissions(); // קריאה לעדכון ההרשאות לאחר התחברות מוצלחת
        setNotification({ message: 'התחברת בהצלחה!', type: 'success' });
        router.push('/dashboard');
      } else {
        setNotification({ message: data.error || 'Failed to login', type: 'error' });
      }
    } catch (error) {
      console.error("Login Error:", error);
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
