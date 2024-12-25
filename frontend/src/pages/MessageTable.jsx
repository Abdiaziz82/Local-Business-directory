import React, { useEffect, useState } from "react";

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

        // Step 2: Fetch messages for the current user
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

  return (
    <div className="overflow-x-auto">
      {error && <p className="text-red-500">{error}</p>}
      <table className="table-auto w-full border border-gray-200 text-sm md:text-base">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-4 py-2 border border-gray-300 text-left">Name</th>
            <th className="px-4 py-2 border border-gray-300 text-left">Message</th>
          </tr>
        </thead>
        <tbody>
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border border-gray-300">{message.name}</td>
                <td className="px-4 py-2 border border-gray-300">{message.message_text}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-2 border border-gray-300 text-center" colSpan="2">
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
