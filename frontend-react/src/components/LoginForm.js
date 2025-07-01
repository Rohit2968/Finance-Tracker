// src/components/LoginForm.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Invalid credentials');
      
      const data = await response.json();
      const token = data.token;

      // Store token using localStorage
      localStorage.setItem('authToken', token);
      
      // OR store using cookies
      document.cookie = `authToken=${token}; Path=/; Expires=Fri, 31 Dec 9999 23:59:59 GMT`;
      
      setToken(token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
    </form>
  );
}