import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Attendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [todayStatus, setTodayStatus] = useState(null); // null, 'clocked-in', 'clocked-out'
    const [loading, setLoading] = useState(true);

    const fetchAttendance = async () => {
        try {
            const token = localStorage.getItem('token');
            
            // 1. Get History
            const response = await axios.get('http://localhost:5000/api/attendance', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAttendance(response.data.attendance);

            // 2. Get Today's Status
            const statusRes = await axios.get('http://localhost:5000/api/attendance/status', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTodayStatus(statusRes.data.attendance);

        } catch (error) {
            console.error("Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAttendance(); }, []);

    const handleClockIn = async (action) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/attendance/update', 
                { status: action }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert(`Successfully ${action === 'clock-in' ? 'Clocked In' : 'Clocked Out'}!`);
            fetchAttendance(); // Refresh
        } catch (error) {
            alert(error.response?.data?.error || "Action Failed");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Attendance</h1>
            
            {/* --- CLOCK IN/OUT SECTION --- */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-8 flex flex-col md:flex-row justify-between items-center border border-gray-100 dark:border-gray-700">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Today's Status</h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
                
                <div className="flex gap-4 mt-4 md:mt-0">
                    {!todayStatus ? (
                        <button 
                            onClick={() => handleClockIn('clock-in')}
                            className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 shadow-lg"
                        >
                            Clock In
                        </button>
                    ) : !todayStatus.logoutTime ? (
                        <button 
                            onClick={() => handleClockIn('clock-out')}
                            className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-600 shadow-lg"
                        >
                            Clock Out
                        </button>
                    ) : (
                        <div className="text-center">
                            <span className="block text-green-600 font-bold text-lg">Completed</span>
                            <span className="text-xs text-gray-500">Day finished</span>
                        </div>
                    )}
                </div>
            </div>

            {/* --- HISTORY TABLE --- */}
            <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Attendance History</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500">
                        <tr>
                            <th className="p-4">Date</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Login Time</th>
                            <th className="p-4">Logout Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {attendance.map((record) => (
                            <tr key={record._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                <td className="p-4 dark:text-gray-300">{record.date}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                                        record.status === 'Present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                        {record.status}
                                    </span>
                                </td>
                                <td className="p-4 dark:text-gray-300">{record.loginTime || '-'}</td>
                                <td className="p-4 dark:text-gray-300">{record.logoutTime || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Attendance;