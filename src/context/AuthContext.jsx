import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = 'http://localhost:3001/api';

  const checkAuthStatus = async () => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        if (userData.isAuthenticated && userData.token) {
          const response = await fetch(`${API_BASE_URL}/validate-token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: userData.token }),
          });

          const data = await response.json();
          if (data.success) {
            setIsLoggedIn(true);
            setUsername(userData.username);
          } else {
            localStorage.removeItem('userData');
            setIsLoggedIn(false);
            setUsername('');
          }
        }
      } catch (err) {
        console.error('Token validation error:', err);
        localStorage.removeItem('userData');
        setIsLoggedIn(false);
        setUsername('');
      }
    }
    setIsLoading(false);
  };

  const login = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUsername(userData.username);
  };

  const logout = () => {
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUsername('');
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value = {
    isLoggedIn,
    username,
    isLoading,
    login,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
