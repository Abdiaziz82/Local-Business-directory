import React from "react";

const BusinessCard = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto text-center space-y-4">
      {data.logo && (
        <img
          src={data.logo}
          alt={`${data.name} Logo`}
          className="h-20 w-20 mx-auto rounded-full mb-4 object-cover"
        />
      )}
      <h2 className="text-2xl font-bold">{data.name}</h2>
      <p className="text-gray-700">{data.description}</p>
      <p className="text-blue-600 font-semibold">{data.location}</p>
      <p className="text-gray-600">
        <strong>Products:</strong> {data.products}
      </p>
      {data.website && (
        <a
          href={data.website}
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Website
        </a>
      )}
    </div>
  );
};

export default BusinessCard;
