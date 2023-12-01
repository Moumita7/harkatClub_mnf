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