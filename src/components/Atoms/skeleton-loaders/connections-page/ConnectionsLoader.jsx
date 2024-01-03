import React from 'react';
import '../../../../assets/scss/atoms.scss';
import ImgLoader from '../ImgLoader';
import SingleLineLoader from '../SingleLineLoader';

const ConnectionsLoader = () => {
  return (
    <div className='connections-loader'>
      <div className='user '>
        <div className='profile-photo'>
          <ImgLoader />
        </div>
        <div className='details'>
          <div className='name'>
            <SingleLineLoader />
          </div>
          <div className='profession'>
            <SingleLineLoader />
          </div>
        </div>
      </div>
      <div className='user'>
        <div className='profile-photo'>
          <ImgLoader />
        </div>
        <div className='details'>
          <div className='name'>
            <SingleLineLoader />
          </div>
          <div className='profession'>
            <SingleLineLoader />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConnectionsLoader;
