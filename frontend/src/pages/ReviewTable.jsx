import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

// Function to get the JWT token from cookies
const getJwtFromCookies = () => {
  const cookies = document.cookie.split("; ");
  const jwtCookie = cookies.find((cookie) => cookie.startsWith("access_token="));
  return jwtCookie ? jwtCookie.split("=")[1] : null;
};

const ReviewTable = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = getJwtFromCookies(); // Get JWT token from cookies

        if (!token) {
          setError("JWT token not found in cookies. Redirecting to login.");
          return;
        }

        // Step 1: Get the current user's ID
        const userResponse = await fetch("http://127.0.0.1:5000/api/current_user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = await userResponse.json();
        if (!userResponse.ok) {
          setError("Failed to fetch user information. Please log in again.");
          return;
        }

        const userId = userData.user_id;

        // Step 2: Fetch reviews for the current user
        const reviewsResponse = await fetch(`http://127.0.0.1:5000/api/reviews/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const reviewsData = await reviewsResponse.json();
        if (reviewsResponse.ok) {
          setReviews(reviewsData);
        } else {
          setError(reviewsData.message || "Error fetching reviews.");
        }
      } catch (error) {
        setError("An error occurred while fetching reviews.");
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this review? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmation.isConfirmed) {
      try {
        const token = getJwtFromCookies();

        if (!token) {
          Swal.fire("Error", "JWT token not found in cookies. Please log in again.", "error");
          return;
        }

        // Delete review from the backend
        const response = await fetch(`http://127.0.0.1:5000/api/reviews/${reviewId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          // Update the state to remove the deleted review
          setReviews(reviews.filter((review) => review.id !== reviewId));

          // Display success message
          Swal.fire("Deleted!", "You have deleted the review successfully.", "success");
        } else {
          const responseData = await response.json();
          Swal.fire("Error", responseData.message || "Failed to delete the review.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "An unexpected error occurred.", "error");
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      {error && <p className="text-red-500">{error}</p>}
      <table className="table-auto w-full border border-gray-200 text-sm md:text-base">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-4 py-2 border border-gray-300 text-left">Name</th>
            <th className="px-4 py-2 border border-gray-300 text-left">Email</th>
            <th className="px-4 py-2 border border-gray-300 text-left">Review Text</th>
            <th className="px-4 py-2 border border-gray-300 text-left">Rating</th>
            <th className="px-4 py-2 border border-gray-300 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <tr key={review.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border border-gray-300">{review.name}</td>
                <td className="px-4 py-2 border border-gray-300">{review.email}</td>
                <td className="px-4 py-2 border border-gray-300">{review.text}</td>
                <td className="px-4 py-2 border border-gray-300">{review.rating}</td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  <FaTrashAlt
                    className="text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => handleDelete(review.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-2 border border-gray-300 text-center" colSpan="5">
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
