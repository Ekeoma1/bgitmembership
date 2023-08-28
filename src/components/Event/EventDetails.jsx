import React, { useState } from 'react';
import bgitlogo from '../../assets/images/bgit-logo.svg';
import { LuCalendarDays } from 'react-icons/lu';
import { MdOutlineLocationOn } from 'react-icons/md';
import '../../assets/scss/event.scss';
import Tag from '../Atoms/Tag';
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
