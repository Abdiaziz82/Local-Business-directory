import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/react.svg'; // Adjust the path as needed
import ProfileDropdown from '../pages/ProfileDropdown'; // Adjust the import as needed
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const { isLoggedIn, logout } = useContext(AuthContext); // Access login state and logout function from context
  const navigate = useNavigate(); // To handle navigation

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function
      navigate('/'); // Redirect to the homepage after logout
    } catch (error) {
      console.error("Logout failed:", error); // Handle any errors if needed
    }
  };

  return (
    <header className="bg-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img src={logo} alt="LocalBiz Directory Logo" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-800 hover:text-indigo-600 font-medium">Home</Link>
            <Link to="/browse" className="text-gray-800 hover:text-indigo-600 font-medium">Browse Businesses</Link>
            <Link to="/add-business" className="text-gray-800 hover:text-indigo-600 font-medium">Add Business</Link>
            <Link to="/about" className="text-gray-800 hover:text-indigo-600 font-medium">About</Link>
            <Link to="/contact" className="text-gray-800 hover:text-indigo-600 font-medium">Contact Us</Link>
          </div>

          {/* User Authentication */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="text-gray-800 hover:text-indigo-600 font-medium">Profile</Link>
                <button 
                  onClick={handleLogout} // Logout button functionality
                  className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-800 hover:text-indigo-600 font-medium">Login</Link>
                <button
                  onClick={() => navigate('/signup')} // Navigate to the signup page
                  className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-500"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              type="button" 
              className="text-gray-800 hover:text-indigo-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block text-gray-800 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/browse" className="block text-gray-800 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-base font-medium">Browse Businesses</Link>
            <Link to="/add-business" className="block text-gray-800 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-base font-medium">Add Business</Link>
            <Link to="/about" className="block text-gray-800 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-base font-medium">About</Link>
            <Link to="/contact" className="block text-gray-800 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-base font-medium">Contact Us</Link>

            {/* Mobile User Authentication */}
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="block text-gray-800 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-base font-medium">Profile</Link>
                <button 
                  onClick={handleLogout} // Logout functionality for mobile
                  className="block w-full text-left text-gray-800 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-gray-800 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-base font-medium">Login</Link>
                <button
                  onClick={() => navigate('/signup')} // Open the modal on click
                  className="block w-full text-center bg-indigo-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
