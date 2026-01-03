import React, { useState } from 'react';
import { Calendar, Plus, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const LeaveApplication = () => {
  // Mock Data: Employee's own history
  const [leaves, setLeaves] = useState([
    { id: 1, type: 'Sick Leave', from: '2024-01-10', to: '2024-01-12', days: 3, status: 'Pending', remarks: 'High fever', adminComment: '' },
    { id: 2, type: 'Paid Leave', from: '2023-12-25', to: '2023-12-26', days: 2, status: 'Approved', remarks: 'Christmas break', adminComment: 'Enjoy your holidays!' },
  ]);

  const [formData, setFormData] = useState({
    type: 'Paid Leave',
    from: '',
    to: '',
    remarks: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    const newLeave = {
      id: leaves.length + 1,
      ...formData,
      days: 1, // Logic to calculate days would happen here or on backend
      status: 'Pending',
      adminComment: ''
    };
    setLeaves([newLeave, ...leaves]);
    alert("Leave Request Submitted Successfully");
    setFormData({ type: 'Paid Leave', from: '', to: '', remarks: '' });
  };

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Leave Management</h1>
          <p className="text-gray-500 dark:text-gray-400">Apply for time off and track your requests.</p>
        </div>
        {/* Mock Balance Display */}
        <div className="text-right hidden md:block bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
           <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Available Balance</p>
           <p className="text-2xl font-bold text-primary">12 Days</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Application Form [Section 3.5.1] */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-fit">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
             <Plus size={20} className="text-primary"/> New Request
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
             {/* Requirement: Select Leave Type (Paid, Sick, Unpaid) */}
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Leave Type</label>
                <select 
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 dark:text-white"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                   <option value="Paid Leave">Paid Leave</option>
                   <option value="Sick Leave">Sick Leave</option>
                   <option value="Unpaid Leave">Unpaid Leave</option>
                </select>
             </div>
             
             {/* Requirement: Choose Date Range */}
             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From Date</label>
                   <input 
                     type="date" 
                     required
                     className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 dark:text-white text-sm"
                     value={formData.from}
                     onChange={(e) => setFormData({...formData, from: e.target.value})}
                   />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To Date</label>
                   <input 
                     type="date" 
                     required
                     className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 dark:text-white text-sm"
                     value={formData.to}
                     onChange={(e) => setFormData({...formData, to: e.target.value})}
                   />
                </div>
             </div>

             {/* Requirement: Add Remarks */}
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Remarks</label>
                <textarea 
                  rows="3" 
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 dark:text-white resize-none"
                  placeholder="Reason for leave..."
                  value={formData.remarks}
                  onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                ></textarea>
             </div>

             <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none">
                Submit Request
             </button>
          </form>
        </div>

        {/* Right: History List [Section 3.5.1] */}
        <div className="lg:col-span-2 space-y-6">
           <h3 className="text-lg font-bold text-gray-800 dark:text-white">Request History</h3>
           <div className="space-y-4">
             {leaves.map((leave) => (
               <div key={leave.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                     <div className={`p-3 rounded-full 
                        ${leave.type === 'Sick Leave' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/20' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/20'}
                     `}>
                        <Calendar size={20} />
                     </div>
                     <div>
                        <h4 className="font-bold text-gray-800 dark:text-white text-lg">{leave.type}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                           <span>{leave.from} - {leave.to}</span>
                           <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                           <span>{leave.days} Days</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-2 italic">Your Remarks: "{leave.remarks}"</p>
                        
                        {/* Requirement: View Admin Comments if Any */}
                        {leave.adminComment && (
                          <div className="mt-2 text-xs bg-gray-50 dark:bg-gray-700 p-2 rounded border-l-2 border-primary">
                            <span className="font-bold">Admin:</span> {leave.adminComment}
                          </div>
                        )}
                     </div>
                  </div>
                  
                  {/* Status Badge */}
                  <div className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 whitespace-nowrap
                     ${leave.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30' : ''}
                     ${leave.status === 'Approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : ''}
                     ${leave.status === 'Rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30' : ''}
                  `}>
                     {leave.status === 'Pending' && <Clock size={16} />}
                     {leave.status === 'Approved' && <CheckCircle size={16} />}
                     {leave.status === 'Rejected' && <XCircle size={16} />}
                     {leave.status}
                  </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveApplication;