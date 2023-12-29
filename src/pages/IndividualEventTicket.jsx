import { HiArrowLeft } from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';
import PrintButton from '../components/PrintButton';
import {
  resetCancelEventApplication,
  triggerApplyForEvent,
  triggerCancelEventApplication,
  triggerGetEventByID,
} from '../Features/events/events_slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import moment from 'moment';
import { renderToast } from '../components/Molecules/CustomToastify';
import MainButton from '../components/Molecules/MainButton';
import EventTicketLoader from '../components/Atoms/skeleton-loaders/events-page/EventTicketLoader';
import EmptyState from '../components/Molecules/EmptyState';

const IndividualEventTicket = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { getEventById, cancelEventApplication } = useSelector(
    (state) => state.events
  );
  const { getMyProfile } = useSelector((state) => state.users);
  const handleCancelOrder = () => {
    dispatch(triggerCancelEventApplication({ eventId: getEventById?.data?.eventId }));
  };
  useEffect(() => {
    const data = { queryParams: { eventId: params.id } };
    dispatch(triggerGetEventByID(data));
  }, []);
  useEffect(() => {
    if (
      cancelEventApplication.status === 'successful' &&
      cancelEventApplication.data
    ) {
      renderToast({
        status: 'success',
        message: 'Event order cancelled',
      });
      dispatch(resetCancelEventApplication());
      navigate('/events-and-news/event-tickets');
    } else if (cancelEventApplication.status === 'error') {
      renderToast({
        status: 'error',
        message: 'Something went wrong',
      });
      resetCancelEventApplication();
    }
  }, [cancelEventApplication]);

  console.log('cancel order', cancelEventApplication);
  return (
    <div className='individual-event-ticket-page'>
      <div className='container'>
        {getEventById?.status === 'base' ||
        getEventById?.status === 'loading' ? (
          <EventTicketLoader />
        ) : getEventById?.status === 'successful' ? (
          <>
            <button onClick={() => navigate(-1)}>
              <HiArrowLeft className='text-color22' />
            </button>
            {getEventById.data === 'Event not found.' ? (
              <EmptyState
                title={'Event not found'}
                info={'You have not applied for this event.'}
                padding={'0'}
                height={'40rem'}
              />
            ) : (
              <>
                <h2>Order for {getEventById?.data[0]?.title}</h2>
                <div className='ticket-details-wrapper'>
                  <div className='event-details'>
                    <div className='serial-details'>
                      Free order {/* #89405736578 */}
                      on{' '}
                      {moment(getEventById?.data?.createdDate).format(
                        'ddd, MMMM D, HH:mm'
                      )}
                    </div>
                    <div className='serial-details'>
                      <span> Event information:</span>{' '}
                      {moment(getEventById?.data?.eventDate).format(
                        'Do MMMM YYYY'
                      )}
                      , {getEventById.data?.time}{' '}
                    </div>
                    <div className='serial-details serial-details-2'>
                      <span>{getEventById?.data?.location}</span>
                    </div>

                    <PrintButton
                      targetElementId='elementId'
                      fileName='Ticket name'
                    />

                    <div className='mt-4'>
                      <MainButton
                        text={'Cancel Order'}
                        onClick={handleCancelOrder}
                        loading={cancelEventApplication.status === 'loading'}
                        outlined
                        width={'301px'}
                        height={'60px'}
                        padding={'0'}
                        borderRadius={'1.6rem'}
                        border={'1px solid'}
                        cancelOrder
                      />
                    </div>
                  </div>

                  <div id='elementId' className='general-admission-wrapper'>
                    <div>
                      <h4>General Admission</h4>
                      <hr />
                    </div>

                    <div className='general-admission-info'>
                      <div className='title'>
                        First Name <span className='text-danger'>*</span>
                      </div>
                      <div className='info'>{getMyProfile.data?.firstName}</div>
                    </div>

                    <div className='general-admission-info'>
                      <div className='title'>
                        SurName <span className='text-danger'>*</span>
                      </div>
                      <div className='info'>
                        {getMyProfile.data?.secondName}
                      </div>
                    </div>

                    <div className='general-admission-info'>
                      <div className='title'>
                        Email <span className='text-danger'>*</span>
                      </div>
                      <div className='info'>{getMyProfile.data?.email}</div>
                    </div>

                    <div className='general-admission-info'>
                      <div className='title'>
                        Delivery Method <span className='text-danger'>*</span>
                      </div>
                      <div className='info'>eTickets</div>
                    </div>

                    <div className='general-admission-info'>
                      <div className='title'>
                        Mobile Number <span className='text-danger'>*</span>
                      </div>
                      <div className='info'>
                        {getMyProfile.data?.phoneNumber}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default IndividualEventTicket;
