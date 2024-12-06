import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const TableComponent = ({ initialData = [] }) => {
  const [records, setRecords] = useState(initialData);

  // Handle delete
  const handleDelete = (id) => {
    setRecords(records.filter((record) => record.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Stored Messages</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Message</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr
                key={record.id}
                className="border-b hover:bg-gray-100 transition duration-300"
              >
                <td className="py-3 px-4">{record.name}</td>
                <td className="py-3 px-4">{record.email}</td>
                <td className="py-3 px-4">{record.message}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(record.id)}
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {records.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="py-4 px-4 text-center text-gray-500"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
