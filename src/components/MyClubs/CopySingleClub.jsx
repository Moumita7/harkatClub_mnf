import React from "react";
import {
  useGetClubMemberQuery,
  useGetHatkatDataNewQuery,
  useGetShareData,
} from "../../app/EndPoints/HarkatClub";

import { BsPersonVideo, BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";

// import peopleimg from "../images/people.svg"
// import vedioimg from "../images/vedio.svg"
import { GoVideo } from "react-icons/go";
import intro from "../../assets/intro.png"
// import linkedin from "../../assets/linkedin.png";


import "./singleCard.css";

const SingleClubb = () => {
  const handleShareLinkPopup = () => {
    document.querySelector(".share-link-container").style.display = "block";
    document.querySelector(".dark-background").style.display = "block";
  };

  const openFormPopup = () => {
    document.querySelector(".form-container").style.display = "block";
    document.querySelector(".dark-background").style.display = "block";
  };

  let idd = `https://mynextfilm.ai/memberpage/#/user/517`;

  // const { data: club, isLoading } = useGetClubDataQuery();
  const { data: clubss } = useGetHatkatDataNewQuery();
  const arr = clubss || [];

  let new_data = clubss || [];
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

  // const { data: sharedata } =useGetShareData(517);
  // console.log("sh",sharedata)

  return (
    <div className="">
      {/* <div className="border flex items-center justify-center py-4 mb-5 rounded-md bg-[#FFE0E3]">

<p className="font-medium text-[32px] text-[#787878]">Join any of the following clubs  or <span className=" text-[#EE3C4D] border-b border-b-red-600"><a href="http://115.245.192.138/harkat/propose">  Propose a new club </a> </span> </p>
</div> */}
      <div className=" ">
        {/* <div> */}
        {/* {clubs?.results?.map((club) => ( */}


        {/* for map start */}
        <div className="border flex justify-center w-[100%] relative top-10">
          <p>map</p>
        </div>
        {/* for map end */}


        {filteredArray.length === 0 ? (
          <div>
            <div className="border flex items-center justify-center py-4 mb-5 rounded-md bg-colorHeading">
              <p className="font-medium text-[32px] text-[#787878]">
                Join any of the following clubs or{" "}
                <span className="font-semibold text-[#EE3C4D] border-b border-b-colorButton">
                  <a href="http://115.245.192.138/harkat/propose">
                    {" "}
                    Propose a new club{" "}
                  </a>{" "}
                </span>{" "}
              </p>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {new_filteredArray?.map((club) => (
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
                          src={`http://115.245.192.138/${club.club_profile}`}
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
                      <button className="border bg-[#F4F4F4]  border-red-600 px-[19px] py-[4px] rounded-md text-[14px] text-red-600">
                        {" "}
                        <Link to={`/${club?.club_id?.harkat_id}`}>
                          {" "}
                          View Club{" "}
                        </Link>
                      </button>
                      <button
                        className="border bg-[#EE3C4D] px-[19px] py-[4px] rounded-md text-[14px] text-[#F4F4F4]"
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
          <div className=" w-[298px]">
            {filteredArray?.map((club) => (
              // <div className="flex flex-wrap justify-center items-center self-normal border border-4 rounded-lg bg-gray-50  w-auto h-auto mt-2 pt-2 pb-2 pl-1 pr-1 ">
              // <div className="flex justify-between ">
              //   <img
              //     className="w-16 h-16 rounded-[50%]"
              //     src={`http://115.245.192.138/${club.club_profile}`}
              //     alt=""
              //   />
              //   <div className="ml-1 flex flex-col flex-wrap  self-normal">
              //     <p className="font-bold overflow-hidden">{club?.club_id?.club_name}</p>
              //     <p>{club?.club_id?.club_language}</p>
              //     <p>{club?.club_id?.country_name}</p>

              //   </div>
              //   <BsThreeDotsVertical />
              // </div>
              // <div className=" h-30 w-[100%] flex justify-center">
              // <div className=" w-[90%] py-4">
              // <p >
              //   Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
              //   repellendus aliquam molestias blanditiis velit.
              // </p>
              // <p>{club?.club_id?.club_bio}</p>
              // </div>

              // </div>

              // <div className="flex justify-center gap-3 mt-auto ">
              //   <button className="border rounded-md px-4 py-1 border-red-500 text-[#EE3C4D] " onClick={handleShareLinkPopup}>
              //     Share Link
              //   </button>
              //   <button className="border rounded-md px-2 py-1 bg-[#EE3C4D] text-white">
              //   <Link to={`/${club?.club_id?.harkat_id}`}>
              //     Open Club
              //     </Link>
              //   </button>
              // </div>
              // </div>
              <div className="bg-[#F8F8F8]  rounded-md w-[298.199px] h-auto pt-2 pb-4 green-card-design">
                <div className="  pl-1 pr-3 w-[100%] h-[100%]">
                  <div className="flex justify-end items-center  ">
                    {/* <img src={vedioimg} alt="" />
<img src={peopleimg} alt="" />
<BsThreeDotsVertical /> */}
                    <div className="flex gap-2 border border-blue-200  relative">
                      {/* <div className=" absolute top-[-6px] border border-red-800 bg-white left-2">

                    <img className="border border-2 w-[100%] h-[100%]" src={intro} alt="" />
                      </div> */}
                      
                      <GoVideo size={24} />
                      <BsPersonVideo size={24} />
                    </div>
                    <BsThreeDotsVertical size={24} />
                  </div>
                  <div className="flex  pl-2">
                    <div className="  ">
                      <img
                        className="w-[92px]  h-[83px]  rounded-[50%] border-2"
                        src={`http://115.245.192.138/${club.club_profile}`}
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
                    <button
                      className="border rounded-md px-[19px] py-[4px] border-red-500 text-[#EE3C4D] "
                      onClick={handleShareLinkPopup}
                    >
                      Share Link
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="border rounded-md px-[19px] py-[4px] bg-[#EE3C4D] text-white"
                    >
                      <Link to={`/${club?.club_id?.harkat_id}`}>Open Club</Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleClubb;

// import React from "react";
// import { useGetClubDataQuery, useGetClubMemberQuery, useGetHatkatDataNewQuery } from "../../app/EndPoints/HarkatClub";
// import { useSelector } from "react-redux";
// import { BsThreeDotsVertical } from "react-icons/bs";

// const SingleClub = () => {
//   // const { data: club, isLoading } = useGetClubDataQuery();
//   const { data: clubss} = useGetHatkatDataNewQuery();
//   const arr=clubss|| []

//   // const user = useSelector((state) => state.user.id);

//   // console.log("user",user)
//   const { data: clubsm} =  useGetClubMemberQuery();
//   console.log("clubsm",clubsm)
//   console.log("club",clubss)

//   const filteredArray = arr.filter(obj => obj.club_id?.user_id.id === clubsm?.id);
//     console.log("fik",filteredArray);

//   return (
//     <div className="">
//     <p className="font-bold">Purposed by you</p>
//     {filteredArray.map((club)=>{
// return (
//   <div className="border rounded-md  w-56 h-auto mt-2 pt-2 pb-2 pl-1 pr-1 ">
//       <div className="flex justify-between">
//         <img
//           className="w-16 h-16 rounded-[50%]"
//           src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
//           alt=""
//         />
//         <div className="ml-1">
//         <p className="font-bold overflow-hidden">{club?.club_id?.club_name}</p>
//           <p>{club?.club_id?.club_language}</p>
//             <p>{club?.club_id?.country_name}</p>
//         </div>
//        <BsThreeDotsVertical/>
//       </div>

//       <p>
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
//         repellendus aliquam molestias blanditiis velit.
//       </p>

//       <div className="flex justify-between ">
//         <button className="border rounded-md px-2 py-1 border-red-500 text-[#EE3C4D]  ">Share link</button>
//         <button className="border rounded-md px-2 py-1 bg-[#EE3C4D] text-white">Open Club</button>
//       </div>
//     </div>
// )
//     })}

//     </div>
//   );
// };

// export default SingleClub;

// {filteredArray.length=== 0 ?

//   <div className=" grid grid-cols-4 gap-6">
//   <div className="border bg-gray-50 rounded-md w-auto h-auto pt-2 pb-4">

//   <div className="  pl-1 pr-3 w-[100%] h-[100%]">
//   <div className="flex justify-end items-center gap-1">
//   <img src={vedioimg} alt="" />
//   <img src={peopleimg} alt="" />
//   <BsThreeDotsVertical />

//   </div>
//   <div className="flex  pl-2">
//     <div className="  ">
//       <img className="w-[100px]  h-[90px] rounded-[50%] border-2 border-green-700" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f8/0f/2b/caption.jpg?w=300&h=300&s=1" alt="" />
//     </div>
//     <div className="flex justify-between gap-3  w-[80%]">
//     <div className="flex  ml-2 gap-10">
//       <div className="text-[#454545]">
//         <p className="text-[14px] font-bold text-[#454545]">The hhhhh club</p>
//         <p className="text-[10px] ">English</p>
//         <p className="text-[10px] ">Delhi</p>
//         <p className="text-[10px] ">Active science 9999</p>
//         <p className="text-[10px] ">10/40 members</p>

//       </div>

//     </div>
//       {/* <BsThreeDotsVertical /> */}
//       </div>

//   </div>
//   <div className="flex items-center py-2 pl-3 gap-2 ">
//         <img className="w-4  h-4  rounded-[50%]" src="https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/hfpqyV7B-IMG-Dubai-UAE.jpg" alt="a"/>
//         <p className="text-[12px] text-[#5B5B5B]">Administered/proposed by Menu</p>
//       </div>
//       <div className="pl-2 ">
//         <p className="text-[12px] pb-2 text-[#5B5B5B]">Vision Lorem ipsum dolor sit elit debitis fuga ipsam fugiat deserunt,  nesciunt minima</p>
//       </div>
//       <div className="flex justify-between gap-3 pl-2">
//         <button className="border  border-red-600 px-4 py-1 rounded-md text-[14px] text-red-600">View Club</button>
//         <button className="border bg-[#EE3C4D] px-4 py-1 rounded-md text-[14px] text-white">Request to join</button>

//       </div>

//   </div>
//   </div>

//   <div className="border bg-gray-50 rounded-md w-auto h-auto pt-2 pb-4">
//   <div className="  pl-1 pr-3 w-[100%] h-[100%]">
//   <div className="flex justify-end items-center gap-1">
//   <img src={vedioimg} alt="" />
//   <img src={peopleimg} alt="" />
//   <BsThreeDotsVertical />

//   </div>
//   <div className="flex  pl-2">
//     <div className="  ">
//       <img className="w-[100px]  h-[90px] rounded-[50%] border-2 border-green-700" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f8/0f/2b/caption.jpg?w=300&h=300&s=1" alt="" />
//     </div>
//     <div className="flex justify-between gap-3  w-[80%]">
//     <div className="flex  ml-2 gap-10">
//       <div className="text-[#454545]">
//         <p className="text-[14px] font-bold text-[#454545]">The hhhhh club</p>
//         <p className="text-[10px] ">English</p>
//         <p className="text-[10px] ">Delhi</p>
//         <p className="text-[10px] ">Active science 9999</p>
//         <p className="text-[10px] ">10/40 members</p>

//       </div>

//     </div>
//       {/* <BsThreeDotsVertical /> */}
//       </div>

//   </div>
//   <div className="flex items-center py-2 pl-3 gap-2 ">
//         <img className="w-4  h-4  rounded-[50%]" src="https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/hfpqyV7B-IMG-Dubai-UAE.jpg" alt="a"/>
//         <p className="text-[12px] text-[#5B5B5B]">Administered/proposed by Menu</p>
//       </div>
//       <div className="pl-2 ">
//         <p className="text-[12px] pb-2 text-[#5B5B5B]">Vision Lorem ipsum dolor sit elit debitis fuga ipsam fugiat deserunt,  nesciunt minima</p>
//       </div>
//       <div className="flex justify-between gap-3 pl-2">
//         <button className="border  border-red-600 px-4 py-1 rounded-md text-[14px] text-red-600">View Club</button>
//         <button className="border bg-[#EE3C4D] px-4 py-1 rounded-md text-[14px] text-white">Request to join</button>

//       </div>

//   </div>
//   </div>
//   <div className="border bg-gray-50 rounded-md w-auto h-auto pt-2 pb-4">
//   <div className="  pl-1 pr-3 w-[100%] h-[100%]">
//   <div className="flex justify-end items-center gap-1">
//   <img src={vedioimg} alt="" />
//   <img src={peopleimg} alt="" />
//   <BsThreeDotsVertical />

//   </div>
//   <div className="flex  pl-2">
//     <div className="  ">
//       <img className="w-[100px]  h-[90px] rounded-[50%] border-2 border-green-700" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f8/0f/2b/caption.jpg?w=300&h=300&s=1" alt="" />
//     </div>
//     <div className="flex justify-between gap-3  w-[80%]">
//     <div className="flex  ml-2 gap-10">
//       <div className="text-[#454545]">
//         <p className="text-[14px] font-bold text-[#454545]">The hhhhh club</p>
//         <p className="text-[10px] ">English</p>
//         <p className="text-[10px] ">Delhi</p>
//         <p className="text-[10px] ">Active science 9999</p>
//         <p className="text-[10px] ">10/40 members</p>

//       </div>

//     </div>
//       {/* <BsThreeDotsVertical /> */}
//       </div>

//   </div>
//   <div className="flex items-center py-2 pl-3 gap-2 ">
//         <img className="w-4  h-4  rounded-[50%]" src="https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/hfpqyV7B-IMG-Dubai-UAE.jpg" alt="a"/>
//         <p className="text-[12px] text-[#5B5B5B]">Administered/proposed by Menu</p>
//       </div>
//       <div className="pl-2 ">
//         <p className="text-[12px] pb-2 text-[#5B5B5B]">Vision Lorem ipsum dolor sit elit debitis fuga ipsam fugiat deserunt,  nesciunt minima</p>
//       </div>
//       <div className="flex justify-between gap-3 pl-2">
//         <button className="border  border-red-600 px-4 py-1 rounded-md text-[14px] text-red-600">View Club</button>
//         <button className="border bg-[#EE3C4D] px-4 py-1 rounded-md text-[14px] text-white">Request to join</button>

//       </div>

//   </div>
//   </div>
//   <div className="border bg-gray-50 rounded-md w-auto h-auto pt-2 pb-4">
//   <div className="  pl-1 pr-3 w-[100%] h-[100%]">
//   <div className="flex justify-end items-center gap-1">
//   <img src={vedioimg} alt="" />
//   <img src={peopleimg} alt="" />
//   <BsThreeDotsVertical />

//   </div>
//   <div className="flex  pl-2">
//     <div className="  ">
//       <img className="w-[100px]  h-[90px] rounded-[50%] border-2 border-green-700" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f8/0f/2b/caption.jpg?w=300&h=300&s=1" alt="" />
//     </div>
//     <div className="flex justify-between gap-3  w-[80%]">
//     <div className="flex  ml-2 gap-10">
//       <div className="text-[#454545]">
//         <p className="text-[14px] font-bold text-[#454545]">The hhhhh club</p>
//         <p className="text-[10px] ">English</p>
//         <p className="text-[10px] ">Delhi</p>
//         <p className="text-[10px] ">Active science 9999</p>
//         <p className="text-[10px] ">10/40 members</p>

//       </div>

//     </div>
//       {/* <BsThreeDotsVertical /> */}
//       </div>

//   </div>
//   <div className="flex items-center py-2 pl-3 gap-2 ">
//         <img className="w-4  h-4  rounded-[50%]" src="https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/hfpqyV7B-IMG-Dubai-UAE.jpg" alt="a"/>
//         <p className="text-[12px] text-[#5B5B5B]">Administered/proposed by Menu</p>
//       </div>
//       <div className="pl-2 ">
//         <p className="text-[12px] pb-2 text-[#5B5B5B]">Vision Lorem ipsum dolor sit elit debitis fuga ipsam fugiat deserunt,  nesciunt minima</p>
//       </div>
//       <div className="flex justify-between gap-3 pl-2">
//         <button className="border  border-red-600 px-4 py-1 rounded-md text-[14px] text-red-600">View Club</button>
//         <button className="border bg-[#EE3C4D] px-4 py-1 rounded-md text-[14px] text-white">Request to join</button>

//       </div>

//   </div>
//   </div>

//  </div>
//  :

//  <div className="border bg-gray-50 rounded-md w-auto h-auto pt-2 pb-4 ">

//   <div className="  pl-1 pr-3 w-[100%] h-[100%]">
//   <div className="flex justify-end items-center gap-1">
//   <img src={vedioimg} alt="" />
//   <img src={peopleimg} alt="" />
//   <BsThreeDotsVertical />

//   </div>
//   <div className="flex  pl-2">
//     <div className="  ">
//       <img className="w-[100px]  h-[90px] rounded-[50%] border-2 border-green-700" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f8/0f/2b/caption.jpg?w=300&h=300&s=1" alt="" />
//     </div>
//     <div className="flex justify-between gap-3  w-[80%]">
//     <div className="flex  ml-2 gap-10">
//       <div className="text-[#454545]">
//         <p className="text-[14px] font-bold text-[#454545]">The hhhhh club</p>
//         <p className="text-[10px] ">English</p>
//         <p className="text-[10px] ">Delhi</p>
//         <p className="text-[10px] ">Active science 9999</p>
//         <p className="text-[10px] ">10/40 members</p>

//       </div>

//     </div>
//       {/* <BsThreeDotsVertical /> */}
//       </div>

//   </div>
//   <div className="flex items-center py-2 pl-3 gap-2 ">
//         <img className="w-4  h-4  rounded-[50%]" src="https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/hfpqyV7B-IMG-Dubai-UAE.jpg" alt="a"/>
//         <p className="text-[12px] text-[#5B5B5B]">Administered/proposed by Menu</p>
//       </div>
//       <div className="pl-2 ">
//         <p className="text-[12px] pb-2 text-[#5B5B5B]">Vision Lorem ipsum dolor sit elit debitis fuga ipsam fugiat deserunt,  nesciunt minima</p>
//       </div>
//       <div className="flex justify-between gap-3 pl-2">
//         <button className="border  border-red-600 px-4 py-1 rounded-md text-[14px] text-red-600">View Club</button>
//         <button className="border bg-[#EE3C4D] px-4 py-1 rounded-md text-[14px] text-white">Request to join</button>

//       </div>

//   </div>

//  </div>
//  }
