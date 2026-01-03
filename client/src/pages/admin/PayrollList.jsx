import React, { useState } from 'react';
import { DollarSign, Download, Search, Edit2, CheckCircle, AlertCircle, Save, X } from 'lucide-react';

const PayrollList = () => {
  // Mock Data
  const [payrolls, setPayrolls] = useState([
    { id: 1, name: 'John Doe', role: 'Software Engineer', basic: 5000, hra: 2000, allowances: 1000, tax: 800, pf: 200, status: 'Paid' },
    { id: 2, name: 'Sarah Wilson', role: 'HR Manager', basic: 4500, hra: 1500, allowances: 500, tax: 600, pf: 200, status: 'Processing' },
  ]);

  // State for Editing
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Calculate Net Salary Helper
  const calculateNet = (data) => {
    return (parseInt(data.basic) || 0) + (parseInt(data.hra) || 0) + (parseInt(data.allowances) || 0) - (parseInt(data.tax) || 0) - (parseInt(data.pf) || 0);
  };

  // Open Edit Modal [Requirement 3.6.2: Update salary structure]
  const handleEditClick = (employee) => {
    setEditingId(employee.id);
    setEditForm({ ...employee });
  };

  // Save Changes
  const handleSave = () => {
    setPayrolls(payrolls.map(p => p.id === editingId ? { ...editForm } : p));
    setEditingId(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Payroll Management</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage salaries and ensure payroll accuracy.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
          <DollarSign size={20} />
          <span>Process Payroll</span>
        </button>
      </div>

      {/* Main Table [Requirement 3.6.2: View payroll of all employees] */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-sm border-b border-gray-100 dark:border-gray-700">
                <th className="p-4 font-medium">Employee</th>
                <th className="p-4 font-medium">Basic</th>
                <th className="p-4 font-medium">HRA</th>
                <th className="p-4 font-medium">Allowances</th>
                <th className="p-4 font-medium">Deductions (Tax+PF)</th>
                <th className="p-4 font-medium">Net Salary</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {payrolls.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">{row.name}</p>
                      <p className="text-xs text-gray-500">{row.role}</p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">${row.basic}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">${row.hra}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">${row.allowances}</td>
                  <td className="p-4 text-red-500 text-sm">-${row.tax + row.pf}</td>
                  <td className="p-4 font-bold text-gray-800 dark:text-white">
                    ${calculateNet(row).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full
                      ${row.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}
                    `}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleEditClick(row)}
                      className="p-2 text-primary hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
                      title="Update Structure"
                    >
                      <Edit2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- EDIT MODAL [Requirement 3.6.2: Update Salary Structure] --- */}
      {editingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100 dark:border-gray-700 animate-fade-in">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Update Salary Structure</h3>
              <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Basic Salary</label>
                  <input 
                    type="number" 
                    value={editForm.basic}
                    onChange={(e) => setEditForm({...editForm, basic: parseInt(e.target.value) || 0})}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">HRA</label>
                  <input 
                    type="number" 
                    value={editForm.hra}
                    onChange={(e) => setEditForm({...editForm, hra: parseInt(e.target.value) || 0})}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Allowances</label>
                  <input 
                    type="number" 
                    value={editForm.allowances}
                    onChange={(e) => setEditForm({...editForm, allowances: parseInt(e.target.value) || 0})}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-red-400 mb-1">Tax + PF (Deductions)</label>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      placeholder="Tax"
                      value={editForm.tax}
                      onChange={(e) => setEditForm({...editForm, tax: parseInt(e.target.value) || 0})}
                      className="w-1/2 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-red-400"
                    />
                     <input 
                      type="number" 
                      placeholder="PF"
                      value={editForm.pf}
                      onChange={(e) => setEditForm({...editForm, pf: parseInt(e.target.value) || 0})}
                      className="w-1/2 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Net Calculation Preview */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl flex justify-between items-center mt-4">
                 <span className="font-medium text-gray-600 dark:text-gray-300">New Net Salary:</span>
                 <span className="text-2xl font-bold text-primary">${calculateNet(editForm).toLocaleString()}</span>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex gap-3">
               <button 
                 onClick={handleSave}
                 className="flex-1 bg-primary text-white py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors flex justify-center items-center gap-2"
               >
                 <Save size={18} /> Save Changes
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollList;