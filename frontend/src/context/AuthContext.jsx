import React, { createContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types'; // Import PropTypes

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', credentials);
      const { role } = response.data;

      setIsAuthenticated(true);
      setUserRole(role);

      Cookies.set('userRole', role);
      return response.data; // Optionally return response data
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Rethrow the error for handling in the component
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/api/logout');
      setIsAuthenticated(false);
      setUserRole(null);
      Cookies.remove('userRole');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Define PropTypes for AuthProvider
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is required
};

export default AuthProvider;
