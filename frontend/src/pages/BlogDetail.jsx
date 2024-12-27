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
      fullContent: `
        <h2>1. The Gourmet Spot</h2>
        <p>Known for its creative fusion dishes, The Gourmet Spot combines local ingredients with global flavors. A must-visit for foodies!</p>
  
        <h2>2. Bella Pasta</h2>
        <p>This Italian gem offers homemade pasta and wood-fired pizzas that transport you straight to Tuscany.</p>
  
        <h2>3. Spice Haven</h2>
        <p>If you love spicy food, Spice Haven delivers bold flavors and an unforgettable dining experience.</p>
  
        <h2>4. Ocean Breeze</h2>
        <p>Perfect for seafood lovers, Ocean Breeze serves the freshest catch in a stunning waterfront setting.</p>
  
        <h2>5. Green Table</h2>
        <p>A paradise for vegetarians and vegans, Green Table offers innovative plant-based dishes.</p>
  
        <h2>6. Fire & Grill</h2>
        <p>For the best barbecue and steaks in town, Fire & Grill is the place to be.</p>
  
        <h2>7. Sweet Delights</h2>
        <p>This cozy cafe specializes in desserts that are as beautiful as they are delicious.</p>
  
        <h2>8. Sakura Sushi</h2>
        <p>Savor authentic Japanese cuisine at Sakura Sushi, featuring expertly crafted rolls and fresh sashimi.</p>
  
        <h2>9. The Rustic Cafe</h2>
        <p>With its warm ambiance and hearty comfort food, The Rustic Cafe feels like home.</p>
  
        <h2>10. Urban Eats</h2>
        <p>This trendy spot offers a mix of modern dishes and a relaxed vibe, perfect for casual dining.</p>
      `,
      image: "https://cdn.pixabay.com/photo/2018/03/03/20/02/laptop-3196481_1280.jpg",
      date: "December 18, 2024",
      category: "Food & Drink",
    },
    {
      id: 3,
      title: "How to Leverage Social Media for Local Marketing",
      description: "Maximize your online presence with these social media strategies.",
      fullContent: `
        <h2>1. Choose the Right Platforms</h2>
        <p>Focus on the social media platforms where your local audience is most active. Platforms like Facebook and Instagram are great for community engagement.</p>
  
        <h2>2. Share Local Stories</h2>
        <p>Post about community events, partnerships, and customer stories to build a sense of connection and trust.</p>
  
        <h2>3. Use Geotags</h2>
        <p>Adding geotags to your posts helps you appear in local searches, making it easier for nearby customers to find your business.</p>
  
        <h2>4. Promote Local Deals</h2>
        <p>Run exclusive promotions for your local followers. Offer discounts or giveaways to encourage engagement and foot traffic.</p>
  
        <h2>5. Partner with Local Influencers</h2>
        <p>Collaborate with influencers who have a strong local following to expand your reach and credibility.</p>
  
        <h2>6. Engage with Your Community</h2>
        <p>Respond to comments, messages, and reviews promptly. Showing that you value customer feedback fosters loyalty and trust.</p>
  
        <h2>7. Post Regularly</h2>
        <p>Consistency is key. Create a content calendar to ensure you're sharing fresh, relevant content regularly.</p>
  
        <h2>8. Invest in Local Ads</h2>
        <p>Boost your posts and run targeted ads to reach specific demographics in your area effectively.</p>
      `,
      image: "https://cdn.pixabay.com/photo/2022/01/20/17/51/office-desk-6952919_1280.jpg",
      date: "December 15, 2024",
      category: "Marketing",
    },
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
  className="w-full h-56 object-cover mt-24"
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
