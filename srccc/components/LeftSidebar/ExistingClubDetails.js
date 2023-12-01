// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router";

// import "../LeftSidebar/ClubDtails.css";

// const ExistingClubDetails = ({
//   fetchedTime,
//   setIsCreateClubDetails,
//   setIsExistingClubDetails,
// }) => {
//   const [data, setData] = useState(null);
//   const [showCity, setShowCity] = useState(false);
//   const { id: clubId } = useParams();
//   const [isEditing, setIsEditing] = useState(false);

//   const accessToken = localStorage.getItem("accessToken");

//   const apiUrl = `http://115.245.192.138/harkat/api/v1/club-database/${clubId}/`;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(apiUrl, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Error fetching data");
//         }

//         const json = await response.json();

//         setData(json);
//         setShowCity(!!json.club_city);
//         console.log(json, "DATA");
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, []);

//   const formattedDate = new Date(data?.activation_date).toLocaleDateString(
//     "en-US",
//     {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     }
//   );
//   // const handleSubmit =()=>{
//   //     setIsCreateClubDetails(true);
//   //     setIsExistingClubDetails(false);

//   // }

//   const [editedData, setEditedData] = useState({ ...data });

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedData({ ...editedData, [name]: value });
//   };

//   const handleSave = async () => {
//     try {
//       const response = await fetch(apiUrl, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(editedData),
//       });

//       if (!response.ok) {
//         throw new Error("Error updating data");
//       }

//       const updatedData = await response.json();
//       setData(updatedData);
//       setIsEditing(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h1
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           textAlign: "center",
//           marginTop: "10px",
//           width: "100%",
//           height: "5%",
//           backgroundColor: "#ee3c4d",
//           color: "white",
//           fontWeight: "600",
//           fontSize: "24px",
//           borderRadius: "7px",
//         }}
//       >
//         Club Details
//       </h1>
//       <div
//         className="cont"
//         style={{ display: "flex", flexDirection: "column", width: "100%" }}
//       >
//         <div
//           className="con1"
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-around",
//             textAlign: "center",
//             marginTop: "1em",
//           }}
//         >
//           <div style={{ width: "30%" }}>
//             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>Club Name </h3>
//             <p>{data?.club_name}</p>
//           </div>
//           <div style={{ width: "30%" }}>
//             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
//               {" "}
//               Club Launch Date
//             </h3>
//             <p>{formattedDate}</p>
//           </div>
//           <div style={{ width: "30%" }}>
//             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
//               {" "}
//               Postal Code
//             </h3>
//             <p>{data?.postal_code}</p>
//           </div>
//         </div>
//         <div
//           className="con2"
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-around",
//             textAlign: "center",
//             marginTop: "1em",
//           }}
//         >
//           <div style={{ width: "30%" }}>
//             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>Country</h3>
//             <p>{data?.country_name}</p>
//           </div>
//           <div style={{ width: "30%" }}>
//             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>State</h3>
//             <p>{data?.club_state}</p>
//           </div>

//           {showCity && (
//             <div style={{ width: "30%" }}>
//               <h3 style={{ fontWeight: "600", fontSize: "18px" }}> City</h3>
//               <p>{data?.club_city}</p>
//             </div>
//           )}
//         </div>
//         <div
//           className="con3"
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             textAlign: "center",
//             marginTop: "1em",
//           }}
//         >
//           <div style={{ width: "49%" }}>
//             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
//               Minimum Number of Members in Club
//             </h3>
//             <p>{data?.min_member}</p>
//           </div>
//           <div style={{ width: "49%" }}>
//             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
//               Maximum Number of Members in Club
//             </h3>
//             <p>{data?.max_member}</p>
//           </div>
//         </div>

