import React from 'react';
import '../../../../assets/scss/atoms.scss';
import SingleLineLoader from '../SingleLineLoader';
import { UserProfilePhotoLoader2 } from '../dashboard-page/UserProfilePhotoLoader';

const EventLoader = () => {
  return (
    <div className='event-loader'>
      <div className='con'>
        <div className='wrapper'>
          <div className='details'>
            <div className='title'>
              <SingleLineLoader />
            </div>
            <div className='info'>
              <div className='box'>
                <div className='top'>
                  <SingleLineLoader />
                </div>
                <div className='bottom'>
                  <SingleLineLoader />
                </div>
              </div>
              <div className='box'>
                <div className='top'>
                  <SingleLineLoader />
                </div>
                <div className='bottom'>
                  <SingleLineLoader />
                </div>
              </div>
            </div>
          </div>
          <div className='about'>
            <div className='title'>
              <SingleLineLoader />
            </div>
            <div className='info'>
              <div className='long'>
                <SingleLineLoader />
              </div>
              <div className='short'>
                <SingleLineLoader />
              </div>
            </div>
            <div className='info'>
              <div className='long'>
                <SingleLineLoader />
              </div>
              <div className='short-2'>
                <SingleLineLoader />
              </div>
            </div>
            <div className='info'>
              <div className='long'>
                <SingleLineLoader />
              </div>
              <div className='short'>
                <SingleLineLoader />
              </div>
            </div>
          </div>
          <div className='tags'>
            <div className='title'>
              <SingleLineLoader />
            </div>
            <div className='tags-con'>
              <div className='item'>
                <SingleLineLoader />
              </div>
              <div className='item'>
                <SingleLineLoader />
              </div>
              <div className='item'>
                <SingleLineLoader />
              </div>
            </div>
          </div>
          <div className='event-creator'>
            <div className='title'>
              <SingleLineLoader />
            </div>
            <div className='info'>
              <div className='img'>
                <UserProfilePhotoLoader2 />
              </div>
              <div className='name'>
                <SingleLineLoader />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventLoader;
