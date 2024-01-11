import React, { useEffect, useState } from 'react';
import '../../../src/assets/scss/communityForums.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import SearchBox from '../Molecules/SearchBox';
import CommunityCard from './CommunityCard';
import community1 from '../../../src/assets/images/community1.svg';
import community2 from '../../../src/assets/images/community2.svg';
import community3 from '../../../src/assets/images/community3.svg';
import EmptyState from '../Molecules/EmptyState';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CreateCommunityModal from './CreateCommunityModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetCanceljoinForumRequest,
  resetCreateForum,
  resetJoinForum,
  resetLeaveForum,
  triggerGetMyForums,
} from '../../Features/forums/forums_slice';
import { ForumCardsLoader2 } from '../Atoms/skeleton-loaders/ForumCardsLoader';
import { renderToast } from '../Molecules/CustomToastify';
import SingleLineLoader from '../Atoms/skeleton-loaders/SingleLineLoader';
import useWindowSize from '../../hooks/useWindowSize';
import MainButton from '../Molecules/MainButton';

const Communities = () => {
  const {
    getMyForums,
    leaveForum,
    joinForum,
    cancelJoinForumRequest,
    createForum,
  } = useSelector((state) => state.forums);
  const { isMobile, windowSize } = useWindowSize();
  const [searchValue, setSearchValue] = useState('');
  const [activeForum, setActiveForum] = useState({});
  const [numOfCommunitiesToDisplay, setNumOfCommunitiesToDisplay] = useState(5);
  const [userHasForums] = useState(false);
  const dispatch = useDispatch();
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  const onChange = (e) => {
    setSearchValue(e.target.value);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  const [getMyForumsLocal, setGetMyForumsLocal] = useState([]);
  const [myForumsLength, setMyForumsLength] = useState('');
  useEffect(() => {
    const data = { queryParams: { pageNumber, pageSize } };
    dispatch(triggerGetMyForums(data));
  }, []);
  useEffect(() => {
    if (createForum.status === 'successful') {
      const data = { queryParams: { pageNumber, pageSize } };
      dispatch(triggerGetMyForums(data));
      dispatch(resetCreateForum());
    }
  }, [createForum]);
  useEffect(() => {
    if (getMyForums.status === 'successful') {
      setGetMyForumsLocal([...getMyForums.data.forums]);
      setMyForumsLength(getMyForums.data.forums.length);
    }
  }, [getMyForums.status]);

  useEffect(() => {
    // leave forum
    if (leaveForum.status === 'loading') {
      const data = getMyForumsLocal.map((item) => {
        const obj = { ...item };
        if (item.forumId === activeForum.forumId) {
          obj.forumMembershipStatus = 'loading';
        }
        return obj;
      });
      setGetMyForumsLocal(data);
    } else if (leaveForum.status === 'successful' && leaveForum.data) {
      const data = getMyForumsLocal.map((item) => {
        const obj = { ...item };
        if (item.forumId === activeForum.forumId) {
          obj.forumMembershipStatus = 'NotAMember';
        }
        return obj;
      });
      setGetMyForumsLocal(data);
      setMyForumsLength((prevState) => prevState - 1);
      renderToast({
        status: 'success',
        message: 'Forum left successfully',
      });
      dispatch(resetLeaveForum());
      setActiveForum({});
    } else if (leaveForum.status === 'error') {
      renderToast({
        status: 'error',
        message: 'Something went wrong',
      });
      dispatch(resetLeaveForum());
      setActiveForum({});
    }
    // join forum
    if (joinForum.status === 'loading') {
      const data = getMyForumsLocal.map((item) => {
        const obj = { ...item };
        if (item.forumId === activeForum.forumId) {
          obj.forumMembershipStatus = 'loading';
        }
        return obj;
      });
      setGetMyForumsLocal(data);
    } else if (joinForum.status === 'successful' && joinForum.data) {
      const data = getMyForumsLocal.map((item) => {
        const obj = { ...item };
        if (item.forumId === activeForum.forumId) {
          obj.forumMembershipStatus = 'Pending';
        }
        return obj;
      });
      setGetMyForumsLocal(data);
      renderToast({
        status: 'success',
        message: 'Join forum request sent successfully',
      });
      dispatch(resetJoinForum());
      setActiveForum({});
    } else if (joinForum.status === 'error') {
      renderToast({
        status: 'error',
        message: 'Something went wrong',
      });
      dispatch(resetJoinForum());
      setActiveForum({});
    }
    // cancel join forum request
    if (cancelJoinForumRequest.status === 'loading') {
      const data = getMyForumsLocal.map((item) => {
        const obj = { ...item };
        if (item.forumId === activeForum.forumId) {
          obj.forumMembershipStatus = 'loading';
        }
        return obj;
      });
      setGetMyForumsLocal(data);
    } else if (
      cancelJoinForumRequest.status === 'successful' &&
      cancelJoinForumRequest.data
    ) {
      const data = getMyForumsLocal.map((item) => {
        const obj = { ...item };
        if (item.forumId === activeForum.forumId) {
          obj.forumMembershipStatus = 'NotAMember';
        }
        return obj;
      });
      setGetMyForumsLocal(data);
      renderToast({
        status: 'success',
        message: 'Cancelled join forum request',
      });
      dispatch(resetCanceljoinForumRequest());
      setActiveForum({});
    } else if (cancelJoinForumRequest.status === 'error') {
      renderToast({
        status: 'error',
        message: 'Something went wrong',
      });
      dispatch(resetCanceljoinForumRequest());
      setActiveForum({});
    }
  }, [leaveForum, joinForum, cancelJoinForumRequest]);
  console.log('windowSize', windowSize);

  return (
    <div className='communities-wrapper'>
      <div className='container'>
        <div className='content-wrapper'>
          {/* create community modal */}
          <CreateCommunityModal />
          <div className='forums-true'>
            {/* <div className='search-box'>
                        <div className='search-box-wrapper'>
                          <SearchBox
                            onChange={onChange}
                            value={searchValue}
                            placeholder='Search'
                          />
                        </div>
                      </div> */}
            <div className='section-title'>
              <h3 className='text-color22'>Communities </h3>
              {getMyForums.status === 'base' ||
              getMyForums.status === 'loading' ? (
                <div className='loading-state'>
                  <SingleLineLoader />
                </div>
              ) : getMyForums.status === 'successful' ? (
                <p className='text-color222'>({myForumsLength})</p>
              ) : (
                <></>
              )}
            </div>
            <div className='cards-wrapper'>
              {getMyForums.status === 'base' ||
              getMyForums.status === 'loading' ? (
                <div className='loader'>
                  <ForumCardsLoader2 />
                </div>
              ) : getMyForums.status === 'successful' ? (
                <>
                  {getMyForums.data ? (
                    <>
                      {getMyForumsLocal.length === 0 ? (
                        <EmptyState
                          title={'No forums yet?!'}
                          info={'Search or browse suggested forums below.'}
                        />
                      ) : (
                        <>
                          {windowSize.width < 800 ? (
                            <div className='mobile-view'>
                              {getMyForumsLocal
                                ?.slice(0, numOfCommunitiesToDisplay)
                                .map((community, index) => (
                                  <CommunityCard
                                    community={community}
                                    key={index}
                                    setGetMyForumsLocal={setGetMyForumsLocal}
                                    setActiveForum={setActiveForum}
                                  />
                                ))}
                              <div className='btn-wrapper'>
                                <MainButton
                                  text={'Show more communities'}
                                  onClick={() =>
                                    setNumOfCommunitiesToDisplay(
                                      (prevState) => prevState + 2
                                    )
                                  }
                                  disabled={
                                    numOfCommunitiesToDisplay ===
                                    getMyForumsLocal.length
                                  }
                                  padding={'0'}
                                  width={'30rem'}
                                />
                              </div>
                            </div>
                          ) : (
                            <>
                              <Carousel responsive={responsive}>
                                {getMyForumsLocal.map((community, index) => (
                                  <CommunityCard
                                    community={community}
                                    key={index}
                                    setGetMyForumsLocal={setGetMyForumsLocal}
                                    setActiveForum={setActiveForum}
                                  />
                                ))}
                              </Carousel>
                            </>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : getMyForums.status === 'error' ? (
                <></>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communities;
