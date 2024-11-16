import React from 'react';
import { FaStore, FaUsers, FaStar, FaRegHandshake } from 'react-icons/fa'; // Importing icons

const StatsSection = () => {
  return (
    <div className="bg-gray-100 py-16 px-6 spartan">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Our Impact in Numbers</h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Stat #1: Total Businesses */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl transition-shadow duration-300">
            <FaStore className="text-indigo-600 text-6xl mx-auto mb-4" /> {/* Business Icon */}
            <h3 className="text-2xl font-semibold text-gray-800">10,000+</h3>
            <p className="text-gray-600">Registered Businesses</p>
          </div>

          {/* Stat #2: Total Users */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl transition-shadow duration-300">
            <FaUsers className="text-indigo-600 text-6xl mx-auto mb-4" /> {/* Users Icon */}
            <h3 className="text-2xl font-semibold text-gray-800">50,000+</h3>
            <p className="text-gray-600">Active Users</p>
          </div>

          {/* Stat #3: Total Reviews */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl transition-shadow duration-300">
            <FaStar className="text-indigo-600 text-6xl mx-auto mb-4" /> {/* Reviews Icon */}
            <h3 className="text-2xl font-semibold text-gray-800">200,000+</h3>
            <p className="text-gray-600">Customer Reviews</p>
          </div>

          {/* Stat #4: Partnerships */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl transition-shadow duration-300">
            <FaRegHandshake className="text-indigo-600 text-6xl mx-auto mb-4" /> {/* Partnerships Icon */}
            <h3 className="text-2xl font-semibold text-gray-800">1,000+</h3>
            <p className="text-gray-600">Business Partnerships</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StatsSection;
