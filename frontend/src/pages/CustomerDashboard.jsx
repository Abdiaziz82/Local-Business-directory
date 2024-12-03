import React, { useState, useEffect } from "react";
import BusinessCard from "./BusinessCard"; // Reuse the BusinessCard component to display businesses

const CustomerDashboard = () => {
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [productFilter, setProductFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [sortFilter, setSortFilter] = useState(""); // State for sorting
  const [isLoading, setIsLoading] = useState(false); // State for loader spinner
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [modalData, setModalData] = useState(null); // Store selected business data for modal

  // Function to get JWT from cookies
  const getJwtFromCookies = () => {
    const cookies = document.cookie.split("; ");
    const jwtCookie = cookies.find((cookie) => cookie.startsWith("access_token="));
    return jwtCookie ? jwtCookie.split("=")[1] : null;
  };

  // Function to fetch businesses from API
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

        // Set unique values for categories, products, and locations
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

  // Function to handle the search and apply filters and sorting
  const handleSearch = () => {
    setIsLoading(true); // Start the loader
    setTimeout(() => {
      let filtered = businesses.filter((business) => {
        const matchesCategory = categoryFilter
          ? (business.categories && business.categories.toLowerCase().includes(categoryFilter.toLowerCase()))
          : true;

        const matchesProduct = productFilter
          ? (business.products && business.products.toLowerCase().includes(productFilter.toLowerCase()))
          : true;

        const matchesLocation = locationFilter
          ? (business.location && business.location.toLowerCase().includes(locationFilter.toLowerCase()))
          : true;

        return matchesCategory && matchesProduct && matchesLocation;
      });

      // Apply sort filter
      if (sortFilter === "latest") {
        filtered = filtered.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
      } else if (sortFilter === "a-z") {
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
      }

      setFilteredBusinesses(filtered);
      setIsLoading(false); // Stop the loader
    }, 1000); // Simulate a delay for fetching data
  };

  // Function to handle opening the modal and setting the selected business data
  const openModal = (business) => {
    setModalData(business);
    setShowModal(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  // Fetch businesses when the component is mounted
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
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
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
                {products.map((product, index) => (
                  <option key={index} value={product}>
                    {product}
                  </option>
                ))}
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
                {locations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="flex flex-col w-full lg:w-1/4">
              <label htmlFor="sort" className="text-gray-700 font-semibold mb-2">
                Sort By
              </label>
              <select
                id="sort"
                onChange={(e) => setSortFilter(e.target.value)}
                className="p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              >
                <option value="">None</option>
                <option value="latest">Latest Posted</option>
                <option value="a-z">A-Z</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="w-full lg:w-1/4 flex justify-center mt-4 lg:mt-0">
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? (
                  <div className="loader border-t-2 border-white w-5 h-5 rounded-full animate-spin"></div>
                ) : (
                  "Search"
                )}
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
              <div key={index} onClick={() => openModal(business)}>
                <BusinessCard data={business} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-lg mt-10">
              No businesses found matching your search or selected filters.
            </p>
          )}
        </div>
      </main>

      {/* Modal */}
     {/* Modal */}
     {showModal && (
  <div
    className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
    onClick={closeModal}
  >
    <div
      className="bg-white p-6 rounded-lg shadow-lg max-w-5xl w-full space-y-6"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
    >
      {/* Header Section */}
      <div className="flex justify-between items-center border-b pb-4">
        <h3 className="text-2xl font-semibold">
          Send a Message to {modalData.name}
        </h3>
        <button
          className="text-gray-500 hover:text-gray-800"
          onClick={closeModal}
        >
          &times;
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          {/* Description Section */}
          <div>
            <h3 className="text-lg font-bold mb-2">Description</h3>
            <p className="text-gray-700">{modalData.description}</p>
          </div>

          {/* Location Section */}
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">Location</h3>
            <div className="h-48 w-full bg-gray-200 flex justify-center items-center">
              <span className="text-gray-500">Map Placeholder</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Contact Form */}
          <form className="space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="text-gray-700 font-semibold mb-2 block"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="text-gray-700 font-semibold mb-2 block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                required
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="text-gray-700 font-semibold mb-2 block"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">Reviews</h3>
        <p className="text-gray-500">No reviews yet.</p>
      </div>

      {/* Close Button */}
      <div className="flex justify-end mt-4">
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default CustomerDashboard;
