import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/image.png'; // Import your logo
import Swal from 'sweetalert2'; // Import SweetAlert2

function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      setLoading(true); // Set loading to true when the request starts
      try {
        // Send email to the Flask backend to notify user of successful subscription
        const response = await fetch('http://localhost:5000/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          setIsSubscribed(true);
          // Show SweetAlert success message
          Swal.fire({
            icon: 'success',
            title: 'Successfully Subscribed!',
            text: 'You will start receiving our newsletter.',
            confirmButtonText: 'OK',
            customClass: {
              title: 'swal-title',
              htmlContainer: 'swal-text',
            },
          });
        } else {
          alert('Subscription failed. Please try again.');
        }
      } catch (error) {
        console.error('Error during subscription:', error);
        alert('There was an error. Please try again.');
      } finally {
        setLoading(false); // Set loading to false once the request completes
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white py-12 spartan">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            <img src={logoImage} alt="Logo" className="h-16 mb-4" />
            <p className="text-lg font-semibold">Your Local Business Directory</p>
            <p className="text-gray-400 mt-2">Connecting businesses and consumers locally.</p>
            <div className="mt-4 flex space-x-4">
              <a href="https://www.facebook.com" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12l-10 10-10-10 10-10 10 10z"></path>
                </svg>
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.1 10.1 0 0 1-3 1 4.3 4.3 0 0 0 1.9-2.3 9.6 9.6 0 0 1-2.9 1.1 4.4 4.4 0 0 0-7.5 3 12.6 12.6 0 0 1-9-4.5 4.3 4.3 0 0 0 1.4 5.7 4.3 4.3 0 0 1-2-.5c0 .1 0 .2 0 .3 0 4.4 3.2 8 7.4 8.8a4.3 4.3 0 0 1-1.1 0c-1.2 0-2.3-.4-3.3-1 2.3 7 9.1 10.1 15 8.5 3.5-1.2 6.2-4.4 6.2-8 0-.1 0-.2 0-.3.1-.3 0-.7-.1-1-.9-.3-1.9-1.3-2.8-2.3z"></path>
                </svg>
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.3 0h-20.6c-1.1 0-2.1 1-2.1 2.2v19.6c0 1.2 1 2.2 2.1 2.2h20.6c1.1 0 2.1-1 2.1-2.2v-19.6c0-1.2-1-2.2-2.1-2.2zm-14.6 19.6h-3.7v-11.2h3.7v11.2zm-1.8-12.7c-1.2 0-2.1-1-2.1-2.2s.9-2.2 2.1-2.2 2.1 1 2.1 2.2-.9 2.2-2.1 2.2zm12.5 12.7h-3.6v-5.9c0-1.4-.5-2.3-1.7-2.3-1.1 0-1.7.8-1.7 2.2v5.9h-3.7v-11.2h3.7v1.6h.1c.5-.8 1.6-1.3 2.7-1.3 2.1 0 3.7 1.5 3.7 4.5v6.3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-lg font-semibold mb-4">Quick Links</p>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/about" className="hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/businesses" className="hover:text-white">Businesses</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">Contact</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <p className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</p>
            <p className="text-gray-400 mb-4">Stay updated with the latest local business news and offers!</p>
            <form className="flex" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={handleEmailChange}
                className="p-3 rounded-l-lg w-full text-black"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-3 rounded-r-lg hover:bg-blue-700"
                disabled={loading} // Disable the button while loading
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="12" cy="12" r="10" strokeWidth="4" stroke="currentColor" fill="none" />
                      <path
                        fill="currentColor"
                        d="M4 12a8 8 0 1 1 16 0A8 8 0 1 1 4 12"
                      />
                    </svg>
                    Subscribing...
                  </span>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-400 mt-12">
        <p>&copy; 2024 Your Local Business Directory. All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
