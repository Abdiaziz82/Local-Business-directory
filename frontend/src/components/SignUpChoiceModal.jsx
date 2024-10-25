import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpChoiceModal = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-xl font-bold mb-4">Sign Up As</h2>

        {/* Button to choose Business Owner */}
        <button
          onClick={() => {
            navigate('/signup/business-owner');
            onClose(); // Close the modal
          }}
          className="block w-full px-4 py-2 mb-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
        >
          Business Owner
        </button>

        {/* Button to choose Customer */}
        <button
          onClick={() => {
            navigate('/signup/customer');
            onClose(); // Close the modal
          }}
          className="block w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
        >
          Customer
        </button>

        {/* Close Modal */}
        <button
          onClick={onClose}
          className="mt-4 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SignUpChoiceModal;
