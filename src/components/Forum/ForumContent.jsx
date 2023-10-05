import React, { useEffect, useState } from 'react';
import { CgLock } from 'react-icons/cg';
import { TbClockHour9 } from 'react-icons/tb';
import adminImg from '../../assets/images/admin.svg';
import ForumCard from '../Molecules/ForumCard';
import forumImg1 from '../../../src/assets/images/forumcard1.svg';
import forumImg2 from '../../../src/assets/images/forumcard2.svg';
import { useDispatch, useSelector } from 'react-redux';
import SingleLineLoader from '../Atoms/skeleton-loaders/SingleLineLoader';
import DoubleLineLoader from '../Atoms/skeleton-loaders/DoubleLineLoader';
import DetailsLoader from '../Atoms/skeleton-loaders/dashboard-page/DetailsLoader';
import PostsLoader from '../Atoms/skeleton-loaders/home-page/PostsLoader';
import ForumDetailsLoader from '../Atoms/skeleton-loaders/ForumDetailsLoader';
import { triggerGetAllForums } from '../../Features/forums/forums_slice';
import ForumCardsLoader from '../Atoms/skeleton-loaders/ForumCardsLoader';
import { Link } from 'react-router-dom';
import Icon from '../Icon';

const ForumContent = ({ forum }) => {
  const communities = [
    {
      community_img: forumImg1,
      community_name: 'UX/UI Design',
      info: 'Dorem ipsum dolor sit amet consectetur. Urus fringilla mi sier. Lorem ipsu consectetur. Urus fringilla mi sier. Lorem ipsu Urus fringilla mi sier. Lorem ipsu consectetur. Urus fringilla mi sier. Lorem ipsu Urus fringilla mi sier. Lorem ipsu consectetur. Urus fringilla mi sier. Lorem ipsu',
    },
    {
      community_img: forumImg2,
      community_name: 'Engineer Girls',
      info: 'Lorem ipsum dolor sit amet consectetur. Urus fringilla mi sier. Lorem ipsu consectetur. Urus fringilla mi sier. Lorem ipsu Urus fringilla mi sier. Lorem ipsu consectetur. Urus fringilla mi sier. Lorem ipsu Urus fringilla mi sier. Lorem ipsu consectetur. Urus fringilla mi sier. Lorem ipsu',
    },
  ];
  const { getAllForums } = useSelector((state) => state.forums);
  const [relatedGroups, setRelatedGroups] = useState([]);
  useEffect(() => {
    if (getAllForums.status === 'successful') {
      setRelatedGroups(
        getAllForums.data.filter((item) => item.forumId !== forum.forumId)
      );
    }
  }, [getAllForums]);

  return (
    <div className='forum-content-wrapper bg-color'>
      <div className='container'>
        <div className='forum-content'>
          <div className='about-admin-wrapper'>
            {getAllForums.status === 'base' ||
            getAllForums.status === 'loading' ? (
              <>
                <div className='loader-con'>
                  <ForumDetailsLoader />
                </div>
              </>
            ) : getAllForums.status === 'successful' ? (
              <>
                <div className='about-section'>
                  <div className='about'>
                    <h3>About</h3>
                    <p>{forum?.details}</p>
                  </div>
                  <div className='info'>
                    <h3>Info</h3>
                    <ol>
                      {forum?.info?.map((info, index) => (
                        <li key={index}>{info}</li>
                      ))}
                    </ol>
                  </div>
                  <div className='section-bottom'>
                    <div className='content'>
                      <div className='private'>
                        {/* <PiLockSimpleBold /> */}
                        <CgLock className='icon' />
                        <div className=''>
                          <h5>Private</h5>
                          <p>Only members can see the posts</p>
                        </div>
                      </div>
                      <div className='history'>
                        <TbClockHour9 className='icon' />
                        <div className=''>
                          <h5>Private</h5>
                          <p>Only members can see the posts</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='admin-section'>
                  <h3>Admin</h3>
                  <div className='content'>
                    <img src={adminImg} alt='admin' />
                    <div className=''>
                      <h5>Jenny Smith</h5>
                      <p>UX Design Enthusiast</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className='related-groups-wrapper'>
            <h3 className='text-color'>Related groups</h3>
            <div className='forum-cards'>
              {getAllForums.status === 'loading' ? (
                <div className='loader-con'>
                  <ForumCardsLoader />
                </div>
              ) : getAllForums.status === 'successful' ? (
                <>
                  {getAllForums.data.length === 0 ? (
                    <>
                      <div className='empty-state'>Empty forums</div>
                    </>
                  ) : (
                    <>
                      {relatedGroups.slice(0, 2).map((forum, index) => {
                        return <ForumCard key={index} forum={forum} />;
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
                to='/community-forums'
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
