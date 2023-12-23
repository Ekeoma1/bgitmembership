import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import '../../assets/scss/molecules.scss';
import { LuPlus } from 'react-icons/lu';
import { GrCheckmark } from 'react-icons/gr';
import useWindowSize from '../../hooks/useWindowSize';
import { useNavigate } from 'react-router-dom';
import forumImg1 from '../../../src/assets/images/forumcard1.svg';
import loadingDots from '../../../src/assets/images/loading_dots.gif';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetCanceljoinForumRequest,
  resetJoinForum,
  resetLeaveForum,
  setActiveForumIdForOngoingRequest,
  triggerCancelJoinForumRequest,
  triggerJoinForum,
  triggerLeaveForum,
} from '../../Features/forums/forums_slice';
import { renderToast } from './CustomToastify';

const ForumCard = ({
  forum,
  getAllForumsLocal,
  setGetAllForumsLocal,
  activeForumMain,
  setActiveForumMain,
}) => {
  const buttonContainer = useRef(null);
  const { isMobile } = useWindowSize();
  const dispatch = useDispatch();
  const { joinForum, leaveForum, cancelJoinForumRequest } = useSelector(
    (state) => state.forums
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleClick = (e) => {
    setActiveForumMain(forum);
    const values = { forumId: forum.forumId };
    if (e.target.closest('.pending')) {
      dispatch(triggerCancelJoinForumRequest(values));
    } else if (e.target.closest('.member')) {
      dispatch(triggerLeaveForum(values));
    } else if (e.target.closest('.not-a-member')) {
      dispatch(triggerJoinForum(values));
    } else {
      navigate(`/forums/${forum.forumId}`);
    }
  };

  useEffect(() => {
    if (
      forum?.forumId &&
      activeForumMain?.forumId &&
      forum?.forumId === activeForumMain?.forumId
    ) {
      const data = _.cloneDeep(getAllForumsLocal);
      // join forum
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
          data.forEach((item) => {
            if (item.forumId === activeForumMain.forumId) {
              item.forumMembershipStatus = 'PendingRequest';
            }
          });
          setGetAllForumsLocal(data);
        }
        dispatch(resetJoinForum());
      } else if (joinForum.status === 'error') {
        renderToast({
          status: 'error',
          message: 'Something went wrong',
        });
        dispatch(resetJoinForum());
      }

      // cancel Join forum request
      if (cancelJoinForumRequest.status === 'successful') {
        if (
          cancelJoinForumRequest.data === 'Join request canceled successfully.'
        ) {
          renderToast({
            status: 'success',
            message: cancelJoinForumRequest.data,
          });
          data.forEach((item) => {
            if (item.forumId === activeForumMain.forumId) {
              item.forumMembershipStatus = 'NotAMember';
            }
          });
          setGetAllForumsLocal(data);
          dispatch(resetCanceljoinForumRequest());
        }
      } else if (cancelJoinForumRequest.status === 'error') {
        renderToast({
          status: 'error',
          message: 'Something went wrong',
        });
        dispatch(resetCanceljoinForumRequest());
      }

      // leave forum
      if (leaveForum.status === 'successful') {
        renderToast({
          status: 'success',
          message: leaveForum.data,
        });
        data.forEach((item) => {
          if (item.forumId === activeForumMain.forumId) {
            item.forumMembershipStatus = 'NotAMember';
          }
        });
        setGetAllForumsLocal(data);
        dispatch(resetLeaveForum());
      } else if (leaveForum.status === 'error') {
        renderToast({
          status: 'error',
          message: 'Something went wrong',
        });
        dispatch(resetLeaveForum());
      }
    }
  }, [joinForum.status, cancelJoinForumRequest.status, leaveForum.status]);

  useEffect(() => {
    if (
      (joinForum.status === 'loading' ||
        leaveForum.status === 'loading' ||
        cancelJoinForumRequest.status === 'loading') &&
      forum.forumId === activeForumMain.forumId
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [joinForum.status, cancelJoinForumRequest.status, leaveForum.status]);

  return (
    <div
      className='forum-card mb-4 bg-color-card22'
      onClick={(e) => handleClick(e)}
    >
      <img src={forumImg1} alt='forum-img' className='' />
      <h3 className='text-color-secondary-bold22'>
        {forum.forumName?.length > 15
          ? `${forum.forumName?.substring(0, 15)}...`
          : `${forum.forumName}`}
      </h3>
      <p className='text-color-secondary-normal22'>
        {forum.details?.length > 105 && !isMobile
          ? `${forum.details?.substring(0, 105)}...`
          : forum.details?.length > 80 && isMobile
          ? `${forum.details?.substring(0, 80)}...`
          : forum.details}
        {forum.details?.length > 105 && (
          <span
            onClick={() => {
              navigate(`/forums/${forum.forumId}`);
            }}
            className='text-color-secondary-normal'
          >
            See more
          </span>
        )}
      </p>
      {forum.forumMembershipStatus === 'PendingRequest' ? (
        <>
          <button
            className={`smaller-text community-forum-btn forum-card-btn joined pending ${
              loading && 'loading'
            }`}
          >
            {loading ? (
              <>
                Loading <img src={loadingDots} alt='' className='' />
              </>
            ) : (
              'Cancel request'
            )}
          </button>
        </>
      ) : forum.forumMembershipStatus === 'Member' ? (
        <button
          className={`smaller-text community-forum-btn forum-card-btn joined member ${
            loading && 'loading'
          }`}
        >
          {loading ? (
            <>
              Loading <img src={loadingDots} alt='' className='' />
            </>
          ) : (
            'Leave'
          )}
        </button>
      ) : forum.forumMembershipStatus === 'NotAMember' ? (
        <button
          className={`smaller-text community-forum-btn forum-card-btn join not-a-member ${
            loading && 'loading'
          }`}
        >
          {loading ? (
            <>
              Loading{' '}
              <img src={loadingDots} alt='' className='forum-card-btn' />
            </>
          ) : (
            '+ Join'
          )}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};
export const ForumCard2 = ({
  forum,
  getAllForumsLocal,
  setGetAllForumsLocal,
  activeForumMain,
  setActiveForumMain,
}) => {
  const { joinForum, leaveForum, cancelJoinForumRequest } = useSelector(
    (state) => state.forums
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleClick = (e) => {
    setActiveForumMain(forum);
    const values = { forumId: forum.forumId };

    if (e.target.closest('.pending')) {
      dispatch(triggerCancelJoinForumRequest(values));
    } else if (e.target.closest('.member')) {
      dispatch(triggerLeaveForum(values));
    } else if (e.target.closest('.not-a-member')) {
      dispatch(triggerJoinForum(values));
    } else {
      navigate(`/forums/${forum.forumId}`);
    }
  };

  useEffect(() => {
    if (
      forum?.forumId &&
      activeForumMain?.forumId &&
      forum?.forumId === activeForumMain?.forumId
    ) {
      const data = _.cloneDeep(getAllForumsLocal);
      // join forum
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
          data.forEach((item) => {
            if (item.forumId === activeForumMain.forumId) {
              item.forumMembershipStatus = 'PendingRequest';
            }
          });
          setGetAllForumsLocal(data);
        }
        dispatch(resetJoinForum());
      } else if (joinForum.status === 'error') {
        renderToast({
          status: 'error',
          message: 'Something went wrong',
        });
        dispatch(resetJoinForum());
      }

      // cancel Join forum request
      if (cancelJoinForumRequest.status === 'successful') {
        if (
          cancelJoinForumRequest.data === 'Join request canceled successfully.'
        ) {
          renderToast({
            status: 'success',
            message: cancelJoinForumRequest.data,
          });
          data.forEach((item) => {
            if (item.forumId === activeForumMain.forumId) {
              item.forumMembershipStatus = 'NotAMember';
            }
          });
          setGetAllForumsLocal(data);
          dispatch(resetCanceljoinForumRequest());
        }
      } else if (cancelJoinForumRequest.status === 'error') {
        renderToast({
          status: 'error',
          message: 'Something went wrong',
        });
        dispatch(resetCanceljoinForumRequest());
      }

      // leave forum
      if (leaveForum.status === 'successful') {
        renderToast({
          status: 'success',
          message: leaveForum.data,
        });
        data.forEach((item) => {
          if (item.forumId === activeForumMain.forumId) {
            item.forumMembershipStatus = 'NotAMember';
          }
        });
        setGetAllForumsLocal(data);
        dispatch(resetLeaveForum());
      } else if (leaveForum.status === 'error') {
        renderToast({
          status: 'error',
          message: 'Something went wrong',
        });
        dispatch(resetLeaveForum());
      }
    }
  }, [joinForum.status, cancelJoinForumRequest.status, leaveForum.status]);

  useEffect(() => {
    if (
      (joinForum.status === 'loading' ||
        leaveForum.status === 'loading' ||
        cancelJoinForumRequest.status === 'loading') &&
      forum.forumId === activeForumMain.forumId
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [joinForum.status, cancelJoinForumRequest.status, leaveForum.status]);

  return (
    <div className='forum-card-2' onClick={(e) => handleClick(e)}>
      <h4 className='mt-3'>{forum.forumName}</h4>
      <div className='community-forum-content'>{forum.details}</div>
      <div className='text-center'>
        {forum.forumMembershipStatus === 'PendingRequest' ? (
          <>
            <button
              className={`smaller-text community-forum-btn forum-card-btn joined pending ${
                loading && 'loading'
              }`}
            >
              {loading ? (
                <>
                  Loading <img src={loadingDots} alt='' className='' />
                </>
              ) : (
                'Cancel request'
              )}
            </button>
          </>
        ) : forum.forumMembershipStatus === 'Member' ? (
          <button
            className={`smaller-text community-forum-btn forum-card-btn joined member ${
              loading && 'loading'
            }`}
          >
            {loading ? (
              <>
                Loading <img src={loadingDots} alt='' className='' />
              </>
            ) : (
              'Leave'
            )}
          </button>
        ) : forum.forumMembershipStatus === 'NotAMember' ? (
          <button
            className={`smaller-text community-forum-btn forum-card-btn join not-a-member ${
              loading && 'loading'
            }`}
          >
            {loading ? (
              <>
                Loading{' '}
                <img src={loadingDots} alt='' className='forum-card-btn' />
              </>
            ) : (
              '+ Join'
            )}
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ForumCard;
