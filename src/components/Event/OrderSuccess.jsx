import React, { useEffect } from 'react';
import '../../assets/scss/event.scss';
import { SlCheck } from 'react-icons/sl';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetApplyForEvent } from '../../Features/events/events_slice';
const OrderSuccess = ({ setTab }) => {
  const navigate = useNavigate();
  const { getEventById } = useSelector((state) => state.events);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='order-success-wrapper'>
      <div className='order-success-content-wrapper'>
        <div
          className='back'
          onClick={() => {
            navigate('/events-and-news');
          }}
        >
          <FaChevronLeft className='icon' />
          <p>Back to Events</p>
        </div>
        <div className='main-content-wrapper'>
          <h3>You’re going to {getEventById.data?.title} </h3>
          <div className='info-wrapper'>
            <div className='info'>
              <p className='first-child'>
                Thank you for your booking! See you at the event.{' '}
              </p>
              <p>Thanks,</p>
              <p>BGIT Team</p>
            </div>
            <div className='checkbox'>
              <SlCheck />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
