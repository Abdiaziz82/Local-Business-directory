import React, { useState } from "react";
import { FaClipboardList, FaEdit } from "react-icons/fa";
import BusinessForm from "./BusinessForm";
import BusinessCard from "./BusinessCard";

const BusinessOwnerDashboard = () => {
  const [activeSection, setActiveSection] = useState("form");
  const [businessData, setBusinessData] = useState(null);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="lg:w-1/4 w-full lg:h-screen bg-gray-900 text-white flex flex-col items-center py-8 lg:py-16 space-y-6 pt-20 lg:pt-28">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <button
          className={`flex items-center w-3/4 p-3 text-lg font-semibold hover:bg-gray-700 rounded ${
            activeSection === "form" ? "bg-gray-700" : ""
          }`}
          onClick={() => setActiveSection("form")}
        >
          <FaEdit className="mr-3 text-blue-500" /> Filling Form
        </button>
        <button
          className={`flex items-center w-3/4 p-3 text-lg font-semibold hover:bg-gray-700 rounded ${
            activeSection === "listings" ? "bg-gray-700" : ""
          }`}
          onClick={() => setActiveSection("listings")}
        >
          <FaClipboardList className="mr-3 text-blue-500" /> Your Listings
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 lg:p-8 bg-gray-100 overflow-y-auto mt-16">
        {activeSection === "form" && (
          <div className="flex justify-center">
            <BusinessForm setBusinessData={setBusinessData} />
          </div>
        )}
        {activeSection === "listings" && businessData && (
          <div className="flex flex-wrap justify-center gap-4">
            <BusinessCard businessData={businessData} />
          </div>
        )}
        {activeSection === "listings" && !businessData && (
          <p className="text-center text-gray-600 text-lg mt-10">
            No listings available. Fill out the form to add your listing.
          </p>
        )}
      </main>
    </div>
  );
};

export default BusinessOwnerDashboard;
