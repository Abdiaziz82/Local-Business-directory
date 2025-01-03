import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Create a navigate instance

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    axios.post('http://localhost:5000/api/forgot-password', { email })
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Email Sent!',
          text: 'A password reset link has been sent to your email.',
          customClass: {
            title: 'swal-title',
            htmlContainer: 'swal-text',
          },
        }).then(() => {
          // Redirect to the reset password page after closing the alert
          navigate('/reset-password'); // Update this to the correct path of your reset password component
        });
        setEmail('');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Request Failed',
          text: error.response ? error.response.data.error : 'An error occurred. Please try again.',
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
          <h2 className="text-4xl font-extrabold text-gray-900">Forgot Password</h2>
          <p className="mt-2 text-lg text-gray-600">Please enter your email to reset your password</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">Email Address</label>
              <input
                name="email"
                type="email"
                required
                value={email}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-6 py-6 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                placeholder="Email Address"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-6 px-6 border border-transparent text-lg font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>
        </form>
        <div className="text-center mt-6">
          <p className="text-lg text-gray-600">Remembered your password? <a href="/login" className="text-indigo-600 font-medium hover:text-indigo-500">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
