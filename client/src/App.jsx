import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EmployeeProfile from './pages/EmployeeProfile';
// Admin Imports
import EmployeeList from './pages/admin/EmployeeList';
import LeaveRequests from './pages/admin/LeaveRequests';
import PayrollList from './pages/admin/PayrollList';
import AdminAttendance from './pages/admin/AdminAttendance'; // NEW IMPORT
// Employee Imports
import Attendance from './pages/employee/Attendance';
import LeaveApplication from './pages/employee/LeaveApplication';
import SalaryDetails from './pages/employee/SalaryDetails';

import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><LandingPage /></Layout>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/profile" element={<Layout><EmployeeProfile /></Layout>} />
      
      {/* Admin Routes */}
      <Route path="/admin/employees" element={<Layout><EmployeeList /></Layout>} />
      <Route path="/admin/leaves" element={<Layout><LeaveRequests /></Layout>} />
      <Route path="/admin/payroll" element={<Layout><PayrollList /></Layout>} />
      <Route path="/admin/attendance" element={<Layout><AdminAttendance /></Layout>} /> {/* NEW ROUTE */}

      {/* Employee Routes */}
      <Route path="/employee/attendance" element={<Layout><Attendance /></Layout>} />
      <Route path="/employee/leaves" element={<Layout><LeaveApplication /></Layout>} />
      <Route path="/employee/salary" element={<Layout><SalaryDetails /></Layout>} />
    </Routes>
  );
}

export default App;