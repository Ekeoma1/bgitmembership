import React from 'react';
import '../../../../assets/scss/atoms.scss';

const EventsAndNewsCardsLoader = () => {
  return (
    <div className='events-and-news-loader-wrapper'>
      <div className='events-and-news-loader shadow-sm'>
        <div className='card-details'>
          <div className='name skeleton-loader'></div>
          <div className='role skeleton-loader'></div>
          <div className='time skeleton-loader'></div>
        </div>
        <div className='card-content skeleton-loader'></div>
      </div>
      <div className='events-and-news-loader shadow-sm'>
        <div className='card-details'>
          <div className='name skeleton-loader'></div>
          <div className='role skeleton-loader'></div>
          <div className='time skeleton-loader'></div>
        </div>
        <div className='card-content skeleton-loader'></div>
      </div>
    </div>
  );
};

export default EventsAndNewsCardsLoader;
