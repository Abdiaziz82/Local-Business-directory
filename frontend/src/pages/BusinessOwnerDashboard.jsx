import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BusinessOwnerDashboard = () => {
    const [businessInfo, setBusinessInfo] = useState({
        business_name: '',
        business_description: '',
        business_address: '',
        contact_number: ''
    });

    const [isEditMode, setIsEditMode] = useState(false);

    // Fetch business info when component mounts
    useEffect(() => {
        fetchBusinessInfo();
    }, []);

    // Fetch the user's existing business info from the backend
    const fetchBusinessInfo = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/business_info', {
                withCredentials: true
            });
            if (response.status === 200 && response.data.business_name) {
                setBusinessInfo(response.data);
                setIsEditMode(true);
            } else {
                setIsEditMode(false); // No business info, set to add mode
            }
        } catch (error) {
            console.error("Error fetching business information", error);
            setIsEditMode(false);
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBusinessInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    // Submit form data
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          const response = await axios.post('http://127.0.0.1:5000/api/business_info', businessInfo, {
              headers: {
                  'Content-Type': 'application/json'
              },
              withCredentials: true  // This ensures the session cookie is sent
          });
          alert(response.data.msg || "Information saved successfully");
          fetchBusinessInfo(); // Refresh data to update UI
      } catch (error) {
          console.error("Error saving data", error);
          alert("An error occurred while saving your information.");
      }
  };
  
    
    return (
        <div className="business-dashboard pt-36">
            <h2>Business Owner Dashboard</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Business Name</label>
                    <input
                        type="text"
                        name="business_name"
                        value={businessInfo.business_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Business Description</label>
                    <textarea
                        name="business_description"
                        value={businessInfo.business_description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Business Address</label>
                    <input
                        type="text"
                        name="business_address"
                        value={businessInfo.business_address}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Contact Number</label>
                    <input
                        type="text"
                        name="contact_number"
                        value={businessInfo.contact_number}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">{isEditMode ? 'Update Information' : 'Save Information'}</button>
            </form>
        </div>
    );
};

export default BusinessOwnerDashboard;
