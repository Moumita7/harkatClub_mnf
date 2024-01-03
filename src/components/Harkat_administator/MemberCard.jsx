import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsPersonVideo, BsThreeDotsVertical } from "react-icons/bs";
import { GoVideo } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import { IoPersonAddOutline } from "react-icons/io5";
import { useGetClubDataQuery } from "../../app/EndPoints/HarkatClub";
import { useGetHatkatDataNewQuery } from "../../app/EndPoints/HarkatClub";
import { Url } from "../myServer";

const MemberCard = () => {
  const { id } = useParams();
  const { data: club } = useGetClubDataQuery(id);
  const userId = club.club.club_id.user_id.id;
  const [data, setData] = useState([]);
  const [openMenus, setOpenMenus] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${Url}/harkat/get_club_members/${userId}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userId]);

  const handleToggleMenu = (index) => {
    setOpenMenus((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const { data: harkatID } = useGetHatkatDataNewQuery();
  const [harkatIDs, setHarkatIDs] = useState([]);

  useEffect(() => {
    if (Array.isArray(harkatID)) {
      setHarkatIDs(harkatID);
    }
  }, [harkatID]);

  const handleMakeMod = async (harkatId) => {
    console.warn(harkatId);
    const api = `${Url}/harkat/promote_to_moderator/${harkatId}/740`;

    try {
      // Make a POST request
      const response = await axios.post(api);

      // Handle the response if needed
      console.warn("Response from the server:", response.data);
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  return (
    <>
      {data.map((ele, index) => (
        <div
          key={index}
          className="p-3 w-[280px]   rounded-lg border-2 border-gray-300"
        >
          <div className="flex ">
            <div className="flex gap-2 items-center">
              <img
                className="rounded-full h-[42px] w-[42px]"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFBa3G11OUBYADP7ouSBgwiiRzSYorF4dfg&usqp=CAU"
                alt=""
              />
              <div>
                <h4 className="font-bold text-xl">
                  {ele.user_data.firstName}
                </h4>
                <div className="flex  items-center ">
                  <div className="w-5 h-5">
                    <img
                      className="w-full h-full rounded-full"
                      src="https://www.befunky.com/images/prismic/32083dff-734b-49a7-bb4d-c0dc512401af_hero-photo-effects-5.jpg?auto=avif,webp&format=jpg&width=896"
                      alt=""
                    />
                  </div>
                  <div className="w-5 h-5 z-2 -ml-2">
                    <img
                      className="w-full h-full rounded-full"
                      src="https://www.shyamparivar.com/uploads/gallery/Hanuman-Ji-4k-HD-Wallpaper-Free-Download.png"
                      alt=""
                    />
                  </div>
                  <span className=" text-sm ml-3">2 mutual friends</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 relative">
              <IoPersonAddOutline size={20} />
              <span
                className="hover:tooltip-tool hover:tooltip "
                data-tip="show reels"
              >
                <GoVideo size={20} />
              </span>
              <span
                className="hover:tooltip-tool hover:tooltip"
                data-tip="video introduction"
              >
                <BsPersonVideo size={20} />
              </span>

              <BsThreeDotsVertical
                size={24}
                className="cursor-pointer"
                onClick={() => handleToggleMenu(index)}
              />

              {openMenus[index] && (
                <div className="absolute top-[0] right-[20px] w-[120px] bg-[#fff] border border-solid border-black px-[4px]">
                  <button
                    className="text-[14px] my-[4px] cursor-pointer"
                    onClick={() => handleMakeMod(ele?.harkatID?.harkat_id)}
                  >
                    Make Moderator
                  </button>
                  <button className="text-[14px] my-[4px] cursor-pointer">
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="information-div text-[11px] my-2">
            <p className="my-1">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. .
            </p>
            <p className="my-1">Director,actor,producer</p>
            <p className="my-1">bangadesh {ele.motherTongue}</p>
            <p>MNF messiah,LPP,Harkat Admin</p>

            <p className="font-bold">Wants to:</p>
            <p className="my-1 text-[#33B0CA]">
              {" "}
              {"{"}Make a feature film on Brahmaputra floods.{"}"}{" "}
            </p>
          </div>

          <div className="flex justify-between gap-2 mt-3 mb-2">
            <button className="py-1 px-2 text-[14px]  bg-[] rounded-lg border border-[#33B0CA] text-[#33B0CA]">
              {" "}
              <Link className="" to="/">
                View Profile
              </Link>
            </button>
            <button className="py-1 px-2 bg-[#33B0CA] text-[14px] rounded-lg text-white">
              Message
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default MemberCard;
