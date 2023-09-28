import React from 'react';
import '../../src/assets/scss/communityForums.scss';
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
