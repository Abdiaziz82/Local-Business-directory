import React, { useContext } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { AuthContext } from '../context/AuthContext'; // Ensure the path is correct
import { Link } from 'react-router-dom';

const ProfileDropdown = ({ isOpen, setIsOpen }) => {
  const { logout } = useContext(AuthContext); // Access logout function from context

  const handleLogout = () => {
    try {
      logout(); // Call logout function from context
      setIsOpen(false); // Close dropdown
    } catch (error) {
      console.error("Logout failed:", error); // Handle any errors if needed
    }
  };

  return (
    <div className={`absolute right-0 mt-2  w-48 bg-white rounded-md shadow-lg ${isOpen ? 'block' : 'hidden'}`}>
      <div className="py-1">
        {/* Profile Link */}
        <Link 
          to="/profile" 
          className="block px-4 py-2 text-gray-800 hover:bg-indigo-600 hover:text-white"
        >
          Profile
        </Link>
        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-indigo-600 hover:text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

// Add prop types validation
ProfileDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Expecting a boolean
  setIsOpen: PropTypes.func.isRequired, // Expecting a function
};

export default ProfileDropdown;
