import React from "react";

const SkeletonCard = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-lg mx-auto mb-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300 animate-pulse">
      {/* Skeleton for the image/logo */}
      <div className="relative bg-gray-100">
        <div className="w-full h-48 bg-gray-300"></div>
        <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-gray-300 text-gray-500">Loading...</div>
      </div>
      
      <div className="h-1 bg-indigo-500"></div>
      
      {/* Skeleton for the card content */}
      <div className="p-6">
        <div className="h-6 bg-gray-300 mb-4 w-2/3"></div> {/* Business name */}
        <div className="h-4 bg-gray-300 mb-4 w-3/4"></div> {/* Description */}
        <div className="h-4 bg-gray-300 mb-4 w-1/2"></div> {/* Location */}
        
        <div className="flex justify-around text-center text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <div className="h-4 bg-gray-300 w-16 mb-2"></div> {/* Products count */}
          </div>
          <div className="flex items-center">
            <div className="h-4 bg-gray-300 w-16 mb-2"></div> {/* Categories */}
          </div>
        </div>
        
        <div className="flex justify-around text-center text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <div className="h-4 bg-gray-300 w-16 mb-2"></div> {/* Email */}
          </div>
          <div className="flex items-center">
            <div className="h-4 bg-gray-300 w-16 mb-2"></div> {/* Phone */}
          </div>
        </div>
        
        <div className="h-8 bg-gray-300 w-1/3 mx-auto rounded-md"></div> {/* Button (Visit Website) */}
      </div>
    </div>
  );
};

export default SkeletonCard;
