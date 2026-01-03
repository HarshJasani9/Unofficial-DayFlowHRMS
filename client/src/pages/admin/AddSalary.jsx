import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddSalary = () => {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        employeeId: '',
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        payDate: ''
    });
    const navigate = useNavigate();

    // Fetch Employees for Dropdown
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/auth/employees', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if(response.data.success) {
                    setEmployees(response.data.employees);
                }
            } catch(error) {
                console.error("Fetch Error");
            }
        };
        fetchEmployees();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/salary/add', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if(response.data.success) {
                navigate('/admin/employees'); // Redirect to Employee list or Salary List
            }
        } catch(error) {
            alert("Failed to add salary");
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-md shadow-md mt-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Add Salary</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Employee Selection */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Employee</label>
                    <select name="employeeId" onChange={handleChange} required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white">
                        <option value="">-- Select Employee --</option>
                        {employees.map((emp) => (
                            <option key={emp._id} value={emp._id}>{emp.employeeId} - {emp.userId.name}</option>
                        ))}
                    </select>
                </div>

                {/* Financials */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Basic Salary</label>
                    <input type="number" name="basicSalary" onChange={handleChange} required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Allowances</label>
                    <input type="number" name="allowances" onChange={handleChange} required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Deductions</label>
                    <input type="number" name="deductions" onChange={handleChange} required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Pay Date</label>
                    <input type="date" name="payDate" onChange={handleChange} required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
                </div>

                <div className="md:col-span-2">
                    <button type="submit" className="w-full bg-primary text-white font-bold py-2 rounded hover:bg-indigo-700">Add Salary</button>
                </div>
            </form>
        </div>
    );
};

export default AddSalary;