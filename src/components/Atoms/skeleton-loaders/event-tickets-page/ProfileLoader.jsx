import React from 'react';
import '../../../../assets/scss/atoms.scss';
import ImgLoader from '../ImgLoader';
import SingleLineLoader from '../SingleLineLoader';

const ProfileLoader = () => {
  return (
    <>
      <div className='profile-loader '>
        <div className='img'>
          <ImgLoader />
        </div>
        <div className='details'>
          <div className='name'>
            <SingleLineLoader />
          </div>
          <div className='no-of-orders'>
            <SingleLineLoader />
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileLoader;
