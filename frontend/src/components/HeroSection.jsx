import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden spartan">
      <img
        src="https://images.unsplash.com/photo-1728768247049-347a4740a70e?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your desired image source
        alt="Local Business Background"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-70" /> {/* Gradient overlay for better contrast */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
      
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight sm:leading-snug shadow-lg">
          Discover & Promote Local Businesses
        </h1>

        <p className="mt-4 text-base sm:text-lg md:text-xl text-white max-w-xl mx-auto shadow-md">
          Whether you're looking for the best services in your area or you're a business owner aiming to grow, we've got you covered! Join our vibrant community today!
        </p>

        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <a
            href="/browse"
            className="inline-block bg-white text-indigo-600 hover:bg-gray-200 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-medium shadow-lg transition duration-300 text-sm sm:text-base"
          >
            Browse Businesses
          </a>

          <a
            href="/add-business"
            className="inline-block border border-white text-white hover:bg-white hover:text-indigo-600 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-medium shadow-lg transition duration-300 text-sm sm:text-base"
          >
            Add Your Business
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
