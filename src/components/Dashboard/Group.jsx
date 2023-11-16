import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SocialLinksLoader from '../Atoms/skeleton-loaders/dashboard-page/SocialLinksLoader';
import GroupLoader from '../Atoms/skeleton-loaders/dashboard-page/GroupLoader';
import {
  resetActiveForumIdForOngoingRequest,
  resetJoinForum,
  resetLeaveForum,
  triggerGetAllForums,
  triggerJoinForum,
} from '../../Features/forums/forums_slice';
import { renderToast } from '../Molecules/CustomToastify';

const Group = () => {
  const dispatch = useDispatch();
  const { getAllForums, joinForum, leaveForum } = useSelector(
    (state) => state.forums
  );
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  const handleJoinForum = (forum) => {
    if (forum?.hasPendingJoinRequest) {
      console.log('cancel');
    } else if (!forum?.isCurrentUserMember) {
      const values = { forumId: forum.forumId };
      dispatch(triggerJoinForum(values));
    }
  };

  useEffect(() => {
    if (joinForum.status === 'successful') {
      if (joinForum.data === 'You are the admin of the forum.') {
        renderToast({
          status: 'error',
          message: joinForum.data,
        });
      } else {
        renderToast({
          status: 'success',
          message: joinForum.data,
        });
        const data2 = { queryParams: { pageNumber, pageSize } };
        dispatch(triggerGetAllForums(data2));
      }
      dispatch(resetJoinForum());
      dispatch(resetActiveForumIdForOngoingRequest());
    } else if (joinForum.status === 'error') {
      dispatch(resetJoinForum());
      dispatch(resetActiveForumIdForOngoingRequest());
    }
  }, [joinForum.status]);
  return (
    <div className='dashboard-card group-wrapper'>
      {getAllForums.status === 'base' || getAllForums.status === 'loading' ? (
        <>
          <GroupLoader />
        </>
      ) : getAllForums.status === 'successful' ? (
        <>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='dashboard-header'>Groups</div>
            {getAllForums.data?.length > 2 && (
              <div>
                <button className='dashboard-text'>See more</button>
              </div>
            )}
          </div>
          <div className='row mt-2 gap-md-0 gap-3 flex-wrap'>
            {getAllForums.data.slice(0, 2)?.map((group, index) => (
              <div key={index} className='col-md'>
                <div className='d-flex gap-3 flex-wrap align-items-start'>
                  <div className='group-image'></div>
                  <div>
                    <div className='dashboard-header'>{group.forumName}</div>
                    <div className='d-flex justify-content-between'>
                      <div className='dashboard-text'>
                        {group.userCount}{' '}
                        {`Member${group.userCount > 0 ? 's' : ''}`}
                      </div>
                      {}
                      <div className='d-xl-none'>
                        <button
                          className='join-btn '
                          onClick={() =>
                            !group.isCurrentUserMember && handleJoinForum(group)
                          }
                        >
                          {group.isCurrentUserMember ? '+ Joined' : 'Join'}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='d-xl-block d-none'>
                    {joinForum.status === 'loading' ? (
                      <button className='join-btn join-btn-2'>
                        Loading...
                      </button>
                    ) : (
                      <button
                        className={`join-btn ${
                          group.isCurrentUserMember && 'join-btn-2'
                        } `}
                        onClick={() => handleJoinForum(group)}
                      >
                        {group.hasPendingJoinRequest
                          ? 'Cancel request'
                          : group.isCurrentUserMember
                          ? '+ Joined'
                          : '+ Join'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Group;
