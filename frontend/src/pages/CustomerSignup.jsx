import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2

const CustomerSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [avatar, setAvatar] = useState(null); // Separate state for avatar image
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // New function to handle image file selection
  const handleImageUpload = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Use FormData to send both form fields and the avatar file
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    if (avatar) {
      formDataToSend.append('avatar', avatar); // Append the avatar file to the FormData
    }

    // Send the data to the backend
    axios.post('http://localhost:5000/api/signup/customer', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure correct content type
      },
    })
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Customer account created successfully!',
          timer: 2000,
        });

        // Save avatar URL to local storage for later use on login
        if (response.data.avatarUrl) {
          localStorage.setItem('userAvatar', response.data.avatarUrl);
        }
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg lg:w-2/3 xl:w-3/4 2xl:w-2/3">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">Sign Up as a Customer</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Create a password"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Confirm your password"
            />
          </div>

          {/* New Avatar Upload Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Upload Avatar</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload} // Handle avatar upload
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading} // Disable the button when loading
          >
            {loading ? (
              <span>Signing up...</span> // Show "Signing up..." when loading
            ) : (
              <span>Sign Up</span>
            )}
          </button>
        </form>
        {/* Add the "Already Registered? Login" text below the signup button */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already Registered?{' '}
          <a href="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">Login</a>
        </p>
      </div>
    </div>
  );
};

export default CustomerSignup;
