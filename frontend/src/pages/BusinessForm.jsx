import React, { useState } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setBusinessData(formData); // Pass entire formData object to the dashboard
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl space-y-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Business Name"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="logo"
        value={formData.logo}
        onChange={handleChange}
        placeholder="Logo URL"
        className="w-full p-2 border rounded"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 border rounded"
      ></textarea>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="products"
        value={formData.products}
        onChange={handleChange}
        placeholder="Products"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        placeholder="Website URL"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="categories"
        value={formData.categories}
        onChange={handleChange}
        placeholder="Categories"
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email Address"
        className="w-full p-2 border rounded"
      />
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Submit
      </button>
    </form>
  );
};

export default BusinessForm;
