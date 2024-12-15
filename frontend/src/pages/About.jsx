import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 spartan">
      <div className="max-w-7xl text-center">
        <h2 className="text-5xl font-extrabold text-gray-900 sm:text-6xl tracking-tight leading-tight">
          About BizHub
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted business directory connecting professionals and companies worldwide.
          We help you grow your network, visibility, and influence.
        </p>

        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Our Mission */}
          <div className="bg-white p-8 shadow-2xl rounded-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m0 3.75h.008M21 12c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9 9-4.03 9-9z"
                />
              </svg>
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-gray-900">
              Our Mission
            </h3>
            <p className="mt-2 text-gray-600">
              Empower businesses by providing visibility and fostering connections that drive success.
            </p>
          </div>

          {/* Our Vision */}
          <div className="bg-white p-8 shadow-2xl rounded-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
            <div className="flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75L12 12m0 0l2.25 2.25M12 12l2.25-2.25M12 12l-2.25 2.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-gray-900">
              Our Vision
            </h3>
            <p className="mt-2 text-gray-600">
              To be the global platform that brings together professionals and companies for meaningful connections.
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white p-8 shadow-2xl rounded-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
            <div className="flex items-center justify-center w-16 h-16 bg-yellow-600 text-white rounded-full mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8.25v-1.5m0 7.5v-1.5m4.5-4.5H15m-6 0H8.25m8.25 3.75h1.5m-7.5 0H8.25m11.25 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-gray-900">
              Why Choose Us
            </h3>
            <p className="mt-2 text-gray-600">
              Trusted by thousands globally, offering reliable and user-friendly directory services that connect businesses to success.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
