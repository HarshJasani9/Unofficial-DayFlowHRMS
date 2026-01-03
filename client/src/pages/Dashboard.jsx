import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { 
  Users, DollarSign, Clock, AlertCircle, 
  Calendar, FileText
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Optional: You can fetch real stats here later
  // const [stats, setStats] = useState({ employees: 0, payroll: 0, leaves: 0, attendance: 0 });

  if (!user) return <div className="p-6">Loading Dashboard...</div>;

  return (
    <div className="p-6 space-y-8 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {user.role === 'admin' ? 'Admin Dashboard' : 'Employee Dashboard'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Welcome back, {user.name}</p>
        </div>
      </div>

      {/* =========================================
          ADMIN DASHBOARD VIEW
         ========================================= */}
      {user.role === 'admin' && (
        <>
          {/* Admin Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Total Employees */}
            <div 
              onClick={() => navigate('/admin/employees')} 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md transition-all flex items-center gap-4 group"
            >
              <div className="p-4 bg-blue-500 rounded-xl text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Employees</p>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">124</h3>
              </div>
            </div>

            {/* 2. Payroll Cost (UPDATED LINK) */}
            <div 
              onClick={() => navigate('/admin/salary')} // <--- Now links to Salary List
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md transition-all flex items-center gap-4 group"
            >
              <div className="p-4 bg-purple-500 rounded-xl text-white shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                <DollarSign size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Payroll Cost</p>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">$84k</h3>
              </div>
            </div>

            {/* 3. On Leave Today */}
            <div 
              onClick={() => navigate('/admin/attendance')}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md transition-all flex items-center gap-4 group"
            >
               <div className="p-4 bg-amber-500 rounded-xl text-white shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">On Leave Today</p>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">12</h3>
              </div>
            </div>

            {/* 4. Pending Requests */}
            <div 
              onClick={() => navigate('/admin/leaves')}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md transition-all flex items-center gap-4 group"
            >
               <div className="p-4 bg-rose-500 rounded-xl text-white shadow-lg shadow-rose-500/30 group-hover:scale-110 transition-transform">
                <AlertCircle size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Requests</p>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">5</h3>
              </div>
            </div>
          </div>

          {/* Admin Lower Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 dark:text-white">Recent Leave Requests</h3>
                <button onClick={() => navigate('/admin/leaves')} className="text-sm text-primary hover:underline font-medium">View All</button>
              </div>
              <div className="space-y-4">
                 <div className="text-center text-gray-400 py-4">No recent requests fetched</div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 dark:text-white">Today's Attendance</h3>
                <button onClick={() => navigate('/admin/attendance')} className="text-sm text-primary hover:underline">View All</button>
              </div>
               <div className="space-y-6">
                 <div>
                    <div className="flex justify-between text-sm mb-2 text-gray-600 dark:text-gray-400"><span>Present</span><span>90%</span></div>
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3"><div className="bg-green-500 h-3 rounded-full" style={{ width: '90%' }}></div></div>
                 </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* =========================================
          EMPLOYEE DASHBOARD VIEW
         ========================================= */}
      {user.role === 'employee' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
              <div className="p-4 bg-emerald-500 rounded-xl text-white shadow-lg shadow-emerald-500/30"><Calendar size={24} /></div>
              <div><p className="text-sm font-medium text-gray-500 dark:text-gray-400">Attendance</p><h3 className="text-2xl font-bold text-gray-800 dark:text-white">Check In</h3></div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
              <div className="p-4 bg-blue-500 rounded-xl text-white shadow-lg shadow-blue-500/30"><Clock size={24} /></div>
              <div><p className="text-sm font-medium text-gray-500 dark:text-gray-400">Leave Balance</p><h3 className="text-2xl font-bold text-gray-800 dark:text-white">12 Days</h3></div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
              <div className="p-4 bg-purple-500 rounded-xl text-white shadow-lg shadow-purple-500/30"><DollarSign size={24} /></div>
              <div><p className="text-sm font-medium text-gray-500 dark:text-gray-400">Next Payroll</p><h3 className="text-2xl font-bold text-gray-800 dark:text-white">Jan 31</h3></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => navigate('/profile')} className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors flex flex-col items-center gap-2"><Users size={24} /><span className="font-medium">My Profile</span></button>
                  <button onClick={() => navigate('/employee/attendance')} className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 transition-colors flex flex-col items-center gap-2"><Calendar size={24} /><span className="font-medium">Mark Attendance</span></button>
                  <button onClick={() => navigate('/employee/leaves')} className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 hover:bg-amber-100 transition-colors flex flex-col items-center gap-2"><FileText size={24} /><span className="font-medium">Apply Leave</span></button>
                  <button onClick={() => navigate('/employee/salary')} className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition-colors flex flex-col items-center gap-2"><DollarSign size={24} /><span className="font-medium">Payslips</span></button>
                </div>
             </div>
             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-gray-800 dark:text-white mb-4">Recent Activity</h3>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="mt-1 min-w-[4px] h-full bg-gray-200 dark:bg-gray-700 rounded-full relative"><div className="absolute top-0 w-4 h-4 -left-[6px] rounded-full bg-green-500"></div></div>
                    <div><p className="text-sm font-bold text-gray-800 dark:text-white">Logged in successfully</p><p className="text-xs text-gray-500">Just Now</p></div>
                  </li>
                </ul>
             </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;