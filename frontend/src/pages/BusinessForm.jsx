import React, { useState } from "react";
import Select from "react-select";

const categoryOptions = [
  { value: "food", label: "Food" },
  { value: "clothing", label: "Clothing" },
  { value: "electronics", label: "Electronics" },
  { value: "services", label: "Services" },
  // Add more options as needed
];

const BusinessForm = ({ setBusinessData }) => {
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    products: "",
    website: "",
    email: "",
    phoneNumber: "",
    category: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (selectedOption) => {
    setFormData({ ...formData, category: selectedOption });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBusinessData(formData);
    setFormData({
      name: "",
      logo: "",
      products: "",
      website: "",
      email: "",
      phoneNumber: "",
      category: null,
    });
  };

  return (
    <form className="w-full max-w-full bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Business Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Business Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border-gray-300 border rounded-lg p-3"
            placeholder="Enter your business name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Logo URL</label>
          <input
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            className="w-full border-gray-300 border rounded-lg p-3"
            placeholder="Enter logo URL"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Products</label>
          <textarea
            name="products"
            value={formData.products}
            onChange={handleChange}
            className="w-full border-gray-300 border rounded-lg p-3"
            placeholder="Describe your products"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Website</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full border-gray-300 border rounded-lg p-3"
            placeholder="Enter your website URL"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-gray-300 border rounded-lg p-3"
            placeholder="Enter your email address"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full border-gray-300 border rounded-lg p-3"
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Category</label>
          <Select
            options={categoryOptions}
            className="basic-single"
            classNamePrefix="select"
            onChange={handleCategoryChange}
            placeholder="Select a category"
            styles={{
              control: (provided) => ({
                ...provided,
                borderColor: 'gray',
                boxShadow: 'none',
                '&:hover': {
                  borderColor: 'blue',
                },
              }),
              menu: (provided) => ({
                ...provided,
                zIndex: 9999,
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? 'lightgray' : 'white',
                color: 'black',
              }),
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition mt-6"
      >
        Submit
      </button>
    </form>
  );
};

export default BusinessForm;
