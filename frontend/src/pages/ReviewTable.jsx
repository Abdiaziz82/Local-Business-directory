import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const ReviewTable = () => {
  const [reviews, setReviews] = useState([]);
  const [userId, setUserId] = useState(null); // State for storing userId
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch the current user ID dynamically
    const fetchUserId = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/current_user', {
          method: 'GET',
          credentials: 'include', // Send cookies with request
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.json();
        if (response.ok) {
          setUserId(data.user_id); // Set the userId state
        } else {
          setError("User not authenticated");
        }
      } catch (error) {
        setError("Error fetching userId");
      }
    };
  
    if (!userId) {
      fetchUserId();
    } else {
      // Fetch reviews after getting the userId
      const fetchReviews = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/api/reviews/${userId}`, {
            method: 'GET',
            credentials: 'include', // Send cookies with request
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          const data = await response.json();
          if (response.ok) {
            setReviews(data);  // Update the reviews state with the fetched data
          } else {
            setError("Error fetching reviews");
          }
        } catch (error) {
          setError("Error fetching reviews");
        }
      };
  
      fetchReviews();
    }
  }, [userId]);
  

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
            reviews.map((review, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border border-gray-300">{review.name}</td>
                <td className="px-4 py-2 border border-gray-300">{review.email}</td>
                <td className="px-4 py-2 border border-gray-300">{review.text}</td>
                <td className="px-4 py-2 border border-gray-300">{review.rating}</td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  <FaTrashAlt className="text-red-500 cursor-pointer hover:text-red-700" onClick={() => console.log("Delete review at index:", index)} />
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
