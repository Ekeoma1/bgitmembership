import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import postImg from '../../assets/images/author1.png';
import defaultImg from '../../assets/images/main2.png';
import Icon from '../Icon';
import { useSelector } from 'react-redux';
import moment from 'moment';
import PostCard from '../Molecules/PostCard';

const Posts = () => {
  const { getAllPostsByUserId } = useSelector((state) => state.posts);
  const { getUserProfileById } = useSelector((state) => state.users);
  const [getAllPostsByUserIdLocal, setGetAllPostsByUserIdLocal] = useState([]);
  useEffect(() => {
    if (getAllPostsByUserId?.status === 'successful') {
      setGetAllPostsByUserIdLocal([...getAllPostsByUserId.data?.posts]);
    }
  }, [getAllPostsByUserId?.status]);
  return (
    <div className='dashboard-card post-wrapper'>
      <div className='d-flex justify-content-between align-items-center'>
        <div className='dashboard-header'>Posts</div>
        {getAllPostsByUserId?.data?.posts?.length > 0 && (
          <div>
            <Link
              to={`/users/${getUserProfileById.data.userId}/posts`}
              className='dashboard-text'
            >
              See more
            </Link>
          </div>
        )}
      </div>

      <div className='post-cards-wrapper'>
        {getAllPostsByUserId?.status === 'loading' ? (
          <></>
        ) : getAllPostsByUserId?.status === 'successful' ? (
          <>
            {getAllPostsByUserId?.data?.posts?.length === 0 ? (
              <>
                <div className='empty'>No posts...</div>
              </>
            ) : (
              <div className='post-cards-con'>
                {getAllPostsByUserIdLocal?.slice(0, 2).map((post, index) => (
                  <div className='post-card-con'>
                    <PostCard
                      key={index}
                      post={post}
                      getAllPostsLocal={getAllPostsByUserIdLocal}
                      setGetAllPostsLocal={setGetAllPostsByUserIdLocal}
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
    </div>
  );
};

export default Posts;
