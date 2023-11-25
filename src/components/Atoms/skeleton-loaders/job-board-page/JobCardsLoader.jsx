import React from 'react';
import '../../../../assets/scss/atoms.scss';

const JobCardsLoader = () => {
  return (
    <>
      <div className='job-cards-loader'>
        <div className='profile-photo skeleton-loader'></div>
        <div className='card-details'>
          <div className='role skeleton-loader'></div>
          <div className='company skeleton-loader'></div>
          <div className='location skeleton-loader'></div>
          <div className='just-posted skeleton-loader'></div>
        </div>
      </div>
      <div className='job-cards-loader'>
        <div className='profile-photo skeleton-loader'></div>
        <div className='card-details'>
          <div className='role skeleton-loader'></div>
          <div className='company skeleton-loader'></div>
          <div className='location skeleton-loader'></div>
          <div className='just-posted skeleton-loader'></div>
        </div>
      </div>
      <div className='job-cards-loader'>
        <div className='profile-photo skeleton-loader'></div>
        <div className='card-details'>
          <div className='role skeleton-loader'></div>
          <div className='company skeleton-loader'></div>
          <div className='location skeleton-loader'></div>
          <div className='just-posted skeleton-loader'></div>
        </div>
      </div>
    </>
  );
};
export default JobCardsLoader;