//         <div
//           className="con4"
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             textAlign: "center",
//             marginTop: "1em",
//           }}
//         >
//           <div style={{ width: "49%" }}>
//             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
//               Prefered Language of Members
//             </h3>
//             <p>{data?.club_language}</p>
//           </div>
//           <div style={{ width: "49%" }}>
//             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
//               Activites Conduct Per Month
//             </h3>
//             <p>{data?.activities}</p>
//           </div>
//         </div>
//         <div
//           className="con5"
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             textAlign: "center",
//             marginTop: "1em",
//           }}
//         >
//           <div style={{ width: "49%" }}>
//             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
//               club Descripition
//             </h3>
//             <p>{data?.club_bio}</p>
//           </div>
//           <div style={{ width: "49%" }}>
//             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
//               what is your Vision For the Club
//             </h3>
//             <p>{data?.club_vision}</p>
//           </div>
//         </div>
//       </div>
//       <div>
//         <button onClick={handleSubmit}>Edit</button>
//       </div>
//     </div>
//   );
// };

// export default ExistingClubDetails;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router";

// import "../LeftSidebar/ClubDtails.css";

// const ExistingClubDetails = ({
//   fetchedTime,
//   setIsCreateClubDetails,
//   setIsExistingClubDetails,
// }) => {
//   const [data, setData] = useState(null);
//   const [showCity, setShowCity] = useState(false);
//   const [isEditing, setIsEditing] = useState(false); // State to toggle between read-only and edit mode
//   const { id: clubId } = useParams();

//   const accessToken = localStorage.getItem("accessToken");

//   const apiUrl = `http://115.245.192.138/harkat/api/v1/club-database/${clubId}/`;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(apiUrl, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Error fetching data");
//         }

//         const json = await response.json();

//         setData(json);
//         setShowCity(!!json.club_city);
//         console.log(json, "DATA");
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, []);

//   const formattedDate = new Date(data?.activation_date).toLocaleDateString(
//     "en-US",
//     {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     }
//   );

//   // State to store the edited data
//   const [editedData, setEditedData] = useState({...data });

//   const handleEdit = () => {
//     setIsEditing(true);
//     setEditedData(data || {});
//   };
  



//   const handleInputChange = (e) => {
//     const { name, value } = e.target.value;
//     setEditedData({ ...editedData, [name]: value });
//   };

//   const handleSave = async () => {
//     try {
//       const response = await fetch(apiUrl, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(editedData),
//       });

//       if (!response.ok) {
//         throw new Error("Error updating data");
//       }

//       const updatedData = await response.json();
//       setData(updatedData);
//       setIsEditing(false);
//     } catch (error) {
//       console.error(error);
//     }
//     // window.location.reload();
//   };

//   return (
//     <div>
//       <h1
//        style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   textAlign: "center",
//                   marginTop: "10px",
//                   width: "100%",
//                   height: "5%",
//                   backgroundColor: "#ee3c4d",
//                   color: "white",
//                   fontWeight: "600",
//                   fontSize: "24px",
//                   borderRadius: "7px",
//                 }}>Club Details</h1>
//       <div  className="cont"
//         style={{ display: "flex", flexDirection: "column", width: "100%" }}>
//         {isEditing ? (
//           // Edit Form
//           // <div>
           
//           //   {/* Add input fields for other data here */}
//           //   <button onClick={handleSave}>Save</button>
//           // </div>

//           <div>
      
