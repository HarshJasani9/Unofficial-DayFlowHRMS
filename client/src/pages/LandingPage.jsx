import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext'; // Import Theme Context
import { Users, FileText, Clock, DollarSign, ArrowRight, Sun, Moon } from 'lucide-react';

const LandingPage = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme(); // Get theme controls
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans">
      
      {/* --- NAVBAR --- */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Logo (Top Left) */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
               <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">D</div>
               <span className="font-bold text-2xl text-gray-800 dark:text-white tracking-tight">Dayflow</span>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
               
               {/* Theme Toggle Button */}
               <button 
                 onClick={toggleTheme} 
                 className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
               >
                 {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
               </button>

               {/* Auth Buttons */}
               {user ? (
                 <button 
                   onClick={() => navigate('/dashboard')}
                   className="text-gray-600 dark:text-gray-300 hover:text-primary font-medium transition-colors"
                 >
                   Go to Dashboard
                 </button>
               ) : (
                 <>
                   <button 
                     onClick={() => navigate('/login')}
                     className="text-gray-600 dark:text-gray-300 hover:text-primary font-medium px-4 py-2 transition-colors hidden sm:block"
                   >
                     Login
                   </button>
                   <button 
                     onClick={() => navigate('/login')}
                     className="bg-primary hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-bold shadow-md shadow-indigo-200 dark:shadow-none transition-all"
                   >
                     Get Started
                   </button>
                 </>
               )}
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col items-center text-center">
          
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-2xl mb-6">
             <Users className="text-primary w-10 h-10" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
            Manage Your Workforce <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">The Smart Way</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mb-10 leading-relaxed">
            Dayflow HRMS helps you streamline employee management, track attendance, process payroll, and manage leaves—all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
             <button 
                onClick={() => navigate(user ? '/dashboard' : '/login')}
                className="px-8 py-4 bg-primary hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2 transform hover:scale-105"
             >
                {user ? "Go to Dashboard" : "Get Started Now"} <ArrowRight size={20} />
             </button>
          </div>
        </div>
      </div>

      {/* --- FEATURES GRID --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h2>
           <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
             Everything you need to manage your team effectively, built with security and speed in mind.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {/* Card 1 */}
           <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Employee Mgmt</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                 Maintain detailed profiles, roles, departments, and personal documents securely.
              </p>
           </div>

           {/* Card 2 */}
           <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <Clock size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Smart Attendance</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                 Track daily check-ins with real-time status updates and detailed history logs.
              </p>
           </div>

           {/* Card 3 */}
           <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <DollarSign size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Payroll Processing</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                 Easily calculate and record salaries, allowances, and deductions for your team.
              </p>
           </div>

           {/* Card 4 */}
           <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <FileText size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Leave Management</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                 A streamlined workflow for leave applications, instant approvals, and rejections.
              </p>
           </div>
        </div>
      </div>
      
      {/* --- FOOTER --- */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-8 transition-colors duration-300">
         <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Dayflow HRMS. Built with MERN Stack.</p>
         </div>
      </div>
    </div>
  );
};

export default LandingPage;