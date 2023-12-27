import { useState, useEffect } from 'react';
import '../../src/assets/scss/communityForumsAllForums.scss';
import AllForums from '../components/CommunityForumsAllForums/AllForums';
import Recommended from '../components/CommunityForumsAllForums/RecommendedBasedOnIndustry';
import RecommendedBasedOnIndustry from '../components/CommunityForumsAllForums/RecommendedBasedOnIndustry';
import RecommendedBasedOnLocation from '../components/CommunityForumsAllForums/RecommendedBasedOnLocation';

const CommunityForumsAllForums = () => {
  const [searchMain, setSearchMain] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='all-forums-wrapper bg-color22'>
      <AllForums setSearchMain={setSearchMain} />
      <RecommendedBasedOnIndustry />
      <RecommendedBasedOnLocation />
    </div>
  );
};

export default CommunityForumsAllForums;
