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

const SingleComment = ({
  img,
  name,
  role,
  comment,
  childComment,
  setReplyComment,
  loader,
}) => {
  const [likedComment, setLikedComment] = useState(false);
  const handleLikeComment = () => {
    setLikedComment(!likedComment);
  };
  return (
    <div
      className={`comment ${loader && 'loader'} ${
        childComment && 'comment-2'
      }`}
    >
      <div className={`img-con ${childComment && 'img-con-2'}`}>
        <img
          className={`commenter-img ${childComment && 'commenter-img-2'}`}
          src={img}
          alt='commenter-name'
        />
      </div>
      <div className='details-box'>
        <div className='details'>
          <h5 className='name'>{name}</h5>
          <p className='role'>{role}</p>
          <p className='comment-text'>{comment}</p>
        </div>
        <div className='comment-actions'>
          <div className='like'>
            <button onClick={handleLikeComment}>Like</button>
            {likedComment && (
              <div className='no-of-likes-wrapper'>
                <AiFillHeart className='icon' />
                <p className='no-of-likes'>12</p>
              </div>
            )}
          </div>
          <div className='line-border'></div>
          <div className='reply'>
            <button onClick={setReplyComment} className=''>
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
