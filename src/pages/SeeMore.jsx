import React, { useEffect, useState } from 'react';
import Icon from '../components/Icon';
import '../assets/scss/seeMore.scss';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { triggerGetUserProfileById } from '../Features/users/users_slice';
import { triggerGetAllPostsByUserId } from '../Features/posts/posts_slice';
import { triggerGetAllForums } from '../Features/forums/forums_slice';
import user from '../assets/images/admin.svg';
import defaultUser from '../assets/images/default-user-photo.avif';
import PostCard from '../components/Molecules/PostCard';
import PostsLoader from '../components/Atoms/skeleton-loaders/home-page/PostsLoader';
import SingleLineLoader, {
  SingleLineLoader2,
} from '../components/Atoms/skeleton-loaders/SingleLineLoader';

const SeeMore = () => {
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getAllPostsByUserId } = useSelector((state) => state.posts);
  const { getUserProfileById } = useSelector((state) => state.users);
  const [active, setActive] = useState(param?.more);
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const data = { queryParams: { userId: param?.id } };
    dispatch(triggerGetUserProfileById(data));
  }, [param?.id]);

  useEffect(() => {
    if (getUserProfileById.status === 'successful') {
      const data = {
        queryParams: {
          userId: getUserProfileById.data.userId,
          pageNumber,
          pageSize,
        },
      };
      dispatch(triggerGetAllPostsByUserId(data));
    }
  }, [getUserProfileById]);

  const [getAllPostsByUserIdLocal, setGetAllPostsByUserIdLocal] = useState([]);
  useEffect(() => {
    if (getAllPostsByUserId?.status === 'successful') {
      setGetAllPostsByUserIdLocal([...getAllPostsByUserId.data?.posts]);
    }
  }, [getAllPostsByUserId?.status]);
  // console.log('params', param);
  return (
    <div className='see-more'>
      <div className='container'>
        <div>
          <button onClick={() => navigate(-1)}>
            <Icon icon='arrowLeft' />
          </button>
        </div>
        <div className='content-wrapper mt-5'>
          <div className='details'>
            {getAllPostsByUserId?.status === 'base' ||
            getAllPostsByUserId?.status === 'loading' ? (
              <div className='loading-state shadow-sm'>
                <div className='card-top'>
                  <SingleLineLoader2 />
                </div>
                <div className='info'>
                  <div className='name'>
                    <SingleLineLoader />
                  </div>
                  <div className='role'>
                    <SingleLineLoader />
                  </div>
                  <div className='connection'>
                    <SingleLineLoader />
                  </div>
                </div>
              </div>
            ) : getAllPostsByUserId?.status === 'successful' ? (
              <>
                <div className='details-card'>
                  <div className='card-top'>
                    <img
                      src={
                        getUserProfileById.data?.backgroundImageUrl ??
                        defaultUser
                      }
                      alt='cover'
                      className='cover-photo'
                    />
                    <img
                      src={getUserProfileById.data?.imageUrl ?? defaultUser}
                      alt='background'
                      className='profile-photo'
                    />
                  </div>
                  <div className='info'>
                    <h5 className='name'>{`${getUserProfileById?.data?.firstName} ${getUserProfileById?.data?.secondName}`}</h5>
                    <h5 className='role'>
                      {getUserProfileById?.data?.profession}
                    </h5>
                    <h5 className='connections'>
                      {getUserProfileById?.data?.connectionCount} Connections
                    </h5>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className='other'>
            {getAllPostsByUserId?.status === 'base' ||
            getAllPostsByUserId?.status === 'loading' ? (
              <div className='loading-state'>
                <div className='btn'>
                  <SingleLineLoader />
                </div>
                <div className='btn'>
                  <SingleLineLoader />
                </div>
                <div className='btn'>
                  <SingleLineLoader />
                </div>
              </div>
            ) : getAllPostsByUserId?.status === 'successful' ? (
              <>
                <div className='btns'>
                  <button
                    onClick={() => {
                      setActive('posts');
                      window.history.pushState(
                        null,
                        '',
                        `/users/${getUserProfileById.data?.userId}/posts`
                      );
                    }}
                    className={` ${active === 'posts' && 'active'}`}
                  >
                    Posts
                  </button>
                  <button
                    onClick={() => {
                      setActive('likes');
                      window.history.pushState(
                        null,
                        '',
                        `/users/${getUserProfileById.data?.userId}/likes`
                      );
                    }}
                    className={`${active === 'likes' && 'active'}`}
                  >
                    Likes
                  </button>
                  <button
                    onClick={() => {
                      setActive('bookmarks');
                      window.history.pushState(
                        null,
                        '',
                        `/users/${getUserProfileById.data?.userId}/bookmarks`
                      );
                    }}
                    className={`${active === 'bookmarks' && 'active'}`}
                  >
                    Bookmarks
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}

            {active === 'posts' && (
              <div className='post-cards-wrapper '>
                {getAllPostsByUserId?.status === 'base' ||
                getAllPostsByUserId?.status === 'loading' ? (
                  <>
                    <PostsLoader />
                  </>
                ) : getAllPostsByUserId?.status === 'successful' ? (
                  <>
                    {getAllPostsByUserId?.data?.posts?.length === 0 ? (
                      <>
                        <div className='empty'>No posts...</div>
                      </>
                    ) : (
                      <div className='post-cards-con'>
                        {getAllPostsByUserId?.data?.posts
                          ?.slice(0, 2)
                          .map((post, index) => (
                            <div className='post-card-con'>
                              <PostCard
                                key={index}
                                post={post}
                                getAllPostsLocal={getAllPostsByUserIdLocal}
                                setGetAllPostsLocal={
                                  setGetAllPostsByUserIdLocal
                                }
                              />
                            </div>
                          ))}
                      </div>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
            )}
            {active === 'likes' && (
              <div className='post-cards-wrapper'>
                {getAllPostsByUserId?.status === 'base' ||
                getAllPostsByUserId?.status === 'loading' ? (
                  <>
                    <PostsLoader />
                  </>
                ) : getAllPostsByUserId?.status === 'successful' ? (
                  <>
                    {getAllPostsByUserId?.data?.posts?.length === 0 ? (
                      <>
                        <div className='empty'>No posts...</div>
                      </>
                    ) : (
                      <div className='post-cards-con'>
                        {getAllPostsByUserId?.data?.posts
                          ?.slice(0, 2)
                          .map((post, index) => (
                            <div className='post-card-con'>
                              <PostCard
                                key={index}
                                post={post}
                                getAllPostsLocal={getAllPostsByUserIdLocal}
                                setGetAllPostsLocal={
                                  setGetAllPostsByUserIdLocal
                                }
                              />
                            </div>
                          ))}
                      </div>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
            )}
            {active === 'bookmarks' && (
              <div className='post-cards-wrapper'>
                {getAllPostsByUserId?.status === 'base' ||
                getAllPostsByUserId?.status === 'loading' ? (
                  <PostsLoader />
                ) : getAllPostsByUserId?.status === 'successful' ? (
                  <>
                    {getAllPostsByUserId?.data?.posts?.length === 0 ? (
                      <>
                        <div className='empty'>No posts...</div>
                      </>
                    ) : (
                      <div className='post-cards-con'>
                        {getAllPostsByUserId?.data?.posts
                          ?.slice(0, 2)
                          .map((post, index) => (
                            <div className='post-card-con'>
                              <PostCard
                                key={index}
                                post={post}
                                getAllPostsLocal={getAllPostsByUserIdLocal}
                                setGetAllPostsLocal={
                                  setGetAllPostsByUserIdLocal
                                }
                              />
                            </div>
                          ))}
                      </div>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeMore;
