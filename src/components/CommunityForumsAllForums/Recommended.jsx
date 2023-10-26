import React, { useEffect, useState } from 'react';
import '../../../src/assets/scss/communityForums.scss';
import ForumCard from '../Molecules/ForumCard';
import forumImg1 from '../../../src/assets/images/forumcard1.svg';
import forumImg2 from '../../../src/assets/images/forumcard2.svg';
import forumImg3 from '../../../src/assets/images/forumcard3.svg';
import forumImg4 from '../../../src/assets/images/forumcard4.svg';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { ForumCardsLoader2 } from '../Atoms/skeleton-loaders/ForumCardsLoader';
import {
  resetActiveForumIdForOngoingRequest,
  resetJoinForum,
  resetLeaveForum,
  triggerGetAllForums,
  triggerGetAllForumsByIndustry,
  triggerGetAllForumsByLocation,
} from '../../Features/forums/forums_slice';
import EmptyState from '../Molecules/EmptyState';
import { renderToast } from '../Molecules/CustomToastify';
const Recommended = ({ basedOn }) => {
  const { getAllForumsByIndustry, getAllForumsByLocation } = useSelector(
    (state) => state.forums
  );
  const { joinForum, leaveForum, activeForumIdForOngoingRequest } = useSelector(
    (state) => state.forums
  );
  const dispatch = useDispatch();
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);

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
      dispatch(resetActiveForumIdForOngoingRequest());
      dispatch(resetLeaveForum());
    }
  }, [joinForum.status, leaveForum.status]);

  useEffect(() => {
    const data = { queryParams: { pageNumber, pageSize } };
    dispatch(triggerGetAllForumsByIndustry(data));
    dispatch(triggerGetAllForumsByLocation(data));
  }, []);

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
            <h5 className='text-colo'>Recommended based on your {basedOn}</h5>
          </div>
          {basedOn === 'industry' && (
            <div className='forums-cards-wrapper'>
              {getAllForumsByIndustry.status === 'base' ||
              getAllForumsByIndustry.status === 'loading' ? (
                <>
                  <ForumCardsLoader2 />
                </>
              ) : getAllForumsByIndustry.status === 'successful' ? (
                <>
                  {getAllForumsByIndustry.data.length === 0 ? (
                    <>
                      <EmptyState
                        title={'No forums found based on your industry'}
                        height={'50rem'}
                      />
                    </>
                  ) : (
                    <>
                      <Carousel responsive={responsive}>
                        {getAllForumsByIndustry.data.map((forum, index) => (
                          <ForumCard key={index} forum={forum} />
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
          )}
          {basedOn === 'location' && (
            <div className='forums-cards-wrapper'>
              {getAllForumsByLocation.status === 'base' ||
              getAllForumsByLocation.status === 'loading' ? (
                <>
                  <ForumCardsLoader2 />
                </>
              ) : getAllForumsByLocation.status === 'successful' ? (
                <>
                  {getAllForumsByLocation.data.length === 0 ? (
                    <>
                      <EmptyState
                        title={'No forums found based on your Location'}
                        height={'20rem'}
                      />
                    </>
                  ) : (
                    <>
                      <Carousel responsive={responsive}>
                        {getAllForumsByLocation.data.map((forum, index) => (
                          <ForumCard key={index} forum={forum} />
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommended;
