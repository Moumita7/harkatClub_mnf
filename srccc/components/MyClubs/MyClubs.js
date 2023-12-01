import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetClubMemberQuery, useGetHatkatDataQuery } from '../../app/EndPoints/HarkatClub';
import { removeAdmin } from '../../app/Slices/AdminSlice';
import { removeClubCurrentMember } from '../../app/Slices/ClubMemberSlice';
import { removeMember } from '../../app/Slices/MembersSlice';
import { setUser } from '../../app/Slices/UserSlice';
import MyClub from './MyClub';
import NoClub from './NoClub';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'; // Import Skeleton components


const MyClubs = () => {
    const { data: clubs, isLoading } = useGetHatkatDataQuery();
    // console.log(clubs,"clubs data");
    // console.log(isLoading,"isLoading");

    const { data: member, isLoading: memberLoading } = useGetClubMemberQuery();
    const user = useSelector((state) => state.user.id);
    const admin = useSelector((state) => state.admin.value);
    // const userr = useSelector((state) => state);

    const dispatch = useDispatch();
console.log("cc",clubs)
console.log("adminn",admin)

    // console.log("userr==>",userr)
    
    useEffect(() => {
        if (!user.id) {
            if (!memberLoading) {
                dispatch(setUser(member));
            }
        }
    }, [user, dispatch, memberLoading, member])
    
    dispatch(removeAdmin());
    dispatch(removeClubCurrentMember());
    dispatch(removeMember());
    
    return (
        <div>
            <SkeletonTheme color="#f0f0f0" highlightColor="#e0e0e0"> {/* Customize the skeleton colors */}
                {isLoading ? (
                    <div className='p-10 grid grid-cols-3 gap-10 lg:justify-items-stretch 2xl:justify-items-center'>
                        {/* Use Skeleton components while loading */}
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index}>
                                <Skeleton height={150} width={300} /> {/* Customize the skeleton size */}
                            </div>
                        ))}
                    </div>
                ) : clubs ? (
                    <div className='p-10 grid grid-cols-3 gap-10 lg:justify-items-stretch 2xl:justify-items-center'>
                        {clubs?.results?.map((club) => (
                            <MyClub key={club.profile_id} club={club}></MyClub>
                        ))}
                    </div>
                ) : (
                    <NoClub />
                )}
            </SkeletonTheme>
        </div>
    );
};

export default MyClubs;
