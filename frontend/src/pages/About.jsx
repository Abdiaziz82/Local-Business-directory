import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 spartan pt-20 sm:pt-24 pb-16 sm:pb-24 overflow-y-auto">
      <div className="w-full max-w-full sm:max-w-5xl lg:max-w-7xl text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-snug">
          About BizHub
        </h2>
        {/* Paragraph */}
        <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
          Your trusted business directory connecting professionals and companies worldwide. 
          We help you grow your network, visibility, and influence.
        </p>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-full mx-auto">
          {/* Our Mission */}
          <div className="bg-white p-4 sm:p-6 lg:p-8 shadow-lg rounded-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-blue-600 text-white rounded-full mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 sm:w-8 sm:h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m0 3.75h.008M21 12c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9 9-4.03 9-9z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
              Our Mission
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Empower businesses by providing visibility and fostering connections that drive success.
            </p>
          </div>

          {/* Our Vision */}
          <div className="bg-white p-4 sm:p-6 lg:p-8 shadow-lg rounded-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-green-600 text-white rounded-full mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 sm:w-8 sm:h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75L12 12m0 0l2.25 2.25M12 12l2.25-2.25M12 12l-2.25 2.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
              Our Vision
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              To be the global platform that brings together professionals and companies for meaningful connections.
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white p-4 sm:p-6 lg:p-8 shadow-lg rounded-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-yellow-600 text-white rounded-full mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 sm:w-8 sm:h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8.25v-1.5m0 7.5v-1.5m4.5-4.5H15m-6 0H8.25m8.25 3.75h1.5m-7.5 0H8.25m11.25 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
              Why Choose Us
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Trusted by thousands globally, offering reliable and user-friendly directory services that connect businesses to success.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
