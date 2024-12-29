import React, { useState } from "react";
import { Link } from "react-router-dom";

const blogs = [
  {
    id: 1,
    title: "5 Tips to Boost Your Local Business",
    description: "Discover actionable tips to grow your business in the local market.",
    image: "https://cdn.pixabay.com/photo/2019/05/28/00/15/indoors-4234071_1280.jpg",
    date: "December 20, 2024",
    category: "Business Tips",
  },
  {
    id: 2,
    title: "Top 10 Restaurants in Your Area",
    description: "Explore the best dining options near you.",
    image: "https://cdn.pixabay.com/photo/2018/03/03/20/02/laptop-3196481_1280.jpg",
    date: "December 18, 2024",
    category: "Food & Drink",
  },
  {
    id: 3,
    title: "How to Leverage Social Media for Local Marketing",
    description: "Maximize your online presence with these social media strategies.",
    image: "https://cdn.pixabay.com/photo/2022/01/20/17/51/office-desk-6952919_1280.jpg",
    date: "December 15, 2024",
    category: "Marketing",
  },
];

const BlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);

  // Function to handle search input
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(term) ||
      blog.description.toLowerCase().includes(term) ||
      blog.category.toLowerCase().includes(term)
    );

    setFilteredBlogs(filtered);
  };

  return (
    <div className="bg-gray-50 min-h-screen spartan">
      {/* Hero Section */}
      <header className="bg-white text-gray-800 py-20  pt-40 px-6 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
          Our Blogs
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl">
          Stay informed with the latest updates, tips, and local insights.
        </p>
      </header>

      {/* Search Bar */}
      <div className="container mx-auto mt-8 px-4 lg:px-20">
        <input
          type="text"
          placeholder="Search Blogs..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none text-gray-700"
        />
      </div>

     
     {/* Blog Cards */}
<div className="container mx-auto mt-12 mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-20">
  {filteredBlogs.length > 0 ? (
    filteredBlogs.map((blog) => (
      <div
        key={blog.id}
        className="bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden transition-shadow duration-300"
      >
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-56 object-cover"
        />
        <div className="p-6">
          <span className="text-sm text-indigo-700 font-semibold">
            {blog.category}
          </span>
          <h2 className="mt-2 text-xl font-bold text-gray-800 truncate">
            {blog.title}
          </h2>
          <p className="mt-2 text-gray-600 line-clamp-3">
            {blog.description}
          </p>
          <div className="mt-4 text-gray-500 text-sm">{blog.date}</div>
          <Link to={`/blog/${blog.id}`}>
  <button className="mt-4 inline-block bg-indigo-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-700 transition duration-200">
    Read More
  </button>
</Link>
        </div>
      </div>
    ))
  ) : (
    <p className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-gray-600 text-lg">
      No blogs found matching your search.
    </p>
  )}
</div>


      {/* Footer */}
     
    </div>
  );
};

export default BlogsPage;
