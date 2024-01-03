import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

// import forumDefault from '../../../src/assets/images/forumDefault.png';
import forumDefault from '../../../src/assets/images/forumDefault.svg';
import SocialLinksLoader from '../Atoms/skeleton-loaders/dashboard-page/SocialLinksLoader';
import GroupLoader from '../Atoms/skeleton-loaders/dashboard-page/GroupLoader';
import {
  resetActiveForumIdForOngoingRequest,
  resetCanceljoinForumRequest,
  resetJoinForum,
  resetLeaveForum,
  triggerCancelJoinForumRequest,
  triggerGetAllForums,
  triggerJoinForum,
} from '../../Features/forums/forums_slice';
import { renderToast } from '../Molecules/CustomToastify';
import { useNavigate } from 'react-router-dom';

const Group = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getAllForums, joinForum, cancelJoinForumRequest } = useSelector(
    (state) => state.forums
  );

  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [getAllForumsLocal, setGetAllForumsLocal] = useState([]);
  const [activeForum, setActiveForum] = useState({});
  const handleJoinForum = (e, forum) => {
    if (
      joinForum.status === 'base' &&
      cancelJoinForumRequest.status === 'base'
    ) {
      const values = { forumId: forum?.forumId };
      setActiveForum(forum);
      if (e.target.closest('.pending')) {
        dispatch(triggerCancelJoinForumRequest(values));
      } else if (e.target.closest('.not-a-member')) {
        dispatch(triggerJoinForum(values));
      }
    }
  };
  useEffect(() => {
    if (
      getAllForums.status === 'successful' &&
      Array.isArray(getAllForums.data.forums)
    ) {
      setGetAllForumsLocal(getAllForums.data.forums);
    }
  }, [getAllForums]);
  useEffect(() => {
    const data = _.cloneDeep(getAllForumsLocal);
    const setBactToDefault = () => {
      data.forEach((item) => {
        if (item.forumId === activeForum.forumId) {
          delete item.requestStatus;
        }
      });
      setGetAllForumsLocal(data);
      setActiveForum({});
    };

    // join forum
    if (joinForum.status === 'loading') {
      data.forEach((item) => {
        if (item.forumId === activeForum.forumId) {
          item.requestStatus = 'loading';
        }
      });
      setGetAllForumsLocal(data);
    } else if (joinForum.status === 'successful') {
      if (joinForum.data.status === 'error') {
        renderToast({
          status: 'error',
          message: 'You are the admin of the forum.',
        });
      } else if (joinForum.data.status === 'success') {
        renderToast({
          status: 'success',
          message: 'Join request sent successfully',
        });
        data.forEach((item) => {
          if (item.forumId === activeForum.forumId) {
            item.forumMembershipStatus = 'PendingRequest';
          }
        });
        setGetAllForumsLocal(data);
      }
      dispatch(resetJoinForum());
      setBactToDefault();
    } else if (joinForum.status === 'error') {
      renderToast({
        status: 'error',
        message: 'Something went wrong',
      });
      dispatch(resetJoinForum());
      setBactToDefault();
    }

    // cancel Join forum request
    if (cancelJoinForumRequest.status === 'loading') {
      data.forEach((item) => {
        if (item.forumId === activeForum.forumId) {
          item.requestStatus = 'loading';
        }
      });
      setGetAllForumsLocal(data);
    } else if (cancelJoinForumRequest.status === 'successful') {
      if (cancelJoinForumRequest.data.status === 'success') {
        renderToast({
          status: 'success',
          message: 'Join request canceled successfully.',
        });
        data.forEach((item) => {
          if (item.forumId === activeForum.forumId) {
            item.forumMembershipStatus = 'NotAMember';
          }
        });
        setGetAllForumsLocal(data);
      }
      dispatch(resetCanceljoinForumRequest());
      setBactToDefault();
    } else if (cancelJoinForumRequest.status === 'error') {
      renderToast({
        status: 'error',
        message: 'Something went wrong',
      });
      dispatch(resetCanceljoinForumRequest());
      setBactToDefault();
    }
  }, [joinForum.status, cancelJoinForumRequest.status]);
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
            {getAllForumsLocal.length > 2 && (
              <div onClick={() => navigate('/forums/all')}>
                <button className='dashboard-text'>See more</button>
              </div>
            )}
          </div>
          <div className='row mt-2 gap-md-0 gap-3 flex-wrap'>
            {getAllForumsLocal.slice(0, 2)?.map((group, index) => (
              <div key={index} className='col-md'>
                <div className='d-flex gap-3 flex-wrap align-items-start'>
                  <div
                    className='group-image'
                    onClick={() => navigate(`/forums/${group.forumId}`)}
                  >
                    <img
                      src={group.imageUrl ?? forumDefault}
                      alt='group-img'
                      className=''
                    />
                  </div>
                  <div>
                    <div
                      onClick={() => navigate(`/forums/${group.forumId}`)}
                      className='dashboard-header forum-name'
                    >
                      {group.forumName}
                    </div>
                    <div className='d-flex justify-content-between'>
                      <div className='dashboard-text'>
                        {group.userCount}{' '}
                        {`Member${group.userCount > 0 ? 's' : ''}`}
                      </div>
                      <div className='d-xl-none'>
                        {group.requestStatus === 'loading' ? (
                          <button className='join-btn join-btn-2'>
                            Loading...
                          </button>
                        ) : group.forumMembershipStatus === 'NotAMember' ? (
                          <button
                            className={`join-btn join-btn-2 not-a-member`}
                            onClick={(e) => handleJoinForum(e, group)}
                          >
                            + Join
                          </button>
                        ) : group.forumMembershipStatus === 'PendingRequest' ? (
                          <button
                            className={`join-btn join-btn-2 pending `}
                            onClick={(e) => handleJoinForum(e, group)}
                          >
                            Cancel Request
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='d-xl-block d-none'>
                    {group.requestStatus === 'loading' ? (
                      <button className='join-btn join-btn-2'>
                        Loading...
                      </button>
                    ) : group.forumMembershipStatus === 'NotAMember' ? (
                      <button
                        className={`join-btn join-btn-2 not-a-member`}
                        onClick={(e) => handleJoinForum(e, group)}
                      >
                        + Join
                      </button>
                    ) : group.forumMembershipStatus === 'PendingRequest' ? (
                      <button
                        className={`join-btn join-btn-2 pending `}
                        onClick={(e) => handleJoinForum(e, group)}
                      >
                        Cancel Request
                      </button>
                    ) : (
                      <></>
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
