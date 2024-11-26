import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();

  // Load initial auth state from cookies
  useEffect(() => {
    const token = Cookies.get('access_token');
    const storedUserRole = localStorage.getItem('userRole');

    if (token && storedUserRole) {
      setIsLoggedIn(true);
      setUserRole(storedUserRole);
      handleRedirection(storedUserRole);
    }

    setIsLoading(false);
  }, []);

  const handleRedirection = (role) => {
    if (role === 'business_owner') {
      navigate('/business-owner-dashboard');
    } else if (role === 'customer') {
      navigate('/customer-dashboard');
    } else {
      console.error("Invalid role. Redirecting to default.");
      navigate('/default-dashboard');
    }
  };

  const login = (role, token) => {
    setIsLoggedIn(true);
    setUserRole(role);
    Cookies.set('access_token', token, { expires: 1 }); 
    localStorage.setItem('userRole', role);
    handleRedirection(role); 
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    Cookies.remove('access_token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
