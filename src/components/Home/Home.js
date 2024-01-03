import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from '../CSS/Home.module.css';
import MyclubLoading from '../isLoading/MyclubLoading';
import { setUser } from '../../app/Slices/UserSlice';
import { setMember } from '../../app/Slices/MembersSlice';
import { setAdmin } from '../../app/Slices/AdminSlice';
import RequestForm from './RequestForm';
import { setClubCurrentMember } from '../../app/Slices/ClubMemberSlice';
import CancelRequestModal from './CancelRequestModal';
import { useGetClubDataQuery } from '../../app/EndPoints/HarkatClub';

const Home = ({ id }) => {
    const [clubMember, setClubMember] = useState(null);
    const [requestForm, setRequestForm] = useState(false);
    const [cancelRequest, setCancelRequest] = useState(false)
    const { data: club, isLoading } = useGetClubDataQuery(id);
    const allMembers = useSelector(state => state.members.value);
    const user = useSelector((state) => state.user.id);
    const admin = useSelector((state) => state.admin.value);
    const dispatch = useDispatch();

    console.log("admin",admin)
    console.log("allMembers ",allMembers )
    console.log("user",user)
    console.log("clubb",club)

    useEffect(() => {
        if (clubMember == null) {
            if (allMembers && user) {
                const findMember = allMembers.find(member => member?.member_id === user);
                if (findMember) {
                    setClubMember(findMember.member_status);
                    dispatch(setClubCurrentMember(findMember));
                }
                else {
                    setClubMember(false);
                }
            }
        }
        if (!user.id) {
            if (club?.club?.club_id?.user_id?.id) {
                dispatch(setUser(club.user));
            }
        }
        if (allMembers?.length === 0) {
            if (club?.club?.club_id?.user_id?.id) {
                dispatch(setMember(club.all_members));
            }
        }
        if (admin == null && user) {
            if (club?.club?.club_id?.user_id?.id) {
                let adminValue = false;
                if (club?.club?.club_id?.user_id?.id === user) {
                    adminValue = true;
                }
                dispatch(setAdmin(adminValue));
            }
        }
    }, [admin, user, allMembers, club, clubMember, dispatch]);
    return (
        <div>
            {/* {
                isLoading ? <MyclubLoading /> :
                 <section className={style.backroundHome}>
                    <div className='flex flex-col absolute mt-12'>
                        <div className='w-96 mt-12 ml-10 bg-accent rounded-[20px] text-center'>
                            <div className='flex flex-col text-gray-900'>
                                <div className="flex px-4 items-center pt-5 md:px-10 lg:px-10">
                                    <h1 className="text-5xl font-bold w-64 leading-none sm:text-4xl xl:max-w-md text-gray-900">{club?.club?.club_id?.club_name}</h1>
                                    <img alt="" src={`http://115.245.192.138${club?.club?.club_profile}`} className="object-cover w-20 h-20 rounded-full shadow" />
                                </div>
                                <div>
                                    <p className="mt-6 flex-col mb-8 text-lg sm:mb-12 xl:max-w-lg text-gray-900">{club?.club?.club_id?.club_bio.slice(0, 100)}..</p>
                                </div>
                            </div>
                        </div>
                        <div className='ml-10 mt-5 flex flex-col justify-center'>
                            <p className='text-xl text-white'>Active since mm month / members-count</p>

                            {admin ? <div className='bg-accent h-10 mt-5  rounded-[18px] w-60' > <p className='text-xl text-black text-center py-0 font-semibold'>Club Admin</p> </div> : clubMember === 'moderator' ? <div className='bg-accent h-10 mt-5 rounded-[15px] w-60'> <p className='text-xl text-black text-center py-1 font-semibold'>Club Moderator</p> </div> :
                                clubMember === 'active' ? <p className='bg-accent text-xl text-black text-center py-1 font-semibold rounded-xl'>Active Member</p> : clubMember === 'banned' ? <p className='bg-accent text-xl text-black text-center py-1 font-semibold rounded-xl'>Member Blocked</p> :
                                    clubMember === 'pending' ? <label onClick={() => setCancelRequest(true)} htmlFor='cancel-modal' className='cursor-pointer primary-bg text-xl text-white text-center py-1 font-semibold rounded-xl'>Cancel Join Request</label> :
                                        <label htmlFor='request-join' onClick={() => setRequestForm(true)} className='cursor-pointer primary-bg text-white text-xl text-center p-2 rounded-xl font-semibold'>Request to join</label>}
                        </div>
                    </div>
                </section>
            }
            <RequestForm requestForm={requestForm} setRequestForm={setRequestForm}></RequestForm>
            <CancelRequestModal cancelRequest={cancelRequest} setCancelRequest={setCancelRequest}></CancelRequestModal> */}
        </div>
    );
};

