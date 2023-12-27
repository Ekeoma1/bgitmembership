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
  triggerGetAllForumsByIndustry,
} from '../../Features/forums/forums_slice';
import EmptyState from '../Molecules/EmptyState';
import { renderToast } from '../Molecules/CustomToastify';
const RecommendedBasedOnIndustry = ({ basedOn }) => {
  const { getAllForumsByIndustry, joinForum, cancelJoinForumRequest } =
    useSelector((state) => state.forums);
  const dispatch = useDispatch();
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [getAllForumsByIndustryLocal, setGetAllForumsByIndustryLocal] =
    useState([]);
  const [activeForumIndustry, setActiveForumIndustry] = useState({});

  useEffect(() => {
    const data = { queryParams: { pageNumber, pageSize } };
    dispatch(triggerGetAllForumsByIndustry(data));
  }, []);

  useEffect(() => {
    if (
      getAllForumsByIndustry.status === 'successful' &&
      Array.isArray(getAllForumsByIndustry.data)
    ) {
      setGetAllForumsByIndustryLocal(getAllForumsByIndustry.data);
    }
  }, [getAllForumsByIndustry]);

  useEffect(() => {
    const data = _.cloneDeep(getAllForumsByIndustryLocal);
    const setBactToDefault = () => {
      data.forEach((item) => {
        if (item.forumId === activeForumIndustry.forumId) {
          delete item.requestStatus;
        }
      });
      setGetAllForumsByIndustryLocal(data);
      setActiveForumIndustry({});
    };

    // join forum
    if (joinForum.status === 'loading') {
      data.forEach((item) => {
        if (item.forumId === activeForumIndustry.forumId) {
          item.requestStatus = 'loading';
        }
      });
      setGetAllForumsByIndustryLocal(data);
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
          if (item.forumId === activeForumIndustry.forumId) {
            item.forumMembershipStatus = 'PendingRequest';
          }
        });
        setGetAllForumsByIndustryLocal(data);
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
        if (item.forumId === activeForumIndustry.forumId) {
          item.requestStatus = 'loading';
        }
      });
      setGetAllForumsByIndustryLocal(data);
    } else if (cancelJoinForumRequest.status === 'successful') {
      if (cancelJoinForumRequest.data.status === 'success') {
        renderToast({
          status: 'success',
          message: 'Join request canceled successfully.',
        });
        data.forEach((item) => {
          if (item.forumId === activeForumIndustry.forumId) {
            item.forumMembershipStatus = 'NotAMember';
          }
        });
        setGetAllForumsByIndustryLocal(data);
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
            <h5 className='text-colo'>Recommended based on your Industry</h5>
          </div>
          <div className='forums-cards-wrapper'>
            {getAllForumsByIndustry.status === 'base' ||
            getAllForumsByIndustry.status === 'loading' ? (
              <>
                <ForumCardsLoader2 />
              </>
            ) : getAllForumsByIndustry.status === 'successful' ? (
              <>
                {getAllForumsByIndustryLocal.length === 0 ? (
                  <>
                    <EmptyState
                      title={'No forums found based on your industry'}
                      height={'50rem'}
                    />
                  </>
                ) : (
                  <>
                    <Carousel responsive={responsive}>
                      {getAllForumsByIndustryLocal.map((forum, index) => (
                        <ForumCard
                          key={index}
                          forum={forum}
                          setActiveForum={setActiveForumIndustry}
                        />
                      ))}
                    </Carousel>
                  </>
                )}
              </>
            ) : getAllForumsByIndustry.status === 'error' ? (
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

export default RecommendedBasedOnIndustry;
