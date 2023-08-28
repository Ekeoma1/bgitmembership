import React, { useState } from 'react';
import '../../src/assets/scss/event.scss';
import Banner from '../components/Event/Banner';
import EventDetails from '../components/Event/EventDetails';

const Event = () => {
  const [tab, setTab] = useState('about');
  console.log(tab);
  return (
    <div className='event-wrapper'>
      <Banner tab={tab} />
      <EventDetails tab={tab} setTab={setTab} />
    </div>
  );
};

export default Event;
