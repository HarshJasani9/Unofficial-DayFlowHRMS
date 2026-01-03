import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddLeave = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: ''
    });

    // Helper: Get Today's Date in YYYY-MM-DD format
    const getTodayDate = () => {
        return new Date().toISOString().split('T')[0];
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // LOGICAL VALIDATION
        const today = new Date();
        today.setHours(0,0,0,0);
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);

        if (start < today) {
            alert("Leave Start Date cannot be in the past.");
            return;
        }
        if (end < start) {
            alert("End Date cannot be before Start Date.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/leave/add', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if(response.data.success) {
                navigate('/employee/leaves');
            }
        } catch (error) {
            if(error.response && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert("Application Failed");
            }
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mt-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Apply for Leave</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Leave Type</label>
                    <select name="leaveType" onChange={handleChange} required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white">
                        <option value="">Select Type</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Casual Leave">Casual Leave</option>
                        <option value="Annual Leave">Annual Leave</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">From Date</label>
                        <input 
                            type="date" 
                            name="startDate" 
                            min={getTodayDate()} // BLOCK PAST DATES
                            onChange={handleChange} 
                            required 
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">To Date</label>
                        <input 
                            type="date" 
                            name="endDate" 
                            min={formData.startDate || getTodayDate()} // End date cannot be before Start date
                            onChange={handleChange} 
                            required 
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" 
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Reason</label>
                    <textarea name="reason" onChange={handleChange} required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" rows="4"></textarea>
                </div>
                <button type="submit" className="w-full bg-primary text-white font-bold py-2 rounded hover:bg-indigo-700">Apply Leave</button>
            </form>
        </div>
    );
};

export default AddLeave;