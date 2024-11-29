import React, { useState, useEffect } from "react";
import BusinessCard from "./BusinessCard"; // Reuse the BusinessCard component to display businesses

const CustomerDashboard = () => {
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]); // To store unique business categories
  const [products, setProducts] = useState([]); // To store unique business products
  const [locations, setLocations] = useState([]); // To store unique business locations
  const [categoryFilter, setCategoryFilter] = useState("");
  const [productFilter, setProductFilter] = useState(""); 
  const [locationFilter, setLocationFilter] = useState("");
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
        setFilteredBusinesses(data.businesses);
        
        // Dynamically extract categories, products, and locations
        setCategories([...new Set(data.businesses.map((business) => business.categories))]);
        setProducts([...new Set(data.businesses.map((business) => business.products))]);
        setLocations([...new Set(data.businesses.map((business) => business.location))]);
      } else {
        console.error("Failed to fetch businesses.");
      }
    } catch (error) {
      console.error("Error fetching businesses:", error);
    }
  };

  // Filter businesses based on search query and selected filters
  const handleSearch = () => {
    console.log("Filtering businesses with:");
    console.log("Category:", categoryFilter);
    console.log("Product:", productFilter);
    console.log("Location:", locationFilter);
  
    const filtered = businesses.filter((business) => {
      const matchesCategory = categoryFilter
        ? (business.categories && business.categories.toLowerCase().includes(categoryFilter.toLowerCase()))
        : true;
  
      const matchesProduct = productFilter
        ? (business.products && business.products.toLowerCase().includes(productFilter.toLowerCase()))
        : true;
  
      const matchesLocation = locationFilter
        ? (business.location && business.location.toLowerCase().includes(locationFilter.toLowerCase()))
        : true;
  
      console.log("Matches Category:", matchesCategory);
      console.log("Matches Product:", matchesProduct);
      console.log("Matches Location:", matchesLocation);
  
      return matchesCategory && matchesProduct && matchesLocation;
    });
  
    console.log("Filtered businesses:", filtered);
    setFilteredBusinesses(filtered);
  
    if (filtered.length === 0) {
      console.log("No businesses found matching your search or selected filters.");
    }
  };
  
  

  useEffect(() => {
    fetchBusinesses();
  }, []);

  return (
    <div className="flex flex-col min-h-screen spartan">
      {/* Heading Above Search Bar */}
      <div className="text-center py-16 mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">What are you looking for?</h2>
      </div>

      {/* Search Bar */}
      <div className="bg-gray-100 shadow-lg py-6 pt-6">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col lg:flex-row items-center gap-4">
            {/* Categories Field */}
            <div className="flex flex-col w-full lg:w-1/4">
              <label htmlFor="category" className="text-gray-700 font-semibold mb-2">
                Category
              </label>
              <select
                id="category"
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              >
                <option value="">Select Category</option>
                {categories.length > 0 ? (
                  categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))
                ) : (
                  <option>Loading...</option>
                )}
              </select>
            </div>

            {/* Products Field */}
            <div className="flex flex-col w-full lg:w-1/4">
              <label htmlFor="product" className="text-gray-700 font-semibold mb-2">
                Products
              </label>
              <select
                id="product"
                onChange={(e) => setProductFilter(e.target.value)}
                className="p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              >
                <option value="">Select Product</option>
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <option key={index} value={product}>
                      {product}
                    </option>
                  ))
                ) : (
                  <option>Loading...</option>
                )}
              </select>
            </div>

            {/* Location Field */}
            <div className="flex flex-col w-full lg:w-1/4">
              <label htmlFor="location" className="text-gray-700 font-semibold mb-2">
                Location
              </label>
              <select
                id="location"
                onChange={(e) => setLocationFilter(e.target.value)}
                className="p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              >
                <option value="">Select Location</option>
                {locations.length > 0 ? (
                  locations.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))
                ) : (
                  <option>Loading...</option>
                )}
              </select>
            </div>

            {/* Search Button */}
            <div className="w-full lg:w-1/4 flex justify-center mt-4 lg:mt-0">
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Business Information */}
      <main className="flex-grow p-4 lg:p-8 bg-gray-100 overflow-y-auto mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Available Businesses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-items-center">
          {filteredBusinesses.length > 0 ? (
            filteredBusinesses.map((business, index) => (
              <BusinessCard key={index} data={business} />
            ))
          ) : (
            <p className="text-center text-gray-600 text-lg mt-10">
              No businesses found matching your search or selected filters.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
