import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useGetClubMemberQuery, useGetHatkatDataNewQuery, useGetHatkatDataQuery } from "../../app/EndPoints/HarkatClub";
// import { Link } from "react-router-dom";
import peopleimg from "../images/people.svg"
import vedioimg from "../images/vedio.svg"

const NearByClub = () => {
    const { data: clubs, isLoading } = useGetHatkatDataQuery();
    const { data: clubss} = useGetHatkatDataNewQuery();
    const { data: clubsm} =  useGetClubMemberQuery();

    
    // const { club_id, club_profile } = clubs;
    console.log("pp",clubs)
    // console.log("ppmm",clubsm)


    // console.log("p",clubss)

    let new_data=clubss|| []
  const new_filteredArray = new_data.filter(obj => obj.club_id?.user_id.id !== clubsm?.id);
  console.log("fikf",clubss);

  // let new_dataa= clubs.results|| []
  // console.log(new_data)
  // const new_filteredArrayy = new_dataa.filter(obj => obj.club_id?.user_id.id !== clubsm?.id);
  // console.log("fikkk",new_filteredArrayy);

  return (
    <div className="">
        <div className="border flex items-center justify-center py-4 mb-5 rounded-md bg-[#FFE0E3]">

<p className="font-medium text-[32px] text-[#787878]">Join any of the following clubs  or <span className="text-red-600 border-b border-b-red-600"><a href="http://115.245.192.138/harkat/propose">  Propose a new club </a> </span> </p>
</div>
      <p className="font-bold">Create by you</p>
    <div className="grid grid-cols-4 gap-6 ">
    {/* {clubs?.results?.map((club) => ( */}
    {new_filteredArray?.map((club) => (
      <div className="border bg-gray-50 rounded-md w-auto h-auto pt-2 pb-4 ">

    <div className="  pl-1 pr-3 w-[100%] h-[100%]">
    <div className="flex justify-end items-center gap-1">
    <img src={vedioimg} alt="" />
    <img src={peopleimg} alt="" />
    <BsThreeDotsVertical />

    </div>
    <div className="flex  pl-2">
      <div className="  ">
        <img className="w-[94px]  h-[80px] rounded-[50%] border-2"  src={`http://115.245.192.138/${club.club_profile}`} alt="" />
      </div>
      <div className="flex justify-between gap-3  w-[80%]">
      <div className="flex  ml-2 gap-10">
        <div className="text-[#454545]">
          <p className="text-[14px] font-bold text-[#454545]">{club?.club_id?.club_name}</p>
          <p className="text-[10px] ">{club?.club_id?.club_language}</p>
          <p className="text-[10px] ">{club?.club_id?.country_name}</p>
          <p className="text-[10px] ">Active science 9999</p>
          <p className="text-[10px] ">10/40 members</p>

        </div>

      </div>
        {/* <BsThreeDotsVertical /> */}
        </div>
   
    </div>
    <div className="flex items-center py-2 pl-3 gap-2 ">
          <img className="w-4  h-4  rounded-[50%]" src="https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/hfpqyV7B-IMG-Dubai-UAE.jpg" alt="a"/>
          <p className="text-[12px] text-[#5B5B5B]">Administered/proposed by <span className="font-bold"> Manu </span></p>
        </div>
        <div className="pl-2 ">
          <p className="text-[12px] pb-2 text-[#5B5B5B]">Vision Lorem ipsum dolor sit elit debitis fuga ipsam fugiat deserunt,  nesciunt minima</p>
        </div>
        <div className="flex justify-between gap-3 pl-2">
          <button className="border  border-red-600 px-4 py-1 rounded-md text-[14px] text-red-600">View Club</button>
          <button className="border bg-[#EE3C4D] px-4 py-1 rounded-md text-[14px] text-white">Request to join</button>

        </div>



    

    </div>

  
   </div>
    ))}

    
   
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
//       src={`http://115.245.192.138/${club.club_profile}`}
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
//     <button className="border rounded-md px-4 py-1 border-red-500 text-[#EE3C4D] ">
//     <Link to={`/${club?.club_id?.harkat_id}`}>   
//       Visit Now
//       </Link>
//     </button>
//     <button className="border rounded-md px-2 py-1 bg-[#EE3C4D] text-white">

// Request to join


//     </button>
//   </div>
// </div>



//                   ))}





