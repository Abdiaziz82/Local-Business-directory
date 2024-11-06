import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const BusinessCard = ({ data }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 max-w-2xl mx-auto mb-6">
      
      {/* Image as a Banner */}
      {data.logo && (
        <div className="relative">
          <img
            src={data.logo}
            alt={`${data.name} Logo`}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-20"></div> {/* Overlay for text contrast */}
        </div>
      )}
      
      <div className="p-6">
        {/* Business Name */}
        <h3 className="text-2xl font-bold text-gray-900 mt-4 text-center">{data.name}</h3>

        {/* Description */}
        <p className="mt-3 text-sm text-gray-700 leading-snug text-center line-clamp-3">
          {data.description}
        </p>

        {/* Location */}
        <div className="mt-3 text-sm text-indigo-600 flex items-center justify-center">
          <FaMapMarkerAlt className="mr-1 text-indigo-500" />
          {data.location}
        </div>

        {/* Category */}
        {data.categories && (
          <div className="mt-2 text-center">
            <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-xs">
              {data.categories}
            </span>
          </div>
        )}

        {/* Products */}
        {data.products && (
          <p className="mt-2 text-sm text-gray-700 text-center">
            <strong>Products:</strong> {data.products}
          </p>
        )}

        {/* Contact Information */}
        <div className="mt-4 space-y-2 text-center">
          {data.email && (
            <p className="flex items-center justify-center text-sm text-gray-700">
              <FaEnvelope className="mr-1 text-indigo-500" />
              {data.email}
            </p>
          )}
          {data.phone && (
            <p className="flex items-center justify-center text-sm text-gray-700">
              <FaPhone className="mr-1 text-indigo-500" />
              {data.phone}
            </p>
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


