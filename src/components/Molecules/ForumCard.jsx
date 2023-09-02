import React, { useState } from 'react';
import '../../assets/scss/molecules.scss';
import { LuPlus } from 'react-icons/lu';
import { GrCheckmark } from 'react-icons/gr';
import useWindowSize from '../../hooks/useWindowSize';
import { useNavigate } from 'react-router-dom';

const ForumCard = ({ forum }) => {
  const { isMobile } = useWindowSize();
  const [joined, setJoined] = useState(false);
  const navigate = useNavigate();
  return (
    <div className='forum-card'>
      <img src={forum.community_img} alt='forum-img' className='' />
      <h3>{forum.community_name}</h3>
      <p>
        {forum.info.length > 130 && !isMobile
          ? `${forum.info.substring(0, 130)}...`
          : forum.info.length > 100 && isMobile
          ? `${forum.info.substring(0, 100)}...`
          : forum.info}
        {forum.info.length > 130 && (
          <span
            onClick={() => {
              navigate('/community-forums/forum');
            }}
          >
            See more
          </span>
        )}
      </p>
      <button onClick={() => setJoined(true)}>
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
