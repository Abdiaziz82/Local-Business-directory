import React, { useEffect, useState } from "react";

const BusinessModal = ({ modalData, closeModal }) => {
  const [coordinates, setCoordinates] = useState(null);

  // Function to fetch latitude and longitude from the location
  const getCoordinates = async (location) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`
      );
      const data = await response.json();

      // Check if a location was found
      if (data && data.length > 0) {
        const lat = parseFloat(data[0]?.lat);
        const lon = parseFloat(data[0]?.lon);
        setCoordinates({ latitude: lat, longitude: lon });
      } else {
        console.error("Location not found");
        setCoordinates(null); // If no coordinates found, reset
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      setCoordinates(null); // Reset coordinates on error
    }
  };

  useEffect(() => {
    if (modalData && modalData.location) {
      getCoordinates(modalData.location); // Fetch coordinates when location changes
    }
  }, [modalData]);

  if (!modalData) return null; // Return null if modalData is not available

  // If coordinates are not available, fallback to a default map view
  const mapUrl = coordinates
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
        coordinates.longitude - 0.05
      )}%2C${encodeURIComponent(coordinates.latitude - 0.05)}%2C${encodeURIComponent(
        coordinates.longitude + 0.05
      )}%2C${encodeURIComponent(coordinates.latitude + 0.05)}&layer=mapnik`
    : `https://www.openstreetmap.org/export/embed.html?bbox=-180%2C-90%2C180%2C90&layer=mapnik`; // Full world view as fallback

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-start z-50 overflow-y-auto"
      onClick={closeModal}
    >
      <div
        className="relative bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-4xl space-y-6 mt-10 mb-10 overflow-y-auto max-h-screen"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-center w-full">
            {modalData.name}
          </h3>
          <button
            className="absolute top-0 right-0 text-gray-500 hover:text-gray-800 text-2xl p-2 focus:outline-none"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>

        {/* Business Details */}
        <div>
          {/* Description Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Description</h3>
            <p className="text-gray-700 text-base">{modalData.description}</p>
          </div>

          {/* Contact Section */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Contact Information</h3>
            <p className="text-gray-700 text-base">Email: {modalData.email}</p>
            <p className="text-gray-700 text-base">Phone: {modalData.phone}</p>
            {modalData.website && (
              <p className="text-blue-500 text-base">
                <a href={modalData.website} target="_blank" rel="noopener noreferrer">
                  Visit Website
                </a>
              </p>
            )}
          </div>

          {/* Location Section */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Location: {modalData.location}</h3>
            {/* Only show map if coordinates are available */}
            <iframe
              title="Business Location Map"
              width="100%"
              height="300"
              src={mapUrl}
              style={{ border: "none" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end mt-8">
          <button
            className="bg-red-500 text-white py-3 px-6 rounded-md hover:bg-red-600"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessModal;
