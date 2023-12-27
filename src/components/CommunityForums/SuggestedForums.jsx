import React, { useEffect, useState } from 'react';
import '../../../src/assets/scss/communityForums.scss';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import ForumCard from '../Molecules/ForumCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetCanceljoinForumRequest,
  resetJoinForum,
  triggerGetAllForums,
} from '../../Features/forums/forums_slice';
import { ForumCardsLoader2 } from '../Atoms/skeleton-loaders/ForumCardsLoader';
import { renderToast } from '../Molecules/CustomToastify';
import EmptyState from '../Molecules/EmptyState';

const SuggestedForums = () => {
  const navigate = useNavigate();
  const { getAllForums, joinForum, cancelJoinForumRequest } =
    useSelector((state) => state.forums);
  const [getAllForumsLocal, setGetAllForumsLocal] = useState([]);
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  const dispatch = useDispatch();
  const [activeForum, setActiveForum] = useState({});

  useEffect(() => {
    const data = { queryParams: { pageNumber, pageSize } };
    dispatch(triggerGetAllForums(data));
  }, []);
  useEffect(() => {
    if (
      getAllForums.status === 'successful' &&
      Array.isArray(getAllForums.data)
    ) {
      setGetAllForumsLocal(getAllForums.data);
    }
  }, [getAllForums]);

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

  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2.4,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1.2,
    },
  };

  return (
    <div className='suggested-forums-wrapper'>
      <div className='container'>
        <div className='content-wrapper'>
          <h3 className='section-title text-color22'> Suggested Forums</h3>
          <div className='view-all'>
            <button onClick={() => navigate('/forums/all')}>View all</button>
          </div>
          <div className='forums-cards-wrapper'>
            {getAllForums.status === 'base' ||
            getAllForums.status === 'loading' ? (
              <ForumCardsLoader2 />
            ) : getAllForums.status === 'successful' ? (
              <>
                {getAllForumsLocal?.length === 0 ? (
                  <>
                    <EmptyState title={'No forums found'} height={'50rem'} />
                  </>
                ) : (
                  <>
                    <Carousel responsive={responsive}>
                      {getAllForumsLocal &&
                        getAllForumsLocal?.map((forum, index) => (
                          <ForumCard
                            key={index}
                            forum={forum}
                            setActiveForum={setActiveForum}
                          />
                        ))}
                    </Carousel>
                  </>
                )}
              </>
            ) : getAllForums.status === 'error' ? (
              <></>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedForums;
