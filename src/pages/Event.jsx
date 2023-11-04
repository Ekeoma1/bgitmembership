import { useState, useEffect } from 'react';
import '../../src/assets/scss/event.scss';
import Banner from '../components/Event/Banner';
import EventDetails from '../components/Event/EventDetails';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { triggerGetEventByID } from '../Features/events/events_slice';

const Event = () => {
  const params = useParams();
  const dispatch = useDispatch();
  console.log('params', params);

  const [tab, setTab] = useState('about');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const data = { queryParams: { eventId: params.id } };
    dispatch(triggerGetEventByID(data));
  }, []);
  return (
    <div className='event-wrapper'>
      <Banner tab={tab} />
      <EventDetails tab={tab} setTab={setTab} />
    </div>
  );
};

export default Event;
