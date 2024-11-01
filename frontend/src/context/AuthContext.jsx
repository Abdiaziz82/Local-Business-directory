// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // Track user role

  const login = (role) => {
    setIsLoggedIn(true);
    setUserRole(role); // Set user role on login
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role); // Save role to local storage
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null); // Clear user role on logout
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole'); // Remove role from local storage
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
