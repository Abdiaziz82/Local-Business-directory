import React from "react";

const ReviewTable = ({ reviews }) => {
  // Ensure reviews is always an array
  const reviewsData = reviews || [];

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border border-gray-200 ">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-4 py-2 border border-gray-300">Name</th>
            <th className="px-4 py-2 border border-gray-300">Review</th>
            <th className="px-4 py-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviewsData.length > 0 ? (
            reviewsData.map((review, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border border-gray-300">{review.name}</td>
                <td className="px-4 py-2 border border-gray-300">{review.text}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => console.log("Delete review", index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="px-4 py-2 border border-gray-300 text-center"
                colSpan="3"
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