export default Home;




































// import React, { useContext, useEffect, useRef, useState } from "react";
// import { Box, Button, Slider } from "@mui/material";
// import AvatarEditor from "react-avatar-editor";
// import uploadImg from "../../assets/uploader.png";

// import camera from "../../assets/camera.png";
// import { FcCompactCamera, FcOldTimeCamera } from "react-icons/fc";
// import ProfilePhoto from "./ProfilePhoto";
// import IconButton from "@mui/material/IconButton";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
// import Stack from "@mui/material/Stack";
// import axios from "axios";
// import { config, Url } from "../../MyServer";
// import { UserContext } from "../../App";
// import { useParams } from "react-router";

// const Home = () => {
//   const { id } = useParams();

//   const { userId } = useContext(UserContext);

//   const [data, setData] = useState("");

//   useEffect(() => {
//     if (id || userId) {
//       axios
//         .get(`${Url}/memberpage/centraldatabaseapi/${id || userId}`, config)
//         .then((res) => {
//           console.log("user central data: ", res.data);
//           setData(res?.data);
//         });
//     }
//   }, [id, userId]);

//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (id || userId) {
//         try {
//           const response = await axios.get(
//             Url + `/memberpage/get_engagement_with_mnf/${id || userId}`,
//             config
//           );

//           if (response.status !== 200) {
//             throw new Error("Error fetching data");
//           }

//           const jsonData = response.data;
//           console.log("get engagement: ", jsonData);
//           setProfile(jsonData?.mnfData);
//         } catch (error) {
//           console.error(error);
//         }
//       }
//     };

//     fetchData();
//   }, [userId]);

//   // accomplishment

//   const [dream, SetDream] = useState(null);



//   // prevlage

//   const [prev, SetPrev] = useState(null);

//   const apiUrl1 = `${Url}/memberpage/getmemberprofileofuser/${id || userId}`;

//   useEffect(() => {
//     const fetchData = async () => {
//       if (id || userId) {
//         try {
//           const response = await axios.get(apiUrl1, config);

//           if (response.status !== 200) {
//             throw new Error("Error fetching data");
//           }
//           console.log("memberprofile user: ", response.data);
//           SetPrev(response.data);
//         } catch (error) {
//           console.error(error);
//         }
//       }
//     };

//     fetchData();
//   }, [apiUrl1, userId, id]);

//   const [videoIntro, setVideoIntro] = useState();

//   useEffect(() => {
//     axios.get(Url + "/viewerlounge/MemberProfile", config).then((response) => {
//       console.log("video server response: ", response.data);
//       setVideoIntro(response.data?.video || "");
//     });
//   }, []);

//   console.log("video intro: ", videoIntro);

//   const n = dream?.length - 1;

//   // console.log("dream: ", dream)
//   // console.log("userinfo: ", prev)

//   return (
//     <div
//       className="flex w-full py-[26px] px-[24px] border-2 bg-normalBg border-headingBg rounded-xl justify-between items-center"
      
