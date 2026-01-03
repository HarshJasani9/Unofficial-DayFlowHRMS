import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { User, Mail, Lock, Briefcase, ArrowRight } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee' // Default selection
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Call the Server (Section 3.1.1)
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      
      if(response.data.success) {
        alert("Registration Successful! Please Login.");
        navigate('/login');
      }
    } catch (err) {
      if(err.response && !err.response.data.success) {
        setError(err.response.data.error);
      } else {
        setError("Server Error. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 dark:border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Create Account</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Join Dayflow HRMS</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Full Name"
              required
              className="w-full pl-10 pr-4 py-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="email" 
              placeholder="Email Address"
              required
              className="w-full pl-10 pr-4 py-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Password Input (Section 3.1.1: Password security) */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="password" 
              placeholder="Password"
              required
              minLength={6}
              className="w-full pl-10 pr-4 py-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {/* Role Selection (Section 3.1.1: Role Employee/HR) */}
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select 
              className="w-full pl-10 pr-4 py-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary appearance-none"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin / HR</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
            Register <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;