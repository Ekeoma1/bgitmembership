import React from 'react'
import Icon from '../Icon';
import '../../assets/scss/molecules.scss';
const PostCard = ({list}) => {
  return (
    <div  className='post-card shadow-sm mx-auto'>
      <div className='post-card-header'>
        <div className='post-owner-details'>
          <div
            style={{ backgroundImage: `url(${list.authorImage})` }}
            className='img-circle'
          ></div>
          <div>
            <div className='d-flex align-items-center'>
              <span className='name'>{list.author}</span>
              <span className='small-circle'></span>
              <span className='follow-btn'>
                {list.following ? 'following' : 'follow'}
              </span>
            </div>
            <div className='job-role'>{list.role}</div>
            <div className='post-time'>{list.time}</div>
          </div>
        </div>

        <div>{list.event && <div className='rsvp-btn'>RSVP</div>}</div>
      </div>

      <div className='post-content-wrapper'>
        <div className='post-content'>{list.content}</div>
        {list.image !== null && (
          <div
            style={{ backgroundImage: `url(${list.image})` }}
            className='post-image'
          ></div>
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
}

export default PostCard