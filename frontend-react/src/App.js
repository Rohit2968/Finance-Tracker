import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import TransactionPage from './pages/TransactionPage'; 
import AuthInitializer from './components/AuthInitializer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthInitializer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/transactions" 
            element={
              <ProtectedRoute>
                <TransactionPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