//           <div
//             className="cont"
//             style={{ display: "flex", flexDirection: "column", width: "100%" }}
//           >
//             <div
//               className="con1"
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 justifyContent: "space-around",
//                 textAlign: "center",
//                 marginTop: "1em",
//               }}
//             >
//               <div style={{ width: "30%" }}>
//                 <h3 style={{ fontWeight: "600", fontSize: "18px" }}>Club Name </h3>
//                 {/* <p>{data?.club_name}</p> */}
//                 <input
//               type="text"
//               name="club_name"
//               value={data?.club_name}
//               onChange={handleInputChange}
//             />
//               </div>
//               <div style={{ width: "30%" }}>
//                 <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
//                   {" "}
//                   Club Launch Date
//                 </h3>
//                 <p>{formattedDate}</p>
//               </div>
//               <div style={{ width: "30%" }}>
//                 <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
//                   {" "}
//                   Postal Code
//                 </h3>
//                 <p>{data?.postal_code}</p>
//               </div>
//             </div>
//             <div
//               className="con2"
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 justifyContent: "space-around",
//                 textAlign: "center",
//                 marginTop: "1em",
//               }}
//             >
//               <div style={{ width: "30%" }}>
//                 <h3 style={{ fontWeight: "600", fontSize: "18px" }}>Country</h3>
//                 <p>{data?.country_name}</p>
//               </div>
//               <div style={{ width: "30%" }}>
//                 <h3 style={{ fontWeight: "600", fontSize: "18px" }}>State</h3>
//                 <p>{data?.club_state}</p>
//               </div>
    
//               {showCity && (
//                 <div style={{ width: "30%" }}>
//                   <h3 style={{ fontWeight: "600", fontSize: "18px" }}> City</h3>
//                   <p>{data?.club_city}</p>
//                 </div>
//               )}
//             </div>
//             <div
//               className="con3"
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 textAlign: "center",
//                 marginTop: "1em",
//               }}
//             >
//               <div style={{ width: "49%" }}>
//                 <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
//                   Minimum Number of Members in Club
//                 </h3>
//                 <p>{data?.min_member}</p>
//               </div>
//               <div style={{ width: "49%" }}>
//                 <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
//                   Maximum Number of Members in Club
//                 </h3>
//                 <p>{data?.max_member}</p>
//               </div>
//             </div>
    
//             <div
//               className="con4"
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 textAlign: "center",
//                 marginTop: "1em",
//               }}
//             >
//               <div style={{ width: "49%" }}>
//                 <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
//                   Prefered Language of Members
//                 </h3>
//                 <p>{data?.club_language}</p>
//               </div>
//               <div style={{ width: "49%" }}>
//                 <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
//                   Activites Conduct Per Month
//                 </h3>
//                 <p>{data?.activities}</p>
//               </div>
//             </div>
//             <div
//               className="con5"
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 textAlign: "center",
//                 marginTop: "1em",
//               }}
//             >
//               <div style={{ width: "49%" }}>
//                 <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
//                   club Descripition
//                 </h3>
//                 {/* <p>{data?.club_bio}</p> */}
//                 <input
//               type="text"
//               name="club_bio"
//               value={data?.club_bio}
//               onChange={handleInputChange}
//             />
//               </div>
//               <div style={{ width: "49%" }}>
//                 <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
//                   what is your Vision For the Club
//                 </h3>
//                 {/* <p>{data?.club_vision}</p> */}
//                 <input
//               type="text"
//               name="club_vision"
//               value={data?.club_vision}
//               onChange={handleInputChange}
//             />
//               </div>
//             </div>
//           </div>
//           <div style={{width:"100%" , display:"flex", marginTop:"20px"}}>
//       <div style={{margin:"auto", border:"1px solid red", width:"20%", textAlign:"center", borderRadius:"12px",backgroundColor: "#ee3c4d",
//                   color: "white",}}>
//         <button onClick={handleSave}>Save</button>
//       </div>
//       </div>
//         </div>
        
//         ) : (
//           // Read-only data
//           <div>
//             <div>
      
