import { useState } from "react";
import PropTypes from "prop-types";

// Utility function to retrieve a specific cookie value
const getCookie = (cookieName) => {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith(`${cookieName}=`));
  return cookie ? cookie.split("=")[1] : null;
};

const BusinessForm = ({ setBusinessData }) => {
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    description: "",
    location: "",
    products: "",
    website: "",
    categories: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false); // Loading state for user feedback
  const [error, setError] = useState(null); // Error state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = getCookie("access_token"); // Retrieve the token from cookies

      if (!token) {
        setLoading(false);
        alert("Authentication token is missing. Please log in.");
        return;
      }

      const response = await fetch("http://127.0.0.1:5000/api/business-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 401) {
        // Attempt to refresh the token
        const refreshResponse = await fetch("http://127.0.0.1:5000/refresh", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (refreshResponse.ok) {
          const { access_token } = await refreshResponse.json();
          document.cookie = `access_token=${access_token}; path=/`; // Update the cookie

          // Retry the original request
          const retryResponse = await fetch(
            "http://127.0.0.1:5000/api/business-info",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
              },
              body: JSON.stringify(formData),
            }
          );

          if (!retryResponse.ok) throw new Error("Retry failed");
          alert("Business information added successfully!");
        } else {
          throw new Error("Token refresh failed");
        }
      } else if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Server error");
      }

      const data = await response.json();
      alert("Business information added successfully!");
      setBusinessData(data);
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl mx-auto space-y-4"
    >
      <div className="flex flex-col lg:flex-row lg:flex-wrap lg:space-y-0 space-y-4 spartan">
        {/* Business Name */}
        <div className="lg:w-1/2 p-2">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Business Name"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Logo URL */}
        <div className="lg:w-1/2 p-2">
          <input
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            placeholder="Logo URL"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Description */}
        <div className="lg:w-1/2 p-2">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>

        {/* Location */}
        <div className="lg:w-1/2 p-2">
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Products */}
        <div className="lg:w-1/2 p-2">
          <input
            type="text"
            name="products"
            value={formData.products}
            onChange={handleChange}
            placeholder="Products"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Website */}
        <div className="lg:w-1/2 p-2">
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Website URL"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Categories */}
        <div className="lg:w-1/2 p-2">
          <select
            name="categories"
            value={formData.categories}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white"
            required
          >
            <option value="">Select Business Category</option>
            <option value="Retail">Retail</option>
            <option value="Services">Services</option>
            <option value="Technology">Technology</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Food & Beverage">Food & Beverage</option>
          </select>
        </div>

        {/* Email */}
        <div className="lg:w-1/2 p-2">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Phone */}
        <div className="lg:w-1/2 p-2">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="p-2">
        <button
          type="submit"
          className={`bg-indigo-600 text-white p-2 rounded w-full lg:w-auto lg:px-8 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-2 text-red-500">
          <p>Error: {error}</p>
        </div>
      )}
    </form>
  );
};

// PropTypes validation
BusinessForm.propTypes = {
  setBusinessData: PropTypes.func.isRequired,
};

export default BusinessForm;
