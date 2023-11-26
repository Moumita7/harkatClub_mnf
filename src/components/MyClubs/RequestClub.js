import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";

const RequestClub = () => {
    
    return(
        <div className="">
        <p className='font-bold'>Request</p>
        <div className="border rounded-md  w-56 h-auto mt-2 pt-2 pb-2 pl-1 pr-1 ">
        <div className="flex justify-between">
      <img
        className="w-16 h-16 rounded-[50%]"
        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
        alt=""
      />
      <div className="ml-1">
        <p className='font-bold'>The Herod Club</p>
        <p>English</p>
        <p>Delhi</p>
      </div>
     <BsThreeDotsVertical/>
    </div>

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
      repellendus aliquam molestias blanditiis velit.
    </p>

    <div className="flex justify-between ">

      <button className="border rounded-md px-2 py-1 border-red-500 text-[#EE3C4D]  ">Visit Now</button>
        <button className="border rounded-md px-2 py-1 bg-[#EE3C4D] text-white">Accept</button>
    </div>
  </div>
  </div>
    )
}

export default RequestClub