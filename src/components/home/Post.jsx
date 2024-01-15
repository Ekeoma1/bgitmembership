import React, { useEffect, useState } from 'react';
import CreatePost from './CreatePost';
import PostCard from '../Molecules/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { triggerGetAllPosts } from '../../Features/posts/posts_slice';
import PostsLoader from '../Atoms/skeleton-loaders/home-page/PostsLoader';
import MainButton from '../Molecules/MainButton';
import { triggerGetForumPostsByForumId } from '../../Features/forums-post/forums_post_slice';
import { useParams } from 'react-router-dom';
import PostCardForumsPage from '../Molecules/PostCardForumsPage';
import EmptyState from '../Molecules/EmptyState';

const Post = ({ forum }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const { getAllPosts, createPost } = useSelector((state) => state.posts);
  const { getForumPostsByForumId, createForumPost } = useSelector(
    (state) => state.forumsPost
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loadMore, setLoadMore] = useState(false);

  const handleLoadMore = () => {
    setLoadMore(true);
    setPageNumber((prevState) => prevState + 1);
  };
  useEffect(() => {
    if (
      createPost.status === 'successful' &&
      createPost.data.title !== 'One or more validation errors occurred.'
    ) {
      const post = createPost?.data;
      setGetAllPostsLocal([post, ...getAllPostsLocal]);
    }
    if (createForumPost.status === 'successful') {
      const post = createForumPost?.data;
      setGetAllPostsLocal([post, ...getAllPostsLocal]);
    }
  }, [createPost.status, createForumPost.status]);

  useEffect(() => {
    const data = { queryParams: { pageNumber, pageSize } };
    // console.log('params', params);

    if (forum) {
      const values = {
        queryParams: { pageNumber, pageSize, forumId: params.forumId },
      };
      dispatch(triggerGetForumPostsByForumId(values));
    } else {
      dispatch(triggerGetAllPosts(data));
    }
  }, [pageNumber]);

  const [getAllPostsLocal, setGetAllPostsLocal] = useState([]);

  useEffect(() => {
    if (!forum) {
      if (getAllPosts?.status === 'successful' && getAllPosts.data?.posts) {
        const temp = getAllPosts?.data?.posts;
        if (loadMore) {
          const getAllPostsPrevious = [...getAllPostsLocal];
          const getAllPostsAllTemp = [...getAllPostsPrevious, ...temp];
          const getAllPostsAll = getAllPostsAllTemp.filter(
            (obj, index, array) => {
              return (
                array.findIndex((item) => item.postId === obj.postId) === index
              );
            }
          );
          setGetAllPostsLocal(getAllPostsAll);
        } else {
          setGetAllPostsLocal([...temp]);
        }
      }
    } else {
      // forum
      if (
        getForumPostsByForumId?.status === 'successful' &&
        getForumPostsByForumId.data?.forumPosts
      ) {
        const temp = getForumPostsByForumId?.data?.forumPosts;
        if (loadMore) {
          const getAllPostsPrevious = [...getAllPostsLocal];
          const getAllPostsAllTemp = [...getAllPostsPrevious, ...temp];
          const getAllPostsAll = getAllPostsAllTemp.filter(
            (obj, index, array) => {
              return (
                array.findIndex(
                  (item) => item.forumPostId === obj.forumPostId
                ) === index
              );
            }
          );
          setGetAllPostsLocal(getAllPostsAll);
        } else {
          setGetAllPostsLocal([...temp]);
        }
      }
    }
  }, [
    getAllPosts.data?.posts,
    getAllPosts?.status,
    getForumPostsByForumId.status,
  ]);
  // console.log('forum', forum);
  return (
    <div className='post-wrapper'>
      <div className='d-lg-block d-none'>
        <CreatePost forum={forum} />
      </div>
      <div className='post-card-wrapper'>
        {!forum ? (
          <>
            {(getAllPosts.status === 'base' ||
              getAllPosts.status === 'loading') &&
            pageNumber === 1 ? (
              <PostsLoader />
            ) : getAllPosts.status === 'successful' || pageNumber >= 1 ? (
              <>
                {getAllPosts.data ? (
                  <>
                    {getAllPostsLocal?.length === 0 ? (
                      <EmptyState
                        title={'No posts to show yet'}
                        info={'Make a post, contribute to the platform'}
                        height={'70rem'}
                      />
                    ) : (
                      <>
                        {getAllPostsLocal?.map((post, key) => {
                          return (
                            <PostCard
                              key={key}
                              post={post}
                              getAllPostsLocal={getAllPostsLocal}
                              setGetAllPostsLocal={setGetAllPostsLocal}
                            />
                          );
                        })}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <div className='internet-error-state'>
                      <p> Check your internet and try again...</p>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div className='server-error-state'>Something went wrong</div>
              </>
            )}
            {pageNumber < 10 && getAllPosts.data?.posts?.length > 10 && (
              <div className='btn-con'>
                <MainButton
                  text={'Load more'}
                  onClick={() => {
                    handleLoadMore();
                  }}
                  width={'25rem'}
                  size={'small'}
                  loading={getAllPosts.status === 'loading'}
                />
              </div>
            )}
          </>
        ) : (
          <>
            {(getForumPostsByForumId.status === 'base' ||
              getForumPostsByForumId.status === 'loading') &&
            pageNumber === 1 ? (
              <PostsLoader />
            ) : getForumPostsByForumId.status === 'successful' ||
              pageNumber >= 1 ? (
              <>
                {getForumPostsByForumId.data ? (
                  <>
                    {getAllPostsLocal.length === 0 ? (
                      <EmptyState
                        title={'No posts on this forum yet'}
                        info={'Create a post, contribute to the community!'}
                        padding={'0px'}
                        height={'60rem'}
                      />
                    ) : (
                      <>
                        {getAllPostsLocal?.map((post, key) => {
                          return (
                            <PostCard
                              key={key}
                              post={post}
                              getAllPostsLocal={getAllPostsLocal}
                              setGetAllPostsLocal={setGetAllPostsLocal}
                              forum
                            />
                          );
                        })}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <div className='internet-error-state'>
                      <p> Check your internet and try again...</p>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div className='server-error-state'>Something went wrong</div>
              </>
            )}
            {pageNumber < 10 && getAllPostsLocal.length > 5 && (
              <div className='btn-con'>
                <MainButton
                  text={'Load more'}
                  onClick={() => {
                    handleLoadMore();
                  }}
                  width={'25rem'}
                  size={'small'}
                  loading={getAllPosts.status === 'loading'}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
