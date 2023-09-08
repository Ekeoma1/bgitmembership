import React, { useState } from 'react';
import '../../src/assets/scss/communityForumsAllForums.scss';
import AllForums from '../components/CommunityForumsAllForums/AllForums';
import Recommended from '../components/CommunityForumsAllForums/Recommended';

const CommunityForumsAllForums = () => {
  const [searchMain, setSearchMain] = useState(false);
  return (
    <div className='all-forums-wrapper bg-color2'>
      <AllForums setSearchMain={setSearchMain} />
      {!searchMain && (
        <>
          <Recommended basedOn='industry' />
          <Recommended basedOn='location' />
        </>
      )}
    </div>
  );
};

export default CommunityForumsAllForums;
