import React from "react";
import { useLocation } from "react-router-dom";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaBoxOpen, FaTag } from "react-icons/fa";

const BusinessDetail = () => {
  const location = useLocation();
  const { data } = location.state;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Logo */}
      {data.logo && (
        <div className="text-center mb-6">
          <img
            src={data.logo}
            alt={`${data.name} Logo`}
            className="w-32 h-32 mx-auto rounded-full object-cover"
          />
        </div>
      )}
      
      {/* Business Name */}
      <h2 className="text-3xl font-bold text-center mb-4">{data.name}</h2>

      {/* Description */}
      <p className="text-gray-700 mb-6">{data.description}</p>

      {/* Location */}
      <div className="text-sm text-gray-600 mb-4 flex items-center justify-center">
        <FaMapMarkerAlt className="mr-2 text-indigo-500" />
        {data.location}
      </div>

      {/* Products */}
      <div className="text-gray-600 mb-4">
        <strong>Products:</strong> {data.products}
      </div>

      {/* Categories */}
      <div className="text-gray-600 mb-4">
        <strong>Categories:</strong> {data.categories}
      </div>

      {/* Contact Information */}
      <div className="text-gray-600 mb-4">
        {data.email && (
          <div className="flex items-center mb-2">
            <FaEnvelope className="mr-2 text-indigo-500" />
            <span>{data.email}</span>
          </div>
        )}
        {data.phone && (
          <div className="flex items-center">
            <FaPhone className="mr-2 text-indigo-500" />
            <span>{data.phone}</span>
          </div>
        )}
      </div>

      {/* Website Link */}
      {data.website && (
        <div className="text-center mt-4">
          <a
            href={data.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-500 transition duration-300"
          >
            Visit Website
          </a>
        </div>
      )}
    </div>
  );
};

export default BusinessDetail;
