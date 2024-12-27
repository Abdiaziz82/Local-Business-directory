// BlogDetailPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

// Sample blog data
const blogs = [
  {
    id: 1,
    title: "5 Tips to Boost Your Local Business",
    description: "Discover actionable tips to grow your business in the local market.",
    fullContent: `
      <h2>Tip 1: Understand Your Local Market</h2>
      <p>Conduct research to identify your target customers, understand their needs, and cater to them effectively. Local businesses must be highly attuned to their community’s demands and interests to succeed.</p>

      <h2>Tip 2: Optimize Your Online Presence</h2>
      <p>Make sure your business is listed on local online directories, and ensure your website is mobile-friendly. In today’s digital age, an online presence is crucial for driving traffic to your physical store. Ensure your business is easy to find and navigate online.</p>

      <h2>Tip 3: Leverage Local SEO</h2>
      <p>Use local keywords in your website content to improve search engine rankings for local searches. For example, adding location-specific keywords to your product descriptions and services helps you rank better when customers search for businesses in your area.</p>

      <h2>Tip 4: Partner with Local Influencers</h2>
      <p>Collaborate with local influencers to promote your business and build community trust. Influencers can help you reach a larger, more engaged local audience. Their endorsements can lend credibility to your business and drive more traffic to your website.</p>

      <h2>Tip 5: Focus on Customer Retention</h2>
      <p>Offer rewards or loyalty programs to keep your local customers coming back. Loyal customers are your best advocates and the foundation of your business. Keeping them happy will ensure long-term success, so reward them for their repeat business with discounts or special offers.</p>

      <h2>Bonus Tip: Get Involved in Local Events</h2>
      <p>Participating in local events or sponsoring community activities can enhance your business's visibility and reputation. You’ll also be helping your community, which can earn you loyalty from local customers.</p>
    `,
    image: "https://cdn.pixabay.com/photo/2019/05/28/00/15/indoors-4234071_1280.jpg",
    date: "December 20, 2024",
    category: "Business Tips",
  },
  {
    id: 2,
    title: "Top 10 Restaurants in Your Area",
    description: "Explore the best dining options near you.",
    fullContent: "<p>Full article content for restaurant recommendations.</p>",
    image: "https://via.placeholder.com/600x400",
    date: "December 18, 2024",
    category: "Food & Drink",
  },
  {
    id: 3,
    title: "How to Leverage Social Media for Local Marketing",
    description: "Maximize your online presence with these social media strategies.",
    fullContent: "<p>Full article content on leveraging social media for local marketing.</p>",
    image: "https://via.placeholder.com/600x400",
    date: "December 15, 2024",
    category: "Marketing",
  },
  // Other blogs remain unchanged
];

const BlogDetailPage = () => {
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id === parseInt(id));

  if (!blog) {
    return <p>Blog not found!</p>;
  }

  return (
    <div className="container mx-auto mt-12 px-4 lg:px-20 spartan">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-56 object-cover"
        />
        <div className="p-6">
          <span className="text-sm text-indigo-600 font-semibold">
            {blog.category}
          </span>
          <h2 className="mt-2 text-2xl font-bold text-gray-800">{blog.title}</h2>
          <p className="mt-4 text-gray-500">{blog.date}</p>
          <div
            className="mt-4 text-gray-800 space-y-6" // Added Tailwind class for spacing
            dangerouslySetInnerHTML={{ __html: blog.fullContent }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
