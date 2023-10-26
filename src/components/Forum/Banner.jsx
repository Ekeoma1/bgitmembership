import React, { useEffect, useState } from 'react';
import backgroundImage1 from '../../assets/images/people1.svg';
import msg from '../../assets/images/message-icon.svg';
import member1 from '../../../src/assets/images/member1.svg';
import member2 from '../../../src/assets/images/member2.svg';
import member3 from '../../../src/assets/images/member3.svg';
import member4 from '../../../src/assets/images/member4.svg';
import member5 from '../../../src/assets/images/member5.svg';
import loadingDots from '../../../src/assets/images/loading_dots.gif';
import { HiArrowLeft } from 'react-icons/hi';
import { FiPlus } from 'react-icons/fi';
import { PiCheckBold } from 'react-icons/pi';
import { useNavigate, useParams } from 'react-router-dom';
import { ImCancelCircle } from 'react-icons/im';
import { FaTimes } from 'react-icons/fa';
import {
  resetActiveForumIdForOngoingRequest,
  resetJoinForum,
  resetLeaveForum,
  setActiveForumIdForOngoingRequest,
  triggerJoinForum,
  triggerLeaveForum,
} from '../../Features/forums/forums_slice';
import { useDispatch, useSelector } from 'react-redux';
import { renderToast } from '../Molecules/CustomToastify';
import { LuPlus } from 'react-icons/lu';

const Banner = ({
  setJoinForumRequestSuccessful,
  joinForumRequestSuccessful,
  forum,
}) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getAllForums, joinForum, leaveForum } = useSelector(
    (state) => state.forums
  );
  const [requestSent, setRequestSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClick = (e) => {
    const values = { forumId: params?.forumId };
    if (e.currentTarget.classList.contains('join')) {
      dispatch(triggerJoinForum(values));
      dispatch(setActiveForumIdForOngoingRequest(params?.forumId));
    } else if (e.currentTarget.classList.contains('request-sent')) {
      // cancel request endpoint
    } else {
      dispatch(triggerLeaveForum(values));
      dispatch(setActiveForumIdForOngoingRequest(forum.forumId));
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
      dispatch(resetActiveForumIdForOngoingRequest());
    } else if (joinForum.status === 'error') {
      dispatch(resetJoinForum());
      dispatch(resetActiveForumIdForOngoingRequest());
    }
    // leave forum
    if (leaveForum.status === 'successful') {
      renderToast({
        status: 'success',
        message: leaveForum.data,
      });
      dispatch(resetLeaveForum());
      dispatch(resetActiveForumIdForOngoingRequest());
    } else if (leaveForum.status === 'error') {
      dispatch(resetLeaveForum());
      dispatch(resetActiveForumIdForOngoingRequest());
    }
  }, [joinForum.status, leaveForum.status]);
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
            {forum?.forumName ?? ''}
            <img src={msg} alt='message-icon' className='icon-color2' />
          </h2>
          <div className='banner-bottom'>
            <div className='members-wrapper'>
              <div className='members-img'>
                <div className='image-con'>
                  <img src={member1} alt='community-img-sm' />
                </div>
                <div className='image-con'>
                  <img src={member2} alt='community-img-sm' />
                </div>
                <div className='image-con'>
                  <img src={member3} alt='community-img-sm' />
                </div>
                <div className='image-con'>
                  <img src={member4} alt='community-img-sm' />
                </div>
                <div className='image-con'>
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
              {/* {!requestSent && !joinForumRequestSuccessful && (
                <button className='join' onClick={(e) => handleClick(e)}>
                  <FiPlus className='icon' />
                  Join
                </button>
              )}
              {requestSent && !joinForumRequestSuccessful && (
                <button
                  className='request-sent'
                  onClick={(e) => handleClick(e)}
                >
                  <FaTimes className='icon' />
                  Cancel request
                </button>
              )}
              {joinForumRequestSuccessful && (
                <button className='leave-forum' onClick={(e) => handleClick(e)}>
                  <ImCancelCircle className='icon' />
                  Leave Forum
                </button>
              )} */}

              {forum.isCurrentUserMember ? (
                <button className='leave-forum' onClick={(e) => handleClick(e)}>
                  <ImCancelCircle className='icon' />
                  Leave Forum
                </button>
              ) : (
                <>
                  <button className='join' onClick={(e) => handleClick(e)}>
                    <FiPlus className='icon' />
                    Join
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
