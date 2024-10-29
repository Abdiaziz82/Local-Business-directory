import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ResetPassword = () => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeCode = (e) => {
    setCode(e.target.value);
  };

  const handleChangePassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    axios.post('http://localhost:5000/api/reset-password', { code, newPassword })
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Password Reset!',
          text: 'Your password has been successfully updated.',
        });
        setCode('');
        setNewPassword('');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Request Failed',
          text: error.response ? error.response.data.error : 'An error occurred. Please try again.',
        });
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Reset Password</h2>
          <p className="mt-2 text-lg text-gray-600">Enter the code sent to your email and your new password</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="code" className="sr-only">Reset Code</label>
              <input
                name="code"
                type="text"
                required
                value={code}
                onChange={handleChangeCode}
                className="appearance-none rounded-md relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                placeholder="Reset Code"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="sr-only">New Password</label>
              <input
                name="newPassword"
                type="password"
                required
                value={newPassword}
                onChange={handleChangePassword}
                className="appearance-none rounded-md relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                placeholder="New Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSubmitting ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
