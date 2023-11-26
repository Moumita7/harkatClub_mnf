import React from 'react';
import { HiBadgeCheck } from 'react-icons/hi';

const Skill = () => {
    return (
        <div>
            <div className='flex justify-between mt-2'>
                <div className="py-1 w-full flex flex-row gap-2 items-center overflow-hidden rounded-full">
                    <span className="flex-shrink-0 inline-flex item-center border justify-center leading-none rounded-full">
                        <div className="avatar">
                            <div className="w-12 rounded-full border-2">
                                <img src="https://placeimg.com/192/192/people" alt='member pictures' />
                            </div>
                        </div>
                    </span>
                    <div className="flex-1 p-2">
                        <p className="text-md">Name</p>
                    </div>
                    <div className='border rounded-full px-2 bg-accent'>Primary Skill</div>
                    <div className='mr-5 border rounded-full px-2 bg-accent'>Secondary Skill</div>
                </div>
                <div className='flex items-center h-7 mt-4 cursor-pointer px-5 bg-accent rounded-full'>
                    <p className=''>rank</p>
                    <HiBadgeCheck />
                </div>
            </div>
        </div>
    );
};

export default Skill;