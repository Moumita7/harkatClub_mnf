import React, { useEffect, useRef, useState } from 'react';
import { HiBadgeCheck } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import MemberToggle from './MemberToggle';
const AllMembers = ({ member }) => {
    const { member_id, skills, member_status } = member;
    console.log(member_id, "member data");
    const admin = useSelector((state) => state.admin.value);
    const [open, setOpen] = useState(false);
    const openToggle = () => {
        setOpen(!open);
    }
    const btnRef = useRef();
    useEffect(() => {
        const closeMenu = (e) => { if (!btnRef.current?.contains(e.target)) { setOpen(false); } };

        document.body.addEventListener("mousedown", closeMenu);

        return () => document.body.removeEventListener("mousedown", closeMenu);
    }, []);
    return (
        <div className='relative'>
            <div className='flex justify-between mt-2 border-y-2'>
                <div className="py-1 w-full flex flex-row gap-2 items-center overflow-hidden rounded-full">
                    <span className="flex-shrink-0 inline-flex item-center border justify-center leading-none rounded-full">
                        <div className="avatar">
                            <div className="w-12 rounded-full border-2">
                                <img src="https://media.istockphoto.com/id/1298261537/vector/blank-man-profile-head-icon-placeholder.jpg?s=612x612&w=0&k=20&c=CeT1RVWZzQDay4t54ookMaFsdi7ZHVFg2Y5v7hxigCA=" alt='member pictures' />
                            </div>
                        </div>
                    </span>
                    <div className="flex-1 p-2">
                        <p className="text-md">{member_id?.username}</p>
                    </div>
                    <div className='mr-5 border rounded-full px-2 bg-accent'>{skills}</div>
                </div>
                <div className='flex items-center h-7 mt-4 px-5 bg-accent rounded-full'>
                    <p className=''>{member_status}</p>
                    <HiBadgeCheck />
                </div>
                {admin && <div ref={btnRef} className="flex justify-center items-center">
                    <button onClick={openToggle} title="Open option" type="button" className='cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                            <path d="M256,144a64,64,0,1,0-64-64A64.072,64.072,0,0,0,256,144Zm0-96a32,32,0,1,1-32,32A32.036,32.036,0,0,1,256,48Z"></path>
                            <path d="M256,368a64,64,0,1,0,64,64A64.072,64.072,0,0,0,256,368Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,464Z"></path>
                            <path d="M256,192a64,64,0,1,0,64,64A64.072,64.072,0,0,0,256,192Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,288Z"></path>
                        </svg>
                    </button>
                    <div className='absolute top-10 lg:left-[430px] 2xl:left-[540px] z-[1]'>
                        {
                            open && <MemberToggle member={member} open={open} setOpen={setOpen}></MemberToggle>
                        }
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default AllMembers;