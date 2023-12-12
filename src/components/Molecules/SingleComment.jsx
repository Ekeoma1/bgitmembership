import React, { useEffect, useRef, useState } from 'react';
import Icon from '../Icon';
import '../../assets/scss/molecules.scss';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { UserProfilePhotoLoader2 } from '../Atoms/skeleton-loaders/dashboard-page/UserProfilePhotoLoader';
import MediaLoader from '../Atoms/skeleton-loaders/home-page/MediaLoader';
import {
  resetToggleLikePost,
  triggerLikeComment,
  triggerToggleLikePost,
  triggerUnlikeComment,
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
  comment2,
}) => {
  const dispatch = useDispatch();
  const [activeComment, setActiveComment] = useState({});
  // const [likedComment, setLikedComment] = useState(false);
  // const handleLikeComment = () => {
  //   setLikedComment(!likedComment);
  // };
  // Like unlike comment
  const [likeCurrentComment, setLikeCurrentComment] = useState(
    comment2?.isCommentLikedByCurrentUser
  );
  const [likeCount, setlikeCount] = useState(
    !childComment ? comment2?.commentLikeCount : comment2?.likeCount
  );
  const [likeCount2, setlikeCount2] = useState(false);
  const timeoutIdRef2 = useRef(null);
  const handleLikeUnlikeComment = (commentParam) => {
    setActiveComment(commentParam);
    // const data = _.cloneDeep(getAllPostsLocal);
    const startTimeout = () => {
      timeoutIdRef2.current = setTimeout(() => {
        const values = { commentId: commentParam.commentId };
        if (!likeCurrentComment) {
          console.log('like');
          dispatch(triggerLikeComment(values));
        } else {
          console.log('unlike');
          dispatch(triggerUnlikeComment(values));
        }
      }, 3000);
    };
    const clearTimeoutIfNeeded = () => {
      if (timeoutIdRef2.current) {
        clearTimeout(timeoutIdRef2.current);
      }
    };
    clearTimeoutIfNeeded();
    startTimeout();
    console.log('comment2id', comment2, commentParam);
    if (comment2.commentId === commentParam.commentId) {
      setLikeCurrentComment(!likeCurrentComment);
      setlikeCount2(!likeCount2);
    }

    // data.forEach((item) => {
    //   if (item.postId === postParam.postId) {
    //     setLikeCurrentPost(!likeCurrentPost);
    //     item.isLikedByCurrentUser = !item.isLikedByCurrentUser;
    //     item.likeCount = item.isLikedByCurrentUser
    //       ? item.likeCount + 1
    //       : item.likeCount - 1;
    //   }
    // });
    // setGetAllPostsLocal(data);
  };
  console.log('likeCurrentComment', likeCurrentComment);
  useEffect(() => {
    if (activeComment?.commentId === comment2?.commentId) {
      if (likeCount2) {
        setlikeCount(likeCount + 1);
      } else {
        setlikeCount(likeCount - 1);
      }
    }
  }, [likeCount2]);
  return (
    <div
      className={`comment ${loader && 'loader'} ${childComment && 'comment-2'}`}
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
        {!loader && (
          <div className='comment-actions'>
            <div className='like'>
              <button onClick={() => handleLikeUnlikeComment(comment2)}>
                Like
              </button>
              <div className='no-of-likes-wrapper'>
                <AiFillHeart className='icon' />
                <p className='no-of-likes'>{likeCount}</p>
              </div>
              {/* {likeCurrentComment && (
            )} */}
            </div>
            <div className='line-border'></div>
            <div className='reply'>
              <button onClick={setReplyComment} className=''>
                Reply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleComment;
