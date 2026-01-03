import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import Auth
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth(); // Get real user state
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">D</div>
              <span className="font-bold text-xl text-gray-800 dark:text-white">Dayflow</span>
            </Link>

            {/* Links - Only show if Logged In */}
            {user && (
              <div className="hidden md:flex items-center gap-6">
                <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-primary font-medium transition-colors">
                  Dashboard
                </Link>
                
                {/* Only Admin sees Employee List */}
                {user.role === 'admin' && (
                  <Link to="/admin/employees" className="text-gray-600 dark:text-gray-300 hover:text-primary font-medium transition-colors">
                    Employees
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-gray-800 dark:text-white">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="px-5 py-2.5 bg-primary hover:bg-indigo-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-indigo-200 dark:shadow-none text-sm"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;