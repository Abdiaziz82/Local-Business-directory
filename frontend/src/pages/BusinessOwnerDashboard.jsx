import React, { useState } from 'react';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const BusinessOwnerDashboard = () => {
  const [businessData, setBusinessData] = useState({
    name: '',
    description: '',
    phone: '',
    whatsapp: '',
    email: '',
    logo: null,
    gallery: [],
    website: '',
    workingHours: '',
    about: '',
    yearEstablished: '',
    category: '',
    town: '',
    locationAddress: '', // General location input
  });
  const [businessCard, setBusinessCard] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusinessData({ ...businessData, [name]: value });
  };

  // Handle file input for logo and gallery images
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'logo') {
      setBusinessData({ ...businessData, logo: URL.createObjectURL(files[0]) });
    } else if (name === 'gallery') {
      setBusinessData({ ...businessData, gallery: Array.from(files).map(file => URL.createObjectURL(file)) });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setBusinessCard(businessData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Business Owner Dashboard</h1>

      {/* Business details form */}
      <form onSubmit={handleSubmit} className="w-full max-w-full bg-white p-8 shadow-lg rounded-lg space-y-6">
        <h2 className="text-2xl font-semibold text-gray-700">Create Your Business Listing</h2>
        
        <div className="grid grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            value={businessData.name}
            onChange={handleChange}
            placeholder="Business Name"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            name="description"
            value={businessData.description}
            onChange={handleChange}
            placeholder="Business Description"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="tel"
            name="phone"
            value={businessData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="tel"
            name="whatsapp"
            value={businessData.whatsapp}
            onChange={handleChange}
            placeholder="WhatsApp Number"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            name="email"
            value={businessData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="file"
            name="logo"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="file"
            name="gallery"
            onChange={handleFileChange}
            accept="image/*"
            multiple
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="url"
            name="website"
            value={businessData.website}
            onChange={handleChange}
            placeholder="Website URL"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            name="workingHours"
            value={businessData.workingHours}
            onChange={handleChange}
            placeholder="Working Hours"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            name="about"
            value={businessData.about}
            onChange={handleChange}
            placeholder="About Your Business"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          ></textarea>
          <input
            type="text"
            name="yearEstablished"
            value={businessData.yearEstablished}
            onChange={handleChange}
            placeholder="Year Established"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            name="category"
            value={businessData.category}
            onChange={handleChange}
            placeholder="Business Category"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            name="town"
            value={businessData.town}
            onChange={handleChange}
            placeholder="Town/City"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />

          {/* General location input */}
          <input
            type="text"
            name="locationAddress"
            value={businessData.locationAddress}
            onChange={handleChange}
            placeholder="City, Address, or Location"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-6 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:ring-4 focus:ring-indigo-300"
        >
          Submit
        </button>
      </form>

      {/* Business Card */}
      {businessCard && (
        <div className="mt-12 max-w-full bg-white p-8 shadow-lg rounded-lg w-full text-gray-800">
          <h2 className="text-3xl font-bold mb-4">{businessCard.name}</h2>
          <p><strong>Description:</strong> {businessCard.description}</p>
          <p><strong>Phone:</strong> {businessCard.phone}</p>
          <p><strong>WhatsApp:</strong> {businessCard.whatsapp}</p>
          <p><strong>Email:</strong> {businessCard.email}</p>
          {businessCard.logo && <img src={businessCard.logo} alt="Business Logo" className="my-4 max-w-full" />}
          {businessCard.gallery && businessCard.gallery.length > 0 && (
            <div className="my-4">
              <h3 className="font-semibold">Gallery:</h3>
              <div className="grid grid-cols-3 gap-4">
                {businessCard.gallery.map((image, index) => (
                  <img key={index} src={image} alt={`Gallery image ${index + 1}`} className="w-full h-auto rounded-lg" />
                ))}
              </div>
            </div>
          )}
          <p><strong>Website:</strong> <a href={businessCard.website} target="_blank" rel="noopener noreferrer">{businessCard.website}</a></p>
          <p><strong>Working Hours:</strong> {businessCard.workingHours}</p>
          <p><strong>About:</strong> {businessCard.about}</p>
          <p><strong>Year Established:</strong> {businessCard.yearEstablished}</p>
          <p><strong>Category:</strong> {businessCard.category}</p>
          <p><strong>Town/City:</strong> {businessCard.town}</p>

          {/* Embedded OpenStreetMap iframe */}
          {businessCard.locationAddress ? (
            <div className="mt-6">
              <iframe
                width="100%"
                height="400"
                loading="lazy"
                title="map"
                style={mapContainerStyle}
                src={`https://www.openstreetmap.org/export/embed.html?search=${encodeURIComponent(
                  businessCard.locationAddress
                )}&layers=mapnik`}
              ></iframe>
              <a
                href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(businessCard.locationAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Larger Map
              </a>
            </div>
          ) : (
            <p>No location provided</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BusinessOwnerDashboard;
