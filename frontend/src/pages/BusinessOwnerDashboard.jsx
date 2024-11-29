import React, { useState, useEffect } from "react";
import { FaClipboardList, FaEdit, FaTrashAlt } from "react-icons/fa"; // Import delete icon
import BusinessForm from "./BusinessForm";
import BusinessCard from "./BusinessCard";
import BusinessEditForm from "./BusinessEditForm";

const BusinessOwnerDashboard = () => {
  const [activeSection, setActiveSection] = useState("form"); // 'form', 'listings', or 'edit'
  const [businessData, setBusinessData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [selectedBusiness, setSelectedBusiness] = useState(null); // To store selected business for editing

  // Helper function to get JWT token from cookies
  const getJwtFromCookies = () => {
    const cookies = document.cookie.split("; ");
    const jwtCookie = cookies.find((cookie) => cookie.startsWith("access_token="));
    return jwtCookie ? jwtCookie.split("=")[1] : null;
  };

  // Function to fetch user-specific business data
  const fetchUserData = async () => {
    try {
      let token = getJwtFromCookies();

      if (!token) {
        console.error("JWT token not found in cookies. Redirecting to login.");
        return;
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
      } else {
        console.error("Failed to fetch user data.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch user data on mount
  useEffect(() => {
    fetchUserData();
  }, []);

  // Handle new business data submission
  const handleNewBusinessData = (newData) => {
    const updatedData = [...businessData, newData];
    setBusinessData(updatedData);
  };

  // Handle business update
  const handleBusinessUpdate = (updatedBusiness) => {
    const updatedData = businessData.map((business) =>
      business.id === updatedBusiness.id ? updatedBusiness : business
    );
    setBusinessData(updatedData);
    setSelectedBusiness(null); // Clear selected business after update
    setActiveSection("listings"); // Switch back to listings
  };

  // Handle delete business
  const handleBusinessDelete = (businessId) => {
    const updatedData = businessData.filter((business) => business.id !== businessId);
    setBusinessData(updatedData);
    // Optionally, you could make an API call here to delete the business from the server
    console.log(`Business with ID ${businessId} deleted.`);
  };

  // Handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === "edit") {
      // Ensure we are selecting the first business for editing if none is selected
      if (!selectedBusiness && userData && userData.length > 0) {
        setSelectedBusiness(userData[0]); // Auto-select the first business for editing
      }
    } else {
      setSelectedBusiness(null); // Clear selected business if not in edit section
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen spartan">
      {/* Sidebar */}
      <aside className="lg:w-1/4 w-full lg:h-screen bg-gray-900 text-white flex flex-col items-center py-8 lg:py-16 space-y-6 pt-20 lg:pt-28">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Filling Form Button */}
        <button
          className={`flex items-center w-3/4 p-3 text-lg font-semibold hover:bg-gray-700 rounded ${
            activeSection === "form" ? "bg-gray-700" : ""
          }`}
          onClick={() => setActiveSection("form")}
        >
          <FaEdit className="mr-3 text-blue-500" /> Filling Form
        </button>

        {/* Your Listings Button */}
        <button
          className={`flex items-center w-3/4 p-3 text-lg font-semibold hover:bg-gray-700 rounded ${
            activeSection === "listings" ? "bg-gray-700" : ""
          }`}
          onClick={() => setActiveSection("listings")}
        >
          <FaClipboardList className="mr-3 text-blue-500" /> Your Listings
        </button>

        {/* Edit Button */}
        <button
          className={`flex items-center w-3/4 p-3 text-lg font-semibold hover:bg-gray-700 rounded ${
            activeSection === "edit" ? "bg-gray-700" : ""
          }`}
          onClick={() => setActiveSection("edit")}
        >
          <FaEdit className="mr-3 text-purple-500" /> Edit
        </button>

        {/* Messages Button */}
        <button
          className={`flex items-center w-3/4 p-3 text-lg font-semibold hover:bg-gray-700 rounded ${
            activeSection === "messages" ? "bg-gray-700" : ""
          }`}
          onClick={() => setActiveSection("messages")}
        >
          <FaClipboardList className="mr-3 text-green-500" /> Messages
        </button>

        {/* Reviews Button */}
        <button
          className={`flex items-center w-3/4 p-3 text-lg font-semibold hover:bg-gray-700 rounded ${
            activeSection === "reviews" ? "bg-gray-700" : ""
          }`}
          onClick={() => setActiveSection("reviews")}
        >
          <FaClipboardList className="mr-3 text-yellow-500" /> Reviews
        </button>

        {/* Delete Button */}
        <button
          className={`flex items-center w-3/4 p-3 text-lg font-semibold hover:bg-gray-700 rounded ${
            activeSection === "delete" ? "bg-gray-700" : ""
          }`}
          onClick={() => setActiveSection("delete")}
        >
          <FaTrashAlt className="mr-3 text-red-500" /> Delete
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
              <BusinessCard
                key={index}
                data={data}
                onEdit={() => handleSectionChange("edit")} // Trigger edit form from card
                onDelete={() => handleBusinessDelete(data.id)} // Delete functionality from card
              />
            ))}
          </div>
        )}
        {activeSection === "listings" && (!userData || userData.length === 0) && (
          <p className="text-center text-gray-600 text-lg mt-10">
            No listings available. Fill out the form to add your listing.
          </p>
        )}
        {activeSection === "edit" && selectedBusiness && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Edit Business</h2>
            <BusinessEditForm
              business={selectedBusiness}
              onSubmit={handleBusinessUpdate}
            />
          </div>
        )}
        {activeSection === "delete" && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Delete Business</h2>
            <p className="text-lg">Please select a business to delete.</p>
            {/* You can implement a delete confirmation form or list here */}
          </div>
        )}
      </main>
    </div>
  );
};

export default BusinessOwnerDashboard;
