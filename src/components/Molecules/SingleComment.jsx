import React, { useEffect, useState } from 'react';
import Icon from '../Icon';
import '../../assets/scss/molecules.scss';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { UserProfilePhotoLoader2 } from '../Atoms/skeleton-loaders/dashboard-page/UserProfilePhotoLoader';
import MediaLoader from '../Atoms/skeleton-loaders/home-page/MediaLoader';
import {
  resetToggleLikePost,
  triggerToggleLikePost,
} from '../../Features/posts/posts_slice';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegBookmark, FaBookmark, FaRegSmile } from 'react-icons/fa';
import { TbPhoto } from 'react-icons/tb';
import { AiFillHeart } from 'react-icons/ai';
import AccountActionModal from '../Modals/AccountActionModal';
import OutsideClickHandler from 'react-outside-click-handler';
import ShareModal from '../Modals/ShareModal';
import user from '../../assets/images/author1.png';
const SingleComment = ({ childComment }) => {
  const handleCommentEmoji = () => {
    console.log('emoji');
  };
  const handleCommentFile = () => {
    console.log('file');
  };
  return (
    <div className={`comment ${childComment && 'comment-2'}`}>
      <div className={`img-con ${childComment && 'img-con-2'}`}>
        <img
          className={`commenter-img ${childComment && 'commenter-img-2'}`}
          src={user}
          alt='commenter-name'
        />
      </div>
      <div className='details-box'>
        <div className='details'>
          <h5 className='name'>Chidiebere Ezeokwelume</h5>
          <p className='role'>UX Design Enthusiast</p>
          <p className='comment-text'> So excited, can’t wait!</p>
        </div>
        <div className='comment-actions'>
          <div className='like'>
            <button>Like</button>
            {!true && (
              <div className='no-of-likes-wrapper'>
                <AiFillHeart className='icon' />
                <p className='no-of-likes'>12</p>
              </div>
            )}
          </div>
          <div className='line-border'></div>
          <div className='reply'>
            <button className=''>Reply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
