import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useUpdateClubMediaMutation } from '../../app/EndPoints/HarkatClub';
import uploadImg from '../../assets/uploader.png';
import CSRFToken from '../CSRF_Token/CSRFToken';

const EditModal = ({ media, setEdit, edit, setOpen }) => {
    const { media_id, club_id, img, video } = media;
    const wrapperRef = useRef(null);
    const onDragEnter = () => wrapperRef.current.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
    const onDrop = () => wrapperRef.current.classList.remove('dragover');
    const user = useSelector(state => state.user.id);
    const [updateClubMedia, resMedia] = useUpdateClubMediaMutation();
    const [fileList, setFileList] = useState(" ");
    const fileName = (e) => {
        const fileL = e.target.files[0].name.length;
        if (fileL > 90) {
            toast.error("Your file name should be less than 90 character.", {
                position: toast.POSITION.BOTTOM_CENTER
            });
            
            e.target.reset();
        }
        const newFile = e.target.files[0];
        if (newFile) {
            setFileList(newFile.name);
        }
    }

    // edit post
    const handleEdit = (e) => {
        e.preventDefault();
        if (e.target.uploadFile.files[0].name.match(/\.(jpg|jpeg|png|gif)$/) && img) {
            const file = e.target.uploadFile.files[0];
            const title = e.target.title.value;
            const body = new FormData();
            body.append('img', file);
            body.append('post', title);
            body.append('club_id', club_id);
            body.append('user_id', user);
            const data = { id: media_id, body: body }
            updateClubMedia(data);
            if (!resMedia.isSuccess) {
                toast.info("Image is updating now.", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                toast.info("Image Updated Successfully", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }
            e.target.reset();
            setFileList(" ");
            setOpen(false);

        }
        else if (e.target.uploadFile.files[0].name.match(/\.(mp4|mov|avi|3gp)$/) && video) {
            const file = e.target.uploadFile.files[0];
            const title = e.target.title.value;
            const body = new FormData();
            body.append('video', file);
            body.append('post', title);
            body.append('club_id', club_id);
            body.append('user_id', user);
            const data = { id: media_id, body: body }
            updateClubMedia(data);
            if (!resMedia.isSuccess) {
                toast.info("Video is updating now.", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                toast.info("Video Updated Successfully", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }
            e.target.reset();
            setFileList("");
            setOpen(false);
        }
        else {
            toast.error("Selected wrong file.", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
        setEdit(false);
    }
    return (
        <div>
            {edit && <div>
                <input type="checkbox" id="edit-modal" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle mt-20 2xl:mt-0">
                    <div className="modal-box relative">
                        <label htmlFor="edit-modal" className="btn btn-sm btn-circle absolute right-2 top-2 hover:text-white">✕</label>
                        <form onSubmit={handleEdit}>
                            <CSRFToken />
                            <div className='flex flex-col justify-center items-center mt-5 mb-2'>
                                <div
                                    ref={wrapperRef}
                                    className="drop-file-input w-full h-76 border-dashed"
                                    onDragEnter={onDragEnter}
                                    onDragLeave={onDragLeave}
                                    onDrop={onDrop}
                                >
                                    <div className="drop-file-input__label_2 mt-[-40px]">
                                        <img src={uploadImg} alt="" />
                                        {fileList === '' ? '' : <p>Drag & Drop your files here</p>}
                                        <p>{fileList.slice(0, 20)}</p>
                                    </div>
                                    <input type="file" name='uploadFile' className='p-0' accept="image/*,video/*" onChange={fileName} />
                                </div>
                            </div>
                            <div className="w-full max-w-xs">
                                <label className='ml-2'>
                                    <span className='text-xl font-semibold mb-2'>Description</span>
                                </label>
                                <textarea name='title' className="textarea textarea-primary resize-none w-[375px]" placeholder="Description"></textarea>
                            </div>
                            <div className='flex justify-center items-center'>
                                <input className='uppercase font-semibold px-8 rounded-xl cursor-pointer py-2 mt-4 text-white' style={{ backgroundColor: "#ee3c4d" }} type="submit" value='Update' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default EditModal;