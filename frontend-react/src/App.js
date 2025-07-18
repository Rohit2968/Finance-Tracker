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
      <AuthInitializer />
      <Router>
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
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
