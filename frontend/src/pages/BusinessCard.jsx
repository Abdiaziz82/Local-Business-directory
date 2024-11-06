import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const BusinessCard = ({ data }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 max-w-sm mx-auto">
      {/* Business Logo or Banner */}
      {data.logo && (
        <img
          src={data.logo}
          alt={`${data.name} Logo`}
          className="h-48 w-full object-cover"
        />
      )}
      <div className="p-6">
        {/* Business Name */}
        <h3 className="text-xl font-bold text-gray-900">{data.name}</h3>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">{data.description}</p>

        {/* Location */}
        <div className="mt-3 text-sm text-indigo-500 flex items-center">
          <FaMapMarkerAlt className="mr-2" /> {data.location}
        </div>

        {/* Category */}
        {data.category && (
          <div className="mt-3">
            <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-xs">
              {data.category}
            </span>
          </div>
        )}

        {/* Rating */}
        {data.rating && (
          <div className="mt-3 text-yellow-400">
            {"★".repeat(data.rating)}
          </div>
        )}

        {/* Website Link */}
        {data.website && (
          <div className="mt-6">
            <a
              href={data.website}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-500 transition duration-300"
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
