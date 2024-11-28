import React, { useState, useEffect } from "react";
import { FaClipboardList, FaEdit } from "react-icons/fa";
import BusinessForm from "./BusinessForm";
import BusinessCard from "./BusinessCard";

const BusinessOwnerDashboard = () => {
  const [activeSection, setActiveSection] = useState("form");
  const [businessData, setBusinessData] = useState([]);
  const [userData, setUserData] = useState(null);

  // Function to refresh the token
  const refreshAccessToken = async () => {
    try {
        const response = await fetch("http://127.0.0.1:5000/api/token/refresh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("refresh_token")}`, // Replace with your refresh token storage mechanism
            },
        });

        if (!response.ok) {
            throw new Error("Failed to refresh token");
        }

        const data = await response.json();
        localStorage.setItem("access_token", data.access_token); // Store the new access token
        return data.access_token;
    } catch (error) {
        console.error("Unable to refresh token:", error);
        throw error;
    }
};


  // Function to fetch user-specific business data
  const fetchUserData = async () => {
    try {
      let token = localStorage.getItem("jwtToken");

      if (!token) {
        console.error("JWT token not found. Redirecting to login.");
        return; // Optionally, redirect to login
      }

      const response = await fetch("http://127.0.0.1:5000/api/business-info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData([data.business_info]); // Update user data state
      } else if (response.status === 401) {
        console.warn("Token expired. Attempting to refresh...");
        token = await refreshAccessToken(); // Refresh the token
        if (token) {
          await fetchUserData(); // Retry the request
        } else {
          console.error("Unable to refresh token. Please log in again.");
          // Optionally, redirect to login page here
        }
      } else {
        throw new Error("Failed to fetch user data.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  // Function to handle new business data submission
  const handleNewBusinessData = (newData) => {
    const updatedData = [...businessData, newData];
    setBusinessData(updatedData);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen spartan">
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
            <BusinessForm setBusinessData={handleNewBusinessData} />
          </div>
        )}
        {activeSection === "listings" && userData && userData.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {userData.map((data, index) => (
              <BusinessCard key={index} data={data} />
            ))}
          </div>
        )}
        {activeSection === "listings" && (!userData || userData.length === 0) && (
          <p className="text-center text-gray-600 text-lg mt-10">
            No listings available. Fill out the form to add your listing.
          </p>
        )}
      </main>
    </div>
  );
};

export default BusinessOwnerDashboard;
