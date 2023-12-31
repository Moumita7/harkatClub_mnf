import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import styles from "../CSS/LeftSidebar.module.css";
import { TbListDetails } from "react-icons/tb";
import { BsPeople } from "react-icons/bs";
// import { TiMessages } from 'react-icons/ti';
import { AiOutlineUsergroupAdd } from "react-icons/ai";
// import { GiPokecog } from 'react-icons/gi';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetClubDataQuery,
  useMemberUpdateMutation,
} from "../../app/EndPoints/HarkatClub";
import { UserContext } from "../../App";
import axios from "axios";
import { config } from "../myServer";
const LeftSidebar = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [memberUpdate, resInfo] = useMemberUpdateMutation();
  const admin = useSelector((state) => state.admin.value);
//   let val=props.isadminVal(admin)

  console.log("isadminVal",admin)


  let handleDelete=async()=>{
    try {
    
      const response = await axios.get(`https://mynextfilm.ai/harkat/leave_club/${id}`,config);

      console.log('Delete Response:', response.data);
      // fetchData()
      
      // setMemberData(response.data)

    } catch (error) {
      console.error('Error deleting data:', error);

    }
  }

  console.log("iddddd",id)



  const { isMember} = useContext(UserContext);
  console.log("checkkkk", !isMember)


//   useEffect(()=>{

