import dayjs from 'dayjs';
import React from 'react';

const ProposedActivity = (props) => {
    const { event_start, desciption, event_end, venue, event_poster } = props.event;
    const startDate = dayjs(event_start).format('LL LT');
    const endDate = dayjs(event_end).format('LL LT');
    console.log(event_start);
    return (
        <div>
            <div className="p-3 rounded-md shadow-xl w-[500px] 2xl:w-[800px]">
                <img src={event_poster} alt="" className="object-cover object-center w-full rounded-md h-72 bg-gray-500" />
                <div className="mt-6 mb-2">
                    <span className="block text-xl font-semibold text-black tracking-widest">Event Start: <span className='font-medium'>{startDate}</span></span>
                    <span className="block text-xl font-semibold tracking-widest text-black">Event End: <span className='font-medium'>{endDate}</span></span>
                    <span className="block text-xl font-semibold tracking-widest text-black">Event Venue: {venue}</span>
                </div>
                <p className="text-black text-lg">{desciption.slice(0, 200)}..</p>
            </div>
        </div>
    );
};

export default ProposedActivity;