import React from 'react';
import { RiAdminLine } from 'react-icons/ri';
import { useParams } from 'react-router';
import { useGetClubDataQuery } from '../../app/EndPoints/HarkatClub';
import PicturesLoading from '../isLoading/PicturesLoading';

const ClubAdmins = () => {
    const { id } = useParams();
    const { data: club, isLoading } = useGetClubDataQuery(id);
    return (
        <div>
            {isLoading ? <div className='flex flex-col justify-center items-center mt-40'><PicturesLoading /> </div> : <div className='flex justify-between mt-2'>
                <div className="py-1 w-full flex flex-row gap-2 items-center overflow-hidden rounded-full">
                    <span className="flex-shrink-0 inline-flex item-center border justify-center leading-none rounded-full">
                        <div className="avatar">
                            <div className="w-12 rounded-full border-2">
                                <img src="https://media.istockphoto.com/id/1298261537/vector/blank-man-profile-head-icon-placeholder.jpg?s=612x612&w=0&k=20&c=CeT1RVWZzQDay4t54ookMaFsdi7ZHVFg2Y5v7hxigCA=" alt='member pictures' />
                            </div>
                        </div>
                    </span>
                    <div className="flex-1 p-2">
                        <p className="text-md font-semibold">{club?.club?.club_id?.user_id?.username}</p>
                    </div>
                </div>
                <div className='flex items-center h-7 mt-4 cursor-pointer px-5 bg-accent rounded-full'>
                    <p className='font-semibold'>Admin</p>
                    <RiAdminLine />
                </div>
            </div>}
        </div>
    );
};

export default ClubAdmins;