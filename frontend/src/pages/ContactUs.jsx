import React, { useState } from "react";
import Swal from "sweetalert2";

function ContactUs() {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    user_company: "",
    user_message: "",
  });

  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.user_name || !formData.user_email || !formData.user_message) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all required fields.",
      });
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Your message has been sent successfully.",
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            title: 'swal-title',
            htmlContainer: 'swal-text',
          },
        });
        setFormData({
          user_name: "",
          user_email: "",
          user_phone: "",
          user_company: "",
          user_message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Send!",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <section className="pt-24 sm:pt-32 lg:pt-20 py-10 bg-gray-100 sm:py-16 lg:py-24 spartan">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="spartan text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl lg:mt-8">
              Contact us
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-500">
              Got questions? Business owners, showcase your services. Customers,
              discover trusted businesses near you. Reach out—we're here to
              help!
            </p>
          </div>
          <div className="mt-6 overflow-hidden bg-white rounded-xl">
            <div className="px-6 py-12 sm:p-12">
              <h3 className="text-2xl sm:text-3xl font-semibold text-center text-gray-900">
                Send us a message
              </h3>
              <form onSubmit={handleSubmit} className="mt-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                  <div>
                    <label className="text-base font-medium text-gray-900">
                      Your name
                    </label>
                    <div className="mt-2.5 relative">
                      <input
                        type="text"
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-base font-medium text-gray-900">
                      Email address
                    </label>
                    <div className="mt-2.5 relative">
                      <input
                        type="email"
                        name="user_email"
                        value={formData.user_email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-base font-medium text-gray-900">
                      Phone number
                    </label>
                    <div className="mt-2.5 relative">
                      <input
                        type="tel"
                        name="user_phone"
                        value={formData.user_phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-base font-medium text-gray-900">
                      Company name(optional for customers)
                    </label>
                    <div className="mt-2.5 relative">
                      <input
                        type="text"
                        name="user_company"
                        value={formData.user_company}
                        onChange={handleChange}
                        placeholder="Enter your company name"
                        className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-indigo-600 rounded-md focus:outline-none focus:border-indigo-600 caret-indigo-600"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-base font-medium text-gray-900">
                      Message
                    </label>
                    <div className="mt-2.5 relative">
                      <textarea
                        name="user_message"
                        value={formData.user_message}
                        onChange={handleChange}
                        placeholder="Enter your message"
                        className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:border-blue-600 caret-blue-600"
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-full px-4 py-4 mt-2 text-base font-semibold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <svg
                            className="w-6 h-6 mr-2 animate-spin text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        "Send"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
