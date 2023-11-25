import React from 'react';
import '../../../assets/scss/atoms.scss';

const ForumDetailsLoader = () => {
  return (
    <div className='forum-details-loader'>
      <div className='about'>
        <div className='title skeleton-loader'></div>
        <div className='wrapper'>
          <div className='line-1 skeleton-loader'></div>
          <div className='line-2 skeleton-loader'></div>
        </div>
      </div>
      <div className='info'>
        <div className='title skeleton-loader'></div>
        <div className='wrapper'>
          <div className='line-3 skeleton-loader'></div>
          <div className='line-4 skeleton-loader'></div>
          <div className='line-5 skeleton-loader'></div>
        </div>
      </div>
      <div className='side-wrapper'>
        <div className='wrapper'>
          <div className='line-5 skeleton-loader'></div>
          <div className='line-6 skeleton-loader'></div>
        </div>
        <div className='wrapper'>
          <div className='line-5 skeleton-loader'></div>
          <div className='line-6 skeleton-loader'></div>
        </div>
      </div>
      <div className='admin'>
        <div className='title skeleton-loader'></div>
        <div className='admin-details'>
          <div className='admin-photo skeleton-loader'></div>
          <div className='info'>
            <div className='wrapper'>
              <div className='line-7 skeleton-loader'></div>
              <div className='line-5 skeleton-loader'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForumDetailsLoader;
