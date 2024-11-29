import React, { useState, useEffect } from "react";
import BusinessCard from "./BusinessCard"; // Reuse the BusinessCard component to display businesses
import SearchComponent from "../components/SearchComponent"; // Updated import path for the SearchComponent

const CustomerDashboard = () => {
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);

  // Helper function to get JWT token from cookies
  const getJwtFromCookies = () => {
    const cookies = document.cookie.split("; ");
    const jwtCookie = cookies.find((cookie) => cookie.startsWith("access_token="));
    return jwtCookie ? jwtCookie.split("=")[1] : null;
  };

  // Fetch all businesses posted by business owners
  const fetchBusinesses = async () => {
    try {
      let token = getJwtFromCookies();

      if (!token) {
        console.error("JWT token not found in cookies. Redirecting to login.");
        return;
      }

      const response = await fetch("http://127.0.0.1:5000/api/businesses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBusinesses(data.businesses);
        setFilteredBusinesses(data.businesses); // Initially show all businesses
      } else {
        console.error("Failed to fetch businesses.");
      }
    } catch (error) {
      console.error("Error fetching businesses:", error);
    }
  };

  // Update filtered businesses based on search query
  const handleSearch = (query) => {
    if (query === "") {
      setFilteredBusinesses(businesses); // Show all businesses if no search query
    } else {
      const filtered = businesses.filter(
        (business) =>
          business.name.toLowerCase().includes(query.toLowerCase()) ||
          business.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBusinesses(filtered); // Filter businesses based on query
    }
  };

  useEffect(() => {
    fetchBusinesses(); // Fetch businesses on component mount
  }, []);

  return (
    <div className="flex flex-col min-h-screen spartan">
      {/* Centered Search Bar */}
      <div className="flex justify-center p-6 bg-gray-100 shadow-md">
        <SearchComponent onSearch={handleSearch} />
      </div>

      {/* Business Information */}
      <main className="flex-grow p-4 lg:p-8 bg-gray-100 overflow-y-auto mt-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Available Businesses</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {filteredBusinesses.length > 0 ? (
            filteredBusinesses.map((business, index) => (
              <BusinessCard key={index} data={business} />
            ))
          ) : (
            <p className="text-center text-gray-600 text-lg mt-10">
              No businesses found matching your search.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
