import React from 'react'
import SingleClub from './SingleClub';
import { useState } from 'react';
import RequestClub from './RequestClub';
import NearByClub from './NearByClub';
import { CiSearch } from "react-icons/ci";
import searchimg from "../images/search.svg"

const MyClubsHead = () => {


const [activeComponent, setActiveComponent] = useState(1); // Set default value to 1

const renderComponent = () => {
  switch (activeComponent) {
    case 1:
      return <SingleClub />;
    case 2:
      return <NearByClub />;
    case 3:
      return <RequestClub />;
    default:
      return null;
  }
};

return (
  <div className="container mt-2 px-10 ">
    <div className="flex justify-between space-x-4">
    <div className='flex gap-20 '>


      <button
        className={`${activeComponent===1 ? "text-[#EE3C4D] border-b border-b-2 border-red-500 ":""} font-bold text-[18px]`}
        onClick={() => setActiveComponent(1)}
      >
Administered / Proposed by me 
      </button>
      <button
     className={`${activeComponent===2 ? "text-[#EE3C4D] border-b border-b-2 border-red-500 ":""} font-bold text-[18px]`}
        onClick={() => setActiveComponent(2)}
      >
My Other clubs
      </button>
      <button
       className={`${activeComponent===3 ? "text-[#EE3C4D] border-b border-b-2 border-red-500 ":""} font-bold text-[18px] `}
        onClick={() => setActiveComponent(3)}
      >
More Clubs near me
      </button>
      </div>
      <div className='flex justify-center items-center'>

      <input type="text" name="" id="" placeholder='Search' className='w-[290px] h-[41px] border-t border-l border-b rounded-tl-3xl rounded-bl-3xl py-1 px-2 border-zinc-400' />
      
        <div className=' border-t border-r border-b p-2  border-zinc-400 rounded-tr-3xl rounded-br-3xl '>

      {/* <CiSearch/> */}
      <img src={searchimg} className='w-[24px] h-[24px]' alt="" />
        </div>
      </div>
    </div>

    <div className="mt-8">{renderComponent()}</div>
  </div>
);
}

export default MyClubsHead