//       <div
//         className="cont"
//         style={{ display: "flex", flexDirection: "column", width: "100%" }}
//       >
//         <div
//           className="con1"
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-around",
//             textAlign: "center",
//             marginTop: "1em",
//           }}
//         >
//           <div style={{ width: "30%" }}>
//             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>Club Name </h3>
//             <p>{data?.club_name}</p>
//           </div>
//           <div style={{ width: "30%" }}>
//             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
//               {" "}
//               Club Launch Date
//             </h3>
//             <p>{formattedDate}</p>
//           </div>
//           <div style={{ width: "30%" }}>
//             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
//               {" "}
//               Postal Code
//             </h3>
//             <p>{data?.postal_code}</p>
//           </div>
//         </div>
//         <div
//           className="con2"
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-around",
//             textAlign: "center",
//             marginTop: "1em",
//           }}
//         >
//           <div style={{ width: "30%" }}>
//             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>Country</h3>
//             <p>{data?.country_name}</p>
//           </div>
//           <div style={{ width: "30%" }}>
//             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>State</h3>
//             <p>{data?.club_state}</p>
//           </div>

//           {showCity && (
//             <div style={{ width: "30%" }}>
//               <h3 style={{ fontWeight: "600", fontSize: "18px" }}> City</h3>
//               <p>{data?.club_city}</p>
//             </div>
//           )}
//         </div>
//         <div
//           className="con3"
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             textAlign: "center",
//             marginTop: "1em",
//           }}
//         >
//           <div style={{ width: "49%" }}>
//             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
//               Minimum Number of Members in Club
//             </h3>
//             <p>{data?.min_member}</p>
//           </div>
//           <div style={{ width: "49%" }}>
//             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
//               Maximum Number of Members in Club
//             </h3>
//             <p>{data?.max_member}</p>
//           </div>
//         </div>

//         <div
//           className="con4"
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             textAlign: "center",
//             marginTop: "1em",
//           }}
//         >
//           <div style={{ width: "49%" }}>
//             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
//               Prefered Language of Members
//             </h3>
//             <p>{data?.club_language}</p>
//           </div>
//           <div style={{ width: "49%" }}>
//             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
//               Activites Conduct Per Month
//             </h3>
//             <p>{data?.activities}</p>
//           </div>
//         </div>
//         <div
//           className="con5"
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             textAlign: "center",
//             marginTop: "1em",
//           }}
//         >
//           <div style={{ width: "49%" }}>
//             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
//               club Descripition
//             </h3>
//             <p>{data?.club_bio}</p>
//           </div>
//           <div style={{ width: "49%" }}>
//             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
//               what is your Vision For the Club
//             </h3>
//             <p>{data?.club_vision}</p>
//           </div>
//         </div>
//       </div>
//       <div style={{width:"100%" , display:"flex", marginTop:"20px"}}>
//       <div style={{margin:"auto", border:"1px solid red", width:"20%", textAlign:"center", borderRadius:"12px",backgroundColor: "#ee3c4d",
//                   color: "white",}}>
//         <button onClick={handleEdit}>Edit</button>
//       </div>
//       </div>
     
//     </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ExistingClubDetails;




import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";


import "../LeftSidebar/ClubDtails.css";
import SingleHarkatPage from "../HarkatBase/SingleHarkatPage";

