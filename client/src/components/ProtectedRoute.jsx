import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  // 1. Wait for Auth Check to finish
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // 2. Not Logged In? -> Go to Login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // 3. Wrong Role? -> Go to Dashboard (Unauthorized)
  // Requirement 3.1.2 (Implied): Only authorized users access specific modules
  if (requiredRole && user.role !== requiredRole) {
     alert("Access Denied: You do not have permission to view this page.");
     return <Navigate to="/dashboard" />;
  }

  // 4. Authorized? -> Render the Page
  return children;
};

export default ProtectedRoute;