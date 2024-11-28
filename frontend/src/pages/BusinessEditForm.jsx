import React, { useState, useEffect } from "react";

// Function to retrieve JWT from cookies
const getJwtFromCookies = () => {
  const cookies = document.cookie.split("; ");
  const jwtCookie = cookies.find((cookie) => cookie.startsWith("access_token="));
  return jwtCookie ? jwtCookie.split("=")[1] : null;
};

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/token/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    document.cookie = `access_token=${data.access_token}; path=/;`; // Store the new token in cookies
    return data.access_token;
  } catch (error) {
    console.error("Unable to refresh token:", error);
    throw error;
  }
};

// Function to fetch business data
const fetchBusinessData = async () => {
  let token = getJwtFromCookies();

  if (!token) {
    console.error("JWT token not found in cookies.");
    return null;
  }

  try {
    const response = await fetch("http://127.0.0.1:5000/api/business-info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.business_info; // Return the business info
    } else if (response.status === 401) {
      console.warn("Token expired. Attempting to refresh...");
      token = await refreshAccessToken(); // Refresh the token
      if (token) {
        return await fetchBusinessData(); // Retry the request with the new token
      } else {
        console.error("Unable to refresh token. Please log in again.");
        return null;
      }
    } else {
      throw new Error("Failed to fetch business data.");
    }
  } catch (error) {
    console.error("Error fetching business data:", error.message);
    return null;
  }
};

const BusinessEditForm = ({ onUpdate }) => {
  const [business, setBusiness] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    description: "",
    location: "",
    email: "",
    phone: "",
    website: "",
    products: "",
    categories: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false); // Manage form visibility

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchBusinessData();
      if (data) {
        setBusiness(data);
        setFormData({
          name: data.name || "",
          logo: data.logo || "",
          description: data.description || "",
          location: data.location || "",
          email: data.email || "",
          phone: data.phone || "",
          website: data.website || "",
          products: data.products || "",
          categories: data.categories || "",
        });
        setLoading(false);
      } else {
        setError("Failed to load business data.");
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!formData.name || !formData.email || !formData.location) {
      setLoading(false);
      setError("Please fill in all required fields.");
      return;
    }

    let token = getJwtFromCookies();

    if (!token) {
      console.error("JWT token not found in cookies.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/business-info", {
        method: "PUT", // Use PUT for updating data
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update business information.");
      }

      const updatedBusiness = await response.json();
      onUpdate(updatedBusiness); // Notify parent component with updated data
      setLoading(false);
      setShowForm(false); // Close the form after successful update
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  const handleEditClick = () => {
    setShowForm(true); // Show the form when "Edit" button is clicked
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!business) {
    return <p>No business data found.</p>;
  }

  return (
    <div>
      <button onClick={handleEditClick}>Edit Business</button>
      
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Business Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Business Name"
            />
          </div>
          <div>
            <label>Logo:</label>
            <input
              type="text"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              placeholder="Logo URL"
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
            />
          </div>
          <div>
            <label>Website:</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Website URL"
            />
          </div>
          <div>
            <label>Products:</label>
            <input
              type="text"
              name="products"
              value={formData.products}
              onChange={handleChange}
              placeholder="Products"
            />
          </div>
          <div>
            <label>Categories:</label>
            <input
              type="text"
              name="categories"
              value={formData.categories}
              onChange={handleChange}
              placeholder="Categories"
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Business"}
          </button>
        </form>
      )}
    </div>
  );
};

export default BusinessEditForm;
