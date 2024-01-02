import React from 'react';
import '../../../../assets/scss/atoms.scss';

const NotificationsLoader = () => {
  return (
    <>
      <div className='notifications-loader shadow-sm'>
        <div className='card-top'>
          <div className='profile-photo skeleton-loader'></div>
          <div className='card-details'>
            <div className='name skeleton-loader'></div>
            <div className='details skeleton-loader'></div>
          </div>
        </div>
      </div>
      <div className='notifications-loader shadow-sm'>
        <div className='card-top'>
          <div className='profile-photo skeleton-loader'></div>
          <div className='card-details'>
            <div className='name skeleton-loader'></div>
            <div className='details skeleton-loader'></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NotificationsLoader;
