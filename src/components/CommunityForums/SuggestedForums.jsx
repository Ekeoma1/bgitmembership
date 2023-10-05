import React, { useEffect, useState } from 'react';
import '../../../src/assets/scss/communityForums.scss';

import { useNavigate } from 'react-router-dom';
import ForumCard from '../Molecules/ForumCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { triggerGetAllForums } from '../../Features/forums/forums_slice';
const SuggestedForums = () => {
  const navigate = useNavigate();
  const { getAllForums } = useSelector((state) => state.forums);
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  const dispatch = useDispatch();
  useEffect(() => {
    const data = { queryParams: { pageNumber, pageSize } };
    dispatch(triggerGetAllForums(data));
  }, []);
  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 2,
    },
  };
  return (
    <div className='suggested-forums-wrapper'>
      <div className='container'>
        <div className='content-wrapper'>
          <h3 className='section-title text-color'> Suggested Forums </h3>
          <div className='view-all'>
            <button onClick={() => navigate('/community-forums/all')}>
              View all
            </button>
          </div>
          <div className='forums-cards-wrapper'>
            {getAllForums.status === 'base' ||
            getAllForums.status === 'loading' ? (
              <></>
            ) : getAllForums.status === 'successful' ? (
              <>
                {getAllForums.data.length === 0 ? (
                  <></>
                ) : (
                  <>
                    <Carousel responsive={responsive}>
                      {getAllForums.data.map((forum, index) => (
                        <ForumCard key={index} forum={forum} />
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
