import React, { useEffect, useState } from 'react';
import Icon from '../Icon';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { triggerGetAllNews } from '../../Features/news/news_slice';
import { triggerGetAllEvents } from '../../Features/events/events_slice';
import SingleLineLoader from '../Atoms/skeleton-loaders/SingleLineLoader';
import { triggerGetPendingRequestConnections } from '../../Features/connections/connections_slice';
import { triggerGetAllNotifications } from '../../Features/notification/notification_slice';
const MyUpdates = ({ forum }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getPendingRequestConnections } = useSelector(
    (state) => state.connections
  );
  const { getAllNotifications } = useSelector((state) => state.notification);
  const { getAllNews } = useSelector((state) => state.news);
  const { getAllEvents } = useSelector((state) => state.events);
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    const data = { queryParams: { pageNumber, pageSize } };
    dispatch(triggerGetAllNews(data));
    dispatch(triggerGetAllEvents(data));
    dispatch(triggerGetPendingRequestConnections());
    dispatch(triggerGetAllNotifications());
  }, []);

  // console.log('data', getAllEvents, getAllNews);
  return (
    <div className='my-updates-wrapper shadow-sm'>
      {!forum && (
        <>
          <h3 className=''>My updates</h3>
          <div>
            <div className='section-header mt-4'>Recently Viewed</div>
            <div className='section-list-wrapper'>
              {getAllNews.status === 'loading' ? (
                <div className='loader'>
                  <div className='single-line-loader-wrapper'>
                    <SingleLineLoader />
                  </div>
                  <div className='single-line-loader-wrapper'>
                    <SingleLineLoader />
                  </div>
                </div>
              ) : getAllNews.status === 'successful' ? (
                <>
                  {getAllNews.data?.news?.length === 0 ? (
                    <p className='no-data-yet'>No news yet...</p>
                  ) : (
                    <>
                      {getAllNews?.data?.news?.slice(0, 2).map((news, key) => {
                        return (
                          <div
                            key={key}
                            className='section-list d-flex align-items-center c-gap-10'
                            onClick={() => {
                              navigate(`/events-and-news/news/${news.newsId}`);
                            }}
                          >
                            <div className='circle'></div>
                            <div className='text'>{news.title} </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div>
            <div className='section-header mt-4'>Upcoming Events</div>
            <div className='section-list-wrapper'>
              {getAllEvents.status === 'loading' ? (
                <div className='loader'>
                  <div className='single-line-loader-wrapper'>
                    <SingleLineLoader />
                  </div>
                  <div className='single-line-loader-wrapper'>
                    <SingleLineLoader />
                  </div>
                </div>
              ) : getAllEvents.status === 'successful' ? (
                <>
                  {getAllEvents.data?.length === 0 ? (
                    <p className='no-data-yet'>No upcoming event yet...</p>
                  ) : (
                    <>
                      {getAllEvents?.data?.slice(0, 2)?.map((event, key) => {
                        return (
                          <div
                            key={key}
                            className='section-list d-flex align-items-center c-gap-10'
                            onClick={() => {
                              navigate(
                                `/events-and-news/event/${event.eventId}`
                              );
                            }}
                          >
                            <div className='circle'></div>
                            <div className='text'>{event.title} </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div>
            <div className='section-header'>New</div>
            <div className='section-list-wrapper'>
              <div className='big-text requests-con'>
                <Link to='/updates' className='requests-con'>
                  <span>Request</span>{' '}
                  {getPendingRequestConnections.status === 'base' ||
                  getPendingRequestConnections.status === 'loading' ? (
                    <div className=' requests-count-loader'>
                      <SingleLineLoader />
                    </div>
                  ) : getPendingRequestConnections.status === 'successful' ? (
                    <>
                      {`(${getPendingRequestConnections.data?.pendingRequests?.length})`}
                    </>
                  ) : (
                    <></>
                  )}
                </Link>
              </div>
              <div className='big-text requests-con'>
                <Link to='/updates' className='requests-con'>
                  <span>Comments</span>{' '}
                  {getAllNotifications.status === 'base' ||
                  getAllNotifications.status === 'loading' ? (
                    <div className=' requests-count-loader'>
                      <SingleLineLoader />
                    </div>
                  ) : getAllNotifications.status === 'successful' ? (
                    <>{`(${
                      getAllNotifications.data?.filter(
                        (item) => item.notificationType === 'COMMENT'
                      )?.length
                    })`}</>
                  ) : (
                    <></>
                  )}
                </Link>
              </div>
            </div>
          </div>
          {(getAllNews.data?.news?.length > 0 ||
            getAllEvents.data?.length > 0) && (
            <div className=' my-4'>
              <Link
                to='/updates'
                className='sec-btn mx-auto c-gap-5 smallert-text added-width d-flex align-items-center justify-content-center'
              >
                <span>View all</span> <Icon icon='arrowRight' />
              </Link>
            </div>
          )}
        </>
      )}
      {forum && (
        <>
          <h3 className=''>Forum Updates</h3>
          <div>
            <div className='section-list-wrapper section-list-wrapper-2'>
              <div className='big-text requests-con'>
                <Link to='/updates' className='requests-con'>
                  <span>Request</span>{' '}
                  {getPendingRequestConnections.status === 'base' ||
                  getPendingRequestConnections.status === 'loading' ? (
                    <div className=' requests-count-loader'>
                      <SingleLineLoader />
                    </div>
                  ) : getPendingRequestConnections.status === 'successful' ? (
                    <>
                      {`(${getPendingRequestConnections.data?.pendingRequests?.length})`}
                    </>
                  ) : (
                    <></>
                  )}
                </Link>
              </div>
              <div className='big-text requests-con'>
                <Link to='/updates' className='requests-con'>
                  <span>Posts</span>{' '}
                  {getAllNotifications.status === 'base' ||
                  getAllNotifications.status === 'loading' ? (
                    <div className=' requests-count-loader'>
                      <SingleLineLoader />
                    </div>
                  ) : getAllNotifications.status === 'successful' ? (
                    <>{`(${
                      getAllNotifications.data?.filter(
                        (item) => item.notificationType === 'COMMENT'
                      )?.length
                    })`}</>
                  ) : (
                    <></>
                  )}
                </Link>
              </div>
            </div>
          </div>
          {(getAllNews.data?.news?.length > 0 ||
            getAllEvents.data?.length > 0) && (
            <div className=' my-4'>
              <Link
                to='/updates'
                className='sec-btn mx-auto c-gap-5 smallert-text added-width d-flex align-items-center justify-content-center'
              >
                <span>View all</span> <Icon icon='arrowRight' />
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyUpdates;
