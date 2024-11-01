import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { userRole } = useAuth();

  const isAuthorized = allowedRoles.includes(userRole);

  if (!userRole) {
    return <Navigate to="/login" />;
  }

  if (!isAuthorized) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoutes;
