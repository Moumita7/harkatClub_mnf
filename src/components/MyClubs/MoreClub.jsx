import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { config } from '../myServer'



import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
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
// import axios from "axios";

const MapComponent = ({ center }) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyB1MYsGDfXWvXU_TyghY05_JagCzafnCZ8">
      <GoogleMap mapContainerStyle={{ height: '470px', width: '834px' }} center={center} zoom={13}>
        <Marker position={center}></Marker>
      </GoogleMap>
    </LoadScript>
  );
};



const MoreClub = () => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  let [checkMap,setCheckMap]=useState(false)

  let [data,setData]=useState([])
  const openFormPopup = () => {
    document.querySelector(".propose-club-form-popup").style.display = "block";
    document.querySelector(".dark-background").style.display = "block";
  };

  useEffect(()=>{
let getData=async()=>{
  let res=await axios.get("https://mynextfilm.ai/harkat/find_nearby_clubs",config)
  console.log("more cluv",res.data)
  setData(res.data)
}
getData()
  },[])

  const handleGetCurrentLocation = (club) => {
    const latitude = club?.club_id?.latitude;
    const longitude = club?.club_id?.longitude;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
        // setData({
        //   latitude:latitude,
        //   longitude:longitude
        // })
      });
      setCheckMap(!checkMap)
    } else {
      console.error('Geolocation is not supported by this browser.');
    }

  document.querySelector(".share-link-container").style.display = "none";
  // setToggle(false)

  };




  const closeMyMapp = () => {
    // const url = "https://mynextfilm.ai/harkat/update_user_location";

    // axios.post(url,data,config)
    // .then(data =>  console.log(data.data, "response send success"))
    // .catch((err)=>{
    //   console.log("error : ",err)
    // })


    document.querySelector(".mymapp").style.display = "none";
    document.querySelector(".dark-background").style.display = "none";
  }
  return (
    <div>
         <div className="absolute right-[40px] top-[5px]">
      <input
      
      type="text"
      // value={searchVal}
      // onChange={(e) => setSearchVal(e.target.value)}
     
        className="rounded-[57px] bg-headingBg py-2 px-4 border border-headingBg w-[214px] "
        placeholder="Search "
      />
      <button   
  

    onClick={() => {
      // let filterData = restaurantList.filter((res) =>
      //   res?.club_id?.club_name.toLowerCase().includes(searchVal.toLowerCase())
      // );
      // // console.log("fil",filterData)
      // setFilterResturent(filterData);
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
            <div className="grid grid-cols-4 gap-2">
              {data?.map((club) => (
                <div className=" bg-[#F8F8F8] rounded-md w-[298.199px] h-auto pt-2 pb-4 ">
                  <div className="  pl-1 pr-3 w-[100%] h-[100%]">
                    <div className="flex justify-end items-center gap-1">
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
                      {/* <BsThreeDotsVertical size={24} /> */}
                      <div
                      className="three-dots"
                      // onClick={() => setToggle(!toggle)}
                    >
                      <BsThreeDotsVertical size={24} />
                    </div>
                    </div>
                    <div className="flex  pl-2">
                      <div className="  ">
                        <img
                          className="w-[92px]  h-[83px]  rounded-[50%] border-2"
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
                            <p onClick={()=>handleGetCurrentLocation(club)} className='text-[10px] text-red-600 cursor-pointer'>view location</p>
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
                    <button onClick={()=>window.location.reload()}  className="border rounded-md px-[19px] py-[4px] border-[#33B0CA] text-[#33B0CA] ">
                      {" "}
                      <Link to={`/${club?.club_id?.harkat_id}`}>
                        {" "}
                        View Club{" "}
                      </Link>
                    </button>
                    <button
                      className="border bg-[#33B0CA] px-[19px] py-[4px] rounded-md text-[14px] text-[#F4F4F4]"
                      onClick={openFormPopup}
                    >
                      Request to join
                    </button>
                      {/* {
                        data.length==1? 
                        <button
                        className="border rounded-md px-[19px] py-[4px] border-[#33B0CA] text-[#33B0CA] "
                        // onClick={handleShareLinkPopup}
                      >
                        Share Link
                      </button>
                      :
                      <button onClick={()=>window.location.reload()} className="border bg-[#F4F4F4]  border-red-600 px-[19px] py-[4px] rounded-md text-[14px] text-red-600">
                      {" "}
                      <Link to={`/${club?.club_id?.harkat_id}`}>
                        {" "}
                        View Club{" "}
                      </Link>
                    </button>

                      } */}
{/*                   
                      {
                        data.length==1? 
                        <button onClick={()=>window.location.reload()} className="border bg-[#F4F4F4]  border-red-600 px-[19px] py-[4px] rounded-md text-[14px] text-red-600">
                        {" "}
                        <Link to={`/${club?.club_id?.harkat_id}`}>
                          {" "}
                          View Club{" "}
                        </Link>
                      </button>
                      :
                      <button
                      className="border bg-[#33B0CA] px-[19px] py-[4px] rounded-md text-[14px] text-[#F4F4F4]"
                      onClick={openFormPopup}
                    >
                      Request to join
                    </button>
                      } */}
                      {/* <button
                        className="border bg-[#33B0CA] px-[19px] py-[4px] rounded-md text-[14px] text-[#F4F4F4]"
                        onClick={openFormPopup}
                      >
                        Request to join
                      </button> */}


                    </div>
                  </div>
                </div>
              ))}
            
            </div>
            {/* <div className='border border-red-300  absolute top-[15%] left-[20%]'>

            {
              checkMap?
              <MapComponent center={currentLocation} />:""
            }
            </div> */}
            {checkMap?
                 <div className='bg-[#D1E6D9] fixed top-[50%] left-[50%]  flex justify-center z-4 mymapp'>
             <div className=' p-5' >
                {/* <input type="text" placeholder='Search Box' /> */}
                
                <div>
       <MapComponent center={currentLocation} />
       <div className='flex justify-end'>

       <button className='bg-red-600 py-1 px-4 rounded-md text-white' onClick={closeMyMapp}>Close</button>
       </div>
</div> 
             </div>
             </div>
             :""}
    </div>
  )
}

export default MoreClub