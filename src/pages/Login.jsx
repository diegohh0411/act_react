import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router';

function Login() {
  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState('checking');

  const { isLoggedIn, username, login, logout } = useAuth();
  const navigate = useNavigate();

  const API_BASE_URL = 'http://localhost:3001/api';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: usernameInput, password }),
      });

      const data = await response.json();

      if (data.success) {
        const userData = {
          username: data.user.username,
          loginTime: data.user.loginTime,
          token: data.user.token,
          isAuthenticated: true
        };
        
        login(userData);
        navigate('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Unable to connect to server. Please make sure the backend is running.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUsernameInput('');
    setPassword('');
  };
  
  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const healthResponse = await fetch(`${API_BASE_URL}/health`);
        if (healthResponse.ok) {
          setServerStatus('online');
        } else {
          setServerStatus('offline');
        }
      } catch {
        setServerStatus('offline');
      }
    };

    checkServerStatus();
  }, []);
  
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn) {
    return (
      <div className="login max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Welcome!</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          You are successfully logged in as <strong>{username}</strong>
        </p>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="login max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Login Page</h1>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            serverStatus === 'online' ? 'bg-green-500' : 
            serverStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
          }`}></div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Server: {serverStatus}
          </span>
        </div>
      </div>
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter your username"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter your password"
            required
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>Credenciales de prueba:</strong><br />
          Username: admin | Password: password123<br />
          Username: user | Password: user123<br />
          Username: diego | Password: diego2024
        </p>
      </div>
    </div>
  );
}

export default Login;
