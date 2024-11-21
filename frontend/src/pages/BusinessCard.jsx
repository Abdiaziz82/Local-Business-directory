import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaBoxOpen, FaTag } from "react-icons/fa";

const BusinessCard = () => {
  const [data, setData] = useState(null); // State to store fetched data
  const [isOpen, setIsOpen] = useState(false); // State for open/closed status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Fetch business information from the Flask API
    const fetchBusinessInfo = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/business-info");
        if (!response.ok) {
          throw new Error("Failed to fetch business information");
        }
        const businessData = await response.json();
        setData(businessData); // Set the fetched data to state
        setError(null); // Clear any existing errors
      } catch (error) {
        console.error("Error fetching business information:", error);
        setError("An error occurred while fetching business data.");
      }
    };

    fetchBusinessInfo(); // Call the function when the component mounts

    // Determine if the business is open or closed
    const checkOpenStatus = () => {
      const openingHour = 9; // 9 AM
      const closingHour = 17; // 5 PM
      const currentHour = new Date().getHours();
      setIsOpen(currentHour >= openingHour && currentHour < closingHour);
    };

    checkOpenStatus(); // Check open/closed status
    const intervalId = setInterval(checkOpenStatus, 60000); // Check every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  if (error) return <p className="text-red-500 text-center">{error}</p>; // Show error if any
  if (!data) return <p>Loading...</p>; // Show loading state

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md mx-auto mb-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
      {/* Business Logo */}
      <div className="relative bg-gray-100">
        {data.logo && (
          <img
            src={data.logo}
            alt={`${data.name} Logo`}
            className="w-full h-48 object-cover"
          />
        )}
        {/* Open/Closed Badge */}
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded-full shadow-md text-xs font-semibold ${
            isOpen ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {isOpen ? "OPEN" : "CLOSED"}
        </div>
      </div>

      {/* Divider */}
      <div className="h-1 bg-indigo-500"></div>

      {/* Business Info */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          {data.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 text-center">{data.description}</p>

        {/* Location */}
        <div className="text-sm text-gray-600 mb-4 flex items-center justify-center">
          <FaMapMarkerAlt className="mr-2 text-indigo-500" />
          {data.location}
        </div>

        {/* Products and Categories */}
        <div className="flex justify-around text-center text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <FaBoxOpen className="mr-1 text-indigo-500" />
            <span>{data.products} products</span>
          </div>
          <div className="flex items-center">
            <FaTag className="mr-1 text-indigo-500" />
            <span>{data.categories}</span>
          </div>
        </div>

        {/* Contact Information */}
        <div className="flex justify-around text-center text-sm text-gray-600 mb-4">
          {data.email && (
            <div className="flex items-center">
              <FaEnvelope className="mr-1 text-indigo-500" />
              <span>{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className="flex items-center">
              <FaPhone className="mr-1 text-indigo-500" />
              <span>{data.phone}</span>
            </div>
          )}
        </div>

        {/* Website Link */}
        {data.website && (
          <div className="mt-4">
            <a
              href={data.website}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-500 transition duration-300 text-sm font-semibold"
            >
              Visit Website
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessCard;
