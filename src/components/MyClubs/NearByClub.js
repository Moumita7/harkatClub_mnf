import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  useGetClubMemberQuery,
  useGetHatkatDataNewQuery,
  useGetHatkatDataQuery,
} from "../../app/EndPoints/HarkatClub";
// import { Link } from "react-router-dom";
import peopleimg from "../images/people.svg";
import vedioimg from "../images/vedio.svg";
import { BsPersonVideo } from "react-icons/bs";
import { GoVideo } from "react-icons/go";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MyJoindClub from "./MyJoindClub";
import MyRequestedClub from "./MyRequestedClub";
import searchimg from "../images/search.svg";

// import peopleimg from "../images/people.svg"
// import vedioimg from "../images/vedio.svg"
// import { GoVideo } from "react-icons/go";
const NearByClub = () => {
  const { data: clubs, isLoading } = useGetHatkatDataQuery();
  // const { data: clubss} = useGetHatkatDataNewQuery();
  // const { data: clubsm} =  useGetClubMemberQuery();
  const admin = useSelector((state) => state.admin.value);

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  let [adminVal, setAdminVal] = useState(admin);
  const cardStyle = {
    border: `2px solid ${isButtonClicked ? "red" : "green"}`,
    padding: "10px",
    margin: "10px",
  };

  let changeAdmin = () => {
    setAdminVal(!admin);
  };
  // changeAdmin()

  const openFormPopup = () => {
    document.querySelector(".form-container").style.display = "block";
    document.querySelector(".dark-background").style.display = "block";
  };

  const { data: clubss } = useGetHatkatDataNewQuery();
  const arr = clubss || [];

  let new_data = clubss || [];
  console.log("clubss",clubss)
  // const user = useSelector((state) => state.user.id);

  // console.log("user",user)
  const { data: clubsm } = useGetClubMemberQuery();
  // console.log("clubsm",clubsm)

  const filteredArray = arr.filter(
    (obj) => obj.club_id?.user_id.id === clubsm?.id
  );

  const new_filteredArray = new_data.filter(
    (obj) => obj.club_id?.user_id.id !== clubsm?.id
  );
  return (
    <div className="">
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
      <div>
        {filteredArray.length === 0 ? (
          <div>
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
              {new_filteredArray?.map((club) => (
                <div
                  className="bg-[#F8F8F8] rounded-md w-[298.199px] h-auto pt-2 pb-4"
                  style={cardStyle}
                >
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
                      <button onClick={()=>window.location.reload()} className="border bg-[#F4F4F4]  border-red-600 px-[19px] py-[4px] rounded-md text-[14px] text-red-600">
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className=" ">
            <h2>My clubs</h2>
            <MyJoindClub />
            <h2>Requested clubs</h2>
            <MyRequestedClub />
          </div>
        )}
      </div>
    </div>
  );
};

export default NearByClub;

// {new_filteredArray?.map((club) => (

//   <div className="flex flex-wrap items-center justify-center self-normal border rounded-lg bg-gray-50  w-auto h-auto mt-2 pt-2 pb-2 pl-1 pr-1 ">
//   <div className="flex justify-between">
//     <img
//       className="w-16 h-16 rounded-[50%]"
//       src={`https://mynextfilm.ai/${club.club_profile}`}
//       alt=""
//     />
//     <div className="ml-1 flex flex-col flex-wrap  self-normal">
//       <p className="font-bold overflow-hidden">{club?.club_id?.club_name}</p>
//       <p>{club?.club_id?.club_language}</p>
//       <p>{club?.club_id?.country_name}</p>

//       <div className="flex gap-4 items-center relative  mt-auto ">
//       <div>
//          <img className="w-4 h-4 rounded-[50%]" src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" alt="" />

//          <img className="w-4 h-4 rounded-[50%] absolute top-1 left-3"  src="https://www.w3schools.com/howto/img_avatar2.png" alt="" />
//       </div>
//          <p  className="mt-auto">3 mutual friend</p>
//       </div>

//     </div>
//     <BsThreeDotsVertical />
//   </div>
// <div className=" h-30 w-[100%] flex justify-center">
// <div className=" w-[90%] py-4">
// <p >
//     Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
//     repellendus aliquam molestias blanditiis velit.
//   </p>
//   <p>{club?.club_id?.club_bio}</p>
// </div>

// </div>

//   <div className="flex justify-center gap-3 mt-auto ">
//     <button className="border rounded-md px-4 py-1 border-red-500 text-[#33B0CA] ">
//     <Link to={`/${club?.club_id?.harkat_id}`}>
//       Visit Now
//       </Link>
//     </button>
//     <button className="border rounded-md px-2 py-1 bg-[#33B0CA] text-white">

// Request to join

//     </button>
//   </div>
// </div>

//                   ))}
