import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Button, Slider } from "@mui/material";
// import AvatarEditor from "react-avatar-editor";
import uploadImg from "../../assets/uploader.png";

import camera from "../../assets/camera.png";
import { FcCompactCamera, FcOldTimeCamera } from "react-icons/fc";
import ProfilePhoto from "./ProfilePhoto";
import IconButton from "@mui/material/IconButton";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { config, Url } from "../myServer";
import { UserContext } from "../../App";
import { useParams } from "react-router";
import {
  useGetClubDataQuery,
  useGetHatkatDataNewQuery,
} from "../../app/EndPoints/HarkatClub";
import { useSelector } from "react-redux";

const Navbar = ({ id }) => {
  const [data, setData] = useState("");

  const { data: club } = useGetClubDataQuery(id);

  const arr = club.club.club_id;

  const admin = useSelector((state) => state.admin.value);

  const [profile, setProfile] = useState(null);

  const [dream, SetDream] = useState(null);

  const [prev, SetPrev] = useState(null);

  const n = dream?.length - 1;

  // ------------------show reel---------------------------
  const userId = arr.user_id.id;
  const [videoIntro, setVideoIntro] = useState();
  const [reel, setReel] = useState("");

  useEffect(() => {
    axios.get(Url + "/viewerlounge/MemberProfile", config).then((response) => {
      console.log("video server response: ", response.data);
      setVideoIntro(response.data?.video || "");
    });
    getReel();
  }, [id, userId]);

  const getReel = async () => {
    setReel("");
    axios.get(`${Url}/viewerlounge/ShowReel/${userId}`).then((res) => {
      if (res.data?.length > 0) {
        setReel(Url + res?.data[res?.data?.length - 1 || 0]?.video);
      }
    });
  };

  console.log("Reel : ", reel);

  const handleUploadReel = (e) => {
    const file = e.target.files[0];
    console.log(file.name);
    if (file?.name) {
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("file", file);
      formData.append("category", "Showreel");
      formData.append("title", "myreel");
      formData.append("instruction", "test");
      const url = `${Url}/viewerlounge/saveShowReel`;
      axios
        .post(url, formData, config)
        .then((response) => {
          console.log("response : ", response.data);
          if (response?.status === 200) {
            console.log("Reel uploaded successfully");
          } else {
            console.log("Something went wrong");
          }
          getReel();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div
      className="flex w-[1114px] h-[247px] py-[13px] px-[24px] border border-gray-300 rounded-xl"
      style={{ justifyContent: "space-between" }}
    >
      <Box style={{ width: "40%" }}>
        <div className="flex gap-3 mt-[1px]">
          <ProfilePhoto style={{ width: "40%" }} />
          <div
            className="flex flex-col w-[70%] font-bold mt-[20px]"
            style={{ justifyContent: "left" }}
          >
            {data?.firstName ? (
              <h1
                className="text-[#212121] font-bold capitalize"
                style={{ fontSize: "12px" }}
              >
                {data?.firstName} {data?.middleName} {data?.lastName}
              </h1>
            ) : (
              <h1 className="text-[16px] text-[#212121]">
                {" "}
                {arr.club_name}{" "}
                <span className="text-[10px] text-[#5B5B5B]">
                  by {arr.club_proposer}
                </span>{" "}
              </h1>
            )}
            <h6 className="text-[12px] font-[400] text-[#252525]">
              {`Active since ${
                arr?.activation_date
                  ? new Date(arr.activation_date)
                      .toISOString()
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("-")
                  : ""
              }`}
            </h6>
            {dream?.[n]?.dream ? (
              <h6 className="text-[12px] font-[400] text-[#252525]">
                {dream?.[n]?.dream}
              </h6>
            ) : (
              <h6 className="text-[12px] font-[400] text-[#252525]">
                Location - {arr.club_city}
                {arr.club_state} {arr.country_name}{" "}
              </h6>
            )}
            {dream?.[n]?.accomplishment ? (
              <h6 className="text-[12px] font-[400] text-[#252525]">
                {dream?.[n]?.accomplishment}
              </h6>
            ) : (
              <h6 className="text-[12px] font-[400] text-[#252525]">
                Club Language -{arr.club_language}
              </h6>
            )}
            <h6 className="text-[12px] font-[400] text-[#252525]">
              {arr.activities} activity per month
            </h6>
            {data?.country && (
              <h6 className="text-[12px] font-[400] text-[#252525]">
                Lives in {data?.country}
              </h6>
            )}
            {data?.language && (
              <h6 className="text-[12px] font-[400] text-[#252525]">
                Mother Tongue {data?.language}
              </h6>
            )}
          </div>
        </div>
        <div className="">
          <p className="text-[12px] text-[#5B5B5B] my-[6px]">
            <span className="font-bold">Vision</span> - {arr.club_vision}
          </p>
          <p className="text-[12px] text-[#212121] my-[4px]">
            Min member -{arr.min_member}
          </p>
          <p className="text-[12px] text-[#212121] my-[4px]">
            Max member -{arr.max_member}
          </p>
          <p className="text-[12px] text-[#212121] ">
            Current Members member -05
          </p>
        </div>
      </Box>

      <Box
        className="flex gap-5 justify-end mt-[16px]"
        style={{ width: "55%" }}
      >
        <div className="relative w-[247px] h-[155px] text-center rounded-xl">
          {reel ? (
            <video
              controls
              className="h-full w-full rounded-xl"
              src={reel}
            ></video>
          ) : (
            <div className="h-full w-full rounded-xl flex items-center justify-center border-2 border-headingBg">
              <p className="text-headingText font-semibold text-[16px]">
                {id ? "No reels found" : "Please upload your reel"}
              </p>
            </div>
          )}
          <p className="my-[3px] text-[#7D7D7D] text-[12px]">Show Reel</p>

          <label
            for="reel-upload"
            className="bg-gray-200 absolute -top-2 -right-2 rounded-full flex items-center justify-center"
            title="Upload Reel"
          >
            {admin && (
              <img src={camera} alt="img" className="w-[43px] h-[43px] cursor-pointer" />
            )}
          </label>

          <input
            onChange={handleUploadReel}
            accept="video/*"
            className="hidden"
            type="file"
            id="reel-upload"
          />
        </div>
        <div className="relative w-[247px] h-[155px] text-center rounded-xl">
          <video
            controls
            className="h-full w-full rounded-xl"
            src={videoIntro && `${Url + videoIntro}`}
          ></video>

          <p className="my-[3px] text-normalText text-[12px]">
            Video Introduction
          </p>
          <div className="bg-gray-200 absolute -top-2 -right-2 rounded-full flex items-center justify-center">
            <a href={`${Url}/viewerlounge/videointroduction/`}>
              {admin && (
                <img src={camera} alt="img" className="w-[43px] h-[43px] cursor-pointer" />
              )}
            </a>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Navbar;
