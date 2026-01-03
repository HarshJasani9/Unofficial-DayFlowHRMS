import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Search, Plus, Filter, Edit, Trash2, Eye } from 'lucide-react';

const EmployeeList = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Extended Mock Data to show different profiles
  const [employees] = useState([
    { 
      id: 'EMP001', name: 'John Doe', role: 'Software Engineer', dept: 'Engineering', status: 'Active', email: 'john@dayflow.com',
      phone: '+1 234 567 890', location: 'New York HQ', joiningDate: '2022-01-12', manager: 'Sarah Connor',
      salary: { basic: 5000, hra: 2000, allowance: 1000, tax: 800, pf: 200 }
    },
    { 
      id: 'EMP002', name: 'Sarah Wilson', role: 'HR Manager', dept: 'Human Resources', status: 'Active', email: 'sarah@dayflow.com',
      phone: '+1 987 654 321', location: 'London Office', joiningDate: '2021-03-15', manager: 'Mike Ross',
      salary: { basic: 6000, hra: 2500, allowance: 1200, tax: 900, pf: 300 }
    },
    { 
      id: 'EMP003', name: 'Mike Ross', role: 'Product Designer', dept: 'Design', status: 'On Leave', email: 'mike@dayflow.com',
      phone: '+1 555 666 777', location: 'Remote', joiningDate: '2023-06-01', manager: 'John Doe',
      salary: { basic: 4500, hra: 1800, allowance: 900, tax: 600, pf: 150 }
    },
  ]);

  // FUNCTION: Handle Edit Click
  const handleEdit = (employee) => {
    // Navigate to profile, passing the employee object and the 'admin' role in state
    navigate('/profile', { state: { employeeData: employee, viewerRole: 'admin' } });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Employee Management</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your workforce and their accounts.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus size={20} />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, ID, or role..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-primary bg-transparent dark:text-white"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
          <Filter size={20} />
          <span>Filter</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-sm border-b border-gray-100 dark:border-gray-700">
                <th className="p-4 font-medium">Employee</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Department</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-primary font-bold">
                        {emp.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">{emp.name}</p>
                        <p className="text-xs text-gray-500">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{emp.role}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{emp.dept}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                      ${emp.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(emp)} // Trigger View Only or View Logic
                        className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" 
                        title="View Profile"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => handleEdit(emp)} // Trigger Edit Logic
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" 
                        title="Edit Details"
                      >
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
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

export default EmployeeList;