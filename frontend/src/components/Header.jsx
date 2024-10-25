import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Default avatar icon
import logo from '../assets/react.svg'; // Adjust path as needed

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const [isModalOpen, setIsModalOpen] = useState(false); // For signup choice modal
  const [userImage, setUserImage] = useState(null); // User uploaded image state
  const [isAvatarOpen, setIsAvatarOpen] = useState(false); // For avatar dropdown
  const isLoggedIn = false; // Replace with actual login state
  const navigate = useNavigate(); // To handle navigation after signup choice

  // Placeholder for uploaded user image (can be set after login)
  const handleImageUpload = (imageUrl) => {
    setUserImage(imageUrl); // Set user uploaded image when available
  };

  // Toggle avatar dropdown
  const toggleAvatarDropdown = () => {
    setIsAvatarOpen(!isAvatarOpen);
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
          
          {/* Main Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-800 hover:text-indigo-600 font-medium">Home</Link>
            <Link to="/browse" className="text-gray-800 hover:text-indigo-600 font-medium">Browse Businesses</Link>
            <Link to="/add-business" className="text-gray-800 hover:text-indigo-600 font-medium">Add Business</Link>
            <Link to="/about" className="text-gray-800 hover:text-indigo-600 font-medium">About</Link>
            <Link to="/contact" className="text-gray-800 hover:text-indigo-600 font-medium">Contact Us</Link>
          </div>

          {/* User Authentication and Avatar */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <div className="relative">
                  {/* Show user image if logged in, else default avatar icon */}
                  <div onClick={toggleAvatarDropdown} className="cursor-pointer">
                    {userImage ? (
                      <img 
                        src={userImage} 
                        alt="User Avatar" 
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <FaUserCircle className="h-10 w-10 text-gray-500" />
                    )}
                  </div>

                  {/* Avatar Dropdown */}
                  {isAvatarOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                      <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                      <button className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-800 hover:text-indigo-600 font-medium">Login</Link>
                <button
                  onClick={() => setIsModalOpen(true)} // Open the modal on click
                  className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-500"
                >
                  Sign Up
                </button>

                {/* Default avatar when not logged in */}
                <FaUserCircle className="h-10 w-10 text-gray-500" />
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
                <button className="block w-full text-left text-gray-800 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-base font-medium">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-gray-800 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-base font-medium">Login</Link>
                <button
                  onClick={() => setIsModalOpen(true)} // Open the modal on click (for mobile as well)
                  className="block w-full text-center bg-indigo-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* SignUpChoiceModal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-10 max-w-xl w-full text-center transform transition-transform duration-300 ease-in-out">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-8">Sign Up As</h2>

            {/* Business Owner Button */}
            <button
              onClick={() => {
                navigate('/signup/business-owner'); // Navigate to Business Owner signup
                setIsModalOpen(false); // Close the modal after redirect
              }}
              className="block w-full px-6 py-4 mb-4 bg-indigo-600 text-white rounded-lg font-bold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
            >
              Business Owner
            </button>

            {/* Customer Button */}
            <button
              onClick={() => {
                navigate('/signup/customer'); // Navigate to Customer signup
                setIsModalOpen(false); // Close the modal after redirect
              }}
              className="block w-full px-6 py-4 bg-indigo-600 text-white rounded-lg font-bold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
            >
              Customer
            </button>

            {/* Close Modal */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-6 text-gray-400 hover:text-gray-600 transition duration-300 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
