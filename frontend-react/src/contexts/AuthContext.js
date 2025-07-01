import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('financeTrackerToken') || null);
  // const [user, setUser] = useState(null);
  const [user] = useState(null);


  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Optionally fetch user data here
    }
  }, [token]);

  const login = async (userData) => {
    const res = await axios.post('/api/auth/login', userData);
    const token = res.data.token;
    setToken(token);
    localStorage.setItem('financeTrackerToken', token);
  };

  const register = async (userData) => {
    const res = await axios.post('/api/auth/register', userData);
    const token = res.data.token;
    setToken(token);
    localStorage.setItem('financeTrackerToken', token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('financeTrackerToken');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ token, setToken, login, register, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ THIS IS THE MISSING EXPORT
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
