import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Plus, Search } from 'lucide-react';

const SalaryList = () => {
    const [salaries, setSalaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterText, setFilterText] = useState('');

    const fetchSalaries = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/salary', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if(response.data.success) {
                setSalaries(response.data.salary);
            }
        } catch(error) {
            alert("Error fetching salary history");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchSalaries(); }, []);

    // Filter logic for searching by name
    const filteredSalaries = salaries.filter(salary => 
        salary.employeeId?.userId?.name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Salary History</h1>
                <Link 
                    to="/admin/salary/add" 
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Plus size={20} /> Add Salary
                </Link>
            </div>

            {/* Search Bar */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mb-6 border border-gray-100 dark:border-gray-700 w-full max-w-md flex items-center gap-2">
                <Search className="text-gray-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Search by employee name..." 
                    className="w-full outline-none dark:bg-gray-800 dark:text-white"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="text-center py-10">Loading Payment History...</div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    {filteredSalaries.length > 0 ? (
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500">
                                <tr>
                                    <th className="p-4">Employee</th>
                                    <th className="p-4">Emp ID</th>
                                    <th className="p-4">Salary</th>
                                    <th className="p-4">Allowances</th>
                                    <th className="p-4">Deductions</th>
                                    <th className="p-4">Total (Net)</th>
                                    <th className="p-4">Pay Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {filteredSalaries.map((s) => (
                                    <tr key={s._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                        <td className="p-4 font-bold dark:text-white">
                                            {s.employeeId?.userId?.name || "Unknown"}
                                        </td>
                                        <td className="p-4 text-sm dark:text-gray-300">
                                            {s.employeeId?.employeeId || "N/A"}
                                        </td>
                                        <td className="p-4 dark:text-gray-300">${s.basicSalary}</td>
                                        <td className="p-4 text-green-600">+${s.allowances}</td>
                                        <td className="p-4 text-red-600">-${s.deductions}</td>
                                        <td className="p-4 font-bold dark:text-white">${s.netSalary}</td>
                                        <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(s.payDate).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-6 text-center text-gray-500">
                            No salary records found.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SalaryList;