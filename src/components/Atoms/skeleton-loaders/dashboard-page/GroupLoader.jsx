import React from 'react';
import '../../../../assets/scss/atoms.scss';

const GroupLoader = () => {
  return (
    <div className='group-loader'>
      <div className='details'>
        <div className='info-con'>
          <div className='info skeleton-loader '></div>
          <div className='info skeleton-loader '></div>
        </div>
      </div>
    </div>
  );
};
export default GroupLoader;
