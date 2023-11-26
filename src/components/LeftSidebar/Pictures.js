import React from 'react';
import { useParams } from 'react-router';
import { useGetClubMediaQuery } from '../../app/EndPoints/HarkatClub';
import PicturesLoading from '../isLoading/PicturesLoading';
import Picture from '../Picture/Picture';

const Pictures = () => {
    const { id } = useParams();
    const page_number = 1;
    const { data: club_media, isLoading } = useGetClubMediaQuery({ id, page_number });
    console.log(useGetClubMediaQuery,"images")
    return (
        <div className='mt-10 keep_scrolling h-[720px] 2xl:w-[800px] w-full 2xl:ml-7'>
            {
                isLoading ? <div className='border flex flex-col justify-center items-center mt-48'><PicturesLoading /> </div> :
                 <div className='grid grid-cols-4 gap-4'> {club_media?.results?.map(club_image => club_image?.img !== null ? <Picture key={club_image.media_id
                } club_image={club_image}></Picture> : '')}</div>
            }
        </div>
    );
};

export default Pictures;