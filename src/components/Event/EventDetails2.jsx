import React, { useEffect } from 'react';

import '../../assets/scss/event.scss';

import OrderSuccess from './OrderSuccess';
import { useSelector } from 'react-redux';
import EventLoader from '../Atoms/skeleton-loaders/events-page/EventLoader';
import About2 from './About2';
const EventDetails2 = ({ tab, setTab, data }) => {
  const { getNewsById } = useSelector((state) => state.news);

  return (
    <>
      {getNewsById.status === 'base' || getNewsById.status === 'loading' ? (
        <div className='loading-state'>
          <EventLoader />
        </div>
      ) : getNewsById.status === 'successful' ? (
        <>
          {tab === 'about' && <About2 setTab={setTab} />}
          {tab === 'order-success' && <OrderSuccess />}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default EventDetails2;
