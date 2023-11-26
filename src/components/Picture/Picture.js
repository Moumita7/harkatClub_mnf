import React from 'react';
import { Image } from "@zzwing/react-image";

const Picture = ({ club_image }) => {
    const { img } = club_image;
    // console.log(index);
    return (
        <div className="">
            <div >
                {/* <Image  src={img}  /> */}
                <img src={img} alt="img" className='w-[100%] h-[150px]  rounded-md'/>
            </div>
        </div>
    );
};

export default Picture;