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
  triggerLikeReply,
  triggerUnlikeReply,
} from '../../Features/posts/posts_slice';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegBookmark, FaBookmark, FaRegSmile } from 'react-icons/fa';
import { TbPhoto } from 'react-icons/tb';
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import {
  triggerLikeForumPostComment,
  triggerLikeReplyForumsPost,
  triggerUnlikeForumPostComment,
  triggerUnlikeReplyForumsPost,
} from '../../Features/forums-post/forums_post_slice';

const SingleComment = ({
  childComment,
  setReplyComment,
  loader,
  comment2,
  forum,
  getAllPostsLocal,
  setGetAllPostsLocal,
  post,
  loaderContent,
}) => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { getMyProfile } = useSelector((state) => state.users);

  const timeoutIdRef = useRef(null);
  const timeoutIdRef2 = useRef(null);
  const handleLikeUnlikeComment = () => {
    if (!childComment) {
      const startTimeout = () => {
        timeoutIdRef.current = setTimeout(() => {
          const values = { queryParams: { commentId: comment2.commentId } };
          if (!comment2.isCommentLikedByCurrentUser) {
            console.log('like main');
            !forum && dispatch(triggerLikeComment(values));
            forum && dispatch(triggerLikeForumPostComment(values));
          } else {
            !forum && dispatch(triggerUnlikeComment(values));
            forum && dispatch(triggerUnlikeForumPostComment(values));
          }
        }, 3000);
      };
      const clearTimeoutIfNeeded = () => {
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
        }
      };
      clearTimeoutIfNeeded();
      startTimeout();
      const getAllPostsLocalTemp = getAllPostsLocal.map((postItem) => {
        const postObj = { ...postItem };
        if (postItem.postId === post.postId) {
          const commentedUsers = postItem.commentedUsers?.map(
            (commentedUser) => {
              let commentedUserObj = { ...commentedUser };
              if (commentedUser.commentId === comment2.commentId) {
                commentedUserObj = {
                  ...commentedUser,
                  isCommentLikedByCurrentUser:
                    !commentedUser.isCommentLikedByCurrentUser,
                  commentLikeCount: commentedUser.isCommentLikedByCurrentUser
                    ? commentedUser.commentLikeCount - 1
                    : commentedUser.commentLikeCount + 1,
                };
              }
              return commentedUserObj;
            }
          );
          postObj.commentedUsers = [...commentedUsers];
        }
        return postObj;
      });
      // console.log('getAllPostsLocalTemp', getAllPostsLocalTemp);
      setGetAllPostsLocal(getAllPostsLocalTemp);
    } else {
      console.log('childcomment');
      const startTimeout = () => {
        timeoutIdRef2.current = setTimeout(() => {
          const values = {
            queryParams: { replyId: comment2.replyId },
          };
          if (!comment2.isReplyLikedByCurrentUser) {
            !forum && dispatch(triggerLikeReply(values));
            forum && dispatch(triggerLikeReplyForumsPost(values));
          } else {
            !forum && dispatch(triggerUnlikeReply(values));
            forum && dispatch(triggerUnlikeReplyForumsPost(values));
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
      const getAllPostsLocalTemp = getAllPostsLocal.map((postItem) => {
        const postObj = { ...postItem };
        if (postItem.postId === post.postId) {
          console.log('activepostthatisbeingreplied');

          const commentedUsers = postItem.commentedUsers?.map(
            (commentedUser) => {
              let commentedUserObj = { ...commentedUser };

              if (commentedUser.commentId === comment2.commentId) {
                const replies = commentedUser.replies.map((reply) => {
                  let replyObj = { ...reply };
                  if (reply.replyId === comment2.replyId) {
                    replyObj = {
                      ...reply,
                      isReplyLikedByCurrentUser:
                        !reply.isReplyLikedByCurrentUser,
                      likeCount: reply.isReplyLikedByCurrentUser
                        ? reply.likeCount - 1
                        : reply.likeCount + 1,
                    };
                  }
                  return replyObj;
                });
                commentedUserObj.replies = replies;
              }
              return commentedUserObj;
            }
          );
          postObj.commentedUsers = [...commentedUsers];
        }
        return postObj;
      });
      console.log('getAllPostsLocalTemp', getAllPostsLocalTemp);
      setGetAllPostsLocal(getAllPostsLocalTemp);
    }
  };

  return (
    <div
      className={`comment ${loader && 'loader'} ${childComment && 'comment-2'}`}
    >
      <div
        onClick={() => !loader && navigate(`/users/${comment2?.userId}`)}
        className={`img-con ${childComment && 'img-con-2'}`}
      >
        <img
          className={`commenter-img ${!loader && 'commenter-img-3'} ${childComment && 'commenter-img-2'}`}
          src={
            loader ? getMyProfile.data?.imageUrl : comment2.userProfilePicture
          }
          alt='commenter-name'
        />
      </div>
      <div className='details-box'>
        <div className='details'>
          <h5
            className={`name ${!loader && 'name-2'}`}
            onClick={() => !loader && navigate(`/users/${comment2?.userId}`)}
          >
            {loader
              ? `${getMyProfile.data?.firstName} ${getMyProfile.data?.secondName}`
              : !childComment
              ? comment2.userName
              : `${comment2.firstName} ${comment2.secondName}`}
          </h5>
          <p className='role'>
            {loader
              ? getMyProfile.data?.profession
              : !childComment
              ? comment2.profession
              : comment2.profession || comment2.userProfession}
          </p>
          <p className='comment-text'>
            {loader ? loaderContent : comment2.content}
          </p>
        </div>
        {!loader && (
          <div className='comment-actions'>
            <div className='like'>
              <button onClick={handleLikeUnlikeComment}>Like</button>
              {!childComment && (
                <>
                  {comment2.commentLikeCount > 0 && (
                    <div className='no-of-likes-wrapper'>
                      {comment2.isCommentLikedByCurrentUser ? (
                        <FaHeart className='icon active' />
                      ) : (
                        <FaRegHeart className='icon' />
                      )}
                      <p className='no-of-likes'>{comment2.commentLikeCount}</p>
                    </div>
                  )}
                </>
              )}
              {childComment && (
                <>
                  {comment2.likeCount > 0 && (
                    <div className='no-of-likes-wrapper'>
                      {comment2.isReplyLikedByCurrentUser ? (
                        <FaHeart className='icon active' />
                      ) : (
                        <FaRegHeart className='icon ' />
                      )}

                      <p className='no-of-likes'>{comment2.likeCount}</p>
                    </div>
                  )}
                </>
              )}
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
