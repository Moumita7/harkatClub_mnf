import React, { useState,useEffect, useContext } from "react";
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
import introPng from "../../assets/intro.png"
import reelPng from "../../assets/reel.png"
import axios from "axios";
import { config } from "../myServer";

import "./singleCard.css";
import { getDate } from "date-fns";
import { UserContext } from "../../App";

const MyRequestedClub = () => {
  // const { data: clubss } = useGetHatkatDataNewQuery();
  // const arr = clubss || [];
  // const filteredArray = arr.filter(
  //   (obj) => obj.club_id?.user_id.id === clubsm?.id
  // );
  // console.log("check dataa", filteredArray);

  let [memberData,setMemberData]=useState([])



  const fetchData = async () => {
    try {
      const response = await axios.get(`https://mynextfilm.ai/harkat/pending_club_requests`, config);
      // setData(response.data);
      console.log("ressquest Pending", response.data);
      setMemberData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteData = async (itemIdToDelete) => {
    try {
    
      const response = await axios.get(`https://mynextfilm.ai/harkat/cancel_join_request/${itemIdToDelete}`,config);

      console.log('Delete Response:', response.data);
      fetchData()
      
      // setMemberData(response.data)

    } catch (error) {
      console.error('Error deleting data:', error);

    }
  };



  useEffect(() => {

    fetchData();
    
    
  }, []);

  return (
    // <div className="flex flex-row flex-wrap gap-10 border">
        <div className=" flex flex-wrap   gap-5">





{memberData.map((club)=>(
      <div className=" bg-[#F8F8F8] rounded-md w-[298.199px] h-auto pt-2 pb-4 ">
      <div className="  pl-1 pr-3 w-[100%] h-[100%]">
        <div className="flex justify-end items-center gap-1">
          {/* <img src={vedioimg} alt="" />
<img src={peopleimg} alt="" />
<BsThreeDotsVertical /> */}
          <div className="flex gap-2  ">
            <GoVideo size={24} />
            <BsPersonVideo size={24} />
          </div>
          <BsThreeDotsVertical size={24} />
        </div>
        <div className="flex  pl-2">
          <div className="  ">
            <img
              className="w-[92px]  h-[83px] border-[#05B917] rounded-[50%] border-2"
              src={`https://mynextfilm.ai/${club.club_profile}`}
              alt=""
            />
          </div>
          <div className="flex justify-between gap-3  w-[80%]">
            <div className="flex  ml-2 gap-10">
              <div className="text-[#454545]">
                <p className="text-[14px] font-bold text-[#454545] filter-club-name">
                  {club?.club_id.club_name}
                </p>
                <p className="text-[10px] ">
                  {club?.club_id.club_language}
                </p>
                <p className="text-[10px] ">
                  {club?.club_id.club_city}
                  {club?.club_id.club_state}{" "}
                  {club?.club_id.country_name}{" "}
                </p>
                <p className="text-[10px] ">
                  {" "}
                  {`Active since ${club?.club_id.activation_date
                      ? new Date(club?.club_id.activation_date)
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
              href={`https://mynextfilm.ai/memberpage/#/user/${club?.club_id.user_id?.id}`}
            >
              {" "}
              Administered/proposed by{" "}
              <span className="font-bold border-b-2">
                {" "}
                {club?.club_id.club_proposer}
              </span>
            </a>{" "}
          </p>
        </div>
        <div className="pl-2 ">
          <p className="text-[12px] pl-2 pb-2 text-[#5B5B5B]  h-20">
            {club?.club_id.club_vision}
          </p>
        </div>
        <div className="flex justify-between  pl-2">
        <button className="border bg-[#F4F4F4]  border-red-600 px-[19px] py-[4px] rounded-md text-[14px] text-red-600">

      
       Share Link
          </button>
          <button
            className="border bg-[#33B0CA] px-[19px] py-[4px] rounded-md text-[14px] text-[#F4F4F4]"
            // onClick={openFormPopup}
            onClick={() => deleteData(club?.club_id.harkat_id)}
          >
            {" "}
         
              cancel request

    
          </button>
  
        </div>
      </div>
    </div>
))}





</div>
    // </div>
  )
}

export default MyRequestedClub