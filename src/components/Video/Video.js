import React from 'react';

const Video = (props) => {
    const { video } = props.post;
    return (
        <div style={{width:"30vw"}} className=' '>
            <video loop controls muted>
                <source  src={video} type="video/mp4" />
            </video>
        </div>
    );
};

export default Video;