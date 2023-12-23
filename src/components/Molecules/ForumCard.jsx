import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import '../../assets/scss/molecules.scss';
import { LuPlus } from 'react-icons/lu';
import { GrCheckmark } from 'react-icons/gr';
import useWindowSize from '../../hooks/useWindowSize';
import { useNavigate } from 'react-router-dom';
import forumImg1 from '../../../src/assets/images/forumcard1.svg';
import loadingDots from '../../../src/assets/images/loading_dots.gif';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetActiveForumIdForOngoingRequest,
  resetCanceljoinForumRequest,
  resetJoinForum,
  resetLeaveForum,
  setActiveForumIdForOngoingRequest,
  triggerCancelJoinForumRequest,
  triggerJoinForum,
  triggerLeaveForum,
} from '../../Features/forums/forums_slice';
import { renderToast } from './CustomToastify';

const ForumCard = ({ forum }) => {
  const buttonContainer = useRef(null);
  const { isMobile } = useWindowSize();
  const dispatch = useDispatch();
  const {
    joinForum,
    leaveForum,
    cancelJoinForumRequest,
    activeForumIdForOngoingRequest,
  } = useSelector((state) => state.forums);
  const [joined, setJoined] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = (e) => {
    if (!loading) {
      const values = { forumId: forum.forumId };
      if (e.target.closest('.has-pending-join-request')) {
        console.log('cancel');
        dispatch(triggerCancelJoinForumRequest(values));
        dispatch(setActiveForumIdForOngoingRequest(forum.forumId));
      } else if (e.target.closest('.join')) {
        dispatch(triggerJoinForum(values));
        dispatch(setActiveForumIdForOngoingRequest(forum.forumId));
      } else if (e.target.closest('.joined')) {
        dispatch(triggerLeaveForum(values));
        dispatch(setActiveForumIdForOngoingRequest(forum.forumId));
      } else {
        navigate(`/forums/${forum.forumId}`);
      }
    }
  };

  useEffect(() => {
    if (
      (joinForum.status === 'loading' ||
        leaveForum.status === 'loading' ||
        cancelJoinForumRequest === 'loading') &&
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
              navigate(`/forums/${forum.forumId}`);
            }}
            className='text-color-secondary-normal'
          >
            See more
          </span>
        )}
      </p>
      {forum.hasPendingJoinRequest ? (
        <button
          className={`bg-color22 text-color22 forum-card-btn  ${
            loading && 'loading'
          }`}
          ref={buttonContainer}
        >
          {forum.hasPendingJoinRequest ? (
            <span className='has-pending-join-request'>
              {loading ? (
                <>
                  Loading <img src={loadingDots} alt='' className='' />
                </>
              ) : (
                'Cancel Request'
              )}
            </span>
          ) : forum.isCurrentUserMember ? (
            <></>
          ) : (
            <></>
          )}
        </button>
      ) : forum.isCurrentUserMember ? (
        <>
          <button
            className={` smaller-text  bg-color22 text-color22 forum-card-btn join community-forum-btn ${
              loading && 'loading'
            }`}
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
      ) : (
        <>
          <button
            className={` smaller-text  bg-color22 text-color22 forum-card-btn join community-forum-btn ${
              loading && 'loading'
            }`}
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
export const ForumCard2 = ({
  forum,
  getAllForumsLocal,
  setGetAllForumsLocal,
}) => {
  const {
    joinForum,
    leaveForum,
    cancelJoinForumRequest,
    activeForumIdForOngoingRequest,
    getAllForums,
  } = useSelector((state) => state.forums);
  console.log('getAllforumsLocalforumscard', getAllForumsLocal);

  // const { getAllForums, joinForum, leaveForum, cancelJoinForumRequest } =
  //   useSelector((state) => state.forums);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      (joinForum.status === 'loading' ||
        leaveForum.status === 'loading' ||
        cancelJoinForumRequest.status === 'loading') &&
      activeForumIdForOngoingRequest === forum.forumId
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [joinForum.status, leaveForum.status, cancelJoinForumRequest.status]);

  const [activeForum, setActiveForum] = useState({});

  const handleClick = (e, forumParams) => {
    setActiveForum(forumParams);
    console.log('forum', forumParams);
    dispatch(setActiveForumIdForOngoingRequest(forumParams.forumId));

    const values = { forumId: forumParams.forumId };
    if (e.target.closest('.pending')) {
      console.log('pending');
      dispatch(triggerCancelJoinForumRequest(values));
    } else if (e.target.closest('.member')) {
      console.log('member');
      // dispatch(setActiveForumIdForOngoingRequest(forum.forumId));
      dispatch(triggerLeaveForum(values));
    } else if (e.target.closest('.not-a-member')) {
      console.log('not-member');
      // dispatch(setActiveForumIdForOngoingRequest(forum.forumId));
      dispatch(triggerJoinForum(values));
    } else {
      navigate(`/forums/${forum.forumId}`);
    }
  };

  useEffect(() => {
    if (forum.forumId === activeForum.forumId) {
      if (joinForum.status === 'successful') {
        // join forum
        console.log('getAllForumsLocal', getAllForumsLocal);
        console.log('activeForum###################', activeForum);
        const data = _.cloneDeep(getAllForumsLocal);
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
          data.forEach((item) => {
            if (item.forumId === activeForum.forumId) {
              console.log('######################################,joinforum');
              item.forumMembershipStatus = 'PendingRequest';
            }
          });
          console.log('data###############################,join', data);
          setGetAllForumsLocal(data);
        }
        dispatch(resetJoinForum());
      } else if (joinForum.status === 'error') {
        renderToast({
          status: 'error',
          message: 'Something went wrong',
        });
        dispatch(resetJoinForum());
      }

      // cancel Join forum request
      if (cancelJoinForumRequest.status === 'successful') {
        console.log('getAllForumsLocal', getAllForumsLocal);
        const data = _.cloneDeep(getAllForumsLocal);
        renderToast({
          status: 'success',
          message: cancelJoinForumRequest.data,
        });
        data.forEach((item) => {
          if (item.forumId === activeForum.forumId) {
            console.log('######################################,cancel');
            item.forumMembershipStatus = 'NotAMember';
          }
        });
        console.log('data###############################,cancel', data);
        setGetAllForumsLocal(data);
        dispatch(resetCanceljoinForumRequest());
      } else if (cancelJoinForumRequest.status === 'error') {
        renderToast({
          status: 'error',
          message: 'Something went wrong',
        });
        dispatch(resetCanceljoinForumRequest());
      }

      // leave forum
      if (leaveForum.status === 'successful') {
        console.log('getAllForumsLocal', getAllForumsLocal);
        const data = _.cloneDeep(getAllForumsLocal);
        renderToast({
          status: 'success',
          message: leaveForum.data,
        });
        data.forEach((item) => {
          if (item.forumId === activeForum.forumId) {
            console.log('######################################,leave');
            item.forumMembershipStatus = 'NotAMember';
          }
        });
        console.log('data###############################,leave', data);
        setGetAllForumsLocal(data);
        dispatch(resetLeaveForum());
      } else if (leaveForum.status === 'error') {
        renderToast({
          status: 'error',
          message: 'Something went wrong',
        });
        dispatch(resetLeaveForum());
      }
    }
  }, [joinForum.status, leaveForum.status, cancelJoinForumRequest.status]);
  // console.log('loading', loading);
  return (
    <div className='forum-card-2' onClick={(e) => handleClick(e, forum)}>
      <h4 className='mt-3'>{forum.forumName}</h4>
      <div className='community-forum-content'>{forum.details}</div>
      <div className='text-center'>
        {forum.forumMembershipStatus === 'PendingRequest' ? (
          <>
            <button
              className={`smaller-text community-forum-btn forum-card-btn joined pending ${
                loading && 'loading'
              }`}
            >
              {loading ? (
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
            {forum.forumMembershipStatus === 'Member' ? (
              <button
                className={`smaller-text community-forum-btn forum-card-btn joined member ${
                  loading && 'loading'
                }`}
              >
                {loading ? (
                  <>
                    Loading <img src={loadingDots} alt='' className='' />
                  </>
                ) : (
                  'Leave'
                )}
              </button>
            ) : forum.forumMembershipStatus === 'NotAMember' ? (
              <button
                className={`smaller-text community-forum-btn forum-card-btn join not-a-member ${
                  loading && 'loading'
                }`}
              >
                {loading ? (
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
          </>
        )}
      </div>
    </div>
  );
};

export default ForumCard;
