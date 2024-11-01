import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { Link } from 'react-router-dom';

const ProfileDropdown = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth(); // Access logout function from context

  const handleLogout = () => {
    try {
      logout(); // Call logout function from context
      setIsOpen(false); // Close dropdown
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ${isOpen ? 'block' : 'hidden'}`}>
      <div className="py-1">
        <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-indigo-600 hover:text-white">
          Profile
        </Link>
        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-indigo-600 hover:text-white">
          Logout
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
