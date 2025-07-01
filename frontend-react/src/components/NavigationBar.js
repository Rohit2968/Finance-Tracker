// src/components/NavigationBar.js
import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="main-nav">
      <Link to="/">Home</Link>
      {!user ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <span>Welcome, {user.email}</span>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default NavigationBar;