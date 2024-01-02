import React, { useEffect, useState } from 'react';
import Icon from '../Icon';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ForumCardsLoader from '../Atoms/skeleton-loaders/ForumCardsLoader';
import { useDispatch } from 'react-redux';
import {
  resetCanceljoinForumRequest,
  resetJoinForum,
  triggerGetAllForums,
  triggerGetSuggestedForums,
} from '../../Features/forums/forums_slice';
import { ForumCard2 } from '../Molecules/ForumCard';
import { renderToast } from '../Molecules/CustomToastify';

const CommunityForumsComponent = () => {
  const { getSuggestedForums } = useSelector((state) => state.forums);
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  const dispatch = useDispatch();
  useEffect(() => {
    const data = { queryParams: { pageNumber, pageSize } };
    dispatch(triggerGetSuggestedForums(data));
  }, []);
  const [getAllForumsLocal, setGetAllForumsLocal] = useState([]);
  const [activeForum, setActiveForum] = useState({});

  useEffect(() => {
    if (
      getSuggestedForums.status === 'successful' &&
      Array.isArray(getSuggestedForums.data.forums)
    ) {
      setGetAllForumsLocal(getSuggestedForums.data.forums);
    }
  }, [getSuggestedForums]);
  const { joinForum, cancelJoinForumRequest } = useSelector(
    (state) => state.forums
  );

  useEffect(() => {
    const data = _.cloneDeep(getAllForumsLocal);
    const setBactToDefault = () => {
      data.forEach((item) => {
        if (item.forumId === activeForum.forumId) {
          delete item.requestStatus;
        }
      });
      setGetAllForumsLocal(data);
      setActiveForum({});
    };

    // join forum
    if (joinForum.status === 'loading') {
      data.forEach((item) => {
        if (item.forumId === activeForum.forumId) {
          item.requestStatus = 'loading';
        }
      });
      setGetAllForumsLocal(data);
    } else if (joinForum.status === 'successful') {
      if (joinForum.data.status === 'error') {
        renderToast({
          status: 'error',
          message: 'You are the admin of the forum.',
        });
      } else if (joinForum.data.status === 'success') {
        renderToast({
          status: 'success',
          message: 'Join request sent successfully',
        });
        data.forEach((item) => {
          if (item.forumId === activeForum.forumId) {
            item.forumMembershipStatus = 'PendingRequest';
          }
        });
        setGetAllForumsLocal(data);
      }
      dispatch(resetJoinForum());
      setBactToDefault();
    } else if (joinForum.status === 'error') {
      renderToast({
        status: 'error',
        message: 'Something went wrong',
      });
      dispatch(resetJoinForum());
      setBactToDefault();
    }

    // cancel Join forum request
    if (cancelJoinForumRequest.status === 'loading') {
      data.forEach((item) => {
        if (item.forumId === activeForum.forumId) {
          item.requestStatus = 'loading';
        }
      });
      setGetAllForumsLocal(data);
    } else if (cancelJoinForumRequest.status === 'successful') {
      if (cancelJoinForumRequest.data.status === 'success') {
        renderToast({
          status: 'success',
          message: 'Join request canceled successfully.',
        });
        data.forEach((item) => {
          if (item.forumId === activeForum.forumId) {
            item.forumMembershipStatus = 'NotAMember';
          }
        });
        setGetAllForumsLocal(data);
      }
      dispatch(resetCanceljoinForumRequest());
      setBactToDefault();
    } else if (cancelJoinForumRequest.status === 'error') {
      renderToast({
        status: 'error',
        message: 'Something went wrong',
      });
      dispatch(resetCanceljoinForumRequest());
      setBactToDefault();
    }
  }, [joinForum.status, cancelJoinForumRequest.status]);

  return (
    <div className='community-forum-wrapper'>
      <div className='community-forum-card-wrapper shadow-sm'>
        <h3>Community Forums</h3>
        {getSuggestedForums.status === 'base' ||
        getSuggestedForums.status === 'loading' ? (
          <ForumCardsLoader />
        ) : getSuggestedForums.status === 'successful' &&
          Array.isArray(getSuggestedForums.data.forums) ? (
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
        {getSuggestedForums.status === 'successful' &&
          getSuggestedForums?.data?.forums?.length > 3 && (
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
