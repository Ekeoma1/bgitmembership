import React, { useEffect, useState } from 'react';
import Icon from '../Icon';
import _ from 'lodash';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ForumCardsLoader from '../Atoms/skeleton-loaders/ForumCardsLoader';
import { useDispatch } from 'react-redux';
import {
  resetActiveForumIdForOngoingRequest,
  resetCanceljoinForumRequest,
  resetJoinForum,
  resetLeaveForum,
  setActiveForumsForOngoingRequest,
  triggerGetAllForums,
  triggerJoinForum,
} from '../../Features/forums/forums_slice';
import { ForumCard2 } from '../Molecules/ForumCard';
import { renderToast } from '../Molecules/CustomToastify';

const CommunityForumsComponent = () => {
  const { getAllForums } = useSelector((state) => state.forums);
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  const dispatch = useDispatch();
  useEffect(() => {
    const data = { queryParams: { pageNumber, pageSize } };
    dispatch(triggerGetAllForums(data));
  }, []);
  const [getAllForumsLocal, setGetAllForumsLocal] = useState([]);
  const [activeForums, setActiveForums] = useState([]);
  const [activeForum, setActiveForum] = useState({});
  useEffect(() => {
    if (
      getAllForums.status === 'successful' &&
      Array.isArray(getAllForums.data)
    ) {
      // console.log('data########', getAllForums.data);
      setGetAllForumsLocal(getAllForums.data);
    }
  }, [getAllForums]);
  // console.log('geallforum############', getAllForums.data);
  // console.log('geallforum status############', getAllForums.status);
  const {
    joinForum,
    leaveForum,
    cancelJoinForumRequest,
    activeForumsForOngoingRequest,
    activeForumsCurrentRequests,
  } = useSelector((state) => state.forums);
  useEffect(() => {
    const data = _.cloneDeep(getAllForumsLocal);
    // join forum

    if (joinForum.status === 'loading') {
      // data.forEach((item) => {
      //   if (item.forumId === activeForum.forumId) {
      //     console.log('yessjoinforumloading#################');
      //     item.requestStatus = 'loading';
      //   }
      // });
      // console.log('datajoinforumloading##################', data);
      // setGetAllForumsLocal(data);
    } else if (joinForum.status === 'successful') {
      console.log('jooin####################################');
      if (joinForum.data.status === 'error') {
        renderToast({
          status: 'error',
          message: 'You are the admin of the forum.',
        });
      } else if (joinForum.data.status === 'success') {
        // const activeforumsTemp = [
        //   activeForumsForOngoingRequest.filter(
        //     (item) => item.forumId !== joinForum.data.forumId
        //   ),
        // ];
        // dispatch(setActiveForumsForOngoingRequest(activeforumsTemp));
        renderToast({
          status: 'success',
          message: 'Join request sent successfully',
        });
        data.forEach((item) => {
          if (item.forumId === joinForum.data.forumId) {
            item.forumMembershipStatus = 'PendingRequest';
            delete item.requestStatus;
            console.log('yessjoinforumsuccessful#################');
          }
        });
        // console.log('datajoinforumsuccessful##################', data);
        setGetAllForumsLocal(data);
      }
      dispatch(resetJoinForum());
    } else if (joinForum.status === 'error') {
      renderToast({
        status: 'error',
        message: 'Something went wrong',
      });
      const activeforumsTemp = [
        activeForumsForOngoingRequest.filter(
          (item) => item.forumId !== joinForum.data.forumId
        ),
      ];
      dispatch(setActiveForumsForOngoingRequest(activeforumsTemp));
      data.forEach((item) => {
        if (item.forumId === joinForum.data.forumId) {
          delete item.requestStatus;
        }
      });
      setGetAllForumsLocal(data);
      dispatch(resetJoinForum());
    }

    // cancel Join forum request
    if (cancelJoinForumRequest.status === 'loading') {
      // data.forEach((item) => {
      //   if (item.forumId === activeForum.forumId) {
      //     console.log('yescancelloading######');
      //     item.requestStatus = 'loading';
      //   }
      // });
      // console.log('datacanceljoinforumloading##################', data);
      // setGetAllForumsLocal(data);
    } else if (cancelJoinForumRequest.status === 'successful') {
      console.log('cancel#######################################');
      if (
        // cancelJoinForumRequest.data === 'Join request canceled successfully.'
        cancelJoinForumRequest.data.status === 'success'
      ) {
        renderToast({
          status: 'success',
          message: 'Join request canceled successfully.',
        });
        const activeforumsTemp = [
          activeForumsForOngoingRequest.filter(
            (item) => item.forumId !== cancelJoinForumRequest.data.forumId
          ),
        ];
        dispatch(setActiveForumsForOngoingRequest(activeforumsTemp));
        data.forEach((item) => {
          if (item.forumId === cancelJoinForumRequest.data.forumId) {
            item.forumMembershipStatus = 'NotAMember';
            delete item.requestStatus;
            // console.log(
            //   'data canceljoinforum successful ##################',
            //   data
            // );
          }
        });
        // console.log('datacancelforumsuccessful##################', data);
        setGetAllForumsLocal(data);
        dispatch(resetCanceljoinForumRequest());
      }
    } else if (cancelJoinForumRequest.status === 'error') {
      renderToast({
        status: 'error',
        message: 'Something went wrong',
      });
      const activeforumsTemp = [
        activeForumsForOngoingRequest.filter(
          (item) => item.forumId !== cancelJoinForumRequest.data.forumId
        ),
      ];
      dispatch(setActiveForumsForOngoingRequest(activeforumsTemp));
      data.forEach((item) => {
        if (item.forumId === cancelJoinForumRequest.status.forumId) {
          delete item.requestStatus;
        }
      });
      setGetAllForumsLocal(data);
      dispatch(resetCanceljoinForumRequest());
    }

    // leave forum
    if (leaveForum.status === 'successful') {
      renderToast({
        status: 'success',
        message: leaveForum.data,
      });
      data.forEach((item) => {
        if (item.forumId === leaveForum.data.forumId) {
          item.requestStatus = 'loading';
        }
      });
      setGetAllForumsLocal(data);
    } else if (leaveForum.status === 'successful') {
      renderToast({
        status: 'success',
        message: leaveForum.data,
      });
      data.forEach((item) => {
        if (item.forumId === leaveForum.data.forumId) {
          item.forumMembershipStatus = 'NotAMember';
        }
      });
      setGetAllForumsLocal(data);
      dispatch(resetLeaveForum());
    } else if (leaveForum.status === 'error') {
      renderToast({
        status: 'error',
        message: 'Something went wrong',
      });
      data.forEach((item) => {
        if (item.forumId === leaveForum.data.forumId) {
          item.forumMembershipStatus = 'NotAMember';
        }
      });
      setGetAllForumsLocal(data);
      dispatch(resetLeaveForum());
    }
  }, [joinForum, cancelJoinForumRequest, leaveForum]);
  // console.log('active', activeForum);
  // console.log('activeforums', activeForums);
  // console.log('activeForumsCurrentRequests', activeForumsCurrentRequests);
  console.log('data', joinForum);
  console.log('canceljoinforum', cancelJoinForumRequest);
  console.log('data', getAllForumsLocal);
  return (
    <div className='community-forum-wrapper'>
      <div className='community-forum-card-wrapper shadow-sm'>
        <h3>Community Forums</h3>
        {getAllForums.status === 'loading' ? (
          <>
            <ForumCardsLoader />
          </>
        ) : getAllForums.status === 'successful' &&
          Array.isArray(getAllForums.data) ? (
          <>
            {getAllForumsLocal.length === 0 ? (
              <div className='empty-state'>
                <p>No forums yet...</p>
              </div>
            ) : (
              <>
                {getAllForumsLocal?.slice(0, 3).map((forum, key) => {
                  return (
                    <ForumCard2
                      key={forum.forumId}
                      forum={forum}
                      getAllForumsLocal={getAllForumsLocal}
                      setGetAllForumsLocal={setGetAllForumsLocal}
                      activeForums={activeForums}
                      setActiveForums={setActiveForums}
                      activeForum={activeForum}
                      setActiveForum={setActiveForum}
                    />
                  );
                })}
              </>
            )}
          </>
        ) : (
          <></>
        )}
        {getAllForums.status === 'successful' &&
          getAllForums?.data?.length > 3 && (
            <div className='text-center my-4'>
              <Link
                to='/forums'
                className='sec-btn mx-auto c-gap-5 smallert-text added-width d-flex align-items-center justify-content-center'
              >
                <span>View all</span> <Icon icon='arrowRight' />
              </Link>
            </div>
          )}
      </div>
    </div>
  );
};

export default CommunityForumsComponent;
