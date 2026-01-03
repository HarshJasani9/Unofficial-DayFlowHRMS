import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/leave', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          setLeaves(response.data.leaves);
        }
      } catch (error) {
        alert("Error fetching leaves");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Leave History</h1>
        <Link 
          to="/employee/leave-add" 
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} /> Apply Leave
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500">
                <tr>
                    <th className="p-4">Leave Type</th>
                    <th className="p-4">Dates</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Admin Comment</th> {/* New Column */}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {leaves.map((leave) => (
                    <tr key={leave._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                        <td className="p-4 dark:text-gray-300">
                             <div className="font-medium">{leave.leaveType}</div>
                             <div className="text-xs text-gray-500">{leave.reason}</div>
                        </td>
                        <td className="p-4 text-sm dark:text-gray-300">
                            {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                                leave.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                leave.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                'bg-yellow-100 text-yellow-700'
                            }`}>
                                {leave.status}
                            </span>
                        </td>
                        {/* Display Comment or "N/A" */}
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                             {leave.adminComment ? (
                                <span className="flex items-center gap-1">
                                    {leave.status === "Rejected" ? "❌ " : "✅ "}
                                    {leave.adminComment}
                                </span>
                             ) : "-"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaves;