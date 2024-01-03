import React from "react";
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

import "./singleCard.css";

const SingleClub = () => {
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
  console.log("clubss", clubss);

  const filteredArray = arr.filter(
    (obj) => obj.club_id?.user_id.id === clubsm?.id
  );
  console.log("fik", filteredArray);

  const new_filteredArray = new_data.filter(
    (obj) => obj.club_id?.user_id.id !== clubsm?.id
  );
  console.log("fikf", clubss);

  // const { data: sharedata } =useGetShareData(517);
  // console.log("sh",sharedata)

  return (
    <div className="">
      <div className=" ">
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
                      <button className="border bg-[#F4F4F4]  border-red-600 px-[19px] py-[4px] rounded-md text-[14px] text-red-600">
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
          <div className=" w-[298px]">
            {filteredArray?.map((club) => (
              <div className="bg-[#F8F8F8]  rounded-md w-[298.199px] h-auto pt-2 pb-4 green-card-design">
                <div className="  pl-1 pr-3 w-[100%] h-[100%]">
                  <div className="flex justify-end items-center  ">
                    <div className="flex gap-2   relative">
                      <img
                        src={reelPng}
                        alt="reel"
                        className="show-reel-icon"
                      />
                      <img
                        src={introPng}
                        alt="intro"
                        className="video-intro-icon"
                      />
                      <GoVideo
                        size={24}
                        className="show-reel-btn"
                        onMouseOver={showReelIcon}
                        onMouseLeave={hideReelIcon}
                      />
                      <BsPersonVideo
                        size={24}
                        className="video-intro-btn"
                        onMouseOver={showVideoIcon}
                        onMouseLeave={hideVideoIntroIcon}
                      />
                    </div>
                    <BsThreeDotsVertical size={24} />
                  </div>
                  <div className="flex  pl-2">
                    <div className="  ">
                      <img
                        className="w-[92px]  h-[83px]  rounded-[50%] border-2"
                        src={`https://mynextfilm.ai/${club.club_profile}`}
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
                    <button
                      className="border rounded-md px-[19px] py-[4px] border-[#33B0CA] text-[#33B0CA] "
                      onClick={handleShareLinkPopup}
                    >
                      Share Link
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="border rounded-md px-[19px] py-[4px] bg-[#33B0CA] text-white"
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

export default SingleClub;
