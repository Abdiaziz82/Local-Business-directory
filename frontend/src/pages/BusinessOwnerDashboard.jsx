import React, { useState, useContext, useEffect } from "react";
import { FaClipboardList, FaEdit, FaTrashAlt } from "react-icons/fa"; // Import delete icon
import BusinessForm from "./BusinessForm";
import BusinessCard from "./BusinessCard";
import BusinessEditForm from "./BusinessEditForm";
import TableComponent from "./MessageTable";
import ReviewTable from "./ReviewTable";
import Swal from "sweetalert2";
import { FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext"; 



const BusinessOwnerDashboard = () => {
  
  const [activeSection, setActiveSection] = useState("form"); // 'form', 'listings', or 'edit'
  const [businessData, setBusinessData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [selectedBusiness, setSelectedBusiness] = useState(null); // To store selected business for editing

  // Helper function to get JWT token from cookies
  const getJwtFromCookies = () => {
    const cookies = document.cookie.split("; ");
    const jwtCookie = cookies.find((cookie) => cookie.startsWith("access_token="));
    return jwtCookie ? jwtCookie.split("=")[1] : null;
  };

  // Function to fetch user-specific business data
  const fetchUserData = async () => {
    try {
      let token = getJwtFromCookies();

      if (!token) {
        console.error("JWT token not found in cookies. Redirecting to login.");
        return;
      }

      const response = await fetch("http://127.0.0.1:5000/api/business-info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData([data.business_info]); // Update user data state
      } else {
        console.error("Failed to fetch user data.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch user data on mount
  useEffect(() => {
    fetchUserData();
  }, []);

  // Handle new business data submission
  const handleNewBusinessData = (newData) => {
    const updatedData = [...businessData, newData];
    setBusinessData(updatedData);
  };

  // Handle business update
  const handleBusinessUpdate = (updatedBusiness) => {
    const updatedData = businessData.map((business) =>
      business.id === updatedBusiness.id ? updatedBusiness : business
    );
    setBusinessData(updatedData);
    setSelectedBusiness(null); // Clear selected business after update
    setActiveSection("listings"); // Switch back to listings
  };

  // Handle delete business
  
const handleBusinessDelete = async (businessId) => {
  if (!businessId) {
    console.error("Business ID is undefined!");
    return;
  }

  const result = await Swal.fire({
    title: "Are you sure you want to delete?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    customClass: {
      title: "swal-title",
      htmlContainer:"swal-text",
      confirmButton: "swal-text",
      cancelButton: "swal-text",
    },
  });

  if (result.isConfirmed) {
    try {
      const token = getJwtFromCookies();
      if (!token) {
        console.error("JWT token not found in cookies.");
        return;
      }

      const response = await fetch(`http://127.0.0.1:5000/api/business-info/${businessId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "You have deleted the business successfully.",
          customClass: {
            title: "swal-title",
            htmlContainer:"swal-text",
          },
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: errorData.error,
          customClass: {
            title: "swal-title",
            htmlContainer:"swal-text",
          },
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Error deleting business.",
        customClass: {
          title: "swal-title",
          htmlContainer:"swal-text",
        },
      });
    }
  }
};
 
const { logout } = useContext(AuthContext); // Access the logout function from context

const handleLogout = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out of your account.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, log me out!",
    customClass: {
      title: 'swal-title',
      htmlContainer: 'swal-text',
    },
  }).then((result) => {
    if (result.isConfirmed) {
      logout(); // Perform logout if confirmed
      Swal.fire("Logged Out", "You have been successfully logged out.", "success");
    }
  });
};


  // Handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === "edit") {
      // Ensure we are selecting the first business for editing if none is selected
      if (!selectedBusiness && userData && userData.length > 0) {
        setSelectedBusiness(userData[0]); // Auto-select the first business for editing
      }
    } else {
      setSelectedBusiness(null); // Clear selected business if not in edit section
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen spartan">
      {/* Sidebar */}
      <aside className="lg:w-1/4 w-full lg:h-screen bg-gray-900 text-white flex flex-col items-center py-8 lg:py-16 space-y-6 pt-20 lg:pt-28">
  <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

  {/* Filling Form Button */}
  <button
    className={`flex items-center w-3/4 p-3 text-lg font-semibold hover:bg-gray-700 rounded ${
      activeSection === "form" ? "bg-gray-700" : ""
    }`}
    onClick={() => setActiveSection("form")}
  >
    <FaEdit className="mr-3 text-indigo-600" /> Filling Form
  </button>

  {/* Your Listings Button */}
  <button
    className={`flex items-center w-3/4 p-3 text-lg font-semibold hover:bg-gray-700 rounded ${
      activeSection === "listings" ? "bg-gray-700" : ""
    }`}
    onClick={() => setActiveSection("listings")}
  >
    <FaClipboardList className="mr-3 text-indigo-600" /> Your Listings
  </button>

  {/* Edit Button */}
  <button
    className={`flex items-center w-3/4 p-3 text-lg font-semibold hover:bg-gray-700 rounded ${
      activeSection === "edit" ? "bg-gray-700" : ""
    }`}
    onClick={() => setActiveSection("edit")}
  >
    <FaEdit className="mr-3 text-purple-500" /> Edit
  </button>

  {/* Messages Button */}
  <button
    className={`flex items-center w-3/4 p-3 text-lg font-semibold hover:bg-gray-700 rounded ${
      activeSection === "messages" ? "bg-gray-700" : ""
    }`}
    onClick={() => setActiveSection("messages")}
  >
    <FaClipboardList className="mr-3 text-green-500" /> Messages
  </button>

  {/* Reviews Button */}
  <button
    className={`flex items-center w-3/4 p-3 text-lg font-semibold hover:bg-gray-700 rounded ${
      activeSection === "reviews" ? "bg-gray-700" : ""
    }`}
    onClick={() => setActiveSection("reviews")}
  >
    <FaClipboardList className="mr-3 text-yellow-500" /> Reviews
  </button>

  {/* Delete Button */}
  <button
    className={`flex items-center w-3/4 p-3 text-lg font-semibold hover:bg-gray-700 rounded ${
      activeSection === "delete" ? "bg-gray-700" : ""
    }`}
    onClick={() => setActiveSection("delete")}
  >
    <FaTrashAlt className="mr-3 text-red-500" /> Delete
  </button>

  {/* Logout Button */}
  <button
    className="flex items-center w-3/4 p-3 text-lg font-semibold hover:bg-gray-700 rounded bg-gray-800"
    onClick={handleLogout}
  >
    <FaSignOutAlt className="mr-3 text-white" /> Logout
  </button>
</aside>


      {/* Main Content */}
      <main className="flex-grow p-4 lg:p-8 bg-gray-100 overflow-y-auto mt-16">
  {activeSection === "form" && (
    <div className="flex justify-center">
      <BusinessForm setBusinessData={handleNewBusinessData} />
    </div>
  )}

  {activeSection === "listings" && userData && userData.length > 0 && (
    <div className="flex flex-wrap justify-center gap-4">
      {userData.map((data, index) => (
        <BusinessCard
          key={index}
          data={data}
          onEdit={() => handleSectionChange("edit")} // Edit remains available
          // No delete option for shared users
        />
      ))}
    </div>
  )}

  {activeSection === "listings" && (!userData || userData.length === 0) && (
    <p className="text-center text-gray-600 text-lg mt-10">
      No listings available. Fill out the form to add your listing.
    </p>
  )}

  {activeSection === "edit" && selectedBusiness && (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Edit Business</h2>
      <BusinessEditForm
        business={selectedBusiness}
        onSubmit={handleBusinessUpdate}
      />
    </div>
  )}

{activeSection === "messages" && (
          <div className="flex lg:flex-row flex-col">
            <TableComponent />
          </div>
        )}

{activeSection === "reviews" && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Reviews</h2>
            <ReviewTable  /> {/* Display the ReviewTable */}
          </div>
        )}
        

        {activeSection === "delete" && (
  <div className="text-center pt-14">
    <h2 className="text-2xl font-bold mb-4">Delete Business</h2>
    {userData && userData.length > 0 ? (
      <>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => {
            const dropdown = document.getElementById("business-delete-dropdown");
            dropdown.classList.toggle("hidden");
          }}
        >
          Select Business to Delete
        </button>

        <div
          id="business-delete-dropdown"
          className="hidden bg-white border rounded shadow-lg p-4 max-w-md mx-auto"
        >
          <ul>
            {userData.map((data, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b py-2"
              >
                <span>{data.name}</span>
                
               
                
                <button
  className="bg-red-500 text-white px-3 py-1 rounded"
  onClick={() => {
    console.log("Data object:", data); // Check the structure of data
    if (data.id) {
      handleBusinessDelete(data.id);
    } else {
      console.error("Business ID is missing.");
    }
  }}
>
  Delete
</button>


              </li>
            ))}
          </ul>
        </div>
      </>
    ) : (
      <p className="text-lg">No businesses to delete.</p>
    )}
  </div>
)}


</main>

    </div>
  );
};

export default BusinessOwnerDashboard;
