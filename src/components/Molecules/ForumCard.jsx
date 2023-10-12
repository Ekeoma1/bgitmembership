import React, { useEffect, useState } from 'react';
import '../../assets/scss/molecules.scss';
import { LuPlus } from 'react-icons/lu';
import { GrCheckmark } from 'react-icons/gr';
import useWindowSize from '../../hooks/useWindowSize';
import { useNavigate } from 'react-router-dom';
import forumImg1 from '../../../src/assets/images/forumcard1.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetJoinForum,
  triggerJoinForum,
} from '../../Features/forums/forums_slice';
import { renderToast } from './CustomToastify';

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

export default ForumCard;
