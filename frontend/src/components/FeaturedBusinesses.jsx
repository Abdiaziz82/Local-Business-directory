import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight, FaMapMarkerAlt } from "react-icons/fa"; // Importing the location icon

const FeaturedBusinesses = () => {
  const businesses = [
    {
      id: 1,
      name: "Coffee Shop Co.",
      description: "The best coffee in town, with a cozy atmosphere.",
      category: "Cafe",
      rating: 5,
      location: "Downtown, Nairobi",
      imageUrl: "https://cdn.pixabay.com/photo/2020/06/05/10/33/coffee-5262668_1280.jpg",
      websiteUrl: "https://example.com",
    },
    {
      id: 2,
      name: "Tech Solutions",
      description: "Offering state-of-the-art software solutions for local businesses.",
      category: "IT Services",
      rating: 4,
      location: "Westlands, Nairobi",
      imageUrl: "https://source.unsplash.com/400x300/?tech,office",
      websiteUrl: "https://example.com",
    },
    {
      id: 3,
      name: "Flower Boutique",
      description: "Beautiful floral arrangements for every occasion.",
      category: "Florist",
      rating: 5,
      location: "Karen, Nairobi",
      imageUrl: "https://source.unsplash.com/400x300/?flowers,shop",
      websiteUrl: "https://example.com",
    },
    {
      id: 4,
      name: "Fitness Pro Gym",
      description: "Achieve your fitness goals with the latest equipment.",
      category: "Gym",
      rating: 4,
      location: "Thika Road, Nairobi",
      imageUrl: "https://source.unsplash.com/400x300/?gym,fitness",
      websiteUrl: "https://example.com",
    },
    {
      id: 5,
      name: "Best Home Decor",
      description: "Unique home decor items for a perfect home ambiance.",
      category: "Home Decor",
      rating: 5,
      location: "Westgate Mall, Nairobi",
      imageUrl: "https://source.unsplash.com/400x300/?home,decor",
      websiteUrl: "https://example.com",
    },
    {
      id: 6,
      name: "Bike World",
      description: "A wide range of bicycles for all ages.",
      category: "Bicycle Store",
      rating: 4,
      location: "Eastlands, Nairobi",
      imageUrl: "https://source.unsplash.com/400x300/?bike,store",
      websiteUrl: "https://example.com",
    },
  ];

  // Custom Left Arrow
  const PrevArrow = ({ onClick }) => {
    return (
      <div
        className="absolute top-1/2 transform -translate-y-1/2 left-0 z-10 bg-indigo-600 text-white p-3 rounded-full cursor-pointer"
        onClick={onClick}
      >
        <FaArrowLeft />
      </div>
    );
  };

  // Custom Right Arrow
  const NextArrow = ({ onClick }) => {
    return (
      <div
        className="absolute top-1/2 transform -translate-y-1/2 right-0 z-10 bg-indigo-600 text-white p-3 rounded-full cursor-pointer"
        onClick={onClick}
      >
        <FaArrowRight />
      </div>
    );
  };

  // Slick carousel settings
  const settings = {
    dots: false, // Disable dots
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Display 3 at a time on large screens
    slidesToScroll: 1,
    arrows: true, // Enable arrows
    prevArrow: <PrevArrow />, // Custom left arrow
    nextArrow: <NextArrow />, // Custom right arrow
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Display 2 cards at a time on medium screens
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1, // Display 1 card at a time on small screens
        },
      },
    ],
  };

  return (
    <section className="bg-gray-100 py-16 relative spartan">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">Featured Businesses</h2>
          <p className="mt-4 text-xl text-gray-600">Explore top-rated businesses handpicked for you.</p>
        </div>

        <div className="relative">
          <Slider {...settings}>
            {businesses.map((business) => (
              <div key={business.id} className="p-4">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <img
                    src={business.imageUrl}
                    alt={business.name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900">{business.name}</h3>
                    <p className="mt-2 text-sm text-gray-600">{business.description}</p>
                    <div className="mt-2 text-sm text-indigo-500 flex items-center">
                      <FaMapMarkerAlt className="mr-2" /> {/* Location Icon */}
                      {business.location}
                    </div>
                    <div className="mt-4">
                      <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-xs">
                        {business.category}
                      </span>
                    </div>
                    <div className="mt-4">
                      <span className="inline-block text-yellow-400">
                        {"★".repeat(business.rating)}
                      </span>
                    </div>
                    <div className="mt-6">
                      <a
                        href={business.websiteUrl}
                        className="block text-center text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-500 transition duration-300"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBusinesses;