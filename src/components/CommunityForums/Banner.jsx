import React from 'react';
import '../../../src/assets/scss/communityForums.scss';
import { HiArrowLeft } from 'react-icons/hi';
import backgroundImage1 from '../../../src/assets/images/the-girls.svg';
import useWindowSize from '../../hooks/useWindowSize';

const Banner = () => {
  const { isMobile } = useWindowSize();

  return (
    <div className='banner-section'>
      <div className='container'>
        <div className='page-title-wrapper'>
          <div className='title-wrapper'>
            {/* <HiArrowLeft /> */}
            <h3 className='text-color'>My forumns</h3>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${backgroundImage1})`,
          // backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        className='banner-wrapper'
      >
        <div className='banner-gradient'>
          <div className='banner-content'>
            <h3>Chat and connect with your communities</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
