import React, { useEffect, useState } from 'react';
import news1 from '../../assets/images/news1.svg';
import news2 from '../../assets/images/news2.svg';
import news3 from '../../assets/images/news3.svg';
import NewsCard, { EventsCard } from '../Molecules/NewsCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { triggerGetAllNews } from '../../Features/news/news_slice';
import { triggerGetAllEvents } from '../../Features/events/events_slice';
import { ForumCardsLoader2 } from '../Atoms/skeleton-loaders/ForumCardsLoader';

const News = () => {
  const dispatch = useDispatch();
  const { getAllEvents } = useSelector((state) => state.events);
  const { getAllNews } = useSelector((state) => state.news);
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    const data = { queryParams: { pageNumber, pageSize } };
    dispatch(triggerGetAllNews(data));
    dispatch(triggerGetAllEvents(data));
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 2,
    },
  };

  return (
    <div className='news-wrapper'>
      <div className='container'>
        <div className='section-content'>
          <h5 className='title'>
            News <span>{getAllNews.data?.news?.length}</span>
          </h5>
          <p className='info'>
            Save the dates for our upcoming tech events and fun-filled socials!
            Be sure to register ASAP and secure your tickets now.
          </p>
          <div className='cards-container'>
            <div className='view-all'>
              <button>View all</button>
            </div>
            <div className='cards-wrapper'>
              {getAllNews.status === 'loading' ? (
                <>
                  <ForumCardsLoader2 />
                </>
              ) : getAllNews.status === 'successful' ? (
                <>
                  {getAllNews.data?.news.length === 0 ? (
                    <></>
                  ) : (
                    <>
                      {getAllNews.data && (
                        <Carousel responsive={responsive}>
                          {getAllNews?.data?.news.map((item, index) => (
                            <NewsCard news={item} key={index} />
                          ))}
                        </Carousel>
                      )}
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
            <h5 className='title'>
              Events <span>{getAllEvents.data?.length}</span>
            </h5>
            <div className='cards-wrapper'>
              {getAllEvents.status === 'loading' ? (
                <>
                  <ForumCardsLoader2 />
                </>
              ) : getAllEvents.status === 'successful' ? (
                <>
                  {getAllEvents.data?.length === 0 ? (
                    <></>
                  ) : (
                    <>
                      {getAllEvents.data && (
                        <Carousel responsive={responsive}>
                          {getAllEvents?.data?.map((item, index) => (
                            <EventsCard event={item} key={index} />
                          ))}
                        </Carousel>
                      )}
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
