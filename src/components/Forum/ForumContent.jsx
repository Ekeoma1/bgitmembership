import React, { useEffect, useState } from 'react';
import { CgLock } from 'react-icons/cg';
import { TbClockHour9 } from 'react-icons/tb';
import _ from 'lodash';
import adminImg from '../../assets/images/admin.svg';
import forumImg1 from '../../../src/assets/images/forumcard1.svg';
import forumImg2 from '../../../src/assets/images/forumcard2.svg';
import { useDispatch, useSelector } from 'react-redux';
import ForumDetailsLoader from '../Atoms/skeleton-loaders/ForumDetailsLoader';
import {
  resetCanceljoinForumRequest,
  resetJoinForum,
  triggerGetAllForums,
  triggerGetForumById,
} from '../../Features/forums/forums_slice';
import ForumCardsLoader from '../Atoms/skeleton-loaders/ForumCardsLoader';
import { Link, useParams } from 'react-router-dom';
import Icon from '../Icon';
import moment from 'moment';
import { PiUsersThreeFill } from 'react-icons/pi';
import { ForumCard2 } from '../Molecules/ForumCard';
import { renderToast } from '../Molecules/CustomToastify';

const ForumContent = ({ forum }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { joinForum, cancelJoinForumRequest, getForumById, getAllForums } =
    useSelector((state) => state.forums);
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [relatedGroups, setRelatedGroups] = useState([]);
  const [activeForum, setActiveForum] = useState({});
  useEffect(() => {
    const data = { queryParams: { pageNumber, pageSize } };
    dispatch(triggerGetAllForums(data));
  }, [params]);

  useEffect(() => {
    if (getAllForums.status === 'successful') {
      setRelatedGroups(
        getAllForums.data?.forums?.filter((item) => item.forumId !== params.forumId)
      );
    }
  }, [getAllForums]);
  // console.log(relatedGroups);
  // console.log(activeForum);

  useEffect(() => {
    if (getAllForums.status === 'successful' && Array.isArray(relatedGroups)) {
      const data = _.cloneDeep(relatedGroups);
      const setBactToDefault = () => {
        data.forEach((item) => {
          if (item.forumId === activeForum.forumId) {
            delete item.requestStatus;
          }
        });
        setRelatedGroups(data);
        setActiveForum({});
      };

      // join forum
      if (joinForum.status === 'loading') {
        data.forEach((item) => {
          if (item.forumId === activeForum.forumId) {
            item.requestStatus = 'loading';
          }
        });
        setRelatedGroups(data);
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
              console.log('true###########################');
              item.forumMembershipStatus = 'PendingRequest';
            }
          });
          setRelatedGroups(data);
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
        setRelatedGroups(data);
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
          setRelatedGroups(data);
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
    }
  }, [joinForum.status, cancelJoinForumRequest.status]);

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
                    <p>{getForumById?.data?.[0]?.details}</p>
                  </div>
                  <div className='info'>
                    <h3>Info</h3>
                    <ol>
                      {getForumById?.data?.forum[0]?.info?.map((info, index) => (
                        <li key={index}>{info}</li>
                      ))}
                    </ol>
                  </div>
                  <div className='section-bottom'>
                    <div className='content'>
                      {getForumById?.data?.forum[0]?.visibility !== 'Private' ? (
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
                      {getForumById?.data?.forum[0]?.dateCreated && (
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
                      src={getForumById?.data?.forum[0]?.forumAdmin?.imageUrl}
                      alt='admin'
                    />
                    <div className=''>
                      <h5>{`${getForumById.data?.forum[0]?.forumAdmin?.firstName} ${getForumById.data?.forum[0]?.forumAdmin?.secondName}`}</h5>
                      <p>{getForumById.data?.forum[0]?.forumAdmin?.profession}</p>
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
                        return (
                          <ForumCard2
                            key={index}
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
