import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaBoxOpen, FaTag } from "react-icons/fa";

const BusinessCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [businessCards, setBusinessCards] = useState([]); // State to hold business cards data

  useEffect(() => {
    // API endpoint to fetch business cards
    const fetchBusinessCards = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/business_cards');
        if (response.ok) {
          const data = await response.json();
          setBusinessCards(data); // Set the business cards data to state
        } else {
          console.error("Failed to fetch business cards.");
        }
      } catch (error) {
        console.error("Error fetching business cards:", error);
      }
    };

    fetchBusinessCards();
  }, []);

  useEffect(() => {
    const openingHour = 9; // 9 AM
    const closingHour = 17; // 5 PM

    const checkOpenStatus = () => {
      const currentHour = new Date().getHours();
      const open = currentHour >= openingHour && currentHour < closingHour;
      setIsOpen(open);
    };

    checkOpenStatus(); // Check status on component mount
    const intervalId = setInterval(checkOpenStatus, 60000); // Check every minute

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  const handleCardClick = () => {
    setShowModal(true); // Show the modal when the card is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  // Function to truncate description to first 6 words
  const truncateDescription = (description, wordLimit) => {
    const words = description.split(" ");
    if (words.length <= wordLimit) {
      return description;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div>
      {/* Map through all the business cards */}
      {businessCards.map((data, index) => (
        <div key={index}>
          {/* Business Card */}
          <div
            className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md mx-auto mb-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
            onClick={handleCardClick} // Clicking the card triggers modal opening
          >
            {/* Image Section with "OPEN" or "CLOSED" Label */}
            <div className="relative bg-gray-100">
              {data.logo && (
                <img
                  src={data.logo}
                  alt={`${data.name} Logo`}
                  className="w-full h-48 object-cover"
                />
              )}
              
              {/* "OPEN" or "CLOSED" Badge */}
              <div
                className={`absolute top-2 right-2 px-2 py-1 rounded-full shadow-md text-xs font-semibold 
                            ${isOpen ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
              >
                {isOpen ? "OPEN" : "CLOSED"}
              </div>
            </div>
            
            {/* Divider between image and content */}
            <div className="h-1 bg-indigo-500"></div>
            
            {/* Content Section */}
            <div className="p-6">
              {/* Business Name - Centered */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">{data.name}</h3>
              
              {/* Truncated Business Description */}
              <div className="text-sm text-gray-600 mb-4 text-center">
                <p>
                  {truncateDescription(data.description, 6)} {/* Truncated to 6 words */}
                </p>
              </div>

              {/* Location */}
              <div className="text-sm text-gray-600 mb-4 flex items-center justify-center">
                <FaMapMarkerAlt className="mr-2 text-indigo-500" />
                {data.location}
              </div>
              
              {/* Products and Categories */}
              <div className="flex justify-around text-center text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <FaBoxOpen className="mr-1 text-indigo-500" />
                  <span>{data.products} products</span>
                </div>
                <div className="flex items-center">
                  <FaTag className="mr-1 text-indigo-500" />
                  <span>{data.categories}</span>
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="flex justify-around text-center text-sm text-gray-600 mb-4">
                {data.email && (
                  <div className="flex items-center">
                    <FaEnvelope className="mr-1 text-indigo-500" />
                    <span>{data.email}</span>
                  </div>
                )}
                {data.phone && (
                  <div className="flex items-center">
                    <FaPhone className="mr-1 text-indigo-500" />
                    <span>{data.phone}</span>
                  </div>
                )}
              </div>
              
              {/* Visit Website Button */}
              {data.website && (
                <div className="mt-4">
                  <a
                    href={data.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-500 transition duration-300 text-sm font-semibold"
                  >
                    Visit Website
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Modal for Full Description */}
          {showModal && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
              onClick={handleCloseModal} // Close modal when clicking outside
            >
              <div
                className="bg-white rounded-lg p-6 max-w-lg w-full"
                onClick={(e) => e.stopPropagation()} // Prevent click event from closing modal
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{data.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{data.description}</p>

                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-indigo-500" />
                    {data.location}
                  </div>
                  <div className="flex items-center">
                    <FaBoxOpen className="mr-1 text-indigo-500" />
                    <span>{data.products} products</span>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  {data.email && (
                    <div className="flex items-center">
                      <FaEnvelope className="mr-1 text-indigo-500" />
                      <span>{data.email}</span>
                    </div>
                  )}
                  {data.phone && (
                    <div className="flex items-center">
                      <FaPhone className="mr-1 text-indigo-500" />
                      <span>{data.phone}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={handleCloseModal}
                    className="text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500 transition duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BusinessCard;
