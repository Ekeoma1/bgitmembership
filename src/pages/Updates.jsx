import React, { useState, useEffect } from 'react';
import '../../src/assets/scss/updates.scss';
import { HiArrowLeft } from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';
import Requests from '../components/Updates/Requests';
import WhatsNew from '../components/Updates/WhatsNew';
import News from '../components/Updates/News';
import EmptyState from '../components/Molecules/EmptyState';
import { useDispatch, useSelector } from 'react-redux';
import { triggerGetPendingRequestConnections } from '../Features/connections/connections_slice';
import { ForumCardsLoader2 } from '../components/Atoms/skeleton-loaders/ForumCardsLoader';
import { triggerGetPendingJoinRequestsByForumId } from '../Features/forums-membership/forums_membership_slice';

const Updates = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (params.type === 'user') {
      dispatch(triggerGetPendingRequestConnections());
    } else if (params.type === 'forum') {
      const data = { queryParams: { forumId: params.id } };
      dispatch(triggerGetPendingJoinRequestsByForumId(data));
    }
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
      <Requests forum={params.type === 'forum'} />
      {/* <WhatsNew />
      <News /> */}
    </div>
  );
};

export default Updates;
