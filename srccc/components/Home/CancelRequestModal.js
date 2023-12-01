import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useDeleteRQMutation } from '../../app/EndPoints/HarkatClub';

const CancelRequestModal = ({ cancelRequest, setCancelRequest }) => {
    const [deleteRQ, resInfo] = useDeleteRQMutation();
    const clubMember = useSelector(state => state.clubcurrentmember.member_Club_id);
    const cancelRequestMember = () => {
        const id = clubMember;
        deleteRQ(id);
        toast.success("Request cancelled successfully.", {
            position: toast.POSITION.BOTTOM_CENTER
        });
        setCancelRequest(false);
    }
    if (resInfo.isSuccess) {
        window.location.reload();
    }
    return (
        <div>
            {cancelRequest && <div>
                <input type="checkbox" id="cancel-modal" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Are you sure want to cancel join reuqest?</h3>
                        <div className="modal-action">
                            <button onClick={cancelRequestMember} className='primary-bg px-5 h-[32px] rounded-lg text-white font-semibold'>Yes</button>
                            <label htmlFor="cancel-modal" className="bg-neutral px-5 py-2 rounded-lg text-white font-semibold cursor-pointer">No</label>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default CancelRequestModal;