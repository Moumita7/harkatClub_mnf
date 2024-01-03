import React, { useContext, useEffect, useRef, useState } from 'react';
import { Avatar, Box, Button, Slider } from '@mui/material';
import AvatarEditor from 'react-avatar-editor';
import uploadImg from '../../assets/uploader.png';
import cmrr from '../../assets/camera.png';

import { FcOldTimeCamera } from 'react-icons/fc';
import { Url, config } from '../../MyServer';
import axios from 'axios';
import { UserContext } from '../../App';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router';

import cameraIcon from '../../assets/camera-icon.png'

const ProfilePhoto = () => {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState("");
    const {id} = useParams()
    const [profileInformation, setProfileInformation] = useState({});
    const [profilePicture,setProfilePicture] = useState(null)
    const { userId} = useContext(UserContext)
    const [uploadedImage, setUploadedImage] = useState(null);

//     http://115.245.192.138/memberpage/profilepicture
// http://115.245.192.138/memberpage/profilepicture/user_id
    const fetchData = async () => {
        try {
            const res = await axios.get(Url + `/memberpage/profilepicture/${id || userId}`, config)
            console.log("profile pic: ", res.data)
            setProfilePicture(res.data[0]?.profile_photo)
            const response = await fetch(
                `${Url}/memberpage/api/v1/loggedInUser`, config);
            if (!response.ok) {
                throw new Error("Error fetching data");
            }
            const info = await response.json();
            setProfileInformation(info);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (id || userId) {
            fetchData()
        }
    }, [id,userId]);

    const handleCancel = () => {
        setUploadedImage(null);
        setImage(null)
    };

    const onDrop = async (acceptedFiles) => {
        console.log("inside drop",acceptedFiles[0]?.name)
        const validImageTypes = ["jpg","jpeg","png","gif","JPG","JPEG","PNG","GIF"]
       
        if (validImageTypes.includes(acceptedFiles[0]?.name?.split(".").pop())){
            const file = acceptedFiles[0];
            setImage(file)
            setUploadedImage(URL.createObjectURL(file));
        }else{
            alert("Please provide a valid image file..!")
        }
    };
    const { getRootProps, getInputProps } = useDropzone({onDrop});

    const handleSave = async () => {
        if (uploadedImage) {
            const formData = new FormData();
            formData.append('profile_photo', image);
            formData.append('user_id', userId);
            try {
                const res = await axios.put(Url + `/memberpage/profilepicture/${userId}`, formData, config)
                console.log("upload api: ", res);
                setOpen(false);
                setUploadedImage(null)
                fetchData()
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    return (
        <div>
            <div display="flex justify-center items-center " style={{ border: "1px dotted white", borderRadius: "50%", height: "100px", width: "100px", position: "relative" }}>
            <img
                    alt='profile pic' className='w-[94px] h-[94px] rounded-full'
                    src={profilePicture ? `${Url}${profilePicture}` : "https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg"}
                />
                {
                    !id && <label className='absolute -top-0 right-[8px] text-4xl cursor-pointer background-cover rounded-full' htmlFor='edit-modal' onClick={() => setOpen(true)}>
                        {/* <span className="hover:tooltip-accent hover:tooltip hover:tooltip-bottom" data-tip="Choose your profile photo">  */}
                        <img title='Choose your profile photo' src={cameraIcon} className="w-[24px] h-[24px] rounded-full" alt="..." /> 
                        {/* </span> */}
                        </label>
                }

            </div>
            {open && <div> <input type="checkbox" id="edit-modal" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle 2xl:mt-0">
                    <div className="modal-box relative " >
                        <label onClick={handleCancel} htmlFor="edit-modal" className="btn btn-sm btn-circle absolute right-2 top-2 bg-seaGreen hover:text-[#fff]">✕</label>
                        {uploadedImage ? (
                            <Box display="block">
                                <AvatarEditor
                                    image={uploadedImage}
                                    width={220}
                                    height={250}
                                    border={50}
                                    color={[255, 255, 255, 0.6]}
                                    rotate={0}
                                />
                                <Box className="flex gap-3">
                                    <button  className='mr-3 px-3 py-2 bg-seaGreen text-[#fff]'  onClick={handleCancel}>
                                        Cancel
                                    </button>
                                    <button className=' px-3 py-2 bg-seaGreen text-[#fff]' onClick={handleSave}>Save</button>
                                </Box>
                            </Box>
                        ) : <div className='flex flex-col justify-center items-center mt-5 mb-2'>
                            <div
                                className="dropzone drop-file-input w-full h-[11rem] border-dashed"
                                {...getRootProps()}
                            >
                                <div className="drop-file-input__label" >
                                    <img src={uploadImg} alt="" className='h-36' />
                                    <p style={{ zIndex: "9999" }}>Choose your photo</p>
                                    <input  {...getInputProps()} />
                                    
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
            }
        </div>
    );
};

export default ProfilePhoto;