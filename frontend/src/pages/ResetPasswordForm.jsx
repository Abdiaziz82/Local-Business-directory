import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPassword = () => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false); // For new password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For confirm password visibility
  const navigate = useNavigate(); // Initialize navigate

  const handleChangeCode = (e) => {
    setCode(e.target.value);
  };

  const handleChangePassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Passwords do not match.',
      });
      return;
    }

    setIsSubmitting(true);

    axios
      .post('http://localhost:5000/api/reset-password', { code, newPassword })
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Password Reset!',
          text: 'Your password has been successfully updated.',
          customClass: {
            title: 'swal-title',
            htmlContainer: 'swal-text',
          },
        }).then(() => {
          // Redirect to login page after successful reset
          navigate('/login');
        });
        setCode('');
        setNewPassword('');
        setConfirmPassword('');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Request Failed',
          text: error.response
            ? error.response.data.error
            : 'An error occurred. Please try again.',
          customClass: {
            title: 'swal-title',
            htmlContainer: 'swal-text',
          },
        });
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 spartan">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">Reset Password</h2>
          <p className="mt-2 text-lg text-gray-600">
            Enter the code sent to your email and your new password
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-6">
            <div>
              <label htmlFor="code" className="sr-only">
                Reset Code
              </label>
              <input
                name="code"
                type="text"
                required
                value={code}
                onChange={handleChangeCode}
                className="appearance-none rounded-md relative block w-full px-6 py-6 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                placeholder="Reset Code"
              />
            </div>
            <div className="relative">
              <label htmlFor="newPassword" className="sr-only">
                New Password
              </label>
              <input
                name="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={handleChangePassword}
                className="appearance-none rounded-md relative block w-full px-6 py-6 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                placeholder="New Password"
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={toggleNewPasswordVisibility}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="relative">
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={handleChangeConfirmPassword}
                className="appearance-none rounded-md relative block w-full px-6 py-6 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                placeholder="Confirm Password"
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-6 px-6 border border-transparent text-lg font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSubmitting ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </form>
        <div className="text-center mt-6">
          <p className="text-lg text-gray-600">
            Remembered your password?{' '}
            <a
              href="/login"
              className="text-indigo-600 font-medium hover:text-indigo-500"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
