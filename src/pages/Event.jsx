import { useState, useEffect } from 'react';
import '../../src/assets/scss/event.scss';
import Banner from '../components/Event/Banner';
import EventDetails from '../components/Event/EventDetails';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { triggerGetEventByID } from '../Features/events/events_slice';
import { triggerGetNewsByID } from '../Features/news/news_slice';
import Banner2 from '../components/Event/Banner2';
import EventDetails2 from '../components/Event/EventDetails2';

const Event = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [dataType, setDataType] = useState('');
  const { getEventById } = useSelector((state) => state.events);
  const { getNewsById } = useSelector((state) => state.news);

  const [tab, setTab] = useState('about');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const urls = url.split('/');
    const event = urls.find((item) => item === 'event');
    const news = urls.find((item) => item === 'news');
    // console.log('event', event);
    // console.log('news', news);
    let data;
    if (event) {
      data = { queryParams: { eventId: params.id } };
      dispatch(triggerGetEventByID(data));
      setDataType('event');
    } else if (news) {
      data = { queryParams: { newsId: params.id } };
      dispatch(triggerGetNewsByID(data));
      setDataType('news');
    }
  }, []);
  // console.log('datatype', dataType);
  return (
    <div className='event-wrapper'>
      {dataType === 'event' && (
        <>
          <Banner tab={tab} />
          <EventDetails tab={tab} setTab={setTab} />
        </>
      )}
      {dataType === 'news' && (
        <>
          <Banner2 tab={tab} />
          <EventDetails2 tab={tab} setTab={setTab} />
        </>
      )}
    </div>
  );
};

export default Event;
