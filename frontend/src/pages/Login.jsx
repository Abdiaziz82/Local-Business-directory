import  { useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = { ...formData, remember: rememberMe };

    axios.post('http://localhost:5000/api/login', loginData)
      .then((response) => {
        if (!response.data || !response.data.role) {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Unexpected response from the server.',
          });
          return;
        }

        const { role } = response.data;
        login(role); // Use the login function from AuthContext to handle role-based redirection
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'You have been logged in!',
        });

        // Set a cookie for user role
        Cookies.set('userRole', role);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.response ? error.response.data.error : 'An error occurred. Please try again.',
        });
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8">
      <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900">Login to Your Account</h2>
            <p className="mt-2 text-lg text-gray-600">Please enter your credentials to access your account</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-6">
              <div>
                <label htmlFor="email" className="sr-only">Email Address</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none rounded-md relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                  placeholder="Email Address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none rounded-md relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                  placeholder="Password"
                />
              </div>
            </div>
  
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleCheckboxChange}
                  className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-lg text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-lg">
                <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </Link>
              </div>
            </div>
  
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="text-center mt-6">
            <p className="text-lg text-gray-600">
              Don't have an account?{' '}
              <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign Up
              </Link>
            </p>
          </div>
      </div>
    </div>
  );
};

export default Login;