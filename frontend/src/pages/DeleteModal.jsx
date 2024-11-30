// import React from "react";

// const DeleteModal = ({ isOpen, onConfirm, onCancel, businessName }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-80">
//         <h2 className="text-xl font-bold text-red-500 mb-4">Confirm Deletion</h2>
//         <p className="text-lg mb-4">Are you sure you want to delete the business: "{businessName}"?</p>
//         <div className="flex justify-end space-x-4">
//           <button
//             className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
//             onClick={onCancel}
//           >
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
//             onClick={onConfirm}
//           >
//             Confirm
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteModal;
