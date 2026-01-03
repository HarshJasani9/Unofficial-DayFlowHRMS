import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Salary = () => {
    const [salary, setSalary] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSalary = async () => {
            try {
                const token = localStorage.getItem('token');
                // Note the special endpoint for employees
                const response = await axios.get('http://localhost:5000/api/salary/employee/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if(response.data.success) {
                    setSalary(response.data.salary);
                }
            } catch(error) {
                console.error("Fetch Error");
            } finally {
                setLoading(false);
            }
        };
        fetchSalary();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Salary History</h1>
            
            {loading ? <div>Loading...</div> : (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border overflow-hidden">
                    {salary.length > 0 ? (
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500">
                                <tr>
                                    <th className="p-4">Pay Date</th>
                                    <th className="p-4">Basic Salary</th>
                                    <th className="p-4">Allowances</th>
                                    <th className="p-4">Deductions</th>
                                    <th className="p-4">Net Salary</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {salary.map((record) => (
                                    <tr key={record._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                        <td className="p-4 dark:text-gray-300">
                                            {new Date(record.payDate).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 dark:text-gray-300">${record.basicSalary}</td>
                                        <td className="p-4 text-green-600">+${record.allowances}</td>
                                        <td className="p-4 text-red-600">-${record.deductions}</td>
                                        <td className="p-4 font-bold dark:text-white">${record.netSalary}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-6 text-center text-gray-500">No salary records found.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Salary;