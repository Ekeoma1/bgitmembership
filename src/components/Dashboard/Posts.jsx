import React from 'react';
import { Link } from 'react-router-dom';
import postImg from '../../assets/images/author1.png';
import Icon from '../Icon';

const Posts = ({ data }) => {
  return (
    <div className='dashboard-card post-wrapper'>
      <div className='d-flex justify-content-between align-items-center'>
        <div className='dashboard-header'>Post</div>
        {data?.data?.posts?.length !== 0 && (
          <div>
            <Link to='#' className='dashboard-text'>
              See more
            </Link>
          </div>
        )}
      </div>

      <div className='row mt-3 gap-md-0 gap-3'>
        {data?.status === 'loading' ? (
          <></>
        ) : data?.status === 'successful' ? (
          <>
            {data?.data?.posts?.length === 0 ? (
              <>
                <div className='empty'>No posts...</div>
              </>
            ) : (
              <>
                {data?.data?.posts?.slice(0, 2).map((post) => (
                  <div className='col-md'>
                    <div className='post-card'>
                      <div className='d-flex flex-wrap gap-2'>
                        <div
                          style={{ backgroundImage: `url(${postImg})` }}
                          className='post-image'
                        ></div>
                        <div>
                          <div className='author-name'>
                            {post?.firstName + ' ' + post.secondName}
                          </div>
                          <div className='post-time'>15 minutes ago</div>
                        </div>
                      </div>
                      <div className='post-text mt-2'>{post.content}</div>

                      <div className=' d-flex gap-4 mt-3 pt-3 interaction-icon-wrapper'>
                        <button className='heart-icon'>
                          <Icon icon='heart' />
                        </button>

                        <button>
                          <Icon icon='comment' />
                        </button>

                        <button>
                          <Icon icon='bookmark' />
                        </button>

                        <button>
                          <Icon icon='share' />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
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
