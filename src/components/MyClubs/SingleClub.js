import React, { useEffect, useState } from "react";
import { config, Url, accessToken } from "../myServer";

import {
  useGetClubMemberQuery,
  useGetHatkatDataNewQuery,
  useGetShareData,
} from "../../app/EndPoints/HarkatClub";

import { BsPersonVideo, BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";

import { GoVideo } from "react-icons/go";
import intro from "../../assets/intro.png";
// import linkedin from "../../assets/linkedin.png";
import introPng from "../../assets/intro.png";
import reelPng from "../../assets/reel.png";
import DarkBackground2 from "./DarkBackground2";

import "./singleCard.css";
import axios from "axios";

const SingleClub = ({ filteredResults}) => {
  const [toggle, setToggle] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [deactivatePopup, setDeactivatePopup] = useState(false);
  const [activatePopup, setActivatePopup] = useState(false);
  const [deletePopup, setdeletePopup] = useState(false);
  const [showDarkBackground, setShowDarkBackground] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [clubStatus, setClubStatus] = useState("active");
  let [data, setData] = useState([]);

  let [filterData, setFilterData] = useState([]);



  const [rerender, setRerender] = useState(false);



  // -----
  let [restaurantList, setResturentList] = useState([]);
  let [filterRestaurant, setFilterResturent] = useState([]);
  // let [toggle, setToggle] = useState(false);

  let [searchVal, setSearchVal] = useState("");

  // console.log("body render",restaurantList)


  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://mynextfilm.ai/harkat/get_user_club_data',   config
      );

      // Access the data property directly from the response
      const json = response?.data?.club_data;

      console.log("jjjj",json)

      setFilterResturent(
        // json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        json
      );
      setResturentList(
        // json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        json
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    // console.log("useEffect called")
    fetchData();
  }, []);

  // ----

  // Function to handle button click
  const handleButtonClick = () => {
    // Toggle the value of 'rerender' to trigger re-render
    setRerender(!rerender);
  };

  const showReelIcon = () => {
    document.querySelector(".show-reel-icon").style.display = "block";
  };

  const showVideoIcon = () => {
    document.querySelector(".video-intro-icon").style.display = "block";
  };

  const hideReelIcon = () => {
    document.querySelector(".show-reel-icon").style.display = "none";
  };

  const hideVideoIntroIcon = () => {
    document.querySelector(".video-intro-icon").style.display = "none";
  };

  const handleShareLinkPopup = () => {
    document.querySelector(".share-link-container").style.display = "block";
    document.querySelector(".dark-background").style.display = "block";
  };

  const openFormPopup = () => {
    document.querySelector(".propose-club-form-popup").style.display = "block";
    document.querySelector(".dark-background").style.display = "block";
  };

  const cardStyle = {
    border: `2px solid ${clubStatus === "active" ? "green" : "red"}`,
    padding: "10px",
    margin: "10px",
  };

  const handleClick = () => {
    setToggle(false);
    setIsButtonClicked(confirmed);
    console.log("handle Click function called");
  };

  const openDeactivateClubPopup = () => {
    setDeactivatePopup(true);
    setShowDarkBackground(true);
  };

  const closeDeactivatePopup = () => {
    setDeactivatePopup(false);
    setShowDarkBackground(false);
  };

  const openActivateClubPopup = () => {
    setActivatePopup(true);
    setShowDarkBackground(true);
  };

  const closeActivatePopup = () => {
    setActivatePopup(false);
    setShowDarkBackground(false);
  };

  const openDeleteClubPopup = () => {
    setdeletePopup(true);
    setShowDarkBackground(true);
  };

  const closeDeletePopup = () => {
    setdeletePopup(false);
    setShowDarkBackground(false);
  };

  const { data: clubss } = useGetHatkatDataNewQuery();

  let idd = `https://mynextfilm.ai/memberpage/#/user/517`;

  const arr = clubss || [];

  let new_data = clubss || [];

  const { data: clubsm } = useGetClubMemberQuery();

  const filteredArray = arr.filter(
    (obj) => obj.club_id?.user_id.id === clubsm?.id
  );

  const new_filteredArray = new_data.filter(
    (obj) => obj.club_id?.user_id.id !== clubsm?.id
  );

  useEffect(() => {
    if (clubss) {
      clubss.forEach((club, index) => {
        console.warn(`harkat_id ${index + 1} :`, club?.club_id?.harkat_id);
      });
    }
  }, [clubss]);

  const deactivateClub = (harkatId) => {
    fetch(`https://mynextfilm.ai/harkat/deactivate_club/${harkatId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ harkatId: harkatId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setConfirmed(true);
        setClubStatus("inactive");
        closeDeactivatePopup();
      })
      .catch((error) => {
        console.error("Error deactivating club", error);
      });
  };

  const activateClub = (harkatId) => {
    fetch(`https://mynextfilm.ai/harkat/activate_club/${harkatId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ harkatId: harkatId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setConfirmed(false);
        setClubStatus("active");
        closeActivatePopup();
      })
      .catch((error) => {
        console.error("Error activating club", error);
      });
    closeActivatePopup();
  };

  const deleteClub = (harkatId) => {
    fetch(`https://mynextfilm.ai/harkat/delete_club/${harkatId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ harkatId: harkatId }),
    })
      .then((response) => response.json())
      .then((data) => {
        closeDeletePopup();
      })
      .catch((error) => {
        console.error("Error deleting club", error);
      });
    closeDeletePopup();
  };


console.log("search",filteredResults)
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://mynextfilm.ai/harkat/get_user_club_data`,
  //       config
  //     );
  //     setData(response.data.club_data);
  //     let val=[response.data.club_data]
  //     console.log("aa",val[0])

  
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get(
    //       `https://mynextfilm.ai/harkat/get_user_club_data`,
    //       config
    //     );
    //     setData(response.data.club_data);
    //     console.log("single data check", response.data);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };
    // fetchData();
  }, [ ]);


console.log("dataaaa",data)

  return (
    <div className="">
      <div className="absolute right-[40px] top-[5px]">
      <input
      
      type="text"
      value={searchVal}
      onChange={(e) => setSearchVal(e.target.value)}
      // onInput={()=>{
      //     let filterData = restaurantList.filter((res) =>
      //   res?.club_id?.club_name.toLowerCase().includes(searchVal.toLowerCase())
      // );
      // // console.log("fil",filterData)
      // setFilterResturent(filterData);
      // }}
        className="rounded-[57px] bg-headingBg py-2 px-4 border border-headingBg w-[214px] "
        placeholder="Search "
      />
      <button   
  

    onClick={() => {
      let filterData = restaurantList.filter((res) =>
        res?.club_id?.club_name.toLowerCase().includes(searchVal.toLowerCase())
      );
      // console.log("fil",filterData)
      setFilterResturent(filterData);
    }}
     className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-[24px] h-[24px] ml-[-32px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>

      </div>


      <div>
        {filterRestaurant.length == 1 ? (
           <div className="grid grid-cols-4 gap-2">
           {filterRestaurant?.map((club) => (
             <div
               className=" bg-[#F8F8F8] rounded-md w-[298.199px] h-auto pt-2 pb-4 "
               style={cardStyle}
             >
               <div className="  pl-1 pr-3 w-[100%] h-[100%]">
                 <div className="flex justify-end items-center gap-1">
                   {toggle ? (
                     <div
                       className="flex justify-center w-[50%] h-6 z-10 relative left-[65px] bg-[#FAFAFA]"
                       onClick={handleClick}
                     >
                       <p className="border flex items-center border-gray-300 px-2 text-sm py-6 bg-[#FAFAFA]">
                         {confirmed ? (
                           <div className="activate-delete-buttons">
                             <button onClick={openActivateClubPopup}>
                               Activate Club
                             </button>
                             <button onClick={openDeleteClubPopup}>
                               Delete Club
                             </button>
                           </div>
                         ) : (
                           <button
                             className="bg-[#FAFAFA]"
                             onClick={openDeactivateClubPopup}
                           >
                             Deactivate Club
                           </button>
                         )}
                       </p>
                     </div>
                   ) : (
                     ""
                   )}
 
                   {/* <img src={vedioimg} alt="" />
     <img src={peopleimg} alt="" />
     <BsThreeDotsVertical /> */}
                   <div className="flex gap-2  ">
                     <GoVideo size={24} />
                     {/* <BsPersonVideo size={24} /> */}
 
                     <a
                       href="https://mynextfilm.ai/viewerlounge2/videointroduction/"
                       target="_blank"
                     >
                       <BsPersonVideo
                         size={24}
                         className="video-intro-btn"
                         // onMouseOver={showVideoIcon}
                         // onMouseLeave={hideVideoIntroIcon}
                       />
                     </a>
                   </div>
                   <div
                     className="three-dots"
                     onClick={() => setToggle(!toggle)}
                   >
                     <BsThreeDotsVertical size={24} />
                   </div>
                 </div>
                 <div className="flex  pl-2">
                   <div className="  ">
                     <img
                       className="w-[92px]  h-[83px] border-[#05B917] rounded-[50%] border-2"
                       src={`https://mynextfilm.ai/${club?.club_profile}`}
                       alt=""
                     />
                   </div>
                   <div className="flex justify-between gap-3  w-[80%]">
                     <div className="flex  ml-2 gap-10">
                       <div className="text-[#454545]">
                         <p className="text-[14px] font-bold text-[#454545]">
                           {club?.club_id?.club_name}
                         </p>
                         <p className="text-[10px] ">
                           {club?.club_id?.club_language}
                         </p>
                         <p className="text-[10px] ">
                           {club?.club_id?.club_city}
                           {club?.club_id?.club_state}{" "}
                           {club?.club_id?.country_name}{" "}
                         </p>
                         <p className="text-[10px] ">
                           {" "}
                           {`Active since ${
                             club?.club_id?.activation_date
                               ? new Date(club.club_id.activation_date)
                                   .toISOString()
                                   .split("T")[0]
                                   .split("-")
                                   .reverse()
                                   .join("-")
                               : ""
                           }`}
                         </p>
                         <p className="text-[10px] ">10/40 members</p>
                       </div>
                     </div>
                     {/* <BsThreeDotsVertical /> */}
                   </div>
                 </div>
                 <div className="flex items-center py-2 pl-3 gap-2 ">
                   <img
                     className="w-4  h-4  rounded-[50%]"
                     src="https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/hfpqyV7B-IMG-Dubai-UAE.jpg"
                     alt="a"
                   />
                   <p className="text-[12px] text-[#5B5B5B] cursor-pointer">
                     <a
                       href={`https://mynextfilm.ai/memberpage/#/user/${club?.club_id?.user_id?.id}`}
                     >
                       {" "}
                       Administered/proposed by{" "}
                       <span className="font-bold border-b-2">
                         {" "}
                         {club?.club_id?.club_proposer}
                       </span>
                     </a>{" "}
                   </p>
                 </div>
                 <div className="pl-2 ">
                   <p className="text-[12px] pl-2 pb-2 text-[#5B5B5B]  h-20">
                     {club?.club_id?.club_vision}
                   </p>
                 </div>
                 <div className="flex justify-between  pl-2">
                   {filterRestaurant.length == 1 ? (
                     <button
                       className="border rounded-md px-[19px] py-[4px] border-[#33B0CA] text-[#33B0CA] "
                       onClick={handleShareLinkPopup}
                     >
                       Share Link
                     </button>
                   ) : (
                     <button onClick={()=>window.location.reload()} className="border bg-[#33B0CA] px-[19px] py-[4px] rounded-md text-[14px] text-[#F4F4F4]">
                      
                       {" "}
                       <Link to={`/${club?.club_id?.harkat_id}`}>
                         {" "}
                         View Club{" "}
                       </Link>
                     </button>
                   )}
 
                   {filterRestaurant.length == 1 ? (
                     <button onClick={()=>window.location.reload()} className="border bg-[#33B0CA] px-[19px] py-[4px] rounded-md text-[14px] text-[#F4F4F4]">
                       {" "}
                       <Link to={`/${club?.club_id?.harkat_id}`}>
                         {" "}
                         View Club{" "}
                       </Link>
                     </button>
                   ) : (
                     <button
                       className="border bg-[#33B0CA] px-[19px] py-[4px] rounded-md text-[14px] text-[#F4F4F4]"
                       onClick={openFormPopup}
                     >
                       Request to join
                     </button>
                   )}
                   {/* <button
                         className="border bg-[#33B0CA] px-[19px] py-[4px] rounded-md text-[14px] text-[#F4F4F4]"
                         onClick={openFormPopup}
                       >
                         Request to join
                       </button> */}
                 </div>
               </div>

               {deactivatePopup && (
                 <div className="form-container deactivate-container">
                   <div className="from-content deactivate-content">
                     <h2>Are you sure you want to Deactivate your club?</h2>
                     <button
                       className="yes"
                       onClick={() => deactivateClub(club?.club_id?.harkat_id)}
                     >
                       Yes
                     </button>
                     <button className="no" onClick={closeDeactivatePopup}>
                       No
                     </button>
                   </div>
                 </div>
               )}
 
               {activatePopup && (
                 <div className="form-container activate-container">
                   <div className="from-content activate-content">
                     <h2>Are you sure you want to Activate your club?</h2>
                     <button
                       className="yes"
                       onClick={() => activateClub(club?.club_id?.harkat_id)}
                     >
                       Yes
                     </button>
                     <button className="no" onClick={closeActivatePopup}>
                       No
                     </button>
                   </div>
                 </div>
               )}
 
               {deletePopup && (
                 <div className="form-container activate-container">
                   <div className="from-content activate-content">
                     <h2>Are you sure you want to Delete your club?</h2>
                     <button
                       className="yes"
                       onClick={() => deleteClub(club?.club_id?.harkat_id)}
                     >
                       Yes
                     </button>
                     <button className="no" onClick={closeDeletePopup}>
                       No
                     </button>
                   </div>
                 </div>
               )}
 
               {showDarkBackground && <DarkBackground2 />}

             </div>
           ))}
         </div>
        ) : (
          <>
          <div className="border flex items-center justify-center py-4 mb-5 rounded-md bg-[#EAEAEA]">
            <p className="font-medium text-[32px] text-[#787878]">
              Join any of the following clubs or{" "}
              <span className="font-semibold text-[#33B0CA] border-b border-b-[#33B0CA]">
                <a href="https://mynextfilm.ai/harkat/propose">
                  {" "}
                  Propose a new club{" "}
                </a>{" "}
              </span>{" "}
            </p>
          </div>
          <div className="grid grid-cols-4 gap-2">
           {filterRestaurant?.map((club) => (
             <div
               className=" bg-[#F8F8F8] rounded-md w-[298.199px] h-auto pt-2 pb-4 "
               style={cardStyle}
             >
               <div className="  pl-1 pr-3 w-[100%] h-[100%]">
                 <div className="flex justify-end items-center gap-1">
                   {toggle ? (
                     <div
                       className="flex justify-center w-[50%] h-6 z-10 relative left-[65px] bg-[#FAFAFA]"
                       onClick={handleClick}
                     >
                       <p className="border flex items-center border-gray-300 px-2 text-sm py-6 bg-[#FAFAFA]">
                         {confirmed ? (
                           <div className="activate-delete-buttons">
                             <button onClick={openActivateClubPopup}>
                               Activate Club
                             </button>
                             <button onClick={openDeleteClubPopup}>
                               Delete Club
                             </button>
                           </div>
                         ) : (
                           <button
                             className="bg-[#FAFAFA]"
                             onClick={openDeactivateClubPopup}
                           >
                             Deactivate Club
                           </button>
                         )}
                       </p>
                     </div>
                   ) : (
                     ""
                   )}
 
                   {/* <img src={vedioimg} alt="" />
     <img src={peopleimg} alt="" />
     <BsThreeDotsVertical /> */}
                   <div className="flex gap-2  ">
                     <GoVideo size={24} />
                     {/* <BsPersonVideo size={24} /> */}
 
                     <a
                       href="https://mynextfilm.ai/viewerlounge2/videointroduction/"
                       target="_blank"
                     >
                       <BsPersonVideo
                         size={24}
                         className="video-intro-btn"
                         // onMouseOver={showVideoIcon}
                         // onMouseLeave={hideVideoIntroIcon}
                       />
                     </a>
                   </div>
                   <div
                     className="three-dots"
                     onClick={() => setToggle(!toggle)}
                   >
                     <BsThreeDotsVertical size={24} />
                   </div>
                 </div>
                 <div className="flex  pl-2">
                   <div className="  ">
                     <img
                       className="w-[92px]  h-[83px] border-[#05B917] rounded-[50%] border-2"
                       src={`https://mynextfilm.ai/${club?.club_profile}`}
                       alt=""
                     />
                   </div>
                   <div className="flex justify-between gap-3  w-[80%]">
                     <div className="flex  ml-2 gap-10">
                       <div className="text-[#454545]">
                         <p className="text-[14px] font-bold text-[#454545]">
                           {club?.club_id?.club_name}
                         </p>
                         <p className="text-[10px] ">
                           {club?.club_id?.club_language}
                         </p>
                         <p className="text-[10px] ">
                           {club?.club_id?.club_city}
                           {club?.club_id?.club_state}{" "}
                           {club?.club_id?.country_name}{" "}
                         </p>
                         <p className="text-[10px] ">
                           {" "}
                           {`Active since ${
                             club?.club_id?.activation_date
                               ? new Date(club.club_id.activation_date)
                                   .toISOString()
                                   .split("T")[0]
                                   .split("-")
                                   .reverse()
                                   .join("-")
                               : ""
                           }`}
                         </p>
                         <p className="text-[10px] ">10/40 members</p>
                       </div>
                     </div>
                     {/* <BsThreeDotsVertical /> */}
                   </div>
                 </div>
                 <div className="flex items-center py-2 pl-3 gap-2 ">
                   <img
                     className="w-4  h-4  rounded-[50%]"
                     src="https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/hfpqyV7B-IMG-Dubai-UAE.jpg"
                     alt="a"
                   />
                   <p className="text-[12px] text-[#5B5B5B] cursor-pointer">
                     <a
                       href={`https://mynextfilm.ai/memberpage/#/user/${club?.club_id?.user_id?.id}`}
                     >
                       {" "}
                       Administered/proposed by{" "}
                       <span className="font-bold border-b-2">
                         {" "}
                         {club?.club_id?.club_proposer}
                       </span>
                     </a>{" "}
                   </p>
                 </div>
                 <div className="pl-2 ">
                   <p className="text-[12px] pl-2 pb-2 text-[#5B5B5B]  h-20">
                     {club?.club_id?.club_vision}
                   </p>
                 </div>
                 <div className="flex justify-between  pl-2">
                   {filterRestaurant.length == 1 ? (
                     <button
                       className="border rounded-md px-[19px] py-[4px] border-[#33B0CA] text-[#33B0CA] "
                       onClick={handleShareLinkPopup}
                     >
                       Share Link
                     </button>
                   ) : (
                     <button className="border bg-[#F4F4F4]  border-red-600 px-[19px] py-[4px] rounded-md text-[14px] text-red-600">
                       {" "}
                       <Link to={`/${club?.club_id?.harkat_id}`}>
                         {" "}
                         View Club{" "}
                       </Link>
                     </button>
                   )}
 
                   {filterRestaurant.length == 1 ? (
                     <button className="border bg-[#F4F4F4]  border-red-600 px-[19px] py-[4px] rounded-md text-[14px] text-red-600">
                       {" "}
                       <Link to={`/${club?.club_id?.harkat_id}`}>
                         {" "}
                         View Club{" "}
                       </Link>
                     </button>
                   ) : (
                     <button
                       className="border bg-[#33B0CA] px-[19px] py-[4px] rounded-md text-[14px] text-[#F4F4F4]"
                       onClick={openFormPopup}
                     >
                       Request to join
                     </button>
                   )}
                   {/* <button
                         className="border bg-[#33B0CA] px-[19px] py-[4px] rounded-md text-[14px] text-[#F4F4F4]"
                         onClick={openFormPopup}
                       >
                         Request to join
                       </button> */}
                 </div>
               </div>
               {/* -------------------- */}
               {deactivatePopup && (
                 <div className="form-container deactivate-container">
                   <div className="from-content deactivate-content">
                     <h2>Are you sure you want to Deactivate your club?</h2>
                     <button
                       className="yes"
                       onClick={() => deactivateClub(club?.club_id?.harkat_id)}
                     >
                       Yes
                     </button>
                     <button className="no" onClick={closeDeactivatePopup}>
                       No
                     </button>
                   </div>
                 </div>
               )}
 
               {activatePopup && (
                 <div className="form-container activate-container">
                   <div className="from-content activate-content">
                     <h2>Are you sure you want to Activate your club?</h2>
                     <button
                       className="yes"
                       onClick={() => activateClub(club?.club_id?.harkat_id)}
                     >
                       Yes
                     </button>
                     <button className="no" onClick={closeActivatePopup}>
                       No
                     </button>
                   </div>
                 </div>
               )}
 
               {deletePopup && (
                 <div className="form-container activate-container">
                   <div className="from-content activate-content">
                     <h2>Are you sure you want to Delete your club?</h2>
                     <button
                       className="yes"
                       onClick={() => deleteClub(club?.club_id?.harkat_id)}
                     >
                       Yes
                     </button>
                     <button className="no" onClick={closeDeletePopup}>
                       No
                     </button>
                   </div>
                 </div>
               )}
 
               {showDarkBackground && <DarkBackground2 />}
               {/* -------------------- */}
             </div>
           ))}
         </div>
          </>
        )
        }
       
      </div>
    </div>
  );
};

export default SingleClub;
