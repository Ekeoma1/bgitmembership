import React from 'react';
import '../../../../assets/scss/atoms.scss';

const DetailsLoader = () => {
  return (
    <div className='details-loader'>
      <div className='left-content'>
        <div className='name skeleton-loader '></div>
        <div className='niche skeleton-loader '></div>
        <div className='city skeleton-loader '></div>
      </div>
      <div className='right-content'>
        <div className='tags skeleton-loader'></div>
        <div className='skills skeleton-loader'></div>
      </div>
    </div>
  );
};
export default DetailsLoader;
