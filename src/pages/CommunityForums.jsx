import React from 'react';
import '../../src/assets/scss/communityForums.scss';
import LatestNews from '../components/Events-And-News/LatestNews';
import UpcomingEvents from '../components/Events-And-News/UpcomingEvents';
import { HiArrowLeft } from 'react-icons/hi';
import backgroundImage1 from '../../src/assets/images/the-girls.svg';
import Banner from '../components/CommunityForums/Banner';
import Communities from '../components/CommunityForums/Communities.jsx';
import SuggestedForums from '../components/CommunityForums/SuggestedForums';

const CommunityForumns = () => {
  return (
    <div className='community-forums-wrapper bg-color2'>
      <Banner />
      <Communities />
      <SuggestedForums />
    </div>
  );
};

export default CommunityForumns;
