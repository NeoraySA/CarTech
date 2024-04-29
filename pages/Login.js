import React, { useState } from 'react';
import { useRouter } from 'next/router';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'; // שימוש במשתנה סביבה

    try {
      const response = await fetch(`${apiUrl}/api/login`, {
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
        router.push('/dashboard'); // הפניה לדף הדאשבורד או לדף הבית לאחר התחברות
      } else {
        setErrorMsg(data.error || 'Failed to login');
      }
    } catch (error) {
      setErrorMsg('Network error');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMsg && <div style={{ color: 'red' }}>{errorMsg}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
