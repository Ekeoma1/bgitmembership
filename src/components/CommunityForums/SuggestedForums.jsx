import React, { useEffect, useState } from 'react';
import '../../../src/assets/scss/communityForums.scss';

import { useNavigate } from 'react-router-dom';
import ForumCard from '../Molecules/ForumCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetActiveForumIdForOngoingRequest,
  resetJoinForum,
  resetLeaveForum,
  triggerGetAllForums,
} from '../../Features/forums/forums_slice';
import { ForumCardsLoader2 } from '../Atoms/skeleton-loaders/ForumCardsLoader';
import { renderToast } from '../Molecules/CustomToastify';
import EmptyState from '../Molecules/EmptyState';
const SuggestedForums = () => {
  console.log('suggested forums###############');
  const navigate = useNavigate();
  const { getAllForums, joinForum, leaveForum } = useSelector(
    (state) => state.forums
  );
  const [getAllForumsLocal, setGetAllForumsLocal] = useState([]);
  const [activeForumMain, setActiveForumMain] = useState({});
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  const dispatch = useDispatch();
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
                            getAllForumsLocal={getAllForumsLocal}
                            setGetAllForumsLocal={setGetAllForumsLocal}
                            activeForumMain={activeForumMain}
                            setActiveForumMain={setActiveForumMain}
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
