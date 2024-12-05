import React, { useState } from "react";

// Utility function to retrieve JWT from cookies
const getJwtFromCookies = () => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("access_token="));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
};

const BusinessModal = ({ modalData, closeModal }) => {
  const [messageForm, setMessageForm] = useState({ name: "", email: "", message: "" });
  const [reviewForm, setReviewForm] = useState({ name: "", review: "" });
  const [feedback, setFeedback] = useState(null); // For success/error messages

  if (!modalData) return null;

  // Helper function to handle API requests
  const sendRequest = async () => {
    const payload = {
      business_id: modalData?.id, // Ensure correct key matches the backend
      name,
      email,
      message,
    };
  
    try {
      const response = await fetch("http://127.0.0.1:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        console.log("Message sent successfully!");
        closeModal();
      } else {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  

  // Handle message form submission
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    const payload = { business_id: modalData.id, ...messageForm };
    console.log("Message Payload:", payload); // Debugging

    const success = await sendRequest("http://127.0.0.1:5000/api/messages", payload);
    if (success) setMessageForm({ name: "", email: "", message: "" }); // Reset form
  };

  // Handle review form submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const payload = { business_id: modalData.id, ...reviewForm };
    console.log("Review Payload:", payload); // Debugging

    const success = await sendRequest("http://127.0.0.1:5000/api/reviews", payload);
    if (success) setReviewForm({ name: "", review: "" }); // Reset form
  };

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-start z-50 overflow-y-auto"
      onClick={closeModal}
    >
      <div
        className="relative bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-7xl space-y-6 mt-10 mb-10 overflow-y-auto max-h-screen"
        onClick={(e) => e.stopPropagation()}
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

        {/* Feedback Section */}
        {feedback && (
          <div
            className={`p-4 rounded-md ${
              feedback.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {feedback.message}
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Description</h3>
            <p className="text-gray-700 text-base">{modalData.description}</p>

            <h3 className="text-lg font-bold mt-8 mb-4">Location</h3>
            <div className="h-64 w-full bg-gray-200 flex justify-center items-center">
              <span className="text-gray-500 text-base">Map Placeholder</span>
            </div>
          </div>

          <div>
            <form className="space-y-6" onSubmit={handleMessageSubmit}>
              <label>
                Name
                <input
                  type="text"
                  className="w-full p-4 border border-gray-300 rounded-md"
                  required
                  value={messageForm.name}
                  onChange={(e) => setMessageForm({ ...messageForm, name: e.target.value })}
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  className="w-full p-4 border border-gray-300 rounded-md"
                  required
                  value={messageForm.email}
                  onChange={(e) => setMessageForm({ ...messageForm, email: e.target.value })}
                />
              </label>
              <label>
                Message
                <textarea
                  rows="6"
                  className="w-full p-4 border border-gray-300 rounded-md"
                  required
                  value={messageForm.message}
                  onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                />
              </label>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <h3 className="text-lg font-bold mt-8 mb-4">Submit a Review</h3>
        <form className="space-y-6" onSubmit={handleReviewSubmit}>
          <label>
            Your Name
            <input
              type="text"
              className="w-full p-4 border border-gray-300 rounded-md"
              required
              value={reviewForm.name}
              onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
            />
          </label>
          <label>
            Your Review
            <textarea
              rows="6"
              className="w-full p-4 border border-gray-300 rounded-md"
              required
              value={reviewForm.review}
              onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
            />
          </label>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
          >
            Submit Review
          </button>
        </form>

        <button
          className="bg-red-500 text-white py-3 px-6 rounded-md hover:bg-red-600 mt-8"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BusinessModal;
