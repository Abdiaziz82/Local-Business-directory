import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Importing eye icons from react-icons

const BusinessOwnerSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    businessName: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    axios.post('http://localhost:5000/api/signup/business-owner', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Business owner account created successfully!',
          timer: 2000,
        }).then(() => {
          setFormData({
            fullName: '',
            email: '',
            businessName: '',
            password: '',
            confirmPassword: '',
          });
          navigate('/login');
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
    <div className="flex flex-col justify-center items-center font-[sans-serif] bg-gradient-to-r bg-white lg:h-screen p-6 spartan mt-[80px] md:mt-0">
      <div className="grid md:grid-cols-2 items-center gap-y-8 bg-white max-w-7xl w-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md overflow-hidden">
        <div className="max-md:order-1 flex flex-col justify-center sm:p-8 p-4 bg-indigo-600 w-full h-full">
          <div className="max-w-md space-y-12 mx-auto">
            <div>
              <h4 className="text-white text-lg font-semibold">Create Your Account</h4>
              <p className="text-[13px] text-white mt-2">
                Welcome to our registration page! Get started by creating your account.
              </p>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold">Simple & Secure Registration</h4>
              <p className="text-[13px] text-white mt-2">
                Our registration process is designed to be straightforward and secure.
              </p>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold">Terms and Conditions Agreement</h4>
              <p className="text-[13px] text-white mt-2">
                Require users to accept the terms and conditions of your service during registration.
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="sm:p-8 p-4 w-full"
          encType="multipart/form-data"
        >
          <div className="mb-12">
            <h3 className="text-indigo-600 text-3xl font-extrabold max-md:text-center">
              Register
            </h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Full Name</label>
              <input
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Business Name</label>
              <input
                name="businessName"
                type="text"
                value={formData.businessName}
                onChange={handleChange}
                required
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter your business name"
              />
            </div>
            <div className="relative">
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <input
                name="password"
                type={passwordVisible ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Create a password"
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer pt-7 text-indigo-700"
                onClick={handlePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div className="relative">
              <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
              <input
                name="confirmPassword"
                type={confirmPasswordVisible ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Confirm your password"
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer pt-7 text-indigo-700"
                onClick={handleConfirmPasswordVisibility}
              >
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <div className="flex items-center mt-6">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 shrink-0 rounded"
              required
            />
            <label htmlFor="terms" className="ml-3 block text-sm text-gray-800">
              I accept the{' '}
              <Link
                to="/terms-and-conditions"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Terms and Conditions
              </Link>
            </label>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="py-3 px-6 text-sm tracking-wide font-semibold rounded-md text-white bg-indigo-600 hover:bg-blue-700 focus:outline-none transition-all"
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessOwnerSignup;
