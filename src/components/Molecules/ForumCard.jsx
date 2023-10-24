import React, { useEffect, useState } from 'react';
import '../../assets/scss/molecules.scss';
import { LuPlus } from 'react-icons/lu';
import { GrCheckmark } from 'react-icons/gr';
import useWindowSize from '../../hooks/useWindowSize';
import { useNavigate } from 'react-router-dom';
import forumImg1 from '../../../src/assets/images/forumcard1.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetActiveForumIdForOngoingRequest,
  resetJoinForum,
  resetLeaveForum,
  setActiveForumIdFOrOngoingRequest,
  setActiveForumIdForOngoingRequest,
  triggerJoinForum,
  triggerLeaveForum,
} from '../../Features/forums/forums_slice';
import { renderToast } from './CustomToastify';
import { HiPlus } from 'react-icons/hi';

const ForumCard = ({ forum }) => {
  const { isMobile } = useWindowSize();
  const dispatch = useDispatch();
  const { joinForum } = useSelector((state) => state.forums);
  const [joined, setJoined] = useState(false);
  const navigate = useNavigate();
  const handleClick = (e) => {
    console.log(e.currentTarget);
    if (e.currentTarget.classList.contains('join')) {
      const values = { forumId: forum.forumId };
      dispatch(triggerJoinForum(values));
      // setJoined(true);
    } else if (e.currentTarget.classList.contains('joined')) {
      // setJoined(false);
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
      }
      dispatch(resetJoinForum());
    }
  }, [joinForum.status]);
  return (
    <div
      className='forum-card mb-4 bg-color-card'
      onClick={(e) => {
        if (!e.target.classList.contains('forum-card-btn')) {
          navigate(`/community-forums/forum/${forum.forumId}`);
        }
      }}
    >
      <img src={forumImg1} alt='forum-img' className='' />
      <h3 className='text-color-secondary-bold'>
        {forum.forumName?.length > 15
          ? `${forum.forumName?.substring(0, 15)}...`
          : `${forum.forumName}`}
      </h3>
      <p className='text-color-secondary-normal'>
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
      {joined ? (
        <button
          className='bg-color text-color forum-card-btn joined'
          onClick={(e) => handleClick(e)}
        >
          <GrCheckmark className='icon forum-card-btn' />
          Joined
        </button>
      ) : (
        <>
          <button
            className='bg-color text-color forum-card-btn join'
            onClick={(e) => handleClick(e)}
          >
            <LuPlus className='icon forum-card-btn' />
            Join
          </button>
        </>
      )}
    </div>
  );
};
export const ForumCard2 = ({ forum }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { joinForum, leaveForum, activeForumIdForOngoingRequest } = useSelector(
    (state) => state.forums
  );
  const handleClick = (e, id) => {
    // console.log(e.currentTarget);
    const values = { forumId: id };
    console.log(values);
    if (e.currentTarget.classList.contains('join')) {
      dispatch(setActiveForumIdForOngoingRequest(id));
      dispatch(triggerJoinForum(values));
    } else if (e.currentTarget.classList.contains('joined')) {
      dispatch(setActiveForumIdForOngoingRequest(id));
      dispatch(triggerLeaveForum(values));
    }
  };
  useEffect(() => {
    console.log('useeffect');
    // To avoid multiple rerenders
    if (forum.forumId === activeForumIdForOngoingRequest) {
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
        }
        dispatch(resetJoinForum());
        dispatch(resetActiveForumIdForOngoingRequest());
      } else if (joinForum.status === 'error') {
        dispatch(resetActiveForumIdForOngoingRequest());
      }

      if (leaveForum.status === 'successful') {
        renderToast({
          status: 'success',
          message: leaveForum.data,
        });
        dispatch(resetLeaveForum());
        dispatch(resetActiveForumIdForOngoingRequest());
      } else if (leaveForum.status === 'error') {
        dispatch(resetActiveForumIdForOngoingRequest());
      }
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
        {forum.isCurrentUserMember ? (
          <button
            className=' smaller-text community-forum-btn forum-card-btn joined'
            onClick={(e) => handleClick(e, forum.forumId)}
          >
            Joined
          </button>
        ) : (
          <button
            className=' smaller-text community-forum-btn forum-card-btn join'
            onClick={(e) => handleClick(e, forum.forumId)}
          >
            + Join
          </button>
        )}
      </div>
    </div>
  );
};

export default ForumCard;
