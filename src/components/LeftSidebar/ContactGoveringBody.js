import React from 'react';
import { useParams } from 'react-router';
import { useGetClubDataQuery } from '../../app/EndPoints/HarkatClub';
import ClubAdmins from '../GoverningBody/ClubAdmins';
import ClubModerators from '../GoverningBody/ClubModerators';

const ContactGoveringBody = () => {
    const { id } = useParams();
    const { data: members } = useGetClubDataQuery(id);
    const moderators = members?.all_members?.filter(member => member?.member_status === 'moderator');
    return (
        <div className='mt-10 px-3 2xl:w-[800px] 2xl:ml-7'>
            <div className='pl-4 bg-accent p-2 rounded-xl text-lg font-semibold text-center'>
                <h1>Club Admins</h1>
            </div>
            <ClubAdmins /><div>
                <div className='pl-4 bg-accent p-2 rounded-xl text-lg font-semibold text-center'>
                    <h1>Club Moderators</h1>
                </div>
                {
                    moderators?.map(moderator => <ClubModerators key={moderator.member_Club_id} moderator={moderator}></ClubModerators>)
                }
            </div>
        </div>
    );
};

export default ContactGoveringBody;