import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Public Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';

// Common Protected Pages
import Dashboard from './pages/Dashboard';
import EmployeeProfile from './pages/EmployeeProfile';

// Admin Pages
import EmployeeList from './pages/admin/EmployeeList';
import AddEmployee from './pages/admin/AddEmployee';
import EditEmployee from './pages/admin/EditEmployee';
import LeaveList from './pages/admin/LeaveList';
import AdminAttendance from './pages/admin/AdminAttendance';
import AddSalary from './pages/admin/AddSalary';
import SalaryList from './pages/admin/SalaryList';

// Employee Pages
import Leaves from './pages/employee/Leaves';
import AddLeave from './pages/employee/AddLeave';
import Attendance from './pages/employee/Attendance';
import Salary from './pages/employee/Salary';

// Components & Utilities
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      
      {/* --- PUBLIC ROUTES --- */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* --- COMMON PROTECTED ROUTES --- */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Layout><Dashboard /></Layout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Layout><EmployeeProfile /></Layout>
          </ProtectedRoute>
        } 
      />
      
      {/* --- ADMIN ROUTES --- */}
      <Route path="/admin/employees" element={
        <ProtectedRoute requiredRole="admin">
           <Layout><EmployeeList /></Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/add-employee" element={
        <ProtectedRoute requiredRole="admin">
           <Layout><AddEmployee /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/admin/employee/edit/:id" element={
        <ProtectedRoute requiredRole="admin">
           <Layout><EditEmployee /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/admin/leaves" element={
        <ProtectedRoute requiredRole="admin">
           <Layout><LeaveList /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/admin/attendance" element={
        <ProtectedRoute requiredRole="admin">
           <Layout><AdminAttendance /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/admin/salary/add" element={
        <ProtectedRoute requiredRole="admin">
           <Layout><AddSalary /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/admin/salary" element={
        <ProtectedRoute requiredRole="admin">
           <Layout><SalaryList /></Layout>
        </ProtectedRoute>
      } />

      {/* --- EMPLOYEE ROUTES --- */}
      <Route path="/employee/leaves" element={
        <ProtectedRoute>
           <Layout><Leaves /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/employee/leave-add" element={
        <ProtectedRoute>
           <Layout><AddLeave /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/employee/attendance" element={
        <ProtectedRoute>
           <Layout><Attendance /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/employee/salary" element={
        <ProtectedRoute>
           <Layout><Salary /></Layout>
        </ProtectedRoute>
      } />

      {/* Redirect Unknown Paths to Login */}
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  );
}

export default App;