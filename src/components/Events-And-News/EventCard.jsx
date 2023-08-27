import React from 'react';
import { BsBookmark } from 'react-icons/bs';
import { PiShareFat } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  return (
    <div
      className='event-card'
      onClick={() => navigate('/events-and-news/event')}
    >
      <div className='card-main'>
        <div className='card-info'>
          <h2>{event.title}</h2>
          <p className='date'>{event.date}</p>
          {event.location && <p className='location'>{event.location}</p>}
          <p className='info'>{event.info}</p>
        </div>
        <div className='card-img'>
          <img src={event.img} alt='event-people' className='img-card' />
        </div>
      </div>
      <div className='card-footer'>
        <div className='icon-wrapper'>
          <BsBookmark className='icon' />
          <p>{event.bookmark}</p>
        </div>
        <div className='icon-wrapper'>
          <PiShareFat className='icon' />
          <p>{event.share}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
