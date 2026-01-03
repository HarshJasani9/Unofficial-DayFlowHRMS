import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddEmployee = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        employeeId: '',
        dob: '',
        gender: '',
        maritalStatus: '',
        designation: '',
        department: '',
        salary: '',
        password: '',
        role: 'employee'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5000/api/auth/add-employee', 
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if(response.data.success) {
                alert("Employee Added Successfully!");
                navigate('/admin/employees'); // Redirect to list
            }
        } catch (error) {
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error);
            } else {
                alert("Server Error");
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-md shadow-md mt-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Add New Employee</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Personal Details */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <input type="text" name="name" onChange={handleChange} placeholder="Insert Name" required className="mt-1 p-2 w-full border rounded-md dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input type="email" name="email" onChange={handleChange} placeholder="Insert Email" required className="mt-1 p-2 w-full border rounded-md dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Employee ID</label>
                    <input type="text" name="employeeId" onChange={handleChange} placeholder="EMP001" required className="mt-1 p-2 w-full border rounded-md dark:bg-gray-700 dark:text-white" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
                    <input type="date" name="dob" onChange={handleChange} required className="mt-1 p-2 w-full border rounded-md dark:bg-gray-700 dark:text-white" />
                </div>
                
                {/* Job Details */}
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Department</label>
                    <select name="department" onChange={handleChange} required className="mt-1 p-2 w-full border rounded-md dark:bg-gray-700 dark:text-white">
                        <option value="">Select Department</option>
                        <option value="IT">IT</option>
                        <option value="HR">HR</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Designation</label>
                    <input type="text" name="designation" onChange={handleChange} placeholder="Developer" required className="mt-1 p-2 w-full border rounded-md dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Salary</label>
                    <input type="number" name="salary" onChange={handleChange} placeholder="50000" required className="mt-1 p-2 w-full border rounded-md dark:bg-gray-700 dark:text-white" />
                </div>

                 {/* Account Details */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                    <input type="password" name="password" onChange={handleChange} placeholder="******" required className="mt-1 p-2 w-full border rounded-md dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                    <select name="role" onChange={handleChange} className="mt-1 p-2 w-full border rounded-md dark:bg-gray-700 dark:text-white">
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <button type="submit" className="w-full bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                        Add Employee
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEmployee;