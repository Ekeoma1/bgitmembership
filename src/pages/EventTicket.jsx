import { HiArrowLeft } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/scss/event.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { triggerGetMyAppliedEvents } from '../Features/events/events_slice';
import EmptyState from '../components/Molecules/EmptyState';
import SingleLineLoader from '../components/Atoms/skeleton-loaders/SingleLineLoader';
import ProfileLoader from '../components/Atoms/skeleton-loaders/event-tickets-page/ProfileLoader';
import OrderLoader from '../components/Atoms/skeleton-loaders/event-tickets-page/OrderLoader';
import moment from 'moment';

const EventTicket = () => {
  const navigate = useNavigate();
  const { getMyProfile } = useSelector((state) => state.users);
  const { getMyAppliedEvents } = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(triggerGetMyAppliedEvents());
  }, []);

  // console.log('getMyAppliedEvents', getMyAppliedEvents);
  return (
    <div className='event-ticket-page'>
      <div className='container'>
        <button onClick={() => navigate(-1)}>
          <HiArrowLeft className='text-color22' />
        </button>
        {getMyProfile.status === 'base' || getMyProfile.status === 'loading' ? (
          <ProfileLoader />
        ) : getMyProfile.status === 'successful' ? (
          <div className='profile-wrapper'>
            <div className='profile-pic'>
              <img src={getMyProfile.data?.imageUrl} alt='' className='' />
            </div>
            <div>
              <h3>{`${getMyProfile.data?.firstName} ${getMyProfile.data?.secondName}`}</h3>
              <div className='no-of-orders'>
                {getMyAppliedEvents.status === 'base' ||
                getMyAppliedEvents.status === 'loading' ? (
                  <div className='loading-state'>
                    <SingleLineLoader />
                  </div>
                ) : getMyAppliedEvents.status === 'successful' ? (
                  <>{getMyAppliedEvents.data?.length} orders</>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className='order-detail-con'>
          <div className='order-detail'>
            <div className='con'>
              <h4 className='title'>Orders</h4>
              {getMyAppliedEvents.status === 'base' ||
              getMyAppliedEvents.status === 'loading' ? (
                <OrderLoader />
              ) : getMyAppliedEvents.status === 'successful' ? (
                <>
                  {getMyAppliedEvents.data?.length === 0 ? (
                    <EmptyState
                      title={'No tickets found'}
                      height={'30rem'}
                      padding={'0'}
                    />
                  ) : (
                    <>
                      {getMyAppliedEvents.data?.map((ticket, index) => (
                        <Link to={ticket.eventId} key={index}>
                          <div className='order-detail-wrapper'>
                            <div className='order-date'>
                              <span className='month'>
                                {moment(ticket.eventDate).format('MMM')}
                              </span>
                              <span className='day'>
                                {moment(ticket.eventDate).format('D')}
                              </span>
                            </div>
                            <div className='order-img'></div>
                            <div className='order-info'>
                              <h4>{ticket.eventName}</h4>
                              <div className='other-info'>
                                {moment(ticket.eventDate).format(
                                  'ddd, MMMM D, HH:mm'
                                )}
                              </div>
                              <div className='other-info'>
                                Free order no 89405736578 placed on{' '}
                                {moment(ticket.applicationDate).format(
                                  'ddd, MMMM D, HH:mm'
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
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

export default EventTicket;
