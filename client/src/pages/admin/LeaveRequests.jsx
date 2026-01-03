import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Calendar, MessageSquare, Filter } from 'lucide-react';

const LeaveRequests = () => {
  // Mock Data: Admin viewing ALL requests [Section 3.5.2]
  const [requests, setRequests] = useState([
    { id: 1, name: 'Sarah Wilson', role: 'HR Manager', type: 'Sick Leave', from: '2024-01-10', to: '2024-01-12', days: 3, reason: 'Viral fever, doctor advised rest.', status: 'Pending', adminComment: '' },
    { id: 2, name: 'Mike Ross', role: 'Developer', type: 'Paid Leave', from: '2024-01-15', to: '2024-01-15', days: 1, reason: 'Personal errands.', status: 'Pending', adminComment: '' },
    { id: 3, name: 'Rachel Green', role: 'Marketing', type: 'Unpaid Leave', from: '2024-01-20', to: '2024-01-25', days: 6, reason: 'Family vacation.', status: 'Pending', adminComment: '' },
  ]);

  const [commentText, setCommentText] = useState('');
  const [activeRequestId, setActiveRequestId] = useState(null);

  // Requirement: Approve or Reject Requests + Add Comments
  const handleAction = (id, status) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: status, adminComment: commentText } : req
    ));
    // Reset form
    setCommentText('');
    setActiveRequestId(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Leave Approvals</h1>
          <p className="text-gray-500 dark:text-gray-400">Review and manage employee time-off requests.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer">
           <Filter size={20} className="text-gray-500"/>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {requests.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300">
             <p className="text-gray-500">No pending requests found.</p>
          </div>
        ) : requests.map((req) => (
          <div key={req.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-6 animate-fade-in">
            
            {/* User Info Column */}
            <div className="flex items-start gap-4 min-w-[200px] border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-700 pb-4 md:pb-0 pr-0 md:pr-4">
               <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-primary font-bold text-lg">
                  {req.name.charAt(0)}
               </div>
               <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">{req.name}</h3>
                  <p className="text-sm text-gray-500">{req.role}</p>
                  <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-bold
                    ${req.type === 'Sick Leave' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'}
                  `}>
                    {req.type}
                  </span>
               </div>
            </div>

            {/* Leave Details Column */}
            <div className="flex-1 space-y-3">
               <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <span className="flex items-center gap-1 font-medium"><Calendar size={16} className="text-primary"/> {req.from} <span className="text-gray-400">to</span> {req.to}</span>
                  <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-xs font-bold"><Clock size={14}/> {req.days} Days</span>
               </div>
               
               {/* Employee Remark */}
               <div className="bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                 <p className="text-xs text-gray-400 font-bold mb-1">REASON:</p>
                 <p className="text-sm text-gray-700 dark:text-gray-300 italic">"{req.reason}"</p>
               </div>

               {/* Admin Comment Section [Requirement 3.5.2: Add Comments] */}
               {req.status === 'Pending' && activeRequestId === req.id && (
                 <div className="mt-2 animate-fade-in">
                   <textarea
                     className="w-full p-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg outline-none bg-white dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                     placeholder="Add a comment or reason for rejection..."
                     value={commentText}
                     onChange={(e) => setCommentText(e.target.value)}
                     rows={2}
                   />
                 </div>
               )}
               {req.adminComment && req.status !== 'Pending' && (
                 <p className="text-xs text-primary mt-1"><span className="font-bold">Your Comment:</span> {req.adminComment}</p>
               )}
            </div>

            {/* Actions Column */}
            <div className="flex flex-col justify-center gap-3 min-w-[140px]">
               {req.status === 'Pending' ? (
                 <>
                   {activeRequestId !== req.id ? (
                     <button 
                       onClick={() => setActiveRequestId(req.id)}
                       className="w-full py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                     >
                       Review Request
                     </button>
                   ) : (
                     <div className="space-y-2 animate-fade-in">
                        <button 
                          onClick={() => handleAction(req.id, 'Approved')}
                          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                        >
                          <CheckCircle size={16} /> Approve
                        </button>
                        <button 
                          onClick={() => handleAction(req.id, 'Rejected')}
                          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                        >
                          <XCircle size={16} /> Reject
                        </button>
                        <button 
                          onClick={() => setActiveRequestId(null)}
                          className="w-full text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline"
                        >
                          Cancel
                        </button>
                     </div>
                   )}
                 </>
               ) : (
                 <div className={`flex flex-col items-center justify-center gap-1 px-4 py-3 rounded-lg border
                    ${req.status === 'Approved' 
                      ? 'bg-green-50 border-green-100 text-green-700 dark:bg-green-900/20 dark:border-green-900' 
                      : 'bg-red-50 border-red-100 text-red-700 dark:bg-red-900/20 dark:border-red-900'}
                 `}>
                    {req.status === 'Approved' ? <CheckCircle size={24}/> : <XCircle size={24}/>}
                    <span className="font-bold text-sm">{req.status}</span>
                 </div>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveRequests;