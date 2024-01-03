import React from 'react';
import { toast } from 'react-toastify';
import { MdOutlineAddModerator } from 'react-icons/md';
import { BiBlock } from 'react-icons/bi';
import { TiUserDeleteOutline } from 'react-icons/ti';
import { useDeleteRQMutation, useMemberBlockMutation, useMemberUpdateMutation } from '../../app/EndPoints/HarkatClub';

const MemberToggle = ({ open, member }) => {
    const { member_Club_id } = member;
    const [memberBlock, resInfo] = useMemberBlockMutation();
    const [memberUpdate, resInfo1] = useMemberUpdateMutation();
    const [deleteRQ, resInfo2] = useDeleteRQMutation();
    const blockMember = () => {
        const body = {
            club_member_id: member_Club_id, status: "banned"
        }
        memberBlock(body);
        toast.success("Blocking the member.", {
            position: toast.POSITION.BOTTOM_CENTER
        });
    };
    const makeModerator = () => {
        const body = {
            club_member_id: member_Club_id, status: "moderator"
        }
        memberUpdate(body);
        toast.success("Making the member to moderator.", {
            position: toast.POSITION.BOTTOM_CENTER
        });
    };
    const deleteMember = () => {
        const id = member_Club_id;
        deleteRQ(id);
        toast.success("Deleting the member.", {
            position: toast.POSITION.BOTTOM_CENTER
        });
    }
    if (resInfo.isSuccess) {
        toast.success("Blocked member successfully.", {
            position: toast.POSITION.BOTTOM_CENTER
        });
        window.location.reload();
    }
    if (resInfo1.isSuccess) {
        toast.success("Making moderator successfully.", {
            position: toast.POSITION.BOTTOM_CENTER
        });
        window.location.reload();
    }
    if (resInfo2.isSuccess) {
        toast.success("Member deleted successfully.", {
            position: toast.POSITION.BOTTOM_CENTER
        });
        window.location.reload();
    }
    return (
        <div>
            {open && <div className='bg-white shadow-2xl rounded-xl w-60 p-3'>
                {/* <div className='p-1 mb-1  text-lg cursor-pointer rounded toggle_btn hover:text-[#ee3c4d] font-semibold'>
                    <label className='mt-2 pr-[2.5rem] flex items-center cursor-pointer' htmlFor="moderator-modal"><span className='mr-2'><MdOutlineAddModerator /></span>Make moderator</label>
                </div> */}
                <div className='p-1 text-lg cursor-pointer rounded toggle_btn hover:text-[#ee3c4d] font-semibold'>
                    <label className='mt-2 pr-[3rem] flex items-center cursor-pointer' htmlFor="block-modal"><span className='mr-2'><BiBlock /></span>Block member</label>
                </div>
                <div className='p-1 text-lg cursor-pointer rounded toggle_btn hover:text-[#ee3c4d] font-semibold'>
                    <label className='mt-2 pr-[3rem] flex items-center cursor-pointer' htmlFor="delete-modal"><span className='mr-2'><TiUserDeleteOutline /></span>Delete member</label>
                </div>
            </div>}
            <div>
                <input type="checkbox" id="moderator-modal" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Are you sure want to make moderator?</h3>
                        <div className="modal-action">
                            <button onClick={makeModerator} className='primary-bg px-5 h-[32px] rounded-lg text-white font-semibold'>Yes</button>
                            <label htmlFor="moderator-modal" className="bg-neutral px-5 py-2 rounded-lg text-white font-semibold cursor-pointer">No</label>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <input type="checkbox" id="block-modal" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Are you sure want to block the member?</h3>
                        <div className="modal-action">
                            <button onClick={blockMember} className='primary-bg px-5 h-[32px] rounded-lg text-white font-semibold'>Yes</button>
                            <label htmlFor="block-modal" className="bg-neutral px-5 py-2 rounded-lg text-white font-semibold cursor-pointer">No</label>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <input type="checkbox" id="delete-modal" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Are you sure want to delete the member?</h3>
                        <div className="modal-action">
                            <button onClick={deleteMember} className='primary-bg px-5 h-[32px] rounded-lg text-white font-semibold'>Yes</button>
                            <label htmlFor="delete-modal" className="bg-neutral px-5 py-2 rounded-lg text-white font-semibold cursor-pointer">No</label>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default MemberToggle;