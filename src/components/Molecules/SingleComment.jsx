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
  img,
  name,
  role,
  comment,
  childComment,
  setReplyComment,
  loader,
  comment2,
  forum,
  idType,
  getAllPostsLocal,
  setGetAllPostsLocal,
  post,
  activePostThatIsBeingReplied,
}) => {
  const dispatch = useDispatch();
  const [commentLocal, setCommentLocal] = useState({ ...comment2 });
  const [childCommentLocal, setChildCommentLocal] = useState({ ...comment2 });
  const [activePost, setActivePost] = useState({});
  // const [activeComment, setActiveComment] = useState({});
  // const [likeCurrentComment, setLikeCurrentComment] = useState(
  //   comment2?.isCommentLikedByCurrentUser
  // );
  // const [likeCount, setlikeCount] = useState(
  //   !childComment ? comment2?.commentLikeCount : comment2?.likeCount
  // );
  const timeoutIdRef = useRef(null);
  const timeoutIdRef2 = useRef(null);
  const handleLikeUnlikeComment = (commentParam) => {
    if (!childComment) {
      // setActiveComment(commentParam);
      // const data = _.cloneDeep(getAllPostsLocal);
      const startTimeout = () => {
        timeoutIdRef.current = setTimeout(() => {
          const values = { queryParams: { commentId: commentLocal.commentId } };
          if (!commentLocal.isCommentLikedByCurrentUser) {
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
      const temp = {
        ...commentLocal,
        isCommentLikedByCurrentUser: !commentLocal.isCommentLikedByCurrentUser,
        commentLikeCount: commentLocal.isCommentLikedByCurrentUser
          ? commentLocal.commentLikeCount - 1
          : commentLocal.commentLikeCount + 1,
      };
      console.log('temp', temp);
      setCommentLocal(temp);
    } else {
      // setActiveComment(commentParam);
      console.log('childcomment');
      // const data = _.cloneDeep(getAllPostsLocal);
      const startTimeout = () => {
        timeoutIdRef2.current = setTimeout(() => {
          const values = {
            queryParams: { replyId: childCommentLocal.replyId },
          };
          if (!childCommentLocal.isReplyLikedByCurrentUser) {
            console.log('like');
            !forum && dispatch(triggerLikeReply(values));
            forum && dispatch(triggerLikeReplyForumsPost(values));
          } else {
            console.log('unlike');
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
      const temp = {
        ...childCommentLocal,
        isReplyLikedByCurrentUser: !childCommentLocal.isReplyLikedByCurrentUser,
        likeCount: childCommentLocal.isReplyLikedByCurrentUser
          ? childCommentLocal.likeCount - 1
          : childCommentLocal.likeCount + 1,
      };
      console.log('temp############', temp);
      setChildCommentLocal(temp);

      const getallpostslocalTemp = getAllPostsLocal.map((item) => {
        const objMain = { ...item };
        if ((item.postId = activePostThatIsBeingReplied.postId)) {
          console.log('activepostthatisbeingreplied');
          const commentedUsers = objMain.commentedUsers?.map((user) => {
            let obj = { ...user };
            if (user.commentId === temp.commentId) {
              obj = temp;
            }
            return obj;
          });
          objMain.commentedUsers = [...commentedUsers];
        }
        return objMain;
      });

      // setGetAllPostsLocal(getallpostslocalTemp);

      // const getAllPostsLocalTemp = getAllPostsLocal.map((item) => {
      //   const objMain = { ...item };

      //   if (item.postId === activePostThatIsBeingReplied.postId) {
      //     console.log('activepostthatisbeingreplied');
      //     const commentedUsers = objMain.commentedUsers.map((commentedUser) => {
      //       const obj = {
      //         ...commentedUser,
      //       };
      //       if (commentedUser.commentId === comment.commentId) {
      //         console.log('#######second');
      //         if (obj.numberOfRepliesToDisplay) {
      //           obj.numberOfRepliesToDisplay = obj.numberOfRepliesToDisplay + 1;
      //         } else {
      //           obj.numberOfRepliesToDisplay = 3;
      //         }
      //       }
      //       return obj;
      //     });
      //     objMain.commentedUsers = [...commentedUsers];
      //   }

      //   return objMain;
      // });
    }
  };

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
              <button onClick={handleLikeUnlikeComment}>Like</button>
              {!childComment && (
                <>
                  {commentLocal.commentLikeCount > 0 && (
                    <div className='no-of-likes-wrapper'>
                      {commentLocal.isCommentLikedByCurrentUser ? (
                        <FaHeart className='icon active' />
                      ) : (
                        <FaRegHeart className='icon' />
                      )}

                      <p className='no-of-likes'>
                        {commentLocal.commentLikeCount}
                      </p>
                    </div>
                  )}
                </>
              )}
              {childComment && (
                <>
                  {childCommentLocal.likeCount > 0 && (
                    <div className='no-of-likes-wrapper'>
                      {childCommentLocal.isReplyLikedByCurrentUser ? (
                        <FaHeart className='icon active' />
                      ) : (
                        <FaRegHeart className='icon ' />
                      )}

                      <p className='no-of-likes'>
                        {childCommentLocal.likeCount}
                      </p>
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
