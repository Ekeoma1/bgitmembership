import React, { useState } from 'react';
import backgroundImage1 from '../../assets/images/people1.svg';
import backgroundImage2 from '../../assets/images/forum.svg';
import msg from '../../assets/images/message-icon.svg';
import member1 from '../../../src/assets/images/member1.svg';
import member2 from '../../../src/assets/images/member2.svg';
import member3 from '../../../src/assets/images/member3.svg';
import member4 from '../../../src/assets/images/member4.svg';
import member5 from '../../../src/assets/images/member5.svg';
import { HiArrowLeft, HiPlusSm } from 'react-icons/hi';
import { GrCheckmark } from 'react-icons/gr';
import { FiPlus } from 'react-icons/fi';
import { PiCheckBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

const Banner = ({
  setJoinForumRequestSuccessful,
  joinForumRequestSuccessful,
}) => {
  const navigate = useNavigate();
  const [requestSent, setRequestSent] = useState(false);

  const handleClick = (e) => {
    // console.log(e.);
    if (e.currentTarget.className === 'join') {
      setRequestSent(true);
      setTimeout(() => {
        setJoinForumRequestSuccessful(true);
      }, 3000);
    } else {
      // setRequestSent(false);
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage1})`,
        // backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      className='banner-wrapper'
    >
      <div className='banner-gradient'>
        <div className='banner-content'>
          <div className='arrow' onClick={() => navigate('/community-forums')}>
            <HiArrowLeft />
          </div>
          <h2>
            UX/UI Design Forum{' '}
            <img src={msg} alt='message-icon' className='icon-color2' />
          </h2>
          <div className='banner-bottom'>
            <div className='members-wrapper'>
              <div class='members-img'>
                <div class='image-con'>
                  <img src={member1} alt='community-img-sm' />
                </div>
                <div class='image-con'>
                  <img src={member2} alt='community-img-sm' />
                </div>
                <div class='image-con'>
                  <img src={member3} alt='community-img-sm' />
                </div>
                <div class='image-con'>
                  <img src={member4} alt='community-img-sm' />
                </div>
                <div class='image-con'>
                  <img src={member5} alt='community-img-sm' />
                </div>
              </div>
              <div className='members-amount'>
                {/* <p>{community.community_members}</p> */}
                <p>{'100'}</p>
                <p>Members</p>
              </div>
            </div>
            <div className='btns'>
              {!requestSent && !joinForumRequestSuccessful && (
                <button className='join' onClick={(e) => handleClick(e)}>
                  <FiPlus className='icon' />
                  Join
                </button>
              )}
              {requestSent &&
                !joinForumRequestSuccessful && (
                  <button
                    className='request-sent'
                    onClick={(e) => handleClick(e)}
                  >
                    <PiCheckBold className='icon' />
                    Request Sent
                  </button>
                )}
              {joinForumRequestSuccessful && (
                <button className='join' onClick={(e) => handleClick(e)}>
                  <FiPlus className='icon' />
                  Leave Forum
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
