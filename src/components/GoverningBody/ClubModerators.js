import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineAddModerator } from 'react-icons/md';
import { TiUserDeleteOutline } from 'react-icons/ti';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useMemberUpdateMutation } from '../../app/EndPoints/HarkatClub';

const ClubModerators = ({ moderator }) => {
    const { member_status, member_Club_id } = moderator;
    const admin = useSelector((state) => state.admin.value);
    const [memberUpdate, resInfo1] = useMemberUpdateMutation();
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const openToggle = () => {
        setOpen(true);
    }
    const btnRef = useRef();
    useEffect(() => {
        const closeMenu = (e) => { if (!btnRef.current.contains(e.target)) { setOpen(false); } };

        document.body.addEventListener("mousedown", closeMenu);

        return () => document.body.removeEventListener("mousedown", closeMenu);
    }, []);
    const deleteModerator = () => {
        const body = {
            club_member_id: member_Club_id, status: "active"
        }
        memberUpdate(body);
        toast.success("Removing the moderator.", {
            position: toast.POSITION.BOTTOM_CENTER
        });
    }
    if (resInfo1.isSuccess) {
        toast.success("Remove moderator successfully.", {
            position: toast.POSITION.BOTTOM_CENTER
        });
        window.location.reload();
    }
    return (
        <div className='relative'>
            <div className='flex justify-between mt-2'>
                <div className="py-1 w-full flex flex-row gap-2 items-center overflow-hidden rounded-full">
                    <span className="flex-shrink-0 inline-flex item-center border justify-center leading-none rounded-full">
                        <div className="avatar">
                            <div className="w-12 rounded-full border-2">
                                <img src="https://media.istockphoto.com/id/1298261537/vector/blank-man-profile-head-icon-placeholder.jpg?s=612x612&w=0&k=20&c=CeT1RVWZzQDay4t54ookMaFsdi7ZHVFg2Y5v7hxigCA=" alt='member pictures' />
                            </div>
                        </div>
                    </span>
                    <div className="flex-1 p-2">
                        <p className="text-md font-semibold">Moderator Name</p>
                    </div>
                </div>
                <div className='flex items-center h-7 mt-4 cursor-pointer px-5 bg-accent rounded-full'>
                    <p className='font-semibold'>{member_status}</p>
                    <MdOutlineAddModerator />
                </div>
                {admin && <div ref={btnRef} className="flex justify-center items-center">
                    <button onClick={openToggle} title="Open option" type="button" className='cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                            <path d="M256,144a64,64,0,1,0-64-64A64.072,64.072,0,0,0,256,144Zm0-96a32,32,0,1,1-32,32A32.036,32.036,0,0,1,256,48Z"></path>
                            <path d="M256,368a64,64,0,1,0,64,64A64.072,64.072,0,0,0,256,368Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,464Z"></path>
                            <path d="M256,192a64,64,0,1,0,64,64A64.072,64.072,0,0,0,256,192Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,288Z"></path>
                        </svg>
                    </button>
                    <div className='absolute top-10 lg:left-[380px] 2xl:left-[540px] z-[1]'>
                        {
                            open && <div className='bg-white shadow-2xl rounded-xl w-72 p-3'> <div className='p-1 text-lg cursor-pointer rounded toggle_btn hover:text-[#ee3c4d] font-semibold'>
                                <label className='mt-2 flex items-center cursor-pointer' htmlFor="delete-modal" onClick={() => setDeleting(true)}><span className='mr-2'><TiUserDeleteOutline /></span> Remove from moderator</label>
                            </div>
                            </div>
                        }
                    </div>
                </div>}
            </div>
            {deleting && <div>
                <input type="checkbox" id="delete-modal" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Are you sure want to delete the member?</h3>
                        <div className="modal-action">
                            <button onClick={deleteModerator} className='primary-bg px-5 h-[32px] rounded-lg text-white font-semibold'>Yes</button>
                            <label htmlFor="delete-modal" className="bg-neutral px-5 py-2 rounded-lg text-white font-semibold cursor-pointer">No</label>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default ClubModerators;