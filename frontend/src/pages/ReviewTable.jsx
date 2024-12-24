import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const ReviewTable = () => {
  const [reviews, setReviews] = useState([]);
  const [userId, setUserId] = useState(null); // You need to dynamically set the userId

  useEffect(() => {
    // Fetch the user_id (can be fetched from a session or other sources)
    // For now, we'll assume the user_id is available and set it here for testing.
    const fetchedUserId = 1;  // You can replace this with a dynamic method to get the user_id
    setUserId(fetchedUserId);
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!userId) return; // Don't make the request if userId is not available.

      try {
        const response = await fetch(`http://127.0.0.1:5000/api/reviews?user_id=${userId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setReviews(data.reviews);  // Set the fetched reviews
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();  // Call the function to fetch reviews when userId is set
  }, [userId]); // Only re-fetch if userId changes

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border border-gray-200 text-sm md:text-base">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-4 py-2 border border-gray-300 text-left">Name</th>
            <th className="px-4 py-2 border border-gray-300 text-left">Email</th>
            <th className="px-4 py-2 border border-gray-300 text-left">
              Review Text
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left">Rating</th>
            <th className="px-4 py-2 border border-gray-300 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border border-gray-300">{review.name}</td>
                <td className="px-4 py-2 border border-gray-300">{review.email}</td>
                <td className="px-4 py-2 border border-gray-300">{review.text}</td>
                <td className="px-4 py-2 border border-gray-300">{review.rating}</td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  <FaTrashAlt
                    className="text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => console.log("Delete review at index:", index)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="px-4 py-2 border border-gray-300 text-center"
                colSpan="5"
              >
                No reviews available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewTable;
