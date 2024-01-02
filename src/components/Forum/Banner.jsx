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
import { HiArrowLeft, HiUserGroup } from 'react-icons/hi';

import { useNavigate, useParams } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { IoCheckmarkSharp } from 'react-icons/io5';
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
import { FaUserGroup } from 'react-icons/fa6';
import { HiMiniUserGroup } from 'react-icons/hi2';
import {
  PiUsersFill,
  PiUsersThreeBold,
  PiUsersThreeFill,
} from 'react-icons/pi';

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

  const handleForumRequest = () => {
    // console.log('params', params);
    const values = { forumId: params.forumId };
    if (
      getForumConnectionStatusByForumId.data?.membershipStatus === 'Pending'
    ) {
      dispatch(triggerCancelJoinForumRequest(values));
    } else if (
      getForumConnectionStatusByForumId.data?.membershipStatus ===
      'Not a member'
    ) {
      dispatch(triggerJoinForum(values));
    } else if (
      getForumConnectionStatusByForumId.data?.membershipStatus === 'Member'
    ) {
      dispatch(triggerLeaveForum(values));
    }
  };
  useEffect(() => {
    const data = { queryParams: { forumId: params?.forumId } };
    if (joinForum.status === 'successful') {
      if (joinForum.data.status === 'success') {
        renderToast({
          status: 'success',
          message: 'Forum connection request sent',
        });
        dispatch(triggerGetForumConnectionStatusByForumId(data));
      }
      dispatch(resetJoinForum());
    }
    if (cancelJoinForumRequest.status === 'successful') {
      if (cancelJoinForumRequest.data.status === 'success') {
        renderToast({
          status: 'success',
          message: 'Connection request cancelled',
        });
        dispatch(triggerGetForumConnectionStatusByForumId(data));
      }
      dispatch(resetCanceljoinForumRequest());
    }
    if (leaveForum.status === 'successful') {
      if (leaveForum.data.status === 'success') {
        renderToast({
          status: 'success',
          message: 'Forum left successfully',
        });
        dispatch(triggerGetForumConnectionStatusByForumId(data));
      }
      dispatch(resetLeaveForum());
    }
  }, [joinForum, cancelJoinForumRequest, leaveForum]);

  return (
    <>
      {getForumById.status === 'base' || getForumById.status === 'loading' ? (
        <div className='banner-loader'>
          <SingleLineLoader2 />
        </div>
      ) : getForumById.status === 'successful' ? (
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
                    {getForumById?.data[0]?.usersInForum.length === 0 ? (
                      <>
                        <div className='image-con icon-con'>
                          {/* <FaUserGroup /> */}
                          {/* <PiUsersThreeFill /> */}
                          <HiMiniUserGroup />
                        </div>
                      </>
                    ) : (
                      <>
                        {getForumById?.data[0]?.usersInForum?.map(
                          (member, index) => (
                            <div className='image-con'>
                              <img
                                src={member.user?.imageUrl}
                                alt='community-img-sm'
                              />
                            </div>
                          )
                        )}
                      </>
                    )}
                  </div>
                  <div className='members-amount'>
                    <p>{getForumById?.data[0]?.userCount}</p>
                    <p>Members</p>
                  </div>
                </div>
                <div className='btns'>
                  {getForumConnectionStatusByForumId.status === 'base' ||
                  getForumConnectionStatusByForumId.status === 'loading' ? (
                    <button
                      onClick={handleForumRequest}
                      className={`reach-btn  loading`}
                    >
                      <img src={spinner} alt='spinner' />
                    </button>
                  ) : getForumConnectionStatusByForumId.status ===
                    'successful' ? (
                    <>
                      {getForumConnectionStatusByForumId.data
                        .membershipStatus === 'IsMember' ? (
                        <button
                          onClick={handleForumRequest}
                          className={`reach-btn ${
                            leaveForum.status === 'loading' && 'loading'
                          } `}
                        >
                          {leaveForum.status === 'loading' ? (
                            <img src={spinner} alt='spinner' />
                          ) : (
                            <>Leave Forum</>
                          )}
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={handleForumRequest}
                            className={`reach-btn ${
                              (joinForum.status === 'loading' ||
                                cancelJoinForumRequest.status === 'loading' ||
                                leaveForum.status === 'loading') &&
                              'loading'
                            } ${
                              getForumConnectionStatusByForumId.data
                                ?.membershipStatus === 'Pending' && 'pending'
                            }`}
                          >
                            {joinForum.status === 'loading' ||
                            cancelJoinForumRequest.status === 'loading' ||
                            leaveForum.status === 'loading' ? (
                              <img src={spinner} alt='spinner' />
                            ) : getForumConnectionStatusByForumId.data
                                ?.membershipStatus === 'Pending' ? (
                              <>
                                <span className='pending-con'>
                                  <IoCheckmarkSharp className='icon' />{' '}
                                  {'Request sent'}
                                </span>
                                <span className='cancel-con'>
                                  <FaTimes className='icon' />{' '}
                                  {'Cancel Request'}
                                </span>
                              </>
                            ) : getForumConnectionStatusByForumId.data
                                ?.membershipStatus === 'Not a member' ? (
                              '+ Join'
                            ) : getForumConnectionStatusByForumId.data
                                ?.membershipStatus === 'Member' ? (
                              ' Leave forum'
                            ) : (
                              <></>
                            )}
                          </button>
                        </>
                      )}
                      <button
                        onClick={handleForumRequest}
                        className={`reach-btn ${
                          (joinForum.status === 'loading' ||
                            cancelJoinForumRequest.status === 'loading' ||
                            leaveForum.status === 'loading') &&
                          'loading'
                        } ${
                          getForumConnectionStatusByForumId.data
                            ?.membershipStatus === 'Pending' && 'pending'
                        }`}
                      >
                        {joinForum.status === 'loading' ||
                        cancelJoinForumRequest.status === 'loading' ||
                        leaveForum.status === 'loading' ? (
                          <img src={spinner} alt='spinner' />
                        ) : getForumConnectionStatusByForumId.data
                            ?.membershipStatus === 'Pending' ? (
                          <>
                            <span className='pending-con'>
                              <IoCheckmarkSharp className='icon' />{' '}
                              {'Request sent'}
                            </span>
                            <span className='cancel-con'>
                              <FaTimes className='icon' /> {'Cancel Request'}
                            </span>
                          </>
                        ) : getForumConnectionStatusByForumId.data
                            ?.membershipStatus === 'Not a member' ? (
                          '+ Join'
                        ) : getForumConnectionStatusByForumId.data
                            ?.membershipStatus === 'Member' ? (
                          ' Leave forum'
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
      ) : (
        <></>
      )}
    </>
  );
};

export default Banner;
