import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, XCircle, AlertCircle, History, ChevronLeft, ChevronRight } from 'lucide-react';

const Attendance = () => {
  const [viewMode, setViewMode] = useState('daily'); // 'daily' or 'weekly'
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Live Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock Data for Weekly View [Requirement 3.4.1]
  const weeklyLog = [
    { date: 'Mon, Jan 29', status: 'Present', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: '9h' },
    { date: 'Tue, Jan 30', status: 'Present', checkIn: '09:15 AM', checkOut: '06:15 PM', hours: '9h' },
    { date: 'Wed, Jan 31', status: 'Half-day', checkIn: '09:00 AM', checkOut: '01:00 PM', hours: '4h' },
    { date: 'Thu, Feb 01', status: 'Leave', checkIn: '-', checkOut: '-', hours: '0h' },
    { date: 'Fri, Feb 02', status: 'Absent', checkIn: '-', checkOut: '-', hours: '0h' },
  ];

  const handleCheckInOut = () => {
    setIsCheckedIn(!isCheckedIn);
    // Backend integration will go here later
  };

  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Attendance</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your daily logs and check-ins.</p>
        </div>
        
        {/* View Toggle [Requirement 3.4.1: Daily and weekly views] */}
        <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg flex">
          <button 
            onClick={() => setViewMode('daily')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${viewMode === 'daily' ? 'bg-white dark:bg-gray-600 shadow-sm text-primary' : 'text-gray-500 dark:text-gray-300'}`}
          >
            Daily View
          </button>
          <button 
            onClick={() => setViewMode('weekly')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${viewMode === 'weekly' ? 'bg-white dark:bg-gray-600 shadow-sm text-primary' : 'text-gray-500 dark:text-gray-300'}`}
          >
            Weekly View
          </button>
        </div>
      </div>

      {/* --- DAILY VIEW --- */}
      {viewMode === 'daily' && (
        <div className="space-y-6 animate-fade-in">
          {/* Check-In Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                {isCheckedIn ? "You are Checked In" : "Ready to start your day?"}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2 justify-center md:justify-start">
                <Calendar size={18} /> {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
               <div className="text-4xl font-mono font-bold text-gray-800 dark:text-white tracking-widest bg-gray-50 dark:bg-gray-900 px-6 py-2 rounded-xl border border-gray-200 dark:border-gray-700">
                  {currentTime.toLocaleTimeString()}
               </div>
               
               {/* Check-In/Out Button [Requirement 3.4.1] */}
               <button 
                 onClick={handleCheckInOut}
                 className={`w-48 py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2
                   ${isCheckedIn 
                     ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-200 dark:shadow-none' 
                     : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200 dark:shadow-none'
                   }`}
               >
                 <Clock size={20} />
                 {isCheckedIn ? 'Check Out' : 'Check In'}
               </button>
               
               <p className="text-xs text-gray-400 flex items-center gap-1">
                 <MapPin size={12} /> Location: Office Network (IP: 192.168.1.55)
               </p>
            </div>
          </div>

          {/* Today's Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
               <p className="text-gray-500 text-sm">Check In Time</p>
               <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-1">{isCheckedIn ? '09:00 AM' : '--:--'}</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
               <p className="text-gray-500 text-sm">Check Out Time</p>
               <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-1">--:--</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
               <p className="text-gray-500 text-sm">Total Hours</p>
               <h3 className="text-xl font-bold text-primary mt-1">Working...</h3>
            </div>
          </div>
        </div>
      )}

      {/* --- WEEKLY VIEW [Requirement 3.4.1] --- */}
      {viewMode === 'weekly' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden animate-fade-in">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
             <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
               <History size={18} /> This Week
             </h3>
             <div className="flex gap-2">
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"><ChevronLeft size={18} /></button>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"><ChevronRight size={18} /></button>
             </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-sm">
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Check In</th>
                  <th className="p-4 font-medium">Check Out</th>
                  <th className="p-4 font-medium">Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {weeklyLog.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="p-4 font-medium text-gray-800 dark:text-white">{record.date}</td>
                    <td className="p-4">
                      {/* Status Types [Requirement 3.4.1: Present, Absent, Half-day, Leave] */}
                      <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1
                        ${record.status === 'Present' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : ''}
                        ${record.status === 'Half-day' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : ''}
                        ${record.status === 'Absent' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : ''}
                        ${record.status === 'Leave' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                      `}>
                        {record.status === 'Present' && <CheckCircle size={12} />}
                        {record.status === 'Half-day' && <Clock size={12} />}
                        {record.status === 'Absent' && <XCircle size={12} />}
                        {record.status === 'Leave' && <Calendar size={12} />}
                        {record.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">{record.checkIn}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">{record.checkOut}</td>
                    <td className="p-4 text-gray-800 dark:text-white font-medium">{record.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;