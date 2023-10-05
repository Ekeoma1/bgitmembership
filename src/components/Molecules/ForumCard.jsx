import React, { useState } from 'react';
import '../../assets/scss/molecules.scss';
import { LuPlus } from 'react-icons/lu';
import { GrCheckmark } from 'react-icons/gr';
import useWindowSize from '../../hooks/useWindowSize';
import { useNavigate } from 'react-router-dom';
import forumImg1 from '../../../src/assets/images/forumcard1.svg';

const ForumCard = ({ forum }) => {
  const { isMobile } = useWindowSize();
  const [joined, setJoined] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      className='forum-card mb-4 bg-color-card'
      onClick={(e) => {
        if (e.target.classList.contains('forum-card-btn')) {
          console.log('make join forum request');
        } else {
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
            {' '}
            See more
          </span>
        )}
      </p>
      <button
        className='bg-color text-color forum-card-btn'
        onClick={() => setJoined(!joined)}
      >
        {!joined ? (
          <>
            <LuPlus className='icon' />
            Join
          </>
        ) : (
          <>
            <GrCheckmark className='icon' />
            Joined
          </>
        )}
      </button>
    </div>
  );
};

export default ForumCard;
