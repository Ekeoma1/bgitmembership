import React from 'react';
import '../../src/assets/scss/eventsAndNews.scss';
import Banner from '../components/Events-And-News/Banner';
import LatestNews from '../components/Events-And-News/LatestNews';

const EventsAndNews = () => {
  return (
    <div className='events-wrapper'>
      <Banner />
      <LatestNews />
    </div>
  );
};

export default EventsAndNews;
