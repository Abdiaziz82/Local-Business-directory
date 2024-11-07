import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaBoxOpen, FaTag } from "react-icons/fa";

const BusinessCard = ({ data }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md mx-auto mb-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
      
      {/* Image Section with "OPEN" Label */}
      <div className="relative bg-gray-100">
        {data.logo && (
          <img
            src={data.logo}
            alt={`${data.name} Logo`}
            className="w-full h-48 object-cover"
          />
        )}
        
        {/* "OPEN" Badge */}
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
          OPEN
        </div>
      </div>
      
      {/* Divider between image and content */}
      <div className="h-1 bg-indigo-500"></div>
      
      {/* Content Section */}
      <div className="p-6">
        
        {/* Business Name */}
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{data.name}</h3>
        
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
