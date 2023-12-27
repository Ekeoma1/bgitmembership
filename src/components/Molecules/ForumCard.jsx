import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import useWindowSize from '../../hooks/useWindowSize';
import { useNavigate } from 'react-router-dom';
import forumImg1 from '../../../src/assets/images/forumcard1.svg';
import loadingDots from '../../../src/assets/images/loading_dots.gif';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetCanceljoinForumRequest,
  resetJoinForum,
  resetLeaveForum,
  setActiveForumsForOngoingRequest,
  triggerCancelJoinForumRequest,
  triggerJoinForum,
  triggerLeaveForum,
} from '../../Features/forums/forums_slice';
import { renderToast } from './CustomToastify';

const ForumCard = ({ forum, setActiveForum }) => {
  const { isMobile } = useWindowSize();
  const { joinForum, cancelJoinForumRequest } = useSelector(
    (state) => state.forums
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (
      joinForum.status === 'base' &&
      cancelJoinForumRequest.status === 'base'
    ) {
      const values = { forumId: forum.forumId };
      setActiveForum(forum);
      if (e.target.closest('.pending')) {
        dispatch(triggerCancelJoinForumRequest(values));
      } else if (e.target.closest('.not-a-member')) {
        dispatch(triggerJoinForum(values));
      } else {
        navigate(`/forums/${forum.forumId}`);
      }
    }
  };

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
              forum.requestStatus === 'loading' && 'loading'
            } ${
              (joinForum.status !== 'base' ||
                cancelJoinForumRequest.status !== 'base') &&
              'not-allowed'
            }`}
          >
            {forum.requestStatus === 'loading' ? (
              <>
                Loading <img src={loadingDots} alt='' className='' />
              </>
            ) : (
              'Cancel request'
            )}
          </button>
        </>
      ) : forum.forumMembershipStatus === 'NotAMember' ? (
        <button
          className={`smaller-text community-forum-btn forum-card-btn join not-a-member ${
            forum.requestStatus === 'loading' && 'loading'
          } ${
            (joinForum.status !== 'base' ||
              cancelJoinForumRequest.status !== 'base') &&
            'not-allowed'
          }`}
        >
          {forum.requestStatus === 'loading' ? (
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
export const ForumCard2 = ({ forum, setActiveForum }) => {
  const { joinForum, cancelJoinForumRequest, activeForumsCurrentRequests } =
    useSelector((state) => state.forums);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    if (
      joinForum.status === 'base' &&
      cancelJoinForumRequest.status === 'base'
    ) {
      const values = { forumId: forum.forumId };
      setActiveForum(forum);
      if (e.target.closest('.pending')) {
        dispatch(triggerCancelJoinForumRequest(values));
      } else if (e.target.closest('.not-a-member')) {
        dispatch(triggerJoinForum(values));
      } else {
        navigate(`/forums/${forum.forumId}`);
      }
    }
  };

  return (
    <div className='forum-card-2' onClick={(e) => handleClick(e)}>
      <h4 className='mt-3'>{forum.forumName}</h4>
      <div className='community-forum-content'>{forum.details}</div>
      <div className='text-center'>
        {forum.forumMembershipStatus === 'PendingRequest'? (
          <>
            <button
              className={`smaller-text community-forum-btn forum-card-btn joined pending ${
                forum.requestStatus === 'loading' && 'loading'
              } ${
                (joinForum.status !== 'base' ||
                  cancelJoinForumRequest.status !== 'base') &&
                'not-allowed'
              }`}
            >
              {forum.requestStatus === 'loading' ? (
                <>
                  Loading <img src={loadingDots} alt='' className='' />
                </>
              ) : (
                'Cancel request'
              )}
            </button>
          </>
        ) : forum.forumMembershipStatus === 'NotAMember' ? (
          <button
            className={`smaller-text community-forum-btn forum-card-btn join not-a-member ${
              forum.requestStatus === 'loading' && 'loading'
            } ${
              (joinForum.status !== 'base' ||
                cancelJoinForumRequest.status !== 'base') &&
              'not-allowed'
            }`}
          >
            {activeForumsCurrentRequests?.[forum.forumId]?.status ===
            'pending' ? (
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
