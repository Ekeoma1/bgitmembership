import React, { useEffect } from 'react';

import '../../assets/scss/event.scss';
import About from './About';
import Booking from './Booking';
import Checkout from './Checkout';
import OrderSuccess from './OrderSuccess';
import { useDispatch, useSelector } from 'react-redux';
import { triggerGetUserProfileById } from '../../Features/users/users_slice';
import ForumCardsLoader from '../Atoms/skeleton-loaders/ForumCardsLoader';
import EventLoader from '../Atoms/skeleton-loaders/events-page/EventLoader';
const EventDetails = ({ tab, setTab }) => {
  const { getEventById } = useSelector((state) => state.events);
  const { getNewsById } = useSelector((state) => state.news);
  const { getUserProfileById } = useSelector((state) => state.users);
  const { applyForEvent } = useSelector((state) => state.events);
  const dispatch = useDispatch();
  useEffect(() => {
    const data = { queryParams: { userId: getEventById?.data[0]?.createdBy } };
    dispatch(triggerGetUserProfileById(data));
  }, [getEventById]);
  return (
    <>
      {getEventById.status === 'base' ||
      getEventById.status === 'loading' ||
      getUserProfileById.status === 'loading' ||
      getUserProfileById.status === 'loading' ? (
        <div className='loading-state'>
          <EventLoader />
        </div>
      ) : getEventById.status === 'successful' &&
        getUserProfileById.status === 'successful' ? (
        <>
          {tab === 'about' && <About setTab={setTab} />}
          {tab === 'order-success' && <OrderSuccess />}
          {/* {tab === 'booking' && <Booking setTab={setTab} />}
          {tab === 'checkout' && <Checkout setTab={setTab} />} */}
        </>
      ) : (
        <>
          <div className='loading-state'>
            <EventLoader />
          </div>
        </>
      )}
    </>
  );
};

export default EventDetails;
