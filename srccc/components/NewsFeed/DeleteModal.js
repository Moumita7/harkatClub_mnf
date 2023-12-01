import React from 'react';
import { toast } from 'react-toastify';
import { useDeleteClubMediaMutation } from '../../app/EndPoints/HarkatClub';

const DeleteModal = ({ media, setDeleting, deleting, setOpen }) => {
    const { img, video, media_id } = media;
    const [deleteClubMedia] = useDeleteClubMediaMutation()
    // delete post
    const handleDelete = (id) => {
        if (img) {
            deleteClubMedia(id);
            setOpen(false);
            setDeleting(false);
            toast.info("Image is deleting now.", {
                position: toast.POSITION.BOTTOM_CENTER
            });
            toast.info("Image Deleted Successfully",  {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
        else if (video) {
            deleteClubMedia(id);
            setOpen(false);
            setDeleting(false);
            toast.info("Video is deleting now.", {
                position: toast.POSITION.BOTTOM_CENTER
            });
            toast.info("Video Deleted Successfully", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
    }
    return (
        <div>
            {
                deleting && <div>
                    <input type="checkbox" id="delete-modal" className="modal-toggle" />
                    <div className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Are you sure want to delete?</h3>
                            <div className="modal-action">
                                {img && <button onClick={() => { handleDelete(media_id); setDeleting(false); }} className='mnf_btn px-5 h-[32px]  rounded-lg text-[#ee3c4d] font-semibold hover:text-white'>Delete</button>}
                                {video && <button onClick={() => { handleDelete(media_id); setDeleting(false); }} className='mnf_btn px-5 h-[32px] rounded-lg text-[#ee3c4d] font-semibold hover:text-white'>Delete</button>}
                                <label htmlFor="delete-modal" className="mnf_btn px-5 py-2 rounded-lg text-[#ee3c4d] hover:text-white font-semibold cursor-pointer">Cancel</label>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default DeleteModal;