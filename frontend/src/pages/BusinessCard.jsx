import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaBoxOpen, FaTag } from "react-icons/fa";

const BusinessCard = ({ data, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkOpenStatus = () => {
      const openingHour = 9; // 9 AM
      const closingHour = 17; // 5 PM
      const currentHour = new Date().getHours();
      setIsOpen(currentHour >= openingHour && currentHour < closingHour);
    };

    checkOpenStatus();
    const intervalId = setInterval(checkOpenStatus, 60000); // Check every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  if (!data) {
    return <p className="text-center text-gray-600">No business data available.</p>;
  }

  const {
    name,
    description,
    location,
    logo,
    products,
    categories,
    email,
    phone,
    website,
  } = data;

  const handleEdit = () => {
    if (onEdit) {
      onEdit(data); // Pass the business data to the parent component
    }
  };

  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md mx-auto mb-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
      onClick={handleEdit} // Trigger edit action on click
    >
      <div className="relative bg-gray-100">
        {logo ? (
          <img
            src={logo}
            alt={`${name} Logo`}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-500">
            No Logo
          </div>
        )}
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded-full shadow-md text-xs font-semibold ${
            isOpen ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {isOpen ? "OPEN" : "CLOSED"}
        </div>
      </div>
      <div className="h-1 bg-indigo-500"></div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          {name || "Business Name"}
        </h3>
        <p className="text-sm text-gray-600 mb-4 text-center">
          {description || "No description provided."}
        </p>
        <div className="text-sm text-gray-600 mb-4 flex items-center justify-center">
          <FaMapMarkerAlt className="mr-2 text-indigo-500" />
          {location || "Location not specified."}
        </div>
        <div className="flex justify-around text-center text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <FaBoxOpen className="mr-1 text-indigo-500" />
            <span>{products || "N/A"} products</span>
          </div>
          <div className="flex items-center">
            <FaTag className="mr-1 text-indigo-500" />
            <span>{categories || "N/A"}</span>
          </div>
        </div>
        <div className="flex justify-around text-center text-sm text-gray-600 mb-4">
          {email && (
            <div className="flex items-center">
              <FaEnvelope className="mr-1 text-indigo-500" />
              <span>{email}</span>
            </div>
          )}
          {phone && (
            <div className="flex items-center">
              <FaPhone className="mr-1 text-indigo-500" />
              <span>{phone}</span>
            </div>
          )}
        </div>
        {website && (
          <div className="mt-4">
            <a
              href={website}
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

// Prop validation for the BusinessCard component
BusinessCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    logo: PropTypes.string,
    products: PropTypes.number,
    categories: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    website: PropTypes.string,
  }),
  onEdit: PropTypes.func.isRequired, // Callback to handle edit
};

export default BusinessCard;
