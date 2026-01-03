import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Filter } from 'lucide-react';

const AdminAttendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]); // Default to today

    const fetchAttendance = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5000/api/attendance?date=${filterDate}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if(response.data.success) {
                setAttendance(response.data.attendance);
            }
        } catch (error) {
            console.error("Error fetching attendance");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAttendance(); }, [filterDate]); // Refetch when date changes

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Attendance Records</h1>
            
            {/* FILTER BAR */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mb-6 flex items-center gap-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 text-gray-500">
                    <Filter size={20} />
                    <span className="font-medium">Filter By Date:</span>
                </div>
                <input 
                    type="date" 
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="p-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500">
                        <tr>
                            <th className="p-4">Employee</th>
                            <th className="p-4">Department</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Clock In</th>
                            <th className="p-4">Clock Out</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {attendance.length > 0 ? (
                            attendance.map((record) => (
                                <tr key={record._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                    <td className="p-4 font-bold dark:text-white">
                                        {record.employeeId?.userId?.name || "Unknown"}
                                    </td>
                                    <td className="p-4 dark:text-gray-300">
                                        {record.employeeId?.department || "N/A"}
                                    </td>
                                    <td className="p-4">
                                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
                                            {record.status}
                                        </span>
                                    </td>
                                    <td className="p-4 dark:text-gray-300">{record.loginTime || '-'}</td>
                                    <td className="p-4 dark:text-gray-300">{record.logoutTime || '-'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-6 text-center text-gray-500">
                                    No attendance records found for this date.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminAttendance;