import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Briefcase, ArrowRight, Sun, Moon, ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Register = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    email: '',
    password: '',
    role: 'employee'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on typing
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Frontend Validation (Section 3.1.1: Security Rules)
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!formData.employeeId.trim()) {
      setError("Employee ID is required.");
      return;
    }

    // Mock Success
    alert("Registration Successful! Please Log In.");
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300 px-4 relative">
      
      {/* Back to Home Button (Top Left) */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors font-medium"
      >
        <ArrowLeft size={20} />
        <span className="hidden sm:inline">Back to Home</span>
      </button>

      {/* Theme Toggle Button (Top Right) - NEW */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-all duration-300"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      {/* Register Card */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 dark:border-gray-700 mt-12 sm:mt-0">
        
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
             <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-indigo-200 dark:shadow-none">
              D
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Create Account</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Join Dayflow HRMS</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              name="name"
              required
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
            />
          </div>

          {/* Employee ID (Requirement 3.1.1) */}
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              name="employeeId"
              required
              placeholder="Employee ID (e.g., EMP001)"
              value={formData.employeeId}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="email" 
              name="email"
              required
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="password" 
              name="password"
              required
              placeholder="Password (Min 6 chars)"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
            />
          </div>

          {/* Role Selection (Requirement 3.1.1) */}
          <div className="flex items-center gap-4 p-1">
             <label className="flex items-center cursor-pointer group flex-1 p-3 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-primary transition-all">
                <input 
                  type="radio" 
                  name="role" 
                  value="employee" 
                  checked={formData.role === 'employee'}
                  onChange={handleChange}
                  className="mr-3 w-4 h-4 text-primary focus:ring-primary"
                />
                <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">Employee</span>
             </label>
             <label className="flex items-center cursor-pointer group flex-1 p-3 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-primary transition-all">
                <input 
                  type="radio" 
                  name="role" 
                  value="hr" 
                  checked={formData.role === 'hr'}
                  onChange={handleChange}
                  className="mr-3 w-4 h-4 text-primary focus:ring-primary"
                />
                <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">HR / Admin</span>
             </label>
          </div>

          <button 
            type="submit"
            className="w-full bg-primary hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2"
          >
            <span>Register Now</span>
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/login')}
              className="text-primary font-bold hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;