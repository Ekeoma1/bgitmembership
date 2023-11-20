import React, { useEffect, useState } from 'react';
import { CgLock } from 'react-icons/cg';
import { TbClockHour9 } from 'react-icons/tb';
import adminImg from '../../assets/images/admin.svg';
import ForumCard, { ForumCard2 } from '../Molecules/ForumCard';
import forumImg1 from '../../../src/assets/images/forumcard1.svg';
import forumImg2 from '../../../src/assets/images/forumcard2.svg';
import { useDispatch, useSelector } from 'react-redux';
import SingleLineLoader from '../Atoms/skeleton-loaders/SingleLineLoader';
import DoubleLineLoader from '../Atoms/skeleton-loaders/DoubleLineLoader';
import DetailsLoader from '../Atoms/skeleton-loaders/dashboard-page/DetailsLoader';
import PostsLoader from '../Atoms/skeleton-loaders/home-page/PostsLoader';
import ForumDetailsLoader from '../Atoms/skeleton-loaders/ForumDetailsLoader';
import {
  triggerGetAllForums,
  triggerGetForumById,
} from '../../Features/forums/forums_slice';
import ForumCardsLoader from '../Atoms/skeleton-loaders/ForumCardsLoader';
import { Link, useParams } from 'react-router-dom';
import Icon from '../Icon';
import moment from 'moment';
import { PiUsersThreeFill } from 'react-icons/pi';

const ForumContent = ({ forum }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { joinForum, leaveForum, getForumById, getAllForums } = useSelector(
    (state) => state.forums
  );
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [relatedGroups, setRelatedGroups] = useState([]);
  useEffect(() => {
    if (getAllForums.status === 'successful') {
      setRelatedGroups(
        getAllForums.data?.filter((item) => item.forumId !== params.forumId)
      );
    }
  }, [getAllForums]);

  useEffect(() => {
    const data = { queryParams: { pageNumber, pageSize } };
    dispatch(triggerGetAllForums(data));
  }, [params]);

  return (
    <div className='forum-content-wrapper bg-color22'>
      <div className='container'>
        <div className='forum-content'>
          <div className='about-admin-wrapper'>
            {getForumById.status === 'base' ||
            getForumById.status === 'loading' ? (
              <>
                <div className='loader-con'>
                  <ForumDetailsLoader />
                </div>
              </>
            ) : getForumById.status === 'successful' ? (
              <>
                <div className='about-section'>
                  <div className='about'>
                    <h3>About</h3>
                    <p>{getForumById.data[0]?.details}</p>
                  </div>
                  <div className='info'>
                    <h3>Info</h3>
                    <ol>
                      {getForumById?.data[0]?.info?.map((info, index) => (
                        <li key={index}>{info}</li>
                      ))}
                    </ol>
                  </div>
                  <div className='section-bottom'>
                    <div className='content'>
                      {getForumById?.data[0]?.visibility !== 'Private' ? (
                        <div className='private'>
                          <CgLock className='icon' />
                          <div className=''>
                            <h5>Private</h5>
                            <p>Only members can see the posts</p>
                          </div>
                        </div>
                      ) : (
                        <div className='private'>
                          <PiUsersThreeFill className='icon' />
                          <div className=''>
                            <h5>Public</h5>
                            <p>Everyone can see the posts</p>
                          </div>
                        </div>
                      )}
                      {getForumById?.data[0]?.dateCreated && (
                        <div className='history'>
                          <TbClockHour9 className='icon' />
                          <div className=''>
                            <h5>History</h5>
                            <p>
                              Created on{' '}
                              {moment(forum?.dateCreated).format(
                                'dddd, MMMM Do YYYY'
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className='admin-section'>
                  <h3>Admin</h3>
                  <div className='content'>
                    <img
                      src={getForumById?.data[0]?.forumAdmin?.imageUrl}
                      alt='admin'
                    />
                    <div className=''>
                      <h5>{`${getForumById?.data[0]?.forumAdmin?.firstName} ${getForumById?.data[0]?.forumAdmin?.secondName}`}</h5>
                      <p>{getForumById?.data[0]?.forumAdmin?.profession}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className='related-groups-wrapper'>
            <h3 className='text-color22'>Related groups</h3>
            <div className='forum-cards'>
              {getAllForums.status === 'loading' ? (
                <div className='loader-con'>
                  <ForumCardsLoader />
                </div>
              ) : getAllForums.status === 'successful' ? (
                <>
                  {getAllForums.data?.length === 0 ? (
                    <>
                      <div className='empty-state'>Empty forums</div>
                    </>
                  ) : (
                    <>
                      {relatedGroups?.slice(0, 2).map((forum, index) => {
                        return <ForumCard2 key={index} forum={forum} />;
                      })}
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
            <div className='text-center my-4'>
              <Link
                to='/forums'
                className='sec-btn mx-auto c-gap-5 smallert-text added-width d-flex align-items-center justify-content-center'
              >
                <span>See More</span> <Icon icon='arrowRight' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumContent;
