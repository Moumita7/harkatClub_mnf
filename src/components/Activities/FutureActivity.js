import React from 'react';

const FutureActivity = () => {
    return (
        <div>
            <div className="p-6 rounded-md shadow-md bg-slate-100 w-[500px] 2xl:w-[800px]">
                <img src="https://source.unsplash.com/random/300x300/?1" alt="" className="object-cover object-center w-full rounded-md h-72 bg-gray-500" />
                <div className="mt-6 mb-2">
                    <span className="block text-xl font-medium tracking-widest uppercase text-black">Date and Venue</span>
                </div>
                <p className="text-black">Mauris et lorem at elit tristique dignissim et ullamcorper elit. In sed feugiat mi. Etiam ut lacinia dui.</p>
                <h2 className='bg-gray-500 text-white font-semibold w-32 text-center'>Comming soon</h2>
            </div>
        </div>
    );
};

export default FutureActivity;