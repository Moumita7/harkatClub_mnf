import React from 'react';
import { useParams } from 'react-router';
import { useGetClubMediaQuery } from '../../app/EndPoints/HarkatClub';
import PicturesLoading from '../isLoading/PicturesLoading';
import Video from '../Video/Video';

const Videos = () => {
    const { id } = useParams();
    const page_number = 1;
    const { data: club_media, isLoading } = useGetClubMediaQuery({ id, page_number });

    return (
        <div className='mt-10 keep_scrolling h-[720px] 2xl:w-[800px] 2xl:ml-7'>
            {isLoading ? <div className='flex flex-col justify-center items-center mt-40'><PicturesLoading /> </div> : <div className='grid grid-cols-1 gap-3'> {club_media?.results?.map(club_video =>
                club_video?.video !== null ? <Video key={club_video.media_id
                } post={club_video}></Video> : ''
            )}</div>}
        </div>
    );
};

export default Videos;