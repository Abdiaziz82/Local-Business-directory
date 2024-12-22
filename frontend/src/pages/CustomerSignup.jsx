import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import icons for showing/hiding password

const CustomerSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [acceptTerms, setAcceptTerms] = useState(false); // State for terms checkbox
  const [loading, setLoading] = useState(false); // Loading state
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for showing confirm password
  const navigate = useNavigate(); // Initialize navigate function

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!acceptTerms) {
      Swal.fire({
        icon: 'warning',
        title: 'Accept Terms',
        text: 'You must accept the terms and conditions to continue.',
         customClass: {
          title: 'swal-title',
          htmlContainer: 'swal-text',
        },
      });
      return;
    }

    setLoading(true);

    axios.post('http://localhost:5000/api/signup/customer', formData)
      .then((response) => {
        console.log(response.data);
        setLoading(false);

        // Clear form fields
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });

        // Display success alert and navigate to login page
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Customer account created successfully!',
          customClass: {
            title: 'swal-title',
            htmlContainer: 'swal-text',
          },
          timer: 2000,
          didClose: () => {
            navigate('/login'); // Redirect to login page
          }
        });
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response?.data.error || 'An error occurred. Please try again.',
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 spartan px-4 sm:px-6 md:px-8">
      <div className="grid lg:grid-cols-2 items-center gap-6 max-w-7xl w-full pt-16">
        <form onSubmit={handleSubmit} className="lg:max-w-md w-full px-6 py-8 ">
          <h3 className="text-gray-800 text-3xl font-extrabold mb-12 text-center">Sign Up as a Customer</h3>
          <div className="space-y-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all rounded-md"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all rounded-md"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all rounded-md"
                  placeholder="Create a password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-indigo-600"
                >
                  {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                </span>
              </div>
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all rounded-md"
                  placeholder="Confirm your password"
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-indigo-600"
                >
                  {showConfirmPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                </span>
              </div>
            </div>
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="mt-6 flex items-center">
            <input
              type="checkbox"
              id="acceptTerms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-800">
              I accept the{' '}
              <Link to="/terms-and-conditions" className="text-indigo-600 font-semibold hover:underline">
                Terms and Conditions
              </Link>
            </label>
          </div>

          <div className="mt-12">
            <button
              type="submit"
              className="py-4 px-8 text-sm font-semibold text-white tracking-wide bg-indigo-600 hover:bg-blue-700 focus:outline-none w-full rounded-md"
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Create an Account'}
            </button>
          </div>
          <p className="text-sm text-gray-800 mt-6 text-center">
            Already Registered?{' '}
            <a href="/login" className="text-indigo-600 font-semibold hover:underline">
              Login here
            </a>
          </p>
        </form>

        <div className="h-full max-w-full">
          <img
            src="https://readymadeui.com/login-image.webp"
            className="w-full h-full object-cover rounded-lg"
            alt="Signup Illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerSignup;
