// import React from 'react'

// const CreateClubDetails = ({setIsCreateClubDetails,setIsExistingClubDetails}) => {
//   const handleSave =()=>{
//     setIsCreateClubDetails(false);
//     setIsExistingClubDetails(true);

// }
//   return (
//     <div><div>
//       <h1>Hello</h1>
//       <button onClick={handleSave}>Save</button>
      
//       </div></div>
//   )
// }

// export default CreateClubDetails;








import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios"; // Import Axios

import "../LeftSidebar/ClubDtails.css";

const CreateClubDetails = ({setIsCreateClubDetails,setIsExistingClubDetails}) => {
  const [data, setData] = useState(null);
  const [showCity, setShowCity] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State to track edit mode
  const [editedData, setEditedData] = useState(null); // State to store edited data
  const { id:clubId } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const apiUrl = `https://mynextfilm.ai/harkat/api/v1/club-database/${clubId}/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.data) {
          throw new Error("Error fetching data");
        }

        setData(response.data);
        setShowCity(!!response.data.club_city);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [apiUrl, accessToken]);

  const formattedDate = new Date(data?.activation_date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric"
    }
  );

  const handleEditClick = () => {
    setIsEditing(true);
    // Initialize editedData with the current data
    setEditedData(data);
  };

  const handleSaveClick = async () => {
    console.log( editedData, "data")
    try {
      const response = await axios.patch(apiUrl, editedData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        setIsEditing(false);
        // Update the data in the state with editedData
        setData(editedData);
        console.log("Data updated successfully:", response.data);
      } else {
        console.error("Error updating data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Update the editedData state when input fields change
    setEditedData({
      ...editedData,
      [name]: value
    });
  };

  return (
    <div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          marginTop: "10px",
          width: "100%",
          height: "5%",
          backgroundColor: "#ee3c4d",
          color: "white",
          fontWeight: "600",
          fontSize: "24px",
          borderRadius: "7px"
        }}
      >
        Club Details
      </h1>
      <div
        className="cont"
        style={{ display: "flex", flexDirection: "column", width: "100%" }}
      >
        {isEditing ? ( // Render input fields when in edit mode
          <div>
            <div style={{ width: "30%" }}>
              <h3 style={{ fontWeight: "600", fontSize: "18px" }}>Club Name</h3>
              <input
                type="text"
                name="club_name"
                value={editedData?.club_name || ""}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ width: "30%" }}>
              <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
                {" "}
                Club Launch Date
              </h3>
              <input
                type="text"
                name="activation_date"
                value={editedData?.activation_date || ""}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ width: "30%" }}>
              <h3 style={{ fontWeight: "600", fontSize: "18px" }}> Postal Code</h3>
              <input
                type="text"
                name="postal_code"
                value={editedData?.postal_code || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
        ) : (
          <div>
            <div
              className="con1"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                textAlign: "center",
                marginTop: "1em"
              }}
            >
              <div style={{ width: "30%" }}>
                <h3 style={{ fontWeight: "600", fontSize: "18px" }}>Club Name </h3>
                <p>{data?.club_name}</p>
              </div>
              <div style={{ width: "30%" }}>
                <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
                  {" "}
                  Club Launch Date
                </h3>
                <p>{formattedDate}</p>
              </div>
              <div style={{ width: "30%" }}>
                <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
                  {" "}
                  Postal Code
                </h3>
                <p>{data?.postal_code}</p>
              </div>
            </div>
          </div>
        )}
        {/* Render other fields (similar to Club Name) in a similar manner */}

        <div>
          {isEditing ? ( // Render "Save" and "Cancel" buttons in edit mode
            <div>
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <button onClick={handleEditClick}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateClubDetails;