//   },[admin])


  const clubMember = useSelector(
    (state) => state.clubcurrentmember.member_Club_id
  );
  const clubMemberCheck = useSelector(
    (state) => state.clubcurrentmember.member_status
  );
  const { data: members } = useGetClubDataQuery(id);
  const requestMembers = members?.all_members.filter(
    (member) => member.member_status === "pending"
  );
  const leaveClub = () => {
    const body = {
      club_member_id: clubMember,
      status: "leaved",
    };
    memberUpdate(body);
    setOpen(false);
  };
  if (resInfo.isSuccess) {
    toast.success("Leaved successfully.", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    resInfo.isSuccess = false;
    window.location.reload();
  }

  const [data, setData] = useState(null);

  const accessToken = localStorage.getItem("accessToken");
  const clubId = "ddd8ca85-7e20-457a-a582-f041d6a3786b";
  const apiUrl = `https://mynextfilm.ai/harkat/api/v1/club-database/${clubId}/`;

  return (
    <div>
      {/* {admin || clubMemberCheck === 'active' || clubMemberCheck === 'moderator' ?  */}
      <div className="drawer drawer-mobile rounded-md pt-2  flex text-center w-[243px] h-[720px] 2xl:mr-5 mt-5 bg-[#EAEAEA]  ">
        <div className={`${styles.keep_scrolling}`}>
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu w-[300px] text-base-content text-[17px]">
            {/* <li><NavLink to='uploadpost' className='bg-accentt rounded-r-xl h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center'>Upload Post</NavLink></li> */}
            {/* <li><NavLink to='clubdetails' className='bg-accentt h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center rounded-r-xl'><span className='text-xl'> <TbListDetails /></span>Club Details</NavLink></li> */}
            <li>
              <NavLink
                to=""
                className="bg-[#33B0CA] w-[128px]  h-[34px] text-[14px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center rounded-r-xl"
              >
                <span className="text-xl "></span>Dashboard
              </NavLink>
            </li>

            {/* <li><NavLink to='accomplishment' className='bg-accentt rounded-r-xl h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center'>Accomplishment</NavLink></li> */}
            {/* <li><NavLink to='contactgoverningbody' className='bg-accentt rounded-r-xl h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center'>Contact Governing Body</NavLink></li> */}
            {/* <li><NavLink to='messagebox' className='bg-accentt rounded-r-xl h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center' > <TiMessages /> Message Box</NavLink></li> */}

            {/* chexkkkkkkkk */}
            {/* {admin && <div className="indicator">
                            {requestMembers?.length > 0 && <span className="indicator-item badge badge-bg-slate-900 left-[-10px] text-white font-semibold">{requestMembers?.length}</span>}
                            <li><NavLink to='membersrequest' className='bg-accentt rounded-r-xl h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center w-[300px]'> <AiOutlineUsergroupAdd />Members Requests </NavLink></li>
                        </div>} */}

            {/* checkk close */}

            <li>
              <NavLink
                to="members"
                className="bg-[#EAEAEA] w-[128px]  h-[34px] text-[14px] rounded-r-xl hover:bg-[#33B0CA] hover:text-white mb-2 justify-center"
              >
                {" "}
                Members{" "}
              </NavLink>
            </li>
            {/* <li><NavLink to='skillavailable' className='bg-accentt rounded-r-xl h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center'><span className=""><GiPokecog /> </span>Skills Available</NavLink></li> */}
            {/* <li><NavLink to='skillfor' className='bg-accentt rounded-r-xl h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center'>Skills Looking For</NavLink></li> */}
            {/* <li><NavLink to='pastactivities' className='bg-accentt rounded-r-xl h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center'>Past Activites</NavLink></li> */}
            {/* <li><NavLink to='currentactivities' className='bg-accentt rounded-r-xl h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center'>Current Activities</NavLink></li> */}
            {/* <li><NavLink to='futureactivity' className='bg-accentt rounded-r-xl h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center'>Future Activity</NavLink></li> */}
            {/* <li><NavLink to='proposeactivity' className='bg-accentt rounded-r-xl h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center'>Propose an Activity</NavLink></li> */}
            <li>
              <NavLink
                to="pictures"
                className="bg-[#EAEAEA] w-[135px]  h-[34px] text-[14px] rounded-r-xl hover:bg-[#33B0CA] hover:text-white mb-2 justify-center"

              >
               {/* <span className="text-xl "></span>  */}
               <p className=" pl-[11px] hover:text-white">

               Club Pictures
               </p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="videos"
                className="bg-[#EAEAEA] w-[128px]  h-[34px] text-[14px] rounded-r-xl h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center"
              >
               <p className=" pl-[13px] hover:text-white">

                Club Videos
                </p>
              </NavLink>
            </li>

            {/* <li><NavLink to='uploadpost' className='bg-accentt rounded-r-xl h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center'>Upload Post</NavLink></li> */}

            {admin || isMember ? (
              <div className="indicator">
                {requestMembers?.length > 0 && (
                  <span className="indicator-item badge badge-bg-slate-900 left-[-10px] text-white font-semibold">
                    {requestMembers?.length}
                  </span>
                )}
                <li>
                  <NavLink
                    to="uploadpost"
                    className="bg-[#EAEAEA] w-[128px]  h-[34px] text-[14px] rounded-r-xl h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center"
                  >
                             <p className=" pl-[14px] hover:text-white">


                    Upload Post
                    </p>
                  </NavLink>
                </li>
              </div>

            ):(
              ""
            )
          }
            {admin && (
              <div className="indicator">
                {requestMembers?.length > 0 && (
                  <span className="indicator-item badge badge-bg-slate-900 left-[-10px] text-white font-semibold">
                    {requestMembers?.length}
                  </span>
                )}
                <li>
                  <NavLink
                    to="clubdetails"
                    className="bg-[#EAEAEA] w-[128px]  h-[34px] text-[14px] h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center rounded-r-xl"
                  >
                    <span className="text-xl"> </span>Club Details
                  </NavLink>
                </li>
              </div>
            )}

            {/* <li><NavLink to='clubdetails' className='bg-accentt h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center rounded-r-xl'><span className='text-xl'> <TbListDetails /></span>Club Details</NavLink></li> */}

            {/* <li><NavLink to='video' className='bg-[#EAEAEA] w-[128px]  h-[34px] rounded-r-xl h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center'>Leave Club</NavLink></li> */}
            {/* <li><NavLink to='video' className='bg-[#33B0CA] text-[white] w-[128px]  h-[34px] text-[14px] ml-4 rounded-xl h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center'>Request to join</NavLink></li> */}
            {/* {admin ? (
              <li>
                <NavLink
                  to="video"
                  className="bg-[#33B0CA] text-[white] w-[150px]  h-[34px] text-[14px] ml-4 rounded-xl h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center"
                >
                  Deactivate Club
                </NavLink>
              </li>
          
            ) : (
                  
              <li 
              className="bg-[#33B0CA]  text-[white] w-[128px]  h-[34px] text-[14px] ml-4 rounded-xl h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center"
              onClick={()=>handleDelete()}
              >
          
                  Leave club
         
              </li>
            )} */}


            {
              admin && isMember ? (
              <li 
              className="bg-[#33B0CA]  text-[white] w-[128px]  h-[34px] text-[14px] ml-4 rounded-xl h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center"
              onClick={()=>handleDelete()}
              >
                {/* <NavLink
                  to="video"
                  className="bg-[#33B0CA] text-[white] w-[128px]  h-[34px] text-[14px] ml-4 rounded-xl h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center"
                > */}
                  {/* Request to join */}
                  Leave club
                {/* </NavLink> */}
              </li>)
              :
              admin? (
                <li>
                <NavLink
                  to="video"
                  className="bg-[#33B0CA] text-[white] w-[150px]  h-[34px] text-[14px] ml-4 rounded-xl h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center"
                >
                  Deactivate Club
                </NavLink>
              </li>
              ) :
              (
                <li 
                className="bg-[#33B0CA]  text-[white] w-[128px]  h-[34px] text-[14px] ml-4 rounded-xl h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center"
                // onClick={()=>handleDelete()}
                >
                  {/* <NavLink
                    to="video"
                    className="bg-[#33B0CA] text-[white] w-[128px]  h-[34px] text-[14px] ml-4 rounded-xl h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center"
                  > */}
                    Request to join
                    {/* Leave club */}
                  {/* </NavLink> */}
                </li>
              )

            }

            {/* <li><NavLink to='announcement' className='bg-accentt rounded-r-xl h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center'>Announcements</NavLink></li> */}
            {/* <li><NavLink to='news' className='bg-accentt rounded-r-xl h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center'>News</NavLink></li> */}
            {/* <li><NavLink to='promoteclub' className='bg-accentt rounded-r-xl h-[30px] hover:bg-[#33B0CA] hover:text-white mb-2 justify-center'>Promote Club</NavLink></li> */}
            {/* <li>{clubMemberCheck === 'active' || clubMemberCheck === 'moderator' ? < label htmlFor='leave-modal' onClick={() => setOpen(true)} className='bg-accentt text-red-600 rounded-r-xl h-[30px] hover:bg-[#33B0CA] hover:text-white justify-center'>Leave Club</label> : ''}</li> */}
          </ul>
        </div>
      </div>

      {open && (
        <div>
          <input type="checkbox" id="leave-modal" className="modal-toggle" />
          <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">
                Are you sure want to leave the club?
              </h3>
              <div className="modal-action">
                {/* <button onClick={leaveClub} className='primary-bg px-5 h-[32px] rounded-lg text-white font-semibold'>Yes</button> */}
                <label
                  htmlFor="leave-modal"
                  className="bg-neutral px-5 py-2 rounded-lg text-white font-semibold cursor-pointer"
                >
                  No
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftSidebar;
