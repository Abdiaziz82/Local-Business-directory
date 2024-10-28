import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

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

function App() {
  const [userRole, setUserRole] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionData = () => {
      const storedRole = Cookies.get('userRole'); // Get role from cookies
      const storedAvatar = Cookies.get('userAvatar'); // Get avatar from cookies
      if (storedRole) {
        setUserRole(storedRole);
      }
      if (storedAvatar) {
        setUserAvatar(storedAvatar);
      }
      setLoading(false); // Done loading session data
    };

    fetchSessionData();
  }, []);

  const handleLogin = (role, avatar) => {
    setUserRole(role);
    setUserAvatar(avatar);
    Cookies.set('userRole', role);
    Cookies.set('userAvatar', avatar);
  };

  const handleLogout = () => {
    setUserRole(null);
    setUserAvatar(null);
    Cookies.remove('userRole');
    Cookies.remove('userAvatar');
  };

  if (loading) {
    return <div>Loading...</div>; // Simple loading indicator
  }

  return (
    <Router>
      <Header userAvatar={userAvatar} onLogout={handleLogout} />

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
        
        {/* Protected route for business owner dashboard */}
        <Route 
          path="/business-owner-dashboard" 
          element={userRole === 'business_owner' ? <BusinessOwnerDashboard /> : <Navigate to="/login" />} 
        />

        {/* Protected route for customer dashboard */}
        <Route 
          path="/customer-dashboard" 
          element={userRole === 'customer' ? <CustomerDashboard /> : <Navigate to="/login" />} 
        />
        
        <Route path="/browse" element={<div>Browse Businesses</div>} />
        <Route path="/add-business" element={<div>Add a Business</div>} />
        <Route path="/about" element={<div>About Us</div>} />
        <Route path="/contact" element={<div>Contact Us</div>} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
