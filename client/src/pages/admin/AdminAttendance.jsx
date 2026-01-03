import React, { useState } from 'react';
import { Search, Filter, Download, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

const AdminAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock Data: Admin viewing all employees [Requirement 3.4.2]
  const attendanceData = [
    { id: 'EMP001', name: 'John Doe', role: 'Developer', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Present' },
    { id: 'EMP002', name: 'Sarah Wilson', role: 'HR Manager', checkIn: '09:15 AM', checkOut: '06:15 PM', status: 'Present' },
    { id: 'EMP003', name: 'Mike Ross', role: 'Designer', checkIn: '10:00 AM', checkOut: '02:00 PM', status: 'Half-day' },
    { id: 'EMP004', name: 'Rachel Green', role: 'Marketing', checkIn: '-', checkOut: '-', status: 'Leave' },
    { id: 'EMP005', name: 'Harvey Specter', role: 'Legal', checkIn: '-', checkOut: '-', status: 'Absent' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Attendance Records</h1>
          <p className="text-gray-500 dark:text-gray-400">View and manage attendance for all employees.</p>
        </div>
        
        {/* Date Filter */}
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
           <Calendar size={18} className="text-gray-500" />
           <input 
             type="date" 
             value={selectedDate}
             onChange={(e) => setSelectedDate(e.target.value)}
             className="bg-transparent outline-none text-gray-700 dark:text-gray-300 text-sm"
           />
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border-l-4 border-green-500 shadow-sm">
            <p className="text-xs text-gray-500 uppercase font-bold">Present</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">112</p>
         </div>
         <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border-l-4 border-amber-500 shadow-sm">
            <p className="text-xs text-gray-500 uppercase font-bold">Late / Half-day</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">8</p>
         </div>
         <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border-l-4 border-blue-500 shadow-sm">
            <p className="text-xs text-gray-500 uppercase font-bold">On Leave</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">12</p>
         </div>
         <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border-l-4 border-red-500 shadow-sm">
            <p className="text-xs text-gray-500 uppercase font-bold">Absent</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">4</p>
         </div>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-4 justify-between">
           <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search employee..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-primary bg-gray-50 dark:bg-gray-900 dark:text-white"
              />
           </div>
           <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium">
              <Download size={16} /> Export Report
           </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-sm">
                <th className="p-4 font-medium">Employee</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Check In</th>
                <th className="p-4 font-medium">Check Out</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {attendanceData.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="p-4">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-primary font-bold text-xs">
                           {record.name.charAt(0)}
                        </div>
                        <div>
                           <p className="font-medium text-gray-800 dark:text-white text-sm">{record.name}</p>
                           <p className="text-xs text-gray-500">{record.id}</p>
                        </div>
                     </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{record.role}</td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{record.checkIn}</td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{record.checkOut}</td>
                  <td className="p-4">
                     <span className={`px-2 py-1 rounded text-xs font-bold inline-flex items-center gap-1
                        ${record.status === 'Present' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : ''}
                        ${record.status === 'Half-day' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : ''}
                        ${record.status === 'Absent' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : ''}
                        ${record.status === 'Leave' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                     `}>
                        {record.status}
                     </span>
                  </td>
                  <td className="p-4 text-right">
                     <button className="text-primary hover:underline text-xs font-medium">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAttendance;