import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ProfileDropdown = ({ isOpen, setIsOpen }) => {
  const { logout } = useContext(AuthContext); // Access logout function from context
  const [username, setUsername] = useState("User"); // Default username
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  // Fetch the user's username from the backend
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Fetch the JWT token from cookies
        const token = document.cookie
          .split('; ')
          .find((row) => row.startsWith('access_token='))
          ?.split('=')[1]; // Extract the token value
  
        if (!token) {
          throw new Error("Token not found in cookies");
        }
  
        const response = await fetch('http://127.0.0.1:5000/api/user', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
  
        const data = await response.json();
        setUsername(data.username); // Set the username from the API response
        setEmail(data.email);
        setRole(data.role);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
  
    fetchUserDetails();
  }, []);
  

  const handleLogout = () => {
    try {
      logout();
      setIsOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className={`absolute right-4 mt-48 w-56 bg-white rounded-lg shadow-xl border border-gray-200 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="py-2">
        {/* Welcome Message */}
        <div className="block px-4 py-3 text-sm text-gray-700 font-semibold border-b border-gray-200">
          Welcome, {username}!
          <p className="text-xs text-gray-500 mt-1">{email}</p>
          <p className="text-xs text-gray-500 mt-1">{role}</p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
        >
          <span className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 9a2 2 0 012-2h6V5a1 1 0 011-1h4a1 1 0 011 1v10a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2H5a2 2 0 01-2-2V9z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M7 9a1 1 0 011-1h4a1 1 0 010 2H8a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Logout</span>
          </span>
        </button>
      </div>
    </div>
  );
};

ProfileDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default ProfileDropdown;
