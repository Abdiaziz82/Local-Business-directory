import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaBoxOpen, FaTag } from "react-icons/fa";

const BusinessCard = () => {
  const [data, setData] = useState(null); // State to store fetched data
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Fetch business info from the API
    const fetchBusinessInfo = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/business-info"); // Adjust the endpoint if needed
        if (response.ok) {
          const businessData = await response.json();
          setData(businessData);
        } else {
          console.error("Failed to fetch business information.");
        }
      } catch (error) {
        console.error("Error fetching business information:", error);
      }
    };

    fetchBusinessInfo();

    // Check if business is open or closed
    const openingHour = 9; // 9 AM
    const closingHour = 17; // 5 PM
    const checkOpenStatus = () => {
      const currentHour = new Date().getHours();
      const open = currentHour >= openingHour && currentHour < closingHour;
      setIsOpen(open);
    };

    checkOpenStatus(); // Initial status check
    const intervalId = setInterval(checkOpenStatus, 60000); // Check every minute

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md mx-auto mb-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
      {/* Image Section with "OPEN" or "CLOSED" Label */}
      <div className="relative bg-gray-100">
        {data.logo && (
          <img
            src={data.logo}
            alt={`${data.name} Logo`}
            className="w-full h-48 object-cover"
          />
        )}

        {/* "OPEN" or "CLOSED" Badge */}
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded-full shadow-md text-xs font-semibold 
                      ${isOpen ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
        >
          {isOpen ? "OPEN" : "CLOSED"}
        </div>
      </div>

      {/* Divider between image and content */}
      <div className="h-1 bg-indigo-500"></div>

      {/* Content Section */}
      <div className="p-6">
        {/* Business Name - Centered */}
        <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">{data.name}</h3>

        {/* Truncated Business Description */}
        <div className="text-sm text-gray-600 mb-4 text-center">
          <p>{data.description}</p>
        </div>

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

        {/* Visit Website Button */}
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
