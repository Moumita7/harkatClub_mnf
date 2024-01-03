import React from 'react';
import { Link } from 'react-router-dom';

const MyClub = (props) => {
    const { club_id, club_profile } = props.club;
    return (
        <div>
            <div className="card w-full h-full bg-base-100 shadow-xl cursor-pointer p-3">
                <figure className="h-[200px]">
                    { club_profile?
                        <img src={club_profile} alt="club profile" className="rounded-xl" />
                        :<img src="https://www.mynextfilm.com/static/media/23.png" alt="club profile" className="rounded-xl" />
                    }
                    
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title filter-club-name">{club_id?.club_name}</h2>
                    <p>{club_id?.club_bio.slice(0, 200)}</p>
                </div>
                <div className='flex justify-center'>
                    <Link to={`/${club_id?.harkat_id}`} className="mnf_btn hover:primary-bg text-[#33B0CA] font-semibold rounded-xl text-xl hover:text-white py-2 px-5">Open Club</Link>
                </div>
            </div>
        </div>
    );
};

export default MyClub;