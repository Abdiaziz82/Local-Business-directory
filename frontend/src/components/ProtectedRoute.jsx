import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ role, children }) => {
  const { userRole } = useContext(AuthContext);

  if (!userRole) {
    // Redirect to login if not logged in
    return <Navigate to="/login" />;
  }

  if (userRole !== role) {
    // Redirect to login if role doesn't match
    return <Navigate to="/login" />;
  }

  // Render the protected component if role matches
  return children;
};

export default ProtectedRoute;
