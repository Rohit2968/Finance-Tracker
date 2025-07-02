// src/components/AuthInitializer.js
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const AuthInitializer = () => {
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

  return null; // doesn't render anything
};

export default AuthInitializer;
