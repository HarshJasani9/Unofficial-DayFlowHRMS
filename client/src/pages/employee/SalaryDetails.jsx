import React from 'react';
import { DollarSign, Download, FileText, TrendingUp, Shield } from 'lucide-react';

const SalaryDetails = () => {
  // Mock Data: This comes from DB later
  const salaryStructure = {
    basic: 5000,
    hra: 2000,
    allowances: 1000,
    tax: 800,
    pf: 200,
    net: 7000,
    currency: '$'
  };

  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Payroll</h1>
        <p className="text-gray-500 dark:text-gray-400">View your salary details and payment history.</p>
      </div>

      {/* 3.6.1 Read-Only Salary Structure Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Main Card */}
         <div className="col-span-2 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
               <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-indigo-100 font-medium mb-1">Net Monthly Salary</p>
                    <h2 className="text-4xl font-bold">{salaryStructure.currency}{salaryStructure.net.toLocaleString()}</h2>
                  </div>
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Shield size={24} className="text-white" />
                  </div>
               </div>
               
               {/* Detailed Breakdown [cite: 23] */}
               <div className="grid grid-cols-2 gap-y-4 gap-x-8 border-t border-white/20 pt-6">
                  <div>
                     <p className="text-indigo-200 text-sm mb-1">Basic Pay</p>
                     <p className="font-bold text-lg">{salaryStructure.currency}{salaryStructure.basic.toLocaleString()}</p>
                  </div>
                  <div>
                     <p className="text-indigo-200 text-sm mb-1">HRA</p>
                     <p className="font-bold text-lg">{salaryStructure.currency}{salaryStructure.hra.toLocaleString()}</p>
                  </div>
                  <div>
                     <p className="text-indigo-200 text-sm mb-1">Special Allowances</p>
                     <p className="font-bold text-lg">{salaryStructure.currency}{salaryStructure.allowances.toLocaleString()}</p>
                  </div>
                  <div>
                     <p className="text-indigo-200 text-sm mb-1">Deductions (Tax + PF)</p>
                     <p className="font-bold text-lg text-rose-300">-{salaryStructure.currency}{(salaryStructure.tax + salaryStructure.pf).toLocaleString()}</p>
                  </div>
               </div>
            </div>
            
            {/* Background Decor */}
            <div className="absolute -right-10 -bottom-10 opacity-10">
               <DollarSign size={250} />
            </div>
         </div>

         {/* Stats Side Cards */}
         <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
               <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                     <TrendingUp size={20} />
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-white">Next Payout</h3>
               </div>
               <p className="text-2xl font-bold text-gray-800 dark:text-white">Jan 31, 2024</p>
               <p className="text-xs text-gray-500 mt-1">Status: Processing</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
               <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Paid (YTD)</p>
               <p className="text-2xl font-bold text-gray-800 dark:text-white">$84,000</p>
            </div>
         </div>
      </div>

      {/* Payslip History List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
         <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-white">Payslip History</h3>
         </div>
         <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {[
               { month: 'December 2023', paidOn: 'Jan 01, 2024', id: '#PAY-1223' },
               { month: 'November 2023', paidOn: 'Dec 01, 2023', id: '#PAY-1123' },
               { month: 'October 2023', paidOn: 'Nov 01, 2023', id: '#PAY-1023' },
            ].map((slip, idx) => (
               <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300">
                        <FileText size={24} />
                     </div>
                     <div>
                        <p className="font-bold text-gray-800 dark:text-white">{slip.month}</p>
                        <p className="text-sm text-gray-500">Paid on {slip.paidOn} • ID: {slip.id}</p>
                     </div>
                  </div>
                  {/* Download Button (Read Only Action) */}
                  <button className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors font-medium text-sm">
                     <Download size={16} />
                     Download PDF
                  </button>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default SalaryDetails;