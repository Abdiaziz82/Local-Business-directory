import React, { useState } from 'react';

// Custom Searchable Dropdown Component
const SearchableDropdown = ({ label, options, selectedValue, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false); // Controls dropdown visibility
  const [searchTerm, setSearchTerm] = useState(''); // Stores search query

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <label className="block text-gray-700 mb-2 font-medium">{label}</label>
      {/* Display selected value and toggle dropdown */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 cursor-pointer"
      >
        {selectedValue || `Select ${label.toLowerCase()}`}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute w-full bg-white shadow-lg rounded-md mt-1 z-10">
          {/* Search Input */}
          <input
            type="text"
            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none"
            placeholder={`Search ${label.toLowerCase()}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Options */}
          <ul className="max-h-40 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option}
                  className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
                  onClick={() => {
                    onSelect(option);
                    setIsOpen(false); // Close dropdown on selection
                  }}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

// Main Search Component
const SearchComponent = () => {
  const [category, setCategory] = useState('');
  const [town, setTown] = useState('');
  const [location, setLocation] = useState('');

  // Dummy options for dropdowns (Replace with actual data in production)
  const categories = ['Restaurant', 'Retail', 'Services', 'Healthcare', 'Education'];
  const towns = ['Nairobi', 'Garissa', 'Mombasa', 'Eldoret', 'Kisumu'];
  const locations = ['Downtown', 'Suburbs', 'Industrial Area', 'Market', 'Main Street'];

  return (
    <div className="bg-gray-100 flex justify-center items-center" style={{ height: '70vh' }}>
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Find Local Businesses</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Custom Searchable Dropdowns */}
          <SearchableDropdown
            label="Business Category"
            options={categories}
            selectedValue={category}
            onSelect={setCategory}
          />

          <SearchableDropdown
            label="Town/County"
            options={towns}
            selectedValue={town}
            onSelect={setTown}
          />

          <SearchableDropdown
            label="Location"
            options={locations}
            selectedValue={location}
            onSelect={setLocation}
          />

          {/* Search Button */}
          <div className="flex items-end">
            <button
              className="w-full px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500"
              onClick={() => alert(`Searching for ${category}, ${town}, ${location}`)}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
