import { useState } from "react";
import PropTypes from "prop-types";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);
  
    try {
      const response = await fetch("http://127.0.0.1:5000/api/business-info", {
        method: "POST",
        credentials: "include", // Ensures cookies (session) are sent with the request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorText = await response.json();
        throw new Error(errorText.error || `Error ${response.status}`);
      }
  
      const data = await response.json();
      alert("Business information added successfully!");
      setBusinessData(data);
  
    } catch (error) {
      console.error("Submission error:", error.message);
      alert(`Failed to submit form: ${error.message}`);
    }
  };
  
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl mx-auto space-y-4"
    >
      <div className="flex flex-col lg:flex-row lg:flex-wrap lg:space-y-0 space-y-4 spartan">
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
      <div className="p-2">
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full lg:w-auto lg:px-8"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

// Add prop type validation
BusinessForm.propTypes = {
  setBusinessData: PropTypes.func.isRequired,
};

export default BusinessForm;
