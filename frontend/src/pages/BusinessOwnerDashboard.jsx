import React, { useState } from "react";
import { FaListAlt, FaPen } from "react-icons/fa";
import BusinessForm from "./BusinessForm";
import BusinessCard from "./BusinessCard";

const BusinessOwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("form");
  const [businessData, setBusinessData] = useState(null);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-white text-gray-800 p-5 border-r border-gray-200">
        <h2 className="text-2xl font-bold mb-8 text-center">Business Dashboard</h2>
        <div className="space-y-4">
          <button
            onClick={() => setActiveTab("form")}
            className={`flex items-center w-full p-3 rounded-lg transition-colors ${
              activeTab === "form" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            <FaPen className="text-blue-500 mr-3" />
            <span className="text-lg font-medium">Filling Form</span>
          </button>
          <button
            onClick={() => setActiveTab("listings")}
            className={`flex items-center w-full p-3 rounded-lg transition-colors ${
              activeTab === "listings" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            <FaListAlt className="text-blue-500 mr-3" />
            <span className="text-lg font-medium">Your Listings</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 flex justify-center items-center overflow-auto">
        {activeTab === "form" ? (
          <BusinessForm setBusinessData={setBusinessData} />
        ) : (
          businessData && <BusinessCard data={businessData} />
        )}
      </div>
    </div>
  );
};

export default BusinessOwnerDashboard;
