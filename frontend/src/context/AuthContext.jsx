import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

// Create the context
export const AuthContext = createContext();

// Create the provider
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null); // To hold the user data
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Load initial auth state from cookies and local storage
  useEffect(() => {
    const token = Cookies.get('access_token');
    const storedUserRole = localStorage.getItem('userRole');

    if (token && storedUserRole) {
      setIsLoggedIn(true);
      setUserRole(storedUserRole);
      fetchUserData(); // Fetch the user data from API
      handleRedirection(storedUserRole);
    } else {
      setIsLoading(false);
    }
  }, []);

  // Fetch the user data from the API
  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/user', {
        headers: { Authorization: `Bearer ${Cookies.get('access_token')}` },
      });
      setUser(response.data); // Set user data from API
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser(null); // Ensure that if there's an error, user data is set to null
    } finally {
      setIsLoading(false);
    }
  };

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
    fetchUserData(); // Fetch user data after login
    handleRedirection(role);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUser(null); // Clear the user data on logout
    Cookies.remove('access_token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a better loading screen
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
