import React, { useEffect, useState } from 'react';
import CreatePost from './CreatePost';
import PostCard from '../Molecules/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { triggerGetAllPosts } from '../../Features/posts/posts_slice';
import PostsLoader from '../Atoms/skeleton-loaders/home-page/PostsLoader';

const Post = () => {
  const dispatch = useDispatch();
  const { getAllPosts, createPost } = useSelector((state) => state.posts);
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (createPost.status === 'successful') {
      const data = { queryParams: { pageNumber, pageSize } };
      dispatch(triggerGetAllPosts(data));
    }
  }, [createPost.status, pageNumber, pageSize]);

  useEffect(() => {
    const data = { queryParams: { pageNumber, pageSize } };
    dispatch(triggerGetAllPosts(data));
  }, [dispatch, pageNumber, pageSize]);
  const [getAllPostsLocal, setGetAllPostsLocal] = useState([]);

  useEffect(() => {
    if (getAllPosts?.status === 'successful' && getAllPosts.data.posts) {
      const temp = getAllPosts.data?.posts;
      setGetAllPostsLocal(temp);
      setLoading(false);
    }
  }, [getAllPosts?.data?.posts, getAllPosts?.status]);

  return (
    <div className='post-wrapper'>
      <div className='d-lg-block d-none'>
        <CreatePost />
      </div>
      <div className='post-card-wrapper'>
        {getAllPosts.status === 'base' || getAllPosts.status === 'loading' ? (
          <PostsLoader />
        ) : getAllPosts.status === 'successful' && !loading ? (
          <>
            {getAllPosts.data ? (
              <>
                {getAllPosts.data?.posts.length === 0 ? (
                  <>
                    <div className='empty-state'>
                      <p>No posts to show...</p>
                    </div>
                  </>
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
      </div>
    </div>
  );
};

export default Post;
