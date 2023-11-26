import React from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import HarkatBase from './components/HarkatBase/HarkatBase';
import ClubDetails from './components/LeftSidebar/ClubDetails';
import NewsFeed from './components/NewsFeed/NewsFeed';
import ContactGoveringBody from './components/LeftSidebar/ContactGoveringBody';
import MessageBox from './components/LeftSidebar/MessageBox';
import MembersRequest from './components/LeftSidebar/MembersRequest';
import Members from './components/LeftSidebar/Members';
import SkillsAvailable from './components/LeftSidebar/SkillsAvailable';
import SkillsLookingFor from './components/LeftSidebar/SkillsLookingFor';
import PostActivities from './components/LeftSidebar/PostActivities';
import CurrentActivities from './components/LeftSidebar/CurrentActivities';
import FutureActivity from './components/LeftSidebar/FutureActivity';
import ProposeActivity from './components/LeftSidebar/ProposeActivity';
import Pictures from './components/LeftSidebar/Pictures';

import Videos from './components/LeftSidebar/Videos';
import Announcements from './components/LeftSidebar/Announcements';
import News from './components/LeftSidebar/News';
import PromoteClub from './components/LeftSidebar/PromoteClub';
import UploadPost from './components/LeftSidebar/UploadPost';
import MyClubs from './components/MyClubs/MyClubs';
import Accomplishment from './components/LeftSidebar/Accomplishment';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Activities from './components/Activities/Activities';
import ExistingClubDetails from './components/LeftSidebar/ExistingClubDetails';
// import MyClubb from './components/MyClubs/MyClubb';
import MyClubsHead from './components/MyClubs/MyClubsHead';
import SingleHarkatPage from './components/HarkatBase/SingleHarkatPage';

import 'tailwindcss/tailwind.css'; // Make sure to import your Tailwind CSS file
// import './your-custom-styles.css';

function App() {
  return (
    <div className="font-poppins">
      <Routes>

        {/* <Route path='/' element={<MyClubs />}></Route> */}
        <Route path='/' element={<MyClubsHead />}></Route>
        {/* <Route path='/' element={<SingleHarkatPage/>}></Route> */}
      



        {/* <Route path='/:id' element={<SingleHarkatPage />}></Route> */}
        <Route path='/:id' element={<HarkatBase />}>

          <Route path='' element={<NewsFeed />}></Route>
          <Route path='newsfeed' element={<NewsFeed />}></Route>
          <Route path='activities' element={<Activities />}></Route>
          <Route path='clubdetails' element={<ExistingClubDetails/>}></Route>
          <Route path='accomplishment' element={<Accomplishment />}></Route>
          <Route path='contactgoverningbody' element={<ContactGoveringBody />}></Route>
          <Route path='messagebox' element={<MessageBox />}></Route>
          <Route path='membersrequest' element={<MembersRequest />}></Route>
          <Route path='members' element={<Members />}></Route>
          <Route path='skillavailable' element={<SkillsAvailable />}></Route>
          <Route path='skillfor' element={<SkillsLookingFor />}></Route>
          <Route path='pastactivities' element={<PostActivities />}></Route>
          <Route path='currentactivities' element={<CurrentActivities />}></Route>
          <Route path='futureactivity' element={<FutureActivity />}></Route>
          <Route path='proposeactivity' element={<ProposeActivity />}></Route>
          <Route path='pictures' element={<Pictures />}></Route>
          <Route path='pictures' element={<ClubDetails />}></Route>
          <Route path='videos' element={<Videos />}></Route>
          <Route path='announcement' element={<Announcements />}></Route>
          <Route path='news' element={<News />}></Route>
          <Route path='promoteclub' element={<PromoteClub />}></Route>
          <Route path='uploadpost' element={<UploadPost />}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
