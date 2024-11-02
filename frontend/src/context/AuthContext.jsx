import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate(); // Access navigate in the AuthProvider

  // Load initial auth state from localStorage
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserRole = localStorage.getItem('userRole');

    if (storedIsLoggedIn && storedUserRole) {
      setIsLoggedIn(true);
      setUserRole(storedUserRole);
      handleRedirection(storedUserRole); // Redirect to the correct dashboard on load
    }
  }, []);

  // Centralized redirection based on role
  const handleRedirection = (role) => {
    if (role === 'business_owner') {
      navigate('/business-owner-dashboard');
    } else if (role === 'customer') {
      navigate('/customer-dashboard');
    } else {
      console.error("Invalid role. Redirecting to default.");
      navigate('/default-dashboard'); // Redirect to a default page, or to login if preferred.
    }
  };
  

  const login = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
    handleRedirection(role); // Redirect immediately after login
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Add propTypes validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider; 