import React from 'react';
import '../../../../assets/scss/atoms.scss';
import SingleLineLoader from '../SingleLineLoader';
import { UserProfilePhotoLoader2 } from '../dashboard-page/UserProfilePhotoLoader';

const EventTicketLoader = () => {
  return (
    <div className='event-ticket-loader'>
      <div className='page-title'>
        <SingleLineLoader />
      </div>
      <div className='info'>
        <div className='ticket-details'>
          <div className='title'>
            <SingleLineLoader />
          </div>
          <div className='title-2'>
            <SingleLineLoader />
          </div>
          {/* <div className='title'>
          <SingleLineLoader />
        </div> */}
        </div>
        <div className='user-details'>
          <div className='title'>
            <SingleLineLoader />
          </div>
          {/* <div className='title'>
          <SingleLineLoader />
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default EventTicketLoader;
