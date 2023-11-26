import React from 'react';
import { BiUserPlus, BiUserX } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { useDeleteRQMutation, useMemberUpdateMutation } from '../../app/EndPoints/HarkatClub';
const NewRequests = (props) => {
    const { skills, member_Club_id } = props.member;
    const [memberUpdate, resInfo] = useMemberUpdateMutation();
    const [deleteRQ, resInfo1] = useDeleteRQMutation();
    const acceptMemberRequest = () => {
        const body = {
            club_member_id: member_Club_id, status: "active"
        }
        memberUpdate(body);
        toast.success("Join Request Accept successfully.", {
            position: toast.POSITION.BOTTOM_CENTER
        });
    }
    const DeleteMemberRequest = () => {
        const body = {
            club_member_id: member_Club_id, status: "deny"
        }
        memberUpdate(body);
        toast.success("Deny Request Accept successfully.", {
            position: toast.POSITION.BOTTOM_CENTER
        });
    }
    console.log( props.member,"member update")
    // const deleteMemberRequest = () => {
    //     const id = member_Club_id;
    //     deleteRQ(id);
    //     toast.success("Request delete successfully.", {
    //         position: toast.POSITION.BOTTOM_CENTER
    //     });
    // }
    if (resInfo.isSuccess) {
        window.location.reload();
    }
    if (resInfo1.isSuccess) {
        window.location.reload();
    }
    return (
        <div>
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
                        <p className="text-xl">Name</p>
                    </div>
                    <div className='mr-5 border rounded-full px-2 bg-accent text-xl'>{skills}</div>
                </div>
                <div className='flex items-center cursor-pointer'>
                    <div onClick={acceptMemberRequest} className='text-3xl text-green-700 mr-3 hover:tooltip-accent hover:tooltip hover:tooltip-bottom' data-tip="Accept Request"><BiUserPlus /></div>
                    <div onClick={DeleteMemberRequest} className='text-3xl text-red-700 mr-2 hover:tooltip-accent hover:tooltip hover:tooltip-bottom' data-tip="Delete Request"><BiUserX /></div>
                </div>
            </div>
        </div>
    );
};

export default NewRequests;