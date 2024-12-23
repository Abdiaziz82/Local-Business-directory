import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const ReviewTable = () => {
  const [reviewsByUser, setReviewsByUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/reviews");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviewsByUser(data.reviews || {});
      } catch (err) {
        console.error("Error fetching reviews:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;

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
          {Object.keys(reviewsByUser).length > 0 ? (
            Object.entries(reviewsByUser).map(([userId, reviews]) => (
              <React.Fragment key={userId}>
                <tr>
                  <td colSpan="5" className="bg-gray-200 px-4 py-2">
                    <strong>Reviews for Business Owner {userId}</strong>
                  </td>
                </tr>
                {reviews.map((review, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border border-gray-300">
                      {review.name}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {review.email}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {review.text}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {review.rating}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                      <FaTrashAlt
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        onClick={() => console.log("Delete review at index:", index)}
                      />
                    </td>
                  </tr>
                ))}
              </React.Fragment>
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
