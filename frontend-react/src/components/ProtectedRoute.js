import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // ✅ Use named export

const ProtectedRoute = ({ children }) => {
  const { token, isLoading } = useAuth(); // ✅ useAuth() returns token and loading

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