const ExistingClubDetails = ({
  fetchedTime,
  setIsCreateClubDetails,
  setIsExistingClubDetails,
}) => {
  const [data, setData] = useState(null);
  

  const [showCity, setShowCity] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State to toggle between read-only and edit mode
  const { id: clubId } = useParams();
  const [newData, setNewData] = useState();

  
  const admin = useSelector((state) => state.admin.value);

  const accessToken = localStorage.getItem("accessToken");

  const apiUrl = `http://115.245.192.138/harkat/api/v1/club-database/${clubId}/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching data");
        }

        const json = await response.json();

        setData(json);
        setShowCity(!!json.club_city);
        console.log(json, "DATA");
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const formattedDate = new Date(data?.activation_date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // State to store the edited data
  const [editedData, setEditedData] = useState({});
 
    const { club_name , club_bio, club_vision,activities,max_member,min_member} = data ||{};
  
    
   
  
  
  const handleEdit = () => {
    setIsEditing(true);

    // Initialize editedData with the values from data
    setEditedData({club_name, club_bio, club_vision,activities,max_member,min_member} || {});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "PATCH", 
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });

      if (!response.ok) {
        throw new Error("Error updating data");
      }

      const updatedData = await response.json();
      setData(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <SingleHarkatPage/>
    </div>
 
            );
          };
    
          export default ExistingClubDetails;



          // <div>
     
          // <div className="cont" style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          //   {isEditing ? (
          //     // Edit Form
          //     <div>
          //        <h1
          //   style={{
          //     display: "flex",
          //     justifyContent: "center",
          //     textAlign: "center",
          //     marginTop: "10px",
          //     width: "100%",
          //     height: "5%",
          //     backgroundColor: "#ee3c4d",
          //     color: "white",
          //     fontWeight: "600",
          //     fontSize: "24px",
          //     borderRadius: "7px",
          //   }}
          // >
          //    Edit Club Details
          // </h1>
          //       <div
          //         className="cont"
          //         style={{ display: "flex", flexDirection: "column", width: "100%" }}
          //       >
          //         <div
          //           className="con1"
          //           style={{
    
          //             display: "flex",
          //             flexDirection: "row",
          //             justifyContent: "space-around",
          //             textAlign: "center",
          //             marginTop: "1em",
                    
          //           }}
          //         >
          //           <div style={{ width: "30%" }}>
          //             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>Club Name </h3>
          //             <input
                      
          //               type="text"
          //               name="club_name"
          //               value={editedData.club_name || ""}
          //               onChange={handleInputChange}
          //               maxLength="30"
          //              style={{width:"50%",padding:"7px"}}
          //             />
          //           </div>
          //           <div style={{ width: "30%" , opacity:"0.5"}}>
          //             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>Club Launch Date</h3>
          //             <p>{formattedDate}</p>
          //           </div>
          //           <div style={{ width: "30%", opacity:"0.5" }}>
          //             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>Postal Code</h3>
          //             <p>{data?.postal_code || ""}</p>
          //           </div>
          //         </div>
          //         <div
          //           className="con2"
          //           style={{
          //             display: "flex",
          //             flexDirection: "row",
          //             justifyContent: "space-around",
          //             textAlign: "center",
          //             marginTop: "1em",
          //             opacity:"0.5"
          //           }}
          //         >
          //           <div style={{ width: "30%" }}>
          //             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>Country</h3>
          //             <p>{data.country_name || ""}</p>
          //           </div>
          //           <div style={{ width: "30%" }}>
          //             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>State</h3>
          //             <p>{data.club_state || ""}</p>
          //           </div>
          //           {showCity && (
          //             <div style={{ width: "30%" }}>
          //               <h3 style={{ fontWeight: "600", fontSize: "18px" }}> City</h3>
          //               <p>{data.club_city || ""}</p>
          //             </div>
          //           )}
          //         </div>
          //         <div
          //           className="con3"
          //           style={{
          //             display: "flex",
          //             flexDirection: "row",
          //             justifyContent: "space-between",
          //             textAlign: "center",
          //             marginTop: "1em",
                     
          //           }}
          //         >
          //           <div style={{ width: "49%"  }}>
          //             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
          //               Minimum Number of Members in Club
          //             </h3>
          //             <input
          //               type="numeric"
          //               name="min_member"
          //               value={editedData.min_member || ""}
          //               onChange={handleInputChange}
          //               style={{width:"10%",padding:"7px"}}
          //               maxLength="200"
                        
          //             />
          //             <p style={{color:"red", fontSize:"15px"}}>Please write in numbers only</p>
          //             {/* <p>{data.min_member || ""}</p> */}
          //           </div>
          //           <div style={{ width: "49%" }}>
          //             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
          //               Maximum Number of Members in Club
          //             </h3>
          //             <input
          //               type="number"
          //               name="max_member"
          //               value={editedData.max_member || ""}
          //               onChange={handleInputChange}
          //               style={{width:"15%",padding:"7px"}}
          //               maxLength="200"
          //               required
                        
          //             />
          //             {/* <p>{data.max_member || ""}</p> */}
          //           </div>
          //         </div>
          //         <div
          //           className="con4"
          //           style={{
          //             display: "flex",
          //             flexDirection: "row",
          //             justifyContent: "space-between",
          //             textAlign: "center",
          //             marginTop: "1em",
                      
          //           }}
          //         >
          //           <div style={{ width: "49%" ,opacity:"0.5"}}>
          //             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
          //               Preferred Language of Members
          //             </h3>
          //             <p>{data.club_language || ""}</p>
          //           </div>
          //           <div style={{ width: "49%" }}>
          //             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
          //               Activities Conduct Per Month
          //             </h3>
          //             <input
          //               type="number"
          //               name="activities"
          //               value={editedData.activities || ""}
          //               onChange={handleInputChange}
          //               style={{width:"15%",padding:"7px"}}
          //               maxLength="200"
          //             />
          //             {/* <p>{editedData.activities || ""}</p> */}
          //           </div>
          //         </div>
          //         <div
          //           className="con5"
          //           style={{
          //             display: "flex",
          //             flexDirection: "row",
          //             justifyContent: "space-between",
          //             textAlign: "center",
          //             marginTop: "1em",
          //           }}
          //         >
          //           <div style={{ width: "49%" }}>
          //             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
          //               Club Description
          //             </h3>
          //             <input
          //               type="text"
          //               name="club_bio"
          //               value={editedData.club_bio || ""}
          //               onChange={handleInputChange}
          //               style={{width:"50%",padding:"7px"}}
          //               maxLength="350"
                        
          //             />
          //           </div>
          //           <div style={{ width: "49%" }}>
          //             <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
          //               What is your Vision For the Club
          //             </h3>
          //             <input
          //               type="text"
          //               name="club_vision"
          //               value={editedData.club_vision || ""}
          //               onChange={handleInputChange}
          //               style={{width:"50%",padding:"7px"}}
          //               maxLength="200"
          //             />
          //           </div>
          //         </div>
          //       </div>
          //       <div style={{ width: "100%", display: "flex", marginTop: "20px" }}>
          //         <div
          //           style={{
          //             margin: "auto",
          //             border: "1px solid red",
          //             width: "20%",
          //             textAlign: "center",
          //             borderRadius: "12px",
          //             backgroundColor: "#ee3c4d",
          //             color: "white",
          //           }}
          //         >
          //           <button onClick={handleSave}>Save</button>
          //         </div>
          //       </div>
          //     </div>
          //   ) : (
          //     <div>
          //        <h1
          //   style={{
          //     display: "flex",
          //     justifyContent: "center",
          //     textAlign: "center",
          //     marginTop: "10px",
          //     width: "100%",
          //     height: "5%",
          //     backgroundColor: "#ee3c4d",
          //     color: "white",
          //     fontWeight: "600",
          //     fontSize: "24px",
          //     borderRadius: "7px",
          //   }}
          // >
          //   Club Details
          // </h1>
          //                  <div>
                    
          //            <div
          //             className="cont"
          //             style={{ display: "flex", flexDirection: "column", width: "100%" }}
          //           >
          //             <div
          //               className="con1"
          //               style={{
          //                 display:"flex",
          //                 flexDirection:"row",
          //                 justifyContent:"space-between",
          //                 textAlign:"center",
          //                 marginTop:"1em",
          //                 marginBottom:"1em",
                         
          //               }}
          //             >
          //               <div style={{ width: "30%" }}>
          //                 <h3 style={{ fontWeight: "600", fontSize: "18px" }}>Club Name </h3>
          //                 <p>{data?.club_name}</p>
          //               </div>
          //               <div style={{ width: "30%" }}>
          //                 <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
          //                   {" "}
          //                   Club Launch Date
          //                 </h3>
          //                 <p>{formattedDate}</p>
          //               </div>
          //               <div style={{ width: "30%" }}>
          //                 <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
          //                   {" "}
          //                   Postal Code
          //                 </h3>
          //                 <p>{data?.postal_code}</p>
          //               </div>
          //             </div>
          //             <div
          //               className="con2"
          //               style={{
          //                 display: "flex",
          //                 flexDirection: "row",
          //                 justifyContent: "space-between",
          //                 textAlign: "center",
          //                 marginTop: "1em",
          //                 marginBottom:"1em",
                          
          //               }}
          //             >
          //               <div style={{ width: "30%" }}>
          //                 <h3 style={{ fontWeight: "600", fontSize: "18px" }}>Country</h3>
          //                 <p>{data?.country_name}</p>
          //               </div>
          //               <div style={{ width: "30%" }}>
          //                 <h3 style={{ fontWeight: "600", fontSize: "18px" }}>State</h3>
          //                 <p>{data?.club_state}</p>
          //               </div>
        
          //               {showCity && (
          //                 <div style={{ width: "30%" }}>
          //                   <h3 style={{ fontWeight: "600", fontSize: "18px" }}> City</h3>
          //                   <p>{data?.club_city}</p>
          //                 </div>
          //               )}
          //             </div>
          //             <div
          //               className="con3"
          //               style={{
          //                 display: "flex",
          //                 flexDirection: "row",
          //                 justifyContent: "space-between",
          //                 textAlign: "center",
          //                 marginTop: "1em",
          //                 marginBottom:"1em",
          //                 border:"1px solid red"
          //               }}
          //             >
          //               <div style={{ width: "40%" }}>
          //                 <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
          //                   Minimum Number of Members in Club
          //                 </h3>
          //                 <p>{data?.min_member}</p>
          //               </div>
          //               <div style={{ width: "40%" }}>
          //                 <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
          //                   Maximum Number of Members in Club
          //                 </h3>
          //                 <p>{data?.max_member}</p>
          //               </div>
          //             </div>
        
          //             <div
          //               className="con4"
          //               style={{
          //                 display: "flex",
          //                 flexDirection: "row",
          //                 justifyContent: "space-between",
          //                 textAlign: "center",
          //                 marginTop: "1em",
          //               }}
          //             >
          //               <div style={{ width: "45%", marginBottom:"1em" }}>
          //                 <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
          //                   Prefered Language of Members
          //                 </h3>
          //                 <p>{data?.club_language}</p>
          //               </div>
          //               <div style={{ width: "45%" }}>
          //                 <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
          //                   Activites Conduct Per Month
          //                 </h3>
          //                 <p>{data?.activities}</p>
          //               </div>
          //             </div>
          //             <div
          //               className="con5"
          //               style={{
          //                 display: "flex",
          //                 flexDirection: "row",
          //                 justifyContent: "space-between",
          //                 textAlign: "center",
          //                 marginTop: "1em",
          //               }}
          //             >
          //               <div style={{ width: "45%" }}>
          //                 <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
          //                   club Descripition
          //                 </h3>
          //                 <p>{data?.club_bio}</p>
          //               </div>
          //               <div style={{ width: "45%" }}>
          //                 <h3 style={{ fontWeight: "600", fontSize: "18px" }}>
          //                   what is your Vision For the Club
          //                 </h3>
          //                 <p>{data?.club_vision}</p>
          //               </div>
          //             </div>
          //           </div>
          //           {admin &&( <div style={{width:"100%" , display:"flex", marginTop:"50px"}}>
          //           <div style={{margin:"auto", border:"1px solid red", width:"20%", textAlign:"center", borderRadius:"12px",backgroundColor: "#ee3c4d",
          //                       color: "white",}}>
          //             <button onClick={handleEdit}>Edit</button>
          //           </div>
          //           </div>)}
                   
              
          //         </div>
          //               </div>
          //             )}
          //           </div>
          //         </div>