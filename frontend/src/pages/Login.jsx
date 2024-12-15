import { useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center ">
    <div className="flex space-x-2 ">
      <div className="h-6 w-6 bg-white rounded-full animate-bounce"></div>
      <div className="h-6 w-6 bg-white rounded-full animate-bounce200"></div>
      <div className="h-6 w-6 bg-white rounded-full animate-bounce300"></div>
    </div>
  </div>
);

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const loginData = { ...formData, remember: rememberMe };

    setTimeout(() => {
      axios
        .post('https://backend-henna-delta-42.vercel.app/api/login', loginData, {
          withCredentials: true, 
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          setLoading(false);

          if (!response.data || !response.data.role) {
            Swal.fire({
              icon: 'error',
              title: 'Login Failed',
              text: 'Unexpected response from the server.',
            });
            return;
          }

          const { role, token } = response.data;
          login(role, token); 
          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'You have been logged in!',
            customClass: {
              title: 'swal-title',
              htmlContainer: 'swal-text',
            },
          });

          Cookies.set('userRole', role);
          Cookies.set('access_token', token); 
        })
        .catch((error) => {
          setLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: error.response
              ? error.response.data.error
              : 'An error occurred. Please try again.',
          });
        });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 spartan">
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
            <div style={{ position: 'relative' }}>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                placeholder="Password"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: '#6b7280',
                }}
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
              {loading ? <LoadingSpinner /> : 'Sign in'}
            </button>
          </div>
        </form>
        <div className="text-center mt-6">
          <p className="text-lg text-gray-600">Don't have an account? <Link to="/signup" className="text-indigo-600 font-medium hover:text-indigo-500">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
