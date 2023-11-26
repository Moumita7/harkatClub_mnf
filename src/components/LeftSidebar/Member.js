import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useGetClubDataQuery } from '../../app/EndPoints/HarkatClub';
import PicturesLoading from '../isLoading/PicturesLoading';
import AllMembers from '../Members/AllMembers';
import HarkatCard from '../Harkat_administator/HarkatCard';
import RequestClub from '../MyClubs/RequestClub';

const Member= () => {
    const { id } = useParams();
  const [data, setData] = useState([]);


  
    const admin = useSelector((state) => state.admin.value);
    const clubMemberCheck = useSelector(state => state.clubcurrentmember.member_status);
    const { data: members, isLoading } = useGetClubDataQuery(id);
    const activeMembers = members.all_members.filter(member => member.member_status === 'active');
    return (
        <div>
         {/* <div className=" p-2 my-5 mx-7 rounded-lg border-2 border-gray-200 mt-2"> */}
    
      {/* navbar section */}
      <div className="flex justify-center  gap-2 items-center mb-3 border-gray-300 pb-2">
    

        {/* searchbar */}
        {/* <div className="relative border border-gray-200 rounded-lg w-[300px] max-w-lg">
          <input
            type="text"
            className="rounded-full p-2 w-full"
            placeholder="Search "
          />
          <button type="submit" className="absolute right-4 top-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div> */}
      </div>

      {/* content section */}
        {/* <Loading /> */}
      {/* {isLoading ? (
        <div><h1>loding</h1></div>
      ) : data?.length > 0 ? ( */}

        <div className="flex flex-col justify-center">
          <div className="grid grid-cols-3 gap-3 mt-4 border">
            {/* {data?.map((member, i) => ( */}
              <HarkatCard  />
            {/* ))} */}
          </div>
        </div>
      {/* ) : (
        <h1 className=" my-5 text-red-400">No Friends found!</h1>
      )} */}
    </div>
   
        // </div>
    );
};

export default Member;




         {/* <div className='mt-10 2xl:ml-7'>
                {
                    isLoading ? <div className='flex flex-col justify-center items-center mt-48'><PicturesLoading /> </div> : <div>
                        {admin || clubMemberCheck === 'active' ? <div>
                            <div className='flex justify-between items-center mt-5 pl-4 bg-accent p-2 rounded-xl text-lg font-semibold 2xl:w-[800px]'>
                                <div>
                                    <h1>Members</h1>
                                </div>
                                <div>
                                    <fieldset className="w-full space-y-1 ">
                                        <label for="Search" className="hidden">Search</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                                <button type="button" title="search" className="p-1 focus:outline-none focus:ring">
                                                    <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 text-black">
                                                        <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                                                    </svg>
                                                </button>
                                            </span>
                                            <input type="search" name="Search" placeholder="Search..." className="w-32 py-1 pl-10 text-sm rounded-md sm:w-auto focus:outline-none first-letter:bg-gray-800 focus:border-violet-400" />
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                            {
                                activeMembers.map(member => <AllMembers key={member.member_Club_id} member={member}></AllMembers>)
                            }
                        </div> : ''}
                    </div>
                }
            </div> */}