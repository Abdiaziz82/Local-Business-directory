import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/image.png'; // Adjust path as needed
import ProfileDropdown from '../pages/ProfileDropdown'; // Import the ProfileDropdown
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For profile dropdown
  const [isModalOpen, setIsModalOpen] = useState(false); // For signup choice modal
  const { isLoggedIn, logout, user } = useContext(AuthContext); // Access login state, logout function and user info from context
  const navigate = useNavigate(); // To handle navigation after logout

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function
      setIsDropdownOpen(false); // Close dropdown after logout
      navigate('/'); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error); // Handle any errors if needed
    }
  };

  // Function to get user's initials or a fallback
  const getInitials = (name) => {
    if (!name) return 'U'; // Default to 'U' if no name is available
    const names = name.split(' ');
    const initials = names.map((n) => n[0].toUpperCase()).join('');
    return initials;
  };
  

  return (
    <header className="bg-white shadow-lg fixed top-0 left-0 w-full z-50 spartan">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src={logo} 
              alt="LocalBiz Directory Logo" 
              className="h-32 w-auto md:h-20 lg:h-32 max-h-full"
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-800 hover:text-indigo-600 font-medium">Home</Link>
            <Link to="/about" className="text-gray-800 hover:text-indigo-600 font-medium">About</Link>
            <Link to="/add-business" className="text-gray-800 hover:text-indigo-600 font-medium">Browse Business</Link>
            <Link to="/browse" className="text-gray-800 hover:text-indigo-600 font-medium">Blogs</Link>
            <Link to="/contact" className="text-gray-800 hover:text-indigo-600 font-medium">Contact Us</Link>
          </div>
          
          {/* User Authentication */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
   


                <button 
                  onClick={handleLogout} // Logout button functionality
                  className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-500"
                >
                  Logout
                </button>
                <button
  onClick={toggleDropdown} // Toggle dropdown for profile options
  className="relative text-gray-800 hover:text-indigo-600 font-medium flex items-center"
>
  {/* Avatar */}
  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full flex justify-center items-center font-semibold text-lg">
    {getInitials(user?.username)} {/* Show initials if user has a username */}
  </div>

  {/* Profile Dropdown */}
  {isDropdownOpen && (
    <ProfileDropdown
      isOpen={isDropdownOpen}
      setIsOpen={setIsDropdownOpen}
    />
  )}
</button>
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
            <Link to="/about" className="block text-gray-800 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-base font-medium">About</Link>
            <Link to="/add-business" className="block text-gray-800 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-base font-medium">Browse Businesses</Link>
            <Link to="/browse" className="block text-gray-800 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-base font-medium">Blogs</Link>
            <Link to="/contact" className="block text-gray-800 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-base font-medium">Contact Us</Link>

            {/* Mobile User Authentication */}
{isLoggedIn ? (
  <>
    

    {/* Toggle Dropdown Button */}
    <button
      onClick={toggleDropdown} // Toggle profile dropdown for mobile
      className="relative text-gray-800 hover:text-indigo-600 font-medium flex items-center w-full text-left px-3 py-2 rounded-md"
    >
      {/* Avatar */}
      <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full flex justify-center items-center font-semibold text-lg">
        {getInitials(user?.username)} {/* Show initials if user has a username */}
      </div>

      {/* Profile Dropdown */}
      {isDropdownOpen && (
        <ProfileDropdown
          isOpen={isDropdownOpen}
          setIsOpen={setIsDropdownOpen}
        />
      )}
    </button>

    {/* Logout Button */}
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
              className="mt-6 text-gray-600 hover:text-indigo-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
