import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useGetEventQuery } from '../../app/EndPoints/HarkatClub';
import FeedLoader from '../isLoading/FeedLoader';
import CreateEvent from './CreateEvent';
import FutureActivity from './FutureActivity';
import PastActivity from './PastActivity';
import ProposedActivity from './ProposedActivity';

const Activities = () => {
    const { id } = useParams();
    // console.log(id);
    const [proposedActivities, setProposedActivities] = useState(true);
    const [futureActivities, setFutureActivities] = useState(false);
    const [pastActivities, setPastActivities] = useState(false);
    const [createEventForm, setCreateEventForm] = useState(false);
    const admin = useSelector((state) => state.admin.value);
    const proposedActivitiesClick = () => {
        setProposedActivities(true);
        setFutureActivities(false);
        setPastActivities(false);
    }
    const futureActivitiesClick = () => {
        setFutureActivities(true);
        setProposedActivities(false);
        setPastActivities(false);
    }
    const pastActivitiesClick = () => {
        setPastActivities(true);
        setFutureActivities(false);
        setProposedActivities(false);
    }
    const { data: club_events, isLoading } = useGetEventQuery(id);
    // console.log(club_events)
    return (
        <div className='2xl:w-[800px]'>
            <div className='flex justify-between items-center mt-10 text-xl px-5'>
                <h1 onClick={proposedActivitiesClick} onDoubleClick={() => setProposedActivities(false)} className={proposedActivities ? 'w-58 p-2 cursor-pointer rounded-md text-center bg-[#ee3c4d] font-semibold text-white' : 'w-58 bg-accent p-2 cursor-pointer rounded-md text-center'}>Proposed Activities</h1>
                <h1 onClick={futureActivitiesClick} onDoubleClick={() => setFutureActivities(false)} className={futureActivities ? 'w-52 p-2 cursor-pointer rounded-md text-center bg-[#ee3c4d] font-semibold text-white' : 'w-48 bg-accent p-2 cursor-pointer rounded-md text-center'}>Future Activities</h1>
                <h1 onClick={pastActivitiesClick} onDoubleClick={() => setPastActivities(false)} className={pastActivities ? 'w-48 p-2 cursor-pointer rounded-md text-center bg-[#ee3c4d] font-semibold text-white' : 'w-48 bg-accent p-2 cursor-pointer rounded-md text-center'}>Past Activities</h1>
            </div>
            {isLoading ? <div className='flex justify-center items-center mt-10'><FeedLoader /></div> : <div>
                {proposedActivities && <div className='mt-5 flex flex-col justify-center items-center 2xl:ml-7'>
                    {
                        club_events?.results?.slice(1).slice(-1).map(event => <ProposedActivity key={event?.HarkatClubEvents_id} event={event}></ProposedActivity>).reverse()
                    }
                    {admin && <div className='mt-10'>
                        <label htmlFor='create-event' onClick={() => setCreateEventForm(true)} className='text-xl bg-[#ee3c4d] cursor-pointer text-white p-2 rounded-xl font-semibold'>Create Event</label></div>}
                </div>}
            </div >}
            {
                futureActivities && <div className='mt-5 px-10 flex justify-center items-center 2xl:ml-7'><FutureActivity /></div>
            }
            {
                pastActivities && <div className='mt-5 px-10 flex justify-center items-center 2xl:ml-7'><PastActivity /></div>
            }
            {createEventForm && <CreateEvent createEventForm={createEventForm} setCreateEventForm={setCreateEventForm}></CreateEvent>}
        </div >
    );
};

export default Activities;