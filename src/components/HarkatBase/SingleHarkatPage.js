import React,{useState} from "react";
import { LuCalendarClock } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import { FaLanguage } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaRegShareSquare } from "react-icons/fa";
import { useParams } from "react-router";
import { useGetClubDataQuery, useGetHatkatDataNewQuery } from "../../app/EndPoints/HarkatClub";

const SingleHarkatPage = () => {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState('about');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };


  const { data: club, isLoading } = useGetClubDataQuery(id);
  console.log("cc",club)

  return (
    <div className="w-[100%] ">
      <div className="w-[100%] h-[35vh]">
        <img
          className="w-[100%] h-[100%]"
          src="https://cdn.statically.io/img/timelinecovers.pro/facebook-cover/download/ultra-hd-space-facebook-cover.jpg"
          alt=""
        />
      </div>
      <div className="flex justify-between  h-32">
        <div className="flex gap-10 ">
          <img
            className="rounded-[50%] border w-40 h-40 relative top-[-50%] left-5"
            src={`http://115.245.192.138${club?.club?.club_profile}`}
            // src="https://images.pexels.com/photos/6322920/pexels-photo-6322920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
          <div className="flex gap-7 mt-2 cursor-pointer">
          <p className="text-[#EE3C4D] ">Details</p>
          <p>Photos</p>
          <p>Vedio</p>
          <p>News</p>
          </div>
        </div>
        <div className="flex mt-3 gap-3 mr-8 ">
       


          <p>Share Link</p>
          <div className="mt-1">

          <FaRegShareSquare />
          </div>
       
        </div>
      </div>
      <div className="  w-[100%] flex justify-between  ">
        <div className=" ml-10">
            <h3 className="text-xl font-bold mb-2">{club?.club?.club_id?.club_name}</h3>
            <div>
                <div className="flex items-center gap-3 ">
                <LuCalendarClock />
                <p>{club?.club?.club_id?.activation_date.split("T")[0].split("-").reverse().join("-")}</p>
                </div>
                <div className="flex items-center gap-3">
                <FaLocationDot />
                <p>{club?.club?.club_id?.club_state}</p>
                </div>
                <div className="flex items-center  gap-3">
                <FaLanguage />
                <p>{club?.club?.club_id?.club_language}</p>
                </div>
                <div className="flex gap-3">
              
                <FaPeopleGroup />
                <p>{`${club?.club?.club_id?.activities} Activity per month`}</p>
                </div>
                <div className="flex gap-3">
                <IoIosPeople />
               <div className="flex gap-3">
                <div>
                    <p>Min</p>
                    <p>{club?.club?.club_id?.min_member}</p>
                </div>
                <div>
                    <p>Max</p>
                <p>{club?.club?.club_id?.max_member}</p>

                </div>
                <div>
                    <p>Current</p>
                    <p>05</p>
                </div>
               </div>
                </div>
                
            </div>
        </div>

        <div className="  w-[30%]" >
        <div className="border rounded-lg bg-gray-50 w-[90%] flex flex-col px-2 py-1 items-center ">
        <div className="flex justify-between gap-10">
        <p
          className={`cursor-pointer ${selectedTab === 'about' ? "text-[#EE3C4D] border-b border-b-2 border-red-500 " : ''}`}
          onClick={() => handleTabClick('about')}
        >About</p>
                <p
          className={`cursor-pointer ${selectedTab === 'vision' ? "text-[#EE3C4D] border-b border-b-2 border-red-500 " : ''}`}
          onClick={() => handleTabClick('vision')}
        >Vision</p>
            </div>
            <div className="mt-4">
        {selectedTab === 'about' && <p >{club?.club?.club_id?.club_bio}</p>}
        {selectedTab === 'vision' && <p >{club?.club?.club_id?.club_vision}</p>}
      </div>
        </div>
        <div className="flex justify-end  w-[80%] mt-6 cursor-pointer">
            <button className="border rounded-md px-1 py-1 bg-[#EE3C4D] text-white">Request to join</button>
        </div>
          
        </div>
      </div>
    </div>
  );
};

export default SingleHarkatPage;
