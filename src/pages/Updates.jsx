import React, { useState, useEffect } from 'react';
import '../../src/assets/scss/updates.scss';
import { HiArrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import Requests from '../components/Updates/Requests';
import WhatsNew from '../components/Updates/WhatsNew';
import News from '../components/Updates/News';
import EmptyState from '../components/Molecules/EmptyState';
import { useDispatch, useSelector } from 'react-redux';
import { triggerGetAllNews } from '../Features/news/news_slice';
import { triggerGetAllEvents } from '../Features/events/events_slice';
import { triggerGetPendingRequestConnections } from '../Features/connections/connections_slice';
import { ForumCardsLoader2 } from '../components/Atoms/skeleton-loaders/ForumCardsLoader';

const Updates = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emptyState] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    dispatch(triggerGetPendingRequestConnections());
  }, []);
  return (
    <div className='updates-wrapper bg-color22'>
      <div className='top-section'>
        <div className='container'>
          <div className='page-title-wrapper'>
            <div className='title-wrapper'>
              <div className='icon' onClick={() => navigate('/')}>
                <HiArrowLeft className='text-color22' />
              </div>
              <h3 className='text-color22'>Updates</h3>
            </div>
          </div>
        </div>
      </div>
      {emptyState && (
        <EmptyState
          title={'No updates just yet.'}
          info={'See our latest News & Events below.'}
        />
      )}
      {!emptyState && (
        <>
          <Requests />
          <WhatsNew />
        </>
      )}
      <News />
    </div>
  );
};

export default Updates;
