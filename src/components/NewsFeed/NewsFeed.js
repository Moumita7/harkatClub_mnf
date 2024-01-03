import React, { useEffect, useState } from 'react';
import Feed from './Feed';
import styles from "../CSS/NewsFeed.module.css"
import { useParams } from 'react-router';
import FeedLoader from '../isLoading/FeedLoader';
import { useGetClubMediaQuery } from '../../app/EndPoints/HarkatClub';
const NewsFeed = () => {
    const { id } = useParams();
    const [page_number, setPage_number] = useState(1);
    const [posts, setPosts] = useState([]);
    const loadClick = () => {
        setPage_number(page_number + 1);
    }
    const { data: club_media, isLoading } = useGetClubMediaQuery({ id, page_number });
    // useEffect(() => {
    //     let data = [];
    //     if (posts.length === 0) {
    //         club_media?.results.forEach(element => {
    //             data.push(element)
    //         });
    //     }
    //     else {
    //         data = [...posts];
    //         club_media?.results.forEach(element => {
    //             data.push(element)
    //         });
    //     }
    //     setPosts(data);
    // }, [club_media,posts])
    // console.log(club_media);
    return (
        <div className={`${styles.keep_scrolling} h-[720px]  mt-10 w-[1114px] `}>
            {isLoading ? <div className='flex justify-center items-center'><FeedLoader /></div> : <div>
                {
                    club_media?.results?.map(media => <Feed key={media.media_id
                    } media={media}></Feed>)
                }
                {club_media?.next !== null &&
                    <div className='flex justify-center'>
                        <button onClick={loadClick} className='text-white primary-bg text-lg font-semibold p-2 rounded-xl'>Load more</button>
                    </div>
                }
            </div>}
        </div>
    );
};

export default NewsFeed;