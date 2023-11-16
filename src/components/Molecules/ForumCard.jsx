import React, { useEffect, useRef, useState } from 'react';
import '../../assets/scss/molecules.scss';
import { LuPlus } from 'react-icons/lu';
import { GrCheckmark } from 'react-icons/gr';
import useWindowSize from '../../hooks/useWindowSize';
import { useNavigate } from 'react-router-dom';
import forumImg1 from '../../../src/assets/images/forumcard1.svg';
import loadingDots from '../../../src/assets/images/loading_dots.gif';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetJoinForum,
  resetLeaveForum,
  setActiveForumIdForOngoingRequest,
  triggerJoinForum,
  triggerLeaveForum,
} from '../../Features/forums/forums_slice';
import { renderToast } from './CustomToastify';

const ForumCard = ({ forum }) => {
  const buttonContainer = useRef(null);
  const { isMobile } = useWindowSize();
  const dispatch = useDispatch();
  const { joinForum, leaveForum, activeForumIdForOngoingRequest } = useSelector(
    (state) => state.forums
  );
  const [joined, setJoined] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = (e) => {
    if (!loading) {
      const values = { forumId: forum.forumId };
      if (e.target.closest('.join')) {
        dispatch(triggerJoinForum(values));
        dispatch(setActiveForumIdForOngoingRequest(forum.forumId));
      } else if (e.target.closest('.joined')) {
        dispatch(triggerLeaveForum(values));
        dispatch(setActiveForumIdForOngoingRequest(forum.forumId));
      } else {
        navigate(`/community-forums/forum/${forum.forumId}`);
      }
    }
  };

  useEffect(() => {
    if (
      (joinForum.status === 'loading' || leaveForum.status === 'loading') &&
      activeForumIdForOngoingRequest === forum.forumId
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [joinForum.status, leaveForum.status]);

  return (
    <div className='forum-card mb-4 bg-color-card22' onClick={handleClick}>
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
              navigate(`/community-forums/forum/${forum.forumId}`);
            }}
            className='text-color-secondary-normal'
          >
            See more
          </span>
        )}
      </p>
      {forum.isCurrentUserMember ? (
        <button
          className={`bg-color22 text-color22 forum-card-btn joined ${
            loading && 'loading'
          }`}
          onClick={(e) => handleClick(e)}
          ref={buttonContainer}
        >
          {leaveForum.status === 'loading' &&
          forum.forumId === activeForumIdForOngoingRequest ? (
            <>
              Loading <img src={loadingDots} alt='' className='' />
            </>
          ) : (
            'Leave'
          )}
        </button>
      ) : (
        <>
          <button
            className={` smaller-text  bg-color22 text-color22 forum-card-btn join community-forum-btn ${
              loading && 'loading'
            }`}
            onClick={(e) => handleClick(e)}
            ref={buttonContainer}
          >
            {joinForum.status === 'loading' &&
            forum.forumId === activeForumIdForOngoingRequest ? (
              <>
                Loading{' '}
                <div className='img-wrapper'>
                  <img src={loadingDots} alt='' className='img-loader' />
                </div>
              </>
            ) : (
              <>
                <LuPlus className='icon forum-card-btn22' />
                Join
              </>
            )}
          </button>
        </>
      )}
    </div>
  );
};
export const ForumCard2 = ({ forum }) => {
  const { joinForum, leaveForum, activeForumIdForOngoingRequest } = useSelector(
    (state) => state.forums
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleClick = (e) => {
    if (!loading) {
      const values = { forumId: forum.forumId };
      if (e.currentTarget.classList.contains('join')) {
        dispatch(setActiveForumIdForOngoingRequest(forum.forumId));
        dispatch(triggerJoinForum(values));
      } else if (e.currentTarget.classList.contains('joined')) {
        dispatch(setActiveForumIdForOngoingRequest(forum.forumId));
        dispatch(triggerLeaveForum(values));
      }
    }
  };

  useEffect(() => {
    if (
      (joinForum.status === 'loading' || leaveForum.status === 'loading') &&
      activeForumIdForOngoingRequest === forum.forumId
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [joinForum.status, leaveForum.status]);
  return (
    <div
      className='forum-card-2'
      onClick={(e) => {
        if (!e.target.classList.contains('forum-card-btn')) {
          navigate(`/community-forums/forum/${forum.forumId}`);
        }
      }}
    >
      <h4 className='mt-3'>{forum.forumName}</h4>
      <div className='community-forum-content'>{forum.details}</div>
      <div className='text-center'>
        {forum.hasPendingJoinRequest ? (
          <>
            <button
              className={`smaller-text community-forum-btn forum-card-btn joined ${
                loading && 'loading'
              }`}
              onClick={(e) => handleClick(e, forum.forumId)}
            >
              {leaveForum.status === 'loading' &&
              forum.forumId === activeForumIdForOngoingRequest ? (
                <>
                  Loading <img src={loadingDots} alt='' className='' />
                </>
              ) : (
                'Cancel request'
              )}
            </button>
          </>
        ) : (
          <>
            {forum.isCurrentUserMember ? (
              <button
                className={`smaller-text community-forum-btn forum-card-btn joined ${
                  loading && 'loading'
                }`}
                onClick={(e) => handleClick(e, forum.forumId)}
              >
                {leaveForum.status === 'loading' &&
                forum.forumId === activeForumIdForOngoingRequest ? (
                  <>
                    Loading <img src={loadingDots} alt='' className='' />
                  </>
                ) : (
                  'Leave'
                )}
              </button>
            ) : (
              <button
                className={`smaller-text community-forum-btn forum-card-btn join ${
                  loading && 'loading'
                }`}
                onClick={(e) => handleClick(e, forum.forumId)}
              >
                {joinForum.status === 'loading' &&
                forum.forumId === activeForumIdForOngoingRequest ? (
                  <>
                    Loading{' '}
                    <img src={loadingDots} alt='' className='forum-card-btn' />
                  </>
                ) : (
                  '+ Join'
                )}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ForumCard;
