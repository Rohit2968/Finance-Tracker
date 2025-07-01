import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// import PrivateRoute from './components/PrivateRoute';
import ProtectedRoute from './components/ProtectedRoute';
import TransactionPage from './pages/TransactionPage'; 

function App() {
  // const { token, setToken } = useAuth(); 
  const { setToken } = useAuth(); 


  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('financeTrackerToken');
      if (storedToken) {
        try {
          const response = await fetch('http://localhost:5000/api/auth/validate', {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });

          if (!response.ok) {
            throw new Error('Token invalid');
          }

          setToken(storedToken);
        } catch (error) {
          console.error('Token validation failed:', error);
          setToken(null);
          localStorage.removeItem('financeTrackerToken');
        }
      }
    };

    checkAuth();
  }, [setToken]);

  return (
    <AuthProvider>
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
