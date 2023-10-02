/* eslint-disable @typescript-eslint/semi */
import React from 'react';
import '../../../assets/scss/atoms.scss';

const ForumCardsLoader = () => {
  return (
    <>
      <div className='forum-cards-loader'>
        <div className='forum-name skeleton-loader'></div>
        <div className='details'>
          <div className='detail skeleton-loader'></div>
          <div className='detail skeleton-loader'></div>
          <div className='detail skeleton-loader'></div>
        </div>
        <div className="join skeleton-loader"></div>
      </div>
      <div className='forum-cards-loader'>
        <div className='forum-name skeleton-loader'></div>
        <div className='details'>
          <div className='detail skeleton-loader'></div>
          <div className='detail skeleton-loader'></div>
          <div className='detail skeleton-loader'></div>
        </div>
        <div className="join skeleton-loader"></div>
      </div>
      <div className='forum-cards-loader'>
        <div className='forum-name skeleton-loader'></div>
        <div className='details'>
          <div className='detail skeleton-loader'></div>
          <div className='detail skeleton-loader'></div>
          <div className='detail skeleton-loader'></div>
        </div>
        <div className="join skeleton-loader"></div>
      </div>
    
    </>
  );
};
export default ForumCardsLoader;
