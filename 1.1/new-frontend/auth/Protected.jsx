// src/components/Protected.js
import React, { useState, useEffect } from 'react';
import { getToken, logout } from './authService';
import { useNavigate } from 'react-router-dom';

const Protected = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = getToken();
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:1312/protected', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.text();
        setMessage(data);
      } else {
        setMessage('Access denied');
      }
    };

    fetchProtectedData();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <h2>Protected Page</h2>
      <p>{message}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Protected;