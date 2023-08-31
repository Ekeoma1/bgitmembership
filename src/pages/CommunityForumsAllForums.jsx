import React from 'react';
import '../../src/assets/scss/communityForumsAllForums.scss';
import AllForums from '../components/CommunityForumsAllForums/AllForums';
import Recommended from '../components/CommunityForumsAllForums/Recommended';

const CommunityForumsAllForums = () => {
  return (
    <div className='all-forums-wrapper'>
      <AllForums />
      <Recommended basedOn='industry' />
      <Recommended basedOn='location' />
    </div>
  );
};

export default CommunityForumsAllForums;
  