//     >
//       <Box style={{ width: "40%" }}>
//         <div className="flex items-center gap-3 ">
//           <ProfilePhoto style={{ width: "40%" }} />
//           <div
//             className="flex flex-col w-[70%] font-semibold "
//             style={{ justifyContent: "left" }}
//           >
//             {data?.firstName ? (
//               <h1
//                 className="text-headingText font-semibold capitalize"
//                 style={{ fontSize: "12px" }}
//               >
//                 {data?.firstName} {data?.middleName} {data?.lastName}
//               </h1>
//             ) : (
//               <h1 style={{ fontSize: "20px" }}>User</h1>
//             )}
//             <h6 className="text-[10px] font-[400] text-normalText">
//               Profession
//             </h6>
//             {dream?.[n]?.dream ? (
//               <h6 className="text-[10px] font-[400] text-normalText">
//                 {dream?.[n]?.dream}
//               </h6>
//             ) : (
//               <h6 className="text-[10px] font-[400] text-normalText">Dream</h6>
//             )}
//             {dream?.[n]?.accomplishment ? (
//               <h6 className="text-[10px] font-[400] text-normalText">
//                 {dream?.[n]?.accomplishment}
//               </h6>
//             ) : (
//               <h6 className="text-[10px] font-[400] text-normalText">
//                 Most Relevent Accomplishment
//               </h6>
//             )}
//             {data?.country && (
//               <h6 className="text-[10px] font-[400] text-normalText">
//                 Lives in {data?.country}
//               </h6>
//             )}
//             {data?.language && (
//               <h6 className="text-[10px] font-[400] text-normalText">
//                 Mother Tongue {data?.language}
//               </h6>
//             )}
//           </div>
//         </div>
//         <div className="mt-[6px]">
//           {/* <span>{data?.country} &nbsp;{data?.language} </span> */}
//           {/* {(prev?.privilege?.[0]) ?
//             <span>{prev?.privilege?.[0]} /&nbsp;{prev?.privilege?.[1]}.  </span>
//             :
//             <span>Life Member/Privilege Member Since</span>
//           } */}

//           {profile?.MNF_Messiah &&
//             <p className="text-[12px] text-normalText ">
//               MNF Messiah Since {profile?.MNF_Messiah}.
//             </p>}

//           {profile?.Language_Pair_Partner?.length>0 &&
//             <p className="text-[12px] text-normalText ">
//               Language Pair Partner for {profile?.Language_Pair_Partner[0]}.
//             </p>}

//           {profile?.Harkat_Club?.length>0  && 
//             <p className="text-[12px] text-normalText ">
//               Administrator/Member of Harkat Club since {profile?.Harkat_Club[0]}.
//             </p>
//           }
//         </div>
//       </Box>

//       <Box className="flex gap-5 justify-end " style={{ width: "55%" }}>
//         <div className="relative w-[247px] h-[155px] text-center rounded-xl">
//           <img
//             className="h-full w-full rounded-xl"
//             src="https://img.freepik.com/free-photo/digital-painting-mountain-with-colorful-tree-foreground_1340-25699.jpg"
//             alt=""
//           />
//           <p className="my-[3px] text-normalText text-[12px]">Show Reel</p>

//           <div className="bg-gray-200  absolute -top-2 -right-2 rounded-full flex items-center justify-center">
//             {/* p-1 */}
//             {/* <FcOldTimeCamera size={30} /> */}
//             {!id && <img src={camera} alt="" className="w-[43px] h-[43px]" />}
//           </div>
//         </div>
//         <div className="relative w-[247px] h-[155px] text-center rounded-xl">
//           {/* <img className="h-full w-full rounded-xl" src="https://img.freepik.com/free-photo/space-background-realistic-starry-night-cosmos-shining-stars-milky-way-stardust-color-galaxy_1258-154643.jpg" alt="" /> */}
//           <video
//             controls
//             className="h-full w-full rounded-xl"
//             src={videoIntro && `${Url + videoIntro}`}
//           ></video>

//           <p className="my-[3px] text-normalText text-[12px]">
//             Video Introduction
//           </p>
//           <div className="bg-gray-200 absolute -top-2 -right-2 rounded-full flex items-center justify-center">
//             <a href={`${Url}/viewerlounge/videointroduction/`}>
//               {/* <FcOldTimeCamera size={30} /> */}
//               {!id && <img src={camera} alt="" className="w-[43px] h-[43px]" />}
//             </a>
//           </div>
//         </div>
//       </Box>
//     </div>
//   );
// };

// export default Home;
