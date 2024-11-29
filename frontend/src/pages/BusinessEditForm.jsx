import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';


const BusinessEditForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    location: "",
    products: "",
    website: "",
    categories: "",
    phone: "",
    logo: "",
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state for form submission
  
  // Fetch business data on component mount
  useEffect(() => {
    const fetchBusinessData = async () => {
      setLoading(true);
      try {
        const token = document.cookie.split("; ").find(row => row.startsWith("access_token="))?.split("=")[1];
        if (!token) {
          alert("Authentication token is missing. Please log in.");
          return;
        }

        const response = await fetch("http://127.0.0.1:5000/api/business-info", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error fetching business data:", errorData);
          setError("Failed to load business data.");
          return;
        }

        const data = await response.json();
        setFormData({
          name: data.business_info.name || "",
          email: data.business_info.email || "",
          description: data.business_info.description || "",
          location: data.business_info.location || "",
          products: data.business_info.products || "",
          website: data.business_info.website || "",
          categories: data.business_info.categories || "",
          phone: data.business_info.phone || "",
          logo: data.business_info.logo || "",
        });
      } catch (error) {
        console.error("Error fetching business data:", error.message);
        setError("An error occurred while fetching the data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessData();
  }, []); // Fetch data on initial load

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = document.cookie.split("; ").find(row => row.startsWith("access_token="))?.split("=")[1];
  
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Authentication Failed',
        text: 'Authentication token is missing. Please log in.',
      });
      return;
    }
  
    setLoading(true);
    setError(""); // Reset error state before making request
  
    try {
      const response = await fetch("http://127.0.0.1:5000/api/business-info", {
        method: "PUT", // Use PUT method for updating
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      // Check if response is not ok
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating business info:", errorData);
        setError("Failed to update business info: " + errorData.error); // Show a meaningful error message
        return;
      }
  
      // If everything is successful
      Swal.fire({
        icon: 'success',
        title: 'Business Updated',
        text: 'Your business information has been successfully updated!',
      });
  
      onSave(); // Callback to refresh data or notify the parent
  
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-7xl mx-auto bg-white p-4 rounded-md shadow-sm">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Edit Business Info</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="name">Business Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Business Name"
            className="w-full p-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="email">Business Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Business Email"
            className="w-full p-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="description">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="products">Products</label>
          <input
            type="text"
            name="products"
            value={formData.products}
            onChange={handleChange}
            placeholder="Products"
            className="w-full p-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="website">Website</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Website"
            className="w-full p-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="categories">Categories</label>
          <input
            type="text"
            name="categories"
            value={formData.categories}
            onChange={handleChange}
            placeholder="Categories"
            className="w-full p-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="logo">Logo URL</label>
          <input
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            placeholder="Logo URL"
            className="w-full p-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className={`bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg focus:outline-none ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default BusinessEditForm;
