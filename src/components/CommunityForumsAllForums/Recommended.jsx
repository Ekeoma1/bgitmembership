import React, { useEffect, useState } from 'react';
import '../../../src/assets/scss/communityForums.scss';
import ForumCard from '../Molecules/ForumCard';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { ForumCardsLoader2 } from '../Atoms/skeleton-loaders/ForumCardsLoader';
import {
  triggerGetAllForumsByIndustry,
  triggerGetAllForumsByLocation,
} from '../../Features/forums/forums_slice';
import EmptyState from '../Molecules/EmptyState';
const Recommended = ({ basedOn }) => {
  const { getAllForumsByIndustry, getAllForumsByLocation } = useSelector(
    (state) => state.forums
  );
  const dispatch = useDispatch();
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [getAllForumsByIndustryLocal, setGetAllForumsByIndustryLocal] =
    useState([]);
  const [activeForumIndustryMain, setActiveForumIndustryMain] = useState({});
  const [getAllForumsByLocationLocal, setGetAllForumsByLocationLocal] =
    useState([]);
  const [activeForumLocationMain, setActiveForumLocationMain] = useState({});

  useEffect(() => {
    const data = { queryParams: { pageNumber, pageSize } };
    dispatch(triggerGetAllForumsByIndustry(data));
    dispatch(triggerGetAllForumsByLocation(data));
  }, []);
  useEffect(() => {
    if (
      getAllForumsByIndustry.status === 'successful' &&
      Array.isArray(getAllForumsByIndustry.data)
    ) {
      setGetAllForumsByIndustryLocal(getAllForumsByIndustry.data);
    }
    if (
      getAllForumsByLocation.status === 'successful' &&
      Array.isArray(getAllForumsByLocation.data)
    ) {
      setGetAllForumsByLocationLocal(getAllForumsByLocation.data);
    }
  }, [getAllForumsByIndustry, getAllForumsByLocation]);

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
                            getAllForumsLocal={getAllForumsByIndustryLocal}
                            setGetAllForumsLocal={
                              setGetAllForumsByIndustryLocal
                            }
                            activeForumMain={activeForumIndustryMain}
                            setActiveForumMain={setActiveForumIndustryMain}
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
                            getAllForumsLocal={getAllForumsByLocationLocal}
                            setGetAllForumsLocal={
                              setGetAllForumsByLocationLocal
                            }
                            activeForumMain={activeForumLocationMain}
                            setActiveForumMain={setActiveForumLocationMain}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommended;
