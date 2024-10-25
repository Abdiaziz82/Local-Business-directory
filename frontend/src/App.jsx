
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header"
import HeroSection from './components/HeroSection';
import SearchComponent from './components/SearchComponent';
import StatsSection from './components/StatsSection';
import HowitWorks from './components/HowItWorks';
import FeaturedBusinesses from './components/FeaturedBusinesses';

import Footer from './components/Footer';
import BusinessOwnerSignup from './pages/BusinessOwnerSignup ';
import CustomerSignup from './pages/CustomerSignup';
import Login from './pages/Login';


function App() {
  
  return (
    <>

    <Router>
      <Header />
      
      <Routes> 
        <Route path="/" element={
            <>
            <HeroSection />
      <SearchComponent />
      <StatsSection />
      <HowitWorks />
      <FeaturedBusinesses />
            </>
          } />
          
          <Route path="/login" element={<Login />} />
        <Route path="/browse"  />
        <Route path="/add-business"/>
        <Route path="/about" />
        <Route path="/contact"  />
        <Route path="/signup/business-owner" element={<BusinessOwnerSignup />} /> {/* Business Owner Signup */}
        <Route path="/signup/customer" element={<CustomerSignup />} /> {/* Customer Signup */}
      </Routes>
      <Footer />
    </Router>

    </>
  )
}

export default App
