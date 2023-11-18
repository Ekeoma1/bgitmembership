import { useEffect, useState } from 'react';
import '../../src/assets/scss/eventsAndNews.scss';
import Banner from '../components/Events-And-News/Banner';
import LatestNews from '../components/Events-And-News/LatestNews';
import UpcomingEvents from '../components/Events-And-News/UpcomingEvents';
import { useDispatch } from 'react-redux';
import { triggerGetAllNews } from '../Features/news/news_slice';
import { triggerGetAllEvents } from '../Features/events/events_slice';

const EventsAndNews = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  useEffect(() => {
    const data = { queryParams: { pageNumber, pageSize } };
    dispatch(triggerGetAllNews(data));
    dispatch(triggerGetAllEvents(data));
  }, []);
  return (
    <div className='events-wrapper'>
      <Banner />
      <LatestNews />
      <UpcomingEvents />
    </div>
  );
};

export default EventsAndNews;
