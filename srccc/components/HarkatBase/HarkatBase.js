import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useGetClubDataQuery } from '../../app/EndPoints/HarkatClub';
import Home from '../Home/Home';
import MyclubLoading from '../isLoading/MyclubLoading';
import LeftSidebar from '../LeftSidebar/LeftSidebar';
import Navbar from '../Navbar/Navbar';
import RightSidebar from '../RightSidebar/RightSidebar';

const HarkatBase = () => {
    const { id } = useParams();
    const { isLoading } = useGetClubDataQuery(id);
    return (
        <div>
            {
                isLoading ? <MyclubLoading /> : <div>
                    <Home id={id} />
                    <div>
                        <Navbar />
                    </div>
                    <div className='   grid grid-cols-12 gap-5 lg:justify-items-stretch 2xl:justify-items-center 3xl:justify-items-end'>
                        <div className='col-span-10 md:col-span-3 2xl:col-span-4 3xl:col-span-4 xl:col-span-3'>
                            <LeftSidebar></LeftSidebar>
                        </div>
                        <div className='col-span-10 md:col-span-6 2xl:col-span-4 3xl:col-span-4 xl:col-span-8'>
                            <Outlet></Outlet>
                        </div>
                        {/* <div className='col-span-10 md:col-span-3 2xl:col-span-4 3xl:col-span-4 xl:col-span-3'>
                            <RightSidebar></RightSidebar>
                        </div> */}
                    </div>
                </div>
            }
        </div>
    );
};

export default HarkatBase;