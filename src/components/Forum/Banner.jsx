import React, { useEffect, useState } from 'react';
import backgroundImage1 from '../../assets/images/people1.svg';
import msg from '../../assets/images/message-icon.svg';
import member1 from '../../../src/assets/images/member1.svg';
import member2 from '../../../src/assets/images/member2.svg';
import member3 from '../../../src/assets/images/member3.svg';
import member4 from '../../../src/assets/images/member4.svg';
import member5 from '../../../src/assets/images/member5.svg';
import spinner from '../../../src/assets/images/spinner2.png';
import forumDefault from '../../../src/assets/images/forumDefault.jpeg';
import loadingDots from '../../../src/assets/images/loading_dots.gif';
import { HiArrowLeft } from 'react-icons/hi';
import { FiPlus } from 'react-icons/fi';
import { PiCheckBold } from 'react-icons/pi';
import { useNavigate, useParams } from 'react-router-dom';
import { ImCancelCircle } from 'react-icons/im';
import { FaTimes, FaUserClock, FaUserTimes } from 'react-icons/fa';
import {
  resetActiveForumIdForOngoingRequest,
  resetCanceljoinForumRequest,
  resetJoinForum,
  resetLeaveForum,
  setActiveForumIdForOngoingRequest,
  triggerCancelJoinForumRequest,
  triggerGetForumConnectionStatusByForumId,
  triggerJoinForum,
  triggerLeaveForum,
} from '../../Features/forums/forums_slice';
import { useDispatch, useSelector } from 'react-redux';
import { renderToast } from '../Molecules/CustomToastify';
import SingleLineLoader, {
  SingleLineLoader2,
} from '../Atoms/skeleton-loaders/SingleLineLoader';

const Banner = ({
  setJoinForumRequestSuccessful,
  joinForumRequestSuccessful,
  forum,
}) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    getForumById,
    joinForum,
    leaveForum,
    getForumConnectionStatusByForumId,
    cancelJoinForumRequest,
  } = useSelector((state) => state.forums);
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

  // New
  const handleForumRequest = () => {
    const values = { forumId: params.id };
    if (getForumConnectionStatusByForumId.data?.connectionStatus === 'Pending') {
      // trigger cancel join forum
      dispatch(triggerCancelJoinForumRequest(values));
    } else if (
      getForumConnectionStatusByForumId.data?.connectionStatus === 'Not Connected'
    ) {
      // trigger join forum
      dispatch(triggerJoinForum(values));
    }
  };
  useEffect(() => {
    if (joinForum.status === 'successful') {
      renderToast({
        status: 'success',
        message: 'Forum connection request sent',
      });
      const data = { queryParams: { forumId: params?.id } };
      dispatch(triggerGetForumConnectionStatusByForumId(data));
      dispatch(resetJoinForum());
    }
    if (cancelJoinForumRequest.status === 'successful') {
      renderToast({
        status: 'success',
        message: 'Connection request cancelled',
      });
      const data = { queryParams: { forumId: params?.id } };
      dispatch(triggerGetForumConnectionStatusByForumId(data));
      dispatch(resetCanceljoinForumRequest());
    }
  }, [joinForum, cancelJoinForumRequest]);

  return (
    <>
      {getForumById.status === 'base' || getForumById.status === 'loading' ? (
        <div className='banner-loader'>
          <SingleLineLoader2 />
        </div>
      ) : getForumById.status === 'successful' ? (
        <>
          <div
            style={{
              backgroundImage: `url(${
                getForumById?.data?.forumBackgroundImageUrl ?? forumDefault
              })`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
            className='banner-wrapper'
          >
            <div className='banner-gradient'>
              <div className='banner-content'>
                <div className='arrow' onClick={() => navigate('/forums')}>
                  <HiArrowLeft />
                </div>
                <h2>
                  {getForumById?.data[0]?.forumName}
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
                      <p>{getForumById?.data[0]?.userCount}</p>
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

                    {/* {!getForumById?.data[0]?.isCurrentUserMember ? (
                      <>
                        <button
                          className='leave-forum'
                          onClick={(e) => handleClick(e)}
                        >
                          <ImCancelCircle className='icon' />
                          Request sent
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className='join'
                          onClick={(e) => handleClick(e)}
                        >
                          <FiPlus className='icon' />
                          Join
                        </button>
                      </>
                    )} */}
                    {getForumConnectionStatusByForumId.status === 'base' ||
                    getForumConnectionStatusByForumId.status === 'loading' ? (
                      <>
                        <button
                          onClick={handleForumRequest}
                          className={`reach-btn loading`}
                        >
                          <img src={spinner} alt='spinner' />
                        </button>
                      </>
                    ) : getForumConnectionStatusByForumId.status ===
                      'successful' ? (
                      <>
                        <button
                          onClick={handleForumRequest}
                          className={`reach-btn ${
                            (joinForum.status === 'loading' ||
                              cancelJoinForumRequest.status === 'loading') &&
                            'loading'
                          } ${
                            getForumConnectionStatusByForumId.data
                              ?.connectionStatus === 'Pending' && 'pending'
                          }`}
                        >
                          {joinForum.status === 'loading' ||
                          cancelJoinForumRequest.status === 'loading' ? (
                            <img src={spinner} alt='spinner' />
                          ) : getForumConnectionStatusByForumId.data
                              ?.connectionStatus === 'Pending' ? (
                            <>
                              <span className='pending-con'>
                                <FaUserClock className='icon' /> {'Pending'}
                              </span>
                              <span className='cancel-con'>
                                <FaUserTimes className='icon' /> {'Cancel'}
                              </span>
                            </>
                          ) : getForumConnectionStatusByForumId.data
                              ?.connectionStatus === 'Not Connected' ? (
                            '+ Connect'
                          ) : (
                            <></>
                          )}
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Banner;
