import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/employees', {
            headers: { Authorization: `Bearer ${token}` }
        });
        if(response.data.success) {
            setEmployees(response.data.employees);
        }
      } catch(error) {
         console.error("Error fetching employees");
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
      fetchEmployees();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Employee Management</h1>
           <p className="text-gray-500">Manage your workforce and their accounts.</p>
        </div>
        <button 
          onClick={() => navigate('/admin/add-employee')} 
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={20} /> Add Employee
        </button>
      </div>

      {loading ? <div>Loading...</div> : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 text-sm">
                <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Emp ID</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {employees.map((emp) => (
                    <tr key={emp._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-primary font-bold overflow-hidden">
                            {emp.userId?.profileImage ? (
                                <img src={`http://localhost:5000/uploads/${emp.userId.profileImage}`} className="w-full h-full object-cover"/>
                            ) : (
                                emp.userId?.name?.charAt(0)
                            )}
                        </div>
                        <div>
                            <p className="font-bold text-gray-800 dark:text-white">{emp.userId?.name}</p>
                            <p className="text-xs text-gray-500">{emp.userId?.email}</p>
                        </div>
                    </td>
                    <td className="p-4">{emp.employeeId}</td>
                    <td className="p-4">{emp.department}</td>
                    <td className="p-4 capitalize">{emp.userId?.role}</td>
                    <td className="p-4 flex gap-2">
                        {/* THE EDIT BUTTON */}
                        <button 
                            onClick={() => navigate(`/admin/employee/edit/${emp._id}`)}
                            className="text-amber-500 hover:bg-amber-50 p-2 rounded transition-colors"
                        >
                            <Edit size={18}/>
                        </button>
                        
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;