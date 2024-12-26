import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";


const BusinessModal = ({ modalData, closeModal }) => {
  const [coordinates, setCoordinates] = useState(null);
  const [reviewForm, setReviewForm] = useState({ name: "", email: "", review: "", rating: 0 });
  const [messageForm, setMessageForm] = useState({ name: "", message: "" });

  const getCoordinates = async (location) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const lat = parseFloat(data[0]?.lat);
        const lon = parseFloat(data[0]?.lon);
        setCoordinates({ latitude: lat, longitude: lon });
      } else {
        console.error("Location not found");
        setCoordinates(null);
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      setCoordinates(null);
    }
  };

  useEffect(() => {
    if (modalData && modalData.location) {
      getCoordinates(modalData.location);
    }
  }, [modalData]);

  // Send the review data to the backend
 
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
  
    const businessId = modalData.id; // Replace with actual logic to get business ID dynamically
  
    const reviewPayload = {
      ...reviewForm,
      business_id: businessId, // Dynamically associate with the correct business
    };
  
    try {
      const response = await fetch("http://127.0.0.1:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewPayload),
      });
  
      if (response.ok) {
        setReviewForm({ name: "", email: "", review: "", rating: 0 });
  
        // Show success alert using SweetAlert
        await Swal.fire({
          title: "Success!",
          text: "Your review has been submitted successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      } else {
        const errorData = await response.json();
        console.error("Error submitting review:", errorData.error || "Unknown error");
  
        // Optionally, you can show an error alert
        await Swal.fire({
          title: "Error!",
          text: errorData.error || "An error occurred while submitting your review.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
  
      // Show error alert using SweetAlert
      await Swal.fire({
        title: "Error!",
        text: "An error occurred while submitting your review. Please try again later.",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };
  

  // Send the message data to the backend (similar to review)
 

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
  
    const businessId = modalData.id; // Replace with actual logic to get business ID dynamically
  
    const messagePayload = {
      ...messageForm,
      business_id: businessId, // Dynamically associate with the correct business
    };
  
    try {
      const response = await fetch("http://127.0.0.1:5000/api/user_messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messagePayload),
      });
  
      if (response.ok) {
        setMessageForm({ name: "", message: "" }); // Clear the form after successful submission
  
        // Show success alert using SweetAlert
        await Swal.fire({
          title: "Success!",
          text: "Your message has been sent successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      } else {
        const errorData = await response.json();
        console.error("Error sending message:", errorData.error || "Unknown error");
  
        // Show error alert using SweetAlert
        await Swal.fire({
          title: "Error!",
          text: errorData.error || "An error occurred while sending your message.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
  
      // Show error alert using SweetAlert
      await Swal.fire({
        title: "Error!",
        text: "An error occurred while sending your message. Please try again later.",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };
  
  
  if (!modalData) return null;

  const mapUrl = coordinates
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
        coordinates.longitude - 0.05
      )}%2C${encodeURIComponent(coordinates.latitude - 0.05)}%2C${encodeURIComponent(
        coordinates.longitude + 0.05
      )}%2C${encodeURIComponent(coordinates.latitude + 0.05)}&layer=mapnik`
    : `https://www.openstreetmap.org/export/embed.html?bbox=-180%2C-90%2C180%2C90&layer=mapnik`;

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-start z-50 overflow-y-auto"
      onClick={closeModal}
    >
      <div
        className="relative bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-5xl space-y-6 mt-10 mb-10 overflow-y-auto max-h-screen"
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
          <div>
            <h3 className="text-lg font-bold mb-4">Description</h3>
            <p className="text-gray-700 text-base">{modalData.description}</p>
          </div>

          {/* Location Section */}
          <div className="mt-8">
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

        {/* Review Form */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">Leave a Review</h3>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-3 rounded-md"
              value={reviewForm.name}
              onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border p-3 rounded-md"
              value={reviewForm.email}
              onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
            />
            <textarea
              placeholder="Your Review"
              className="w-full border p-3 rounded-md"
              rows="4"
              value={reviewForm.review}
              onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
            ></textarea>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer text-2xl ${
                    reviewForm.rating >= star ? "text-yellow-500" : "text-gray-400"
                  }`}
                  onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                >
                  ★
                </span>
              ))}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Message Form */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">Send a Message</h3>
          <form onSubmit={handleMessageSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-3 rounded-md"
              value={messageForm.name}
              onChange={(e) => setMessageForm({ ...messageForm, name: e.target.value })}
            />
            <textarea
              placeholder="Your Message"
              className="w-full border p-3 rounded-md"
              rows="4"
              value={messageForm.message}
              onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
            ></textarea>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Send Message
            </button>
          </form>
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
