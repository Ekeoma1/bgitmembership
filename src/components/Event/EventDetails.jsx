import React from 'react';

import '../../assets/scss/event.scss';
import About from './About';
import Booking from './Booking';
import Checkout from './Checkout';
import OrderSuccess from './OrderSuccess';
const EventDetails = ({ tab, setTab }) => {
  return (
    <>
      {tab === 'about' && <About setTab={setTab} />}
      {tab === 'booking' && <Booking setTab={setTab} />}
      {tab === 'checkout' && <Checkout setTab={setTab} />}
      {tab === 'order-success' && <OrderSuccess />}
    </>
  );
};

export default EventDetails;
