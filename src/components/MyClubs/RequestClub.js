import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsPersonVideo, BsThreeDotsVertical } from 'react-icons/bs'
import { GoVideo } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { config } from '../myServer'
import ProposeClubForm from "../MyClubs/ProposeClubForm"
import ViewAppPopup from './ViewAppPopup'

const RequestClub = () => {

  let [data,setData]=useState([])
  // let membercardapi=()=>{
  //   axios.get("https://mynextfilm.ai/harkat/accepted_club_requests")
  //   .then(
  //     console.log()
  //   )
  // }

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://mynextfilm.ai/harkat/pending_club_requests_for_admin`, config);
      // setData(response.data);
      console.log("ressData", response.data);
      setData( response.data)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
   
    fetchData();
  }, []);

  const openAppPopup = () => {
    document.querySelector(".view-app-container").style.display = "flex";
    // document.querySelector(".dark-background").style.display = "block";
    // window.location.reload()
  }
  return (
    <>
      <div className="flex flex-col justify-center    ">
        <div className=" flex flex-wrap gap-5 mt-4 ">
        {/* <div className="grid grid-cols-3 gap-3 mt-4  "> */}
        {
          data.map((ele)=>(
            <div className='p-3 w-[280px]   rounded-lg border-2 border-gray-300'>
            <div className="flex justify-between">
              <div className='flex gap-2 items-center'>
                <img className='rounded-full h-[42px] w-[42px]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFBa3G11OUBYADP7ouSBgwiiRzSYorF4dfg&usqp=CAU" alt="" />
                <div>
                  <h4 className='font-bold text-xl'>{ele.firstName}</h4>
                  <div className="flex  items-center ">
                    <div className="w-5 h-5">
                      <img className='w-full h-full rounded-full' src="https://www.befunky.com/images/prismic/32083dff-734b-49a7-bb4d-c0dc512401af_hero-photo-effects-5.jpg?auto=avif,webp&format=jpg&width=896" alt='' />
                    </div>
                    <div className="w-5 h-5 z-2 -ml-2">
                      <img className='w-full h-full rounded-full' src="https://www.shyamparivar.com/uploads/gallery/Hanuman-Ji-4k-HD-Wallpaper-Free-Download.png" alt='' />
                    </div>
                    <span className=' text-sm ml-3'>2 mutual friends</span>
                  </div>

                  {/* <p className='text-[10px]  text-[#7D7D7D]'>Sort film received first prize</p> */}
                  
                </div>
              </div>

              <div className='flex gap-2'>
                <GoVideo size={24} />
                <BsPersonVideo size={24} />

                <BsThreeDotsVertical size={24} />
              </div>
            </div>

            <div className="information-div text-[11px] my-2">
              <p className='my-1'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. .</p>
              <p className='my-1'>Director,actor,producer</p>
              <p className='my-1'>bangadesh {ele.motherTongue}</p>
              <p>MNF messiah,LPP,Harkat Admin</p>

              <p className="font-bold">Wants to:</p>
              <p className='my-1 text-[#33B0CA]'> {"{"}Make a feature film on Brahmaputra floods.{"}"} </p>
            </div>

            <div className="flex justify-between gap-2 mt-3 mb-2">
              <button className='py-1 px-2 text-[14px]  bg-[] rounded-lg border border-[#33B0CA] text-[#33B0CA]' > <Link className='' to="/">View Profile</Link></button>
              <button className='py-1 px-2 bg-[#33B0CA] text-[14px] rounded-lg text-white' onClick={openAppPopup}>View Application</button>
            </div>
      {/* <ProposeClubForm /> */}
      {/* <ProposeClubForm/> */}
      <ViewAppPopup  fetchDataFun={fetchData}  harkat={ele?.club_member_data?.club_id} member={ele?.club_member_data?.member_id}/>


          </div>
          ))
        }

       
 
        </div>
      </div>
    </>

  )
}

export default RequestClub