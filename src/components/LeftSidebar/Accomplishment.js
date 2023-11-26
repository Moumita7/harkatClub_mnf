import React from 'react';
import style from '../CSS/Accomplishment.module.css';

const Accomplishment = () => {
    return (
        <div className={`${style.keep_scrolling} h-[740px] px-5 mt-10 2xl:ml-5`}>
            <div>
                <h1 className='mb-3 pl-4 bg-accent p-2 text-center rounded-xl text-lg font-semibold w-[500px] 2xl:w-[750px]'>Event Organized (2)</h1>
                <div className='grid grid-cols-2 gap-5'>
                    <div className="p-5 rounded-md shadow-md bg-slate-50">
                        <img src="https://source.unsplash.com/random/300x300/?1" alt="" className="object-cover object-center w-full rounded-md h-64" />
                        <div className="mt-6 mb-2">
                            <span className="block text-xs font-medium tracking-widest uppercase">Film</span>
                            <h2 className="text-xl font-semibold tracking-wide">Delhi,India</h2>
                        </div>
                    </div>
                    <div className="p-5 rounded-md shadow-md bg-slate-50">
                        <img src="https://source.unsplash.com/random/300x300/?1" alt="" className="object-cover object-center w-full rounded-md h-64" />
                        <div className="mt-6 mb-2">
                            <span className="block text-xs font-medium tracking-widest uppercase ">Event</span>
                            <h2 className="text-xl font-semibold tracking-wide">Mumbai,India</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-10'>
                <h1 className='mt-4 mb-3 pl-4 bg-accent p-2 text-center rounded-xl text-lg font-semibold'>Films Completed (2)</h1>
                <div className='grid grid-cols-2 gap-5'>
                    <div className="p-5 rounded-md shadow-md bg-slate-50">
                        <img src="https://source.unsplash.com/random/300x300/?1" alt="" className="object-cover object-center w-full rounded-md h-64" />
                        <div className="mt-6 mb-2">
                            <span className="block text-xs font-medium tracking-widest uppercase ">Film</span>
                            <h2 className="text-xl font-semibold tracking-wide">Delhi,India</h2>
                        </div>
                    </div>
                    <div className="p-5 rounded-md shadow-md bg-slate-50">
                        <img src="https://source.unsplash.com/random/300x300/?1" alt="" className="object-cover object-center w-full rounded-md h-64" />
                        <div className="mt-6 mb-2">
                            <span className="block text-xs font-medium tracking-widest uppercase">Event</span>
                            <h2 className="text-xl font-semibold tracking-wide">Mumbai,India</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accomplishment;