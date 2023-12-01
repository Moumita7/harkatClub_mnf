import React, { useState } from 'react';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';

const Toggle = ({ media, setOpen }) => {
    const [edit, setEdit] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const { img, video } = media;
    return (
        <div>
            <div className='bg-white shadow-2xl rounded-xl w-60 p-3'>
                {
                    img || video ? <div className='p-1 mb-1  text-lg cursor-pointer rounded toggle_btn hover:text-[#ee3c4d] font-semibold'>
                        <label className='mt-2 pr-24 flex items-center cursor-pointer' onClick={() => { setEdit(true) }} htmlFor="edit-modal"> <span className='mr-2'><FiEdit /></span>Edit Post</label>
                    </div> : ''
                }

                {
                    img || video ? <div className='p-1 text-lg cursor-pointer rounded toggle_btn hover:text-[#ee3c4d] font-semibold'>
                        <label className='mt-2 pr-20 flex items-center cursor-pointer' htmlFor="delete-modal" onClick={() => setDeleting(true)}><span className='mr-2'><RiDeleteBinLine /></span> Delete Post</label>
                    </div> : ''
                }
            </div>
            {
                edit && <EditModal edit={edit} media={media} setEdit={setEdit} setOpen={setOpen} ></EditModal>
            }
            {
                deleting && <DeleteModal deleting={deleting} media={media} setDeleting={setDeleting} setOpen={setOpen}></DeleteModal>
            }
        </div>
    );
};

export default Toggle;