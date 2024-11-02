import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import AuthProvider from './context/AuthContext';
import Header from "./components/Header";
import HeroSection from './components/HeroSection';
import SearchComponent from './components/SearchComponent';
import StatsSection from './components/StatsSection';
import HowItWorks from './components/HowItWorks';
import FeaturedBusinesses from './components/FeaturedBusinesses';
import Footer from './components/Footer';
import BusinessOwnerSignup from './pages/BusinessOwnerSignup';
import CustomerSignup from './pages/CustomerSignup';
import CustomerDashboard from './pages/CustomerDashboard';
import Login from './pages/Login';
import BusinessOwnerDashboard from './pages/BusinessOwnerDashboard';
import ForgetPassword from './pages/ForgotPassword';
import ResetPasswordForm from './pages/ResetPasswordForm';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionData = () => {
      const storedRole = Cookies.get('userRole'); // Get role from cookies
      if (storedRole) {
        setUserRole(storedRole);
      }
      setLoading(false); // Done loading session data
    };

    fetchSessionData();
  }, []);

  const handleLogin = (role) => {
    setUserRole(role);
    Cookies.set('userRole', role);
  };

  const handleLogout = () => {
    setUserRole(null);
    Cookies.remove('userRole');
  };

  if (loading) {
    return <div>Loading...</div>; // Simple loading indicator
  }

  return (
    
    <Router>
     <AuthProvider>
      <Header onLogout={handleLogout} />

      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <HeroSection />
              <SearchComponent />
              <StatsSection />
              <HowItWorks />
              <FeaturedBusinesses />
            </>
          } 
        />
        
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup/business-owner" element={<BusinessOwnerSignup />} />
        <Route path="/signup/customer" element={<CustomerSignup />} />
        
         {/* Protected routes */}
         <Route
            path="/business-owner-dashboard"
            element={
              <ProtectedRoute role="business_owner">
                <BusinessOwnerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer-dashboard"
            element={
              <ProtectedRoute role="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
         <Route path="/forgot-password" element={<ForgetPassword />} />
         <Route path="/reset-password" element={<ResetPasswordForm />} />
        
        <Route path="/browse" element={<div>Browse Businesses</div>} />
        <Route path="/add-business" element={<div>Add a Business</div>} />
        <Route path="/about" element={<div>About Us</div>} />
        <Route path="/contact" element={<div>Contact Us</div>} />
      </Routes>

      <Footer />
      </AuthProvider>
    </Router>
    
   
  );
}

export default App; 