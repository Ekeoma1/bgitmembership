import React from 'react';
import Icon from '../Icon';
import '../../assets/scss/molecules.scss';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import ReactTimeAgo from 'react-time-ago';
const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const timeago = moment(post?.createdDate).fromNow();
  const date = new Date(post?.createdDate);
  // console.log('date', date);
  return (
    <div className='post-card shadow-sm mx-auto'>
      <div className='post-card-header'>
        <div className='post-owner-details'>
          <div
            className='img-circle'
            onClick={() => navigate(`/${post?.author}`)}
          >
            <img src={post?.userProfilePicture} alt='post-img' />
          </div>
          <div>
            <div className='d-flex align-items-center'>
              <span
                className='name'
                onClick={() => navigate(`/${post?.author}`)}
              >
                {post?.userName}
              </span>
              <span className='small-circle'></span>
              <span className='follow-btn'>
                {post?.following ? 'following' : 'follow'}
              </span>
            </div>
            <div className='job-role'>{post?.userProfession}</div>
            <div className='post-time'>{timeago}</div>
          </div>
        </div>

        <div>{post?.event && <div className='rsvp-btn'>RSVP</div>}</div>
      </div>

      <div className='post-content-wrapper'>
        <div className='post-content'>{post?.content}</div>
        {(post.postImageUrl || post.postVideoUrl) && (
          <>
            {post.postImageUrl ? (
              <div className='post-image'>
                <img src={post?.postImageUrl} alt='post-img' />
              </div>
            ) : (
              <div className='post-video'>
                <video controls>
                  <source src={post?.postVideoUrl} type='video/mp4' />
                </video>
              </div>
            )}
          </>
        )}
      </div>

      <div className='post-card-footer'>
        <div className='post-card-footer-content'>
          <div className='d-flex align-items-center c-gap-10'>
            <button className='heart-icon'>
              <Icon icon='heart' />
            </button>
            <span>52</span>
          </div>

          <div className='d-flex align-items-center c-gap-10'>
            <button>
              <Icon icon='comment' />
            </button>
            <span>5</span>
          </div>

          <div className='d-flex align-items-center c-gap-10'>
            <button>
              <Icon icon='bookmark' />
            </button>
            <span>5</span>
          </div>

          <div className='d-flex align-items-center c-gap-10'>
            <button>
              <Icon icon='share' />
            </button>
            <span>5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
