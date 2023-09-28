import React, { useEffect, useState } from 'react';
import CreatePost from './CreatePost';
import PostCard from '../Molecules/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { triggerGetAllPosts } from '../../Features/posts/posts_slice';
import PostsLoader from '../Atoms/skeleton-loaders/home-page/PostsLoader';

const Post = () => {
  const dispatch = useDispatch();
  const { getAllPosts, createPost, getAllPostsRender } = useSelector(
    (state) => state.posts
  );
  const [pageNumber] = useState(1);
  const [pageSize] = useState(4);
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

  useEffect(() => {
    if (getAllPosts?.status === 'successful') {
      const idsOfUsersWhoHaveLikedThePostTemp =
        getAllPosts?.data?.posts?.likedUsers?.map((item) => item.userId);
      console.log(idsOfUsersWhoHaveLikedThePostTemp);
      // console.log('useeffect2');
    }
  }, [getAllPosts?.data?.posts?.likedUsers, getAllPosts?.status]);

  // console.log('getall posts render', getAllPosts.data.posts);
  // console.log('getall posts render2', getAllPostsRender);

  return (
    <div className='post-wrapper'>
      <div className='d-lg-block d-none'>
        <CreatePost />
      </div>
      <div className='post-card-wrapper'>
        {getAllPosts.status === 'base' || getAllPosts.status === 'loading' ? (
          <>
            <PostsLoader />
          </>
        ) : getAllPosts.status === 'successful' ? (
          <>
            {getAllPostsRender.data ? (
              <>
                {getAllPostsRender.data?.length === 0 ? (
                  <>
                    <div className='no-data'>No posts to show</div>
                  </>
                ) : (
                  <>
                    {getAllPostsRender.data?.posts?.map((post, key) => {
                      return (
                        <PostCard
                          key={key}
                          post={post}
                          pageNumber={pageNumber}
                          pageSize={pageSize}
                        />
                      );
                    })}
                  </>
                )}
              </>
            ) : (
              <>
                <div className='internet-error-state'>
                  Check your internet and try again...
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
