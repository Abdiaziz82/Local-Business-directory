import React from "react";

const BusinessModal = ({ modalData, closeModal }) => {
  if (!modalData) return null; // Prevent rendering if no modal data

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-start z-50 overflow-y-auto"
      onClick={closeModal}
    >
      <div
        className="relative bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-7xl space-y-6 mt-10 mb-10 overflow-y-auto max-h-screen"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Header Section */}
        <div className="flex justify-between items-center border-b pb-4 relative">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-center w-full">
            Send a Message to {modalData.name}
          </h3>
          <button
            className="absolute top-0 right-0 text-gray-500 hover:text-gray-800 text-2xl p-2 focus:outline-none"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            {/* Description Section */}
            <div>
              <h3 className="text-lg font-bold mb-4">Description</h3>
              <p className="text-gray-700 text-base">{modalData.description}</p>
            </div>

            {/* Location Section */}
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4">Location</h3>
              <div className="h-64 w-full bg-gray-200 flex justify-center items-center">
                <span className="text-gray-500 text-base">Map Placeholder</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Contact Form */}
            <form className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="text-gray-700 font-semibold mb-2 block text-base"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-4 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="text-gray-700 font-semibold mb-2 block text-base"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-4 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="text-gray-700 font-semibold mb-2 block text-base"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="6"
                  className="w-full p-4 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">Submit a Review</h3>
          {/* Review Submission Form */}
          <form className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="reviewerName"
                className="block text-base font-semibold text-gray-700"
              >
                Your Name
              </label>
              <input
                type="text"
                id="reviewerName"
                className="w-full p-4 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Review Field */}
            <div>
              <label
                htmlFor="reviewText"
                className="block text-base font-semibold text-gray-700"
              >
                Your Review
              </label>
              <textarea
                id="reviewText"
                rows="6"
                className="w-full p-4 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                placeholder="Write your review"
                required
              ></textarea>
            </div>

            {/* Submit Review Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-700 transition duration-300"
              >
                Submit Review
              </button>
            </div>
          </form>

          {/* Display Submitted Reviews */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Reviews</h3>
            <div className="space-y-4">
              {/* Example Review */}
              <div className="p-4 border border-gray-300 rounded-lg">
                <h4 className="text-base font-bold">ahmed abdi</h4>
                <p className="text-gray-700 text-sm">Great service and support!</p>
              </div>
              <div className="p-4 border border-gray-300 rounded-lg">
                <h4 className="text-base font-bold">Abdiaziz</h4>
                <p className="text-gray-700 text-sm">Highly recommended!</p>
              </div>
            </div>
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
