import React, { useEffect, useState } from 'react';
import '../../../src/assets/scss/communityForums.scss';
import ForumCard from '../Molecules/ForumCard';
import _ from 'lodash';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { ForumCardsLoader2 } from '../Atoms/skeleton-loaders/ForumCardsLoader';
import {
  resetCanceljoinForumRequest,
  resetJoinForum,
  triggerGetAllForumsByLocation,
} from '../../Features/forums/forums_slice';
import EmptyState from '../Molecules/EmptyState';
import { renderToast } from '../Molecules/CustomToastify';

const RecommendedBasedOnLocation = ({ basedOn }) => {
  const { getAllForumsByLocation, joinForum, cancelJoinForumRequest } =
    useSelector((state) => state.forums);
  const dispatch = useDispatch();
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);

  const [getAllForumsByLocationLocal, setGetAllForumsByLocationLocal] =
    useState([]);
  const [activeForumLocation, setActiveForumLocation] = useState({});

  useEffect(() => {
    const data = { queryParams: { pageNumber, pageSize } };
    dispatch(triggerGetAllForumsByLocation(data));
  }, []);

  useEffect(() => {
    if (
      getAllForumsByLocation.status === 'successful' &&
      Array.isArray(getAllForumsByLocation.data)
    ) {
      setGetAllForumsByLocationLocal(getAllForumsByLocation.data);
    }
  }, [getAllForumsByLocation]);

  useEffect(() => {
    const data = _.cloneDeep(getAllForumsByLocationLocal);
    const setBactToDefault = () => {
      data.forEach((item) => {
        if (item.forumId === activeForumLocation.forumId) {
          delete item.requestStatus;
        }
      });
      setGetAllForumsByLocationLocal(data);
      setActiveForumLocation({});
    };

    // join forum
    if (joinForum.status === 'loading') {
      data.forEach((item) => {
        if (item.forumId === activeForumLocation.forumId) {
          item.requestStatus = 'loading';
        }
      });
      setGetAllForumsByLocationLocal(data);
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
          if (item.forumId === activeForumLocation.forumId) {
            item.forumMembershipStatus = 'PendingRequest';
          }
        });
        setGetAllForumsByLocationLocal(data);
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
        if (item.forumId === activeForumLocation.forumId) {
          item.requestStatus = 'loading';
        }
      });
      setGetAllForumsByLocationLocal(data);
    } else if (cancelJoinForumRequest.status === 'successful') {
      if (cancelJoinForumRequest.data.status === 'success') {
        renderToast({
          status: 'success',
          message: 'Join request canceled successfully.',
        });
        data.forEach((item) => {
          if (item.forumId === activeForumLocation.forumId) {
            item.forumMembershipStatus = 'NotAMember';
          }
        });
        setGetAllForumsByLocationLocal(data);
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
      items: 1.4,
    },
  };

  return (
    <div className='recommended-section'>
      <div className='container'>
        <div className='recommended-section-content'>
          <div className='section-title-wrapper'>
            <h5 className='text-colo'>Recommended based on your Location</h5>
          </div>

          <div className='forums-cards-wrapper'>
            {getAllForumsByLocation.status === 'base' ||
            getAllForumsByLocation.status === 'loading' ? (
              <>
                <ForumCardsLoader2 />
              </>
            ) : getAllForumsByLocation.status === 'successful' ? (
              <>
                {getAllForumsByLocationLocal.length === 0 ? (
                  <>
                    <EmptyState
                      title={'No forums found based on your Location'}
                      height={'20rem'}
                    />
                  </>
                ) : (
                  <>
                    <Carousel responsive={responsive}>
                      {getAllForumsByLocationLocal.map((forum, index) => (
                        <ForumCard
                          key={index}
                          forum={forum}
                          setActiveForum={setActiveForumLocation}
                        />
                      ))}
                    </Carousel>
                  </>
                )}
              </>
            ) : getAllForumsByLocation.status === 'error' ? (
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

export default RecommendedBasedOnLocation;
