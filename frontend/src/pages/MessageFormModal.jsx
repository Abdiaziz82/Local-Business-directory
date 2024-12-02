import React from "react";

const MessageFormModal = ({ show, business, onClose }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <h3 className="text-xl font-semibold mb-4">Send a Message to {business?.name}</h3>
        <form className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="text-gray-700 font-semibold mb-2 block">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="text-gray-700 font-semibold mb-2 block">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="text-gray-700 font-semibold mb-2 block">
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
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

        {/* Close Button */}
        <button
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MessageFormModal;
