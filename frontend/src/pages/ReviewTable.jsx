import React from "react";
import { FaTrashAlt } from "react-icons/fa"; // Import the trash icon from react-icons

const ReviewTable = ({ reviews }) => {
  // Ensure reviews is always an array
  const reviewsData = reviews || [];

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
          {reviewsData.length > 0 ? (
            reviewsData.map((review, index) => (
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
