import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

// Function to get the JWT token from cookies
const getJwtFromCookies = () => {
  const cookies = document.cookie.split("; ");
  const jwtCookie = cookies.find((cookie) => cookie.startsWith("access_token="));
  return jwtCookie ? jwtCookie.split("=")[1] : null;
};

const MessageTable = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = getJwtFromCookies();

        if (!token) {
          setError("JWT token not found in cookies. Redirecting to login.");
          return;
        }

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

        const messagesResponse = await fetch(`http://127.0.0.1:5000/api/user_messages/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const messagesData = await messagesResponse.json();
        if (messagesResponse.ok) {
          setMessages(messagesData);
        } else {
          setError(messagesData.message || "Error fetching messages.");
        }
      } catch (error) {
        setError("An error occurred while fetching messages.");
      }
    };

    fetchMessages();
  }, []);

  const deleteMessage = async (messageId) => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this message? This action cannot be undone.",
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

        const response = await fetch(`http://127.0.0.1:5000/api/delete_user_message/${messageId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          // Remove the deleted message from the state
          setMessages(messages.filter((message) => message.id !== messageId));

          // Show success message
          Swal.fire("Deleted!", "You have deleted the message successfully.", "success");
        } else {
          const responseData = await response.json();
          Swal.fire("Error", responseData.message || "Failed to delete the message.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "An unexpected error occurred.", "error");
      }
    }
  };

  return (
    <div className="overflow-x-auto w-full mx-auto my-6">
      {error && <p className="text-red-500 text-center my-4">{error}</p>}
      <table className="table-auto w-full border-collapse text-sm md:text-base border border-gray-300">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-6 py-4 border-r-2 border-gray-300 text-left">Name</th>
            <th className="px-6 py-4 border-r-2 border-gray-300 text-left">Message</th>
            <th className="px-6 py-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {messages.length > 0 ? (
            messages.map((message) => (
              <tr key={message.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-r border-gray-300">{message.name}</td>
                <td className="px-6 py-4 border-r border-gray-300">{message.message_text}</td>
                <td className="px-6 py-4 text-center">
                  <FaTrashAlt
                    className="text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => deleteMessage(message.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-6 py-4 text-center" colSpan="3">
                No messages available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MessageTable;
