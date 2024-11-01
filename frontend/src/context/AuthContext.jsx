import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(Cookies.get('userRole') || null);

  const handleLogin = (role) => {
    setUserRole(role);
    Cookies.set('userRole', role);
  };

  const logout = () => {
    setUserRole(null);
    Cookies.remove('userRole');
  };

  return (
    <AuthContext.Provider value={{ userRole, handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
