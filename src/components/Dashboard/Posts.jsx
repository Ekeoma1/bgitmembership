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
        {getAllPostsByUserId?.data?.posts?.length > 2 && (
          <div>
            <Link to='#' className='dashboard-text'>
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
                {getAllPostsByUserId?.data?.posts
                  ?.slice(0, 2)
                  .map((post, index) => (
                    // <div className='col-md'>
                    //   <div className='post-card'>
                    //     <div className='d-flex flex-wrap gap-2'>
                    //       <div
                    //         style={{
                    //           backgroundImage: `url(${
                    //             post.userProfilePicture ?? defaultImg
                    //           })`,
                    //         }}
                    //         className='post-image'
                    //       ></div>
                    //       <div>
                    //         <div className='author-name'>
                    //           {post?.firstName + ' ' + post.secondName}
                    //         </div>
                    //         <div className='post-time'>
                    //           {moment(
                    //             new Date(post.createdDate).getTime() + 3600000
                    //           ).fromNow()}
                    //         </div>
                    //       </div>
                    //     </div>
                    //     <div className='post-text mt-2'>{post.content}</div>

                    //     <div className=' d-flex gap-4 mt-3 pt-3 interaction-icon-wrapper'>
                    //       <button className='heart-icon'>
                    //         <Icon icon='heart' />
                    //       </button>

                    //       <button>
                    //         <Icon icon='comment' />
                    //       </button>

                    //       <button>
                    //         <Icon icon='bookmark' />
                    //       </button>

                    //       <button>
                    //         <Icon icon='share' />
                    //       </button>
                    //     </div>
                    //   </div>
                    // </div>
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
