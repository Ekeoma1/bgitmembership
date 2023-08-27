import React from 'react';
import '../../src/assets/scss/event.scss';
import Banner from '../components/Event/Banner';
import EventDetails from '../components/Event/EventDetails';

const Event = () => {
  return (
    <div className='event-wrapper'>
      <Banner />
      <EventDetails />
    </div>
  );
};

export default Event;
