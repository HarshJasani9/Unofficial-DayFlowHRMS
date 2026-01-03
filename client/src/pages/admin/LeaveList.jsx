import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, X, MessageSquare, AlertCircle } from 'lucide-react';

const LeaveList = () => {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Modal States
    const [showModal, setShowModal] = useState(false);
    const [selectedLeaveId, setSelectedLeaveId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [comment, setComment] = useState("");

    const fetchLeaves = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/leave', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if(response.data.success) {
                setLeaves(response.data.leaves);
            }
        } catch(error) {
            alert("Error fetching leaves");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchLeaves(); }, []);

    // Open Modal
    const initiateAction = (id, status) => {
        setSelectedLeaveId(id);
        setSelectedStatus(status);
        setComment(""); // Reset comment
        setShowModal(true);
    };

    // Submit Action to Server
    const handleAction = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/leave/${selectedLeaveId}`, { 
                status: selectedStatus,
                adminComment: comment 
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setShowModal(false);
            fetchLeaves(); // Refresh list
        } catch(error) {
            alert("Update Failed");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Leave Requests</h1>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500">
                        <tr>
                            <th className="p-4">Employee</th>
                            <th className="p-4">Type</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Reason</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {leaves.map((leave) => (
                            <tr key={leave._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                <td className="p-4 font-medium dark:text-white">{leave.employeeId?.userId?.name}</td>
                                <td className="p-4 dark:text-gray-300">{leave.leaveType}</td>
                                <td className="p-4 text-sm dark:text-gray-300">
                                    {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                                </td>
                                <td className="p-4 dark:text-gray-300 max-w-xs truncate" title={leave.reason}>{leave.reason}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                                        leave.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                        leave.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                        'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {leave.status}
                                    </span>
                                </td>
                                <td className="p-4 flex gap-2">
                                    {leave.status === "Pending" ? (
                                        <>
                                            <button 
                                                onClick={() => initiateAction(leave._id, "Approved")}
                                                className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
                                            >
                                                <Check size={16}/>
                                            </button>
                                            <button 
                                                onClick={() => initiateAction(leave._id, "Rejected")}
                                                className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                                            >
                                                <X size={16}/>
                                            </button>
                                        </>
                                    ) : (
                                        // Show existing comment in tooltip if processed
                                        leave.adminComment && (
                                            <div className="group relative">
                                                <MessageSquare size={18} className="text-gray-400 cursor-pointer"/>
                                                <div className="absolute bottom-full right-0 w-48 bg-gray-800 text-white text-xs p-2 rounded hidden group-hover:block z-10 mb-2">
                                                    {leave.adminComment}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- CONFIRMATION MODAL WITH COMMENT --- */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-96">
                        <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
                            {selectedStatus === "Approved" ? "Approve Leave" : "Reject Leave"}
                        </h3>
                        <textarea 
                            className="w-full border p-2 rounded mb-4 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            rows="3"
                            placeholder="Add a comment (Optional)..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <div className="flex justify-end gap-3">
                            <button 
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleAction}
                                className={`px-4 py-2 text-white rounded font-bold ${
                                    selectedStatus === "Approved" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                                }`}
                            >
                                Confirm {selectedStatus}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeaveList;