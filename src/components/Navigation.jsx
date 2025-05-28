import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';

const Navigation = () => {
  const { isLoggedIn, username, logout, isLoading } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="flex gap-2 items-center justify-between">
      <div className="flex gap-2 items-center">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {!isLoggedIn && <Link to="/login">Login</Link>}
      </div>
      
      {!isLoading && isLoggedIn && (
        <div className="flex gap-4 items-center">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Bienvenido, {username}
          </span>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;