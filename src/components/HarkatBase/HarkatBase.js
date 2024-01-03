import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useGetClubDataQuery } from "../../app/EndPoints/HarkatClub";
import Home from "../Home/Home";
import MyclubLoading from "../isLoading/MyclubLoading";
import LeftSidebar from "../LeftSidebar/LeftSidebar";
import Navbar from "../Navbar/Navbar";
import RightSidebar from "../RightSidebar/RightSidebar";
import { useSelector } from "react-redux";

const HarkatBase = () => {
  const { id } = useParams();
  const { isLoading } = useGetClubDataQuery(id);

  

  // const admin = useSelector((state) => state.admin.value);
  //     let [isAdmin,setIsAdmin]=useState(false)

  //     let isadminVal=(admin)=>{
  //       if(admin){
  //         setIsAdmin(true)
  //       }else{
  //         setIsAdmin(false)
  //       }
  //     }
  // useEffect(()=>{

  // },[isAdmin])
  //  console.log("isadmin",admin)

  return (
    <div className="flex gap-8  w-full">
      {isLoading ? (
        <MyclubLoading />
      ) : (
        <div>
          <LeftSidebar id={id}></LeftSidebar>
          <div
            className=""
            style={{
              position: "fixed",
              top: "16px",
              width: "80%",
              left: "264px",
              bottom: 0,
              overflowY: "auto",
            }}
          >
            <Home id={id} />
            <Navbar id={id} />
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default HarkatBase;

// <div>
//     {
//         isLoading ? <MyclubLoading /> : <div>
//              <Home id={id} />
//             <div>
//                 <Navbar />
//             </div>
//             <div className='   grid grid-cols-12 gap-5 lg:justify-items-stretch 2xl:justify-items-center 3xl:justify-items-end'>
//                 <div className='col-span-10 md:col-span-3 2xl:col-span-4 3xl:col-span-4 xl:col-span-3'>
//                     <LeftSidebar></LeftSidebar>
//                 </div>
//                 <div className='col-span-10 md:col-span-6 2xl:col-span-4 3xl:col-span-4 xl:col-span-8'>
//                     <Outlet></Outlet>
//                 </div>
//                 {/* <div className='col-span-10 md:col-span-3 2xl:col-span-4 3xl:col-span-4 xl:col-span-3'>
//                     <RightSidebar></RightSidebar>
//                 </div> */}
//             </div>
//         </div>
//     }
// </div>
