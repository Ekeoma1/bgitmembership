import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import Icon from '../Icon';
import '../../assets/scss/molecules.scss';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { UserProfilePhotoLoader2 } from '../Atoms/skeleton-loaders/dashboard-page/UserProfilePhotoLoader';
import MediaLoader from '../Atoms/skeleton-loaders/home-page/MediaLoader';
import {
  triggerLikePost,
  triggerSavePost,
  triggerUnsavePost,
  triggerUnlikePost,
  triggerCreateComment,
  resetCreateComment,
  resetReplyComment,
  triggerGetCommentsByPostId,
  resetGetCommentsByPostId,
} from '../../Features/posts/posts_slice';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import OutsideClickHandler from 'react-outside-click-handler';
import ShareModal from '../Modals/ShareModal';
import SingleComment from './SingleComment';
import CommentInput from './CommentInput';
import {
  resetCreateCommentForumsPost,
  resetReplyCommentForumsPost,
  triggerCreateCommentForumsPost,
  triggerGetAllCommentsByForumPostId,
  triggerLikeForumPost,
  triggerSaveForumPost,
  triggerUnlikeForumPost,
  triggerUnsaveForumPost,
} from '../../Features/forums-post/forums_post_slice';
import MainButton from './MainButton';
import SingleCommentWrapper from './CommentedUser';
import CommentedUser from './CommentedUser';

const PostCard = ({ post, getAllPostsLocal, setGetAllPostsLocal, forum }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    createComment,
    replyComment: replyCommentRedux,
    getCommentsByPostId,
  } = useSelector((state) => state.posts);
  const { createCommentForumsPost, getAllCommentsByForumPostId } = useSelector(
    (state) => state.forumsPost
  );
  const [showCommentsSection, setShowCommentsSection] = useState(false);
  const [comment, setComment] = useState('');
  const [preloaderComment, setPreloaderComment] = useState('');
  const [reply, setReply] = useState('');

  const [actionAcctModal, setActionAcctModal] = useState(false);
  const [profileImgOnLoadStatus, setProfileImgOnLoadStatus] = useState('base');
  const [postImgOnLoadStatus, setPostImgOnLoadStatus] = useState('base');
  const [postVideoOnLoadStatus, setPostVideoOnLoadStatus] = useState('base');
  const idType = forum ? 'forumPostId' : 'postId';

  // Like unlike post
  const timeoutIdRef2 = useRef(null);
  const handleLikeUnlikePost = (postParam) => {
    const startTimeout = () => {
      timeoutIdRef2.current = setTimeout(() => {
        const values = { queryParams: { [idType]: postParam[idType] } };
        if (!post?.isLikedByCurrentUser) {
          !forum && dispatch(triggerLikePost(values));
          forum && dispatch(triggerLikeForumPost(values));
        } else {
          !forum && dispatch(triggerUnlikePost(values));
          forum && dispatch(triggerUnlikeForumPost(values));
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

    const data = getAllPostsLocal.map((item) => {
      const post = { ...item };
      if (item[idType] === postParam[idType]) {
        post.isLikedByCurrentUser = !post.isLikedByCurrentUser;
        post.likeCount = post.isLikedByCurrentUser
          ? post.likeCount + 1
          : post.likeCount - 1;
      }
      return post;
    });
    setGetAllPostsLocal(data);
  };

  // Save unsave post
  const timeoutIdRef = useRef(null);
  const handleSaveUnsavePost = (postParam) => {
    const startTimeout = () => {
      timeoutIdRef.current = setTimeout(() => {
        const values = { queryParams: { [idType]: postParam[idType] } };
        if (!post?.isSavedByCurrentUser) {
          !forum && dispatch(triggerSavePost(values));
          forum && dispatch(triggerSaveForumPost(values));
        } else {
          !forum && dispatch(triggerUnsavePost(values));
          forum && dispatch(triggerUnsaveForumPost(values));
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
    const data = getAllPostsLocal.map((item) => {
      const post = { ...item };
      if (item[idType] === postParam[idType]) {
        post.isSavedByCurrentUser = !post.isSavedByCurrentUser;
        post.saveCount = post.isSavedByCurrentUser
          ? post.saveCount + 1
          : post.saveCount - 1;
      }
      return post;
    });
    setGetAllPostsLocal(data);
  };
  const [createNewComment, setCreateNewComment] = useState(false);
  // comment and reply
  const handleChange = (e) => {
    if (e.target.name === 'comment') {
      setComment(e.target.value);
    } else if (e.target.name === 'reply') {
      setReply(e.target.value);
    }
  };
  const [commentType, setCommentType] = useState('');
  const handleSubmit = (name, post) => {
    console.log('name', name);
    console.log('reply', reply);
    if (name === 'comment' && comment !== '') {
      const data = {
        [idType]: post[idType],
        content: comment,
      };
      !forum && dispatch(triggerCreateComment(data));
      forum && dispatch(triggerCreateCommentForumsPost(data));
      setCommentType('comment');
      setPreloaderComment(comment);
      setComment('');
      setCreateNewComment(true);
    }
  };
  // comment
  useEffect(() => {
    if (
      createComment.status === 'successful' ||
      createCommentForumsPost.status === 'successful'
    ) {
      console.log('1');
      if (createComment.data[idType] === post[idType]) {
        const data = { queryParams: { [idType]: createComment.data[idType] } };
        dispatch(triggerGetCommentsByPostId(data));
      }
      if (createCommentForumsPost.data[idType] === post[idType]) {
        const data = {
          queryParams: { [idType]: createCommentForumsPost.data[idType] },
        };
        dispatch(triggerGetAllCommentsByForumPostId(data));
      }
    }
  }, [createComment, createCommentForumsPost]);

  useEffect(() => {
    if (
      (getCommentsByPostId.status === 'successful' ||
        getAllCommentsByForumPostId.status === 'successful') &&
      (post[idType] === createComment.data[idType] ||
        post[idType] === createCommentForumsPost.data[idType])
    ) {
      let data;
      // console.log('pre useeffectdata ', getAllPostsLocal);
      if (!forum) {
        data = getAllPostsLocal.map((item) => {
          let itemObj = { ...item };
          let itemObj2 = { ...item };
          console.log('itemObj##### ', itemObj);
          if (item[idType] === getCommentsByPostId.data[idType]) {
            itemObj = { ...getCommentsByPostId.data };
            console.log('itemObjNew##### ', itemObj);
            const commentedUsers = itemObj.commentedUsers.map(
              (commentedUser) => {
                const commentedUserObj = { ...commentedUser };
                itemObj2.commentedUsers.forEach((commentedUser2) => {
                  if (commentedUser2.commentId === commentedUser.commentId) {
                    if (commentedUser2.showReplyCommentBox) {
                      commentedUserObj.showReplyCommentBox = true;
                    }
                    if (commentedUser2.numberOfRepliesToDisplay) {
                      commentedUserObj.numberOfRepliesToDisplay =
                        commentedUser2.numberOfRepliesToDisplay;
                    } else {
                      commentedUserObj.numberOfRepliesToDisplay = 2;
                    }
                  }
                });
                return commentedUserObj;
              }
            );
            itemObj.commentedUsers = [...commentedUsers];
          }
          console.log('itemObjFinal##### ', itemObj);
          return itemObj;
        });
      } else if (forum) {
        // update for forum as well
        data = getAllPostsLocal.map((item) => {
          if (item[idType] === getAllCommentsByForumPostId.data[idType]) {
            item = { ...getAllCommentsByForumPostId.data };
          }
          return item;
        });
        // new
        data = getAllPostsLocal.map((item) => {
          let itemObj = { ...item };
          let itemObj2 = { ...item };
          if (item[idType] === getAllCommentsByForumPostId.data[idType]) {
            itemObj = { ...getAllCommentsByForumPostId.data };
            console.log('itemObjNew##### ', itemObj);
            const commentedUsers = itemObj.commentedUsers.map(
              (commentedUser) => {
                const commentedUserObj = { ...commentedUser };
                itemObj2.commentedUsers.forEach((commentedUser2) => {
                  if (commentedUser2.commentId === commentedUser.commentId) {
                    if (commentedUser2.showReplyCommentBox) {
                      commentedUserObj.showReplyCommentBox = true;
                    }
                    if (commentedUser2.numberOfRepliesToDisplay) {
                      commentedUserObj.numberOfRepliesToDisplay =
                        commentedUser2.numberOfRepliesToDisplay;
                    } else {
                      commentedUserObj.numberOfRepliesToDisplay = 2;
                    }
                  }
                });
                return commentedUserObj;
              }
            );
            itemObj.commentedUsers = [...commentedUsers];
          }
          console.log('itemObjFinal##### ', itemObj);
          return itemObj;
        });
      }
      setGetAllPostsLocal([...data]);
      dispatch(resetCreateComment());
      dispatch(resetReplyComment());
      dispatch(resetCreateCommentForumsPost());
      dispatch(resetReplyCommentForumsPost());
      dispatch(resetGetCommentsByPostId());
      setPreloaderComment('');
      setCommentType('');
      // new
      setNumberOfCommentsToDisplay((prevState) => prevState + 1);
    }
  }, [
    dispatch,
    getAllPostsLocal,
    getCommentsByPostId,
    setGetAllPostsLocal,
    getAllCommentsByForumPostId,
  ]);
  const [numberOfCommentsToDisplay, setNumberOfCommentsToDisplay] = useState(2);
  const [activePostTemp, setActivePostTemp] = useState({});
  // console.log('post forum', post);
  return (
    <div className='post-card shadow-sm mx-auto'>
      <div className='post-card-header'>
        <div className='post-owner-details'>
          <div
            className='img-circle'
            onClick={() => navigate(`/users/${post?.userId}`)}
          >
            <img
              src={post?.userProfilePicture}
              alt='post-img'
              className={`${
                profileImgOnLoadStatus === 'success' ? 'd-block' : 'd-none'
              }`}
              onLoad={() => setProfileImgOnLoadStatus('success')}
              onError={() => setProfileImgOnLoadStatus('error')}
            />
            {profileImgOnLoadStatus === 'base' && <UserProfilePhotoLoader2 />}
            {profileImgOnLoadStatus === 'error' && (
              <div className='error-img'>couldn't load img</div>
            )}
          </div>
          <div>
            <div className='d-flex align-items-start'>
              <span
                className='name'
                onClick={() => navigate(`/users/${post?.userId}`)}
              >
                {post?.firstName} {post?.secondName}
              </span>
              <div className='d-flex align-items-center'>
                <span className='small-circle'></span>
                <span className='follow-btn'>
                  {post?.following ? 'following' : 'follow'}
                </span>
              </div>
            </div>
            <div className='job-role'>{post?.userProfession}</div>
            <div className='post-time'>
              {moment(
                new Date(post?.createdDate).getTime() + 3600000
              ).fromNow()}
            </div>
          </div>
        </div>
        <div>{post?.event && <div className='rsvp-btn'>RSVP</div>}</div>
      </div>
      <div className='post-content-wrapper'>
        <div className='post-content'>{post?.content}</div>
        {(post?.postImageUrl || post?.postVideoUrl) && (
          <>
            {post.postImageUrl ? (
              <div className='post-image'>
                <img
                  src={post?.postImageUrl}
                  alt='post-img'
                  className={`${
                    postImgOnLoadStatus === 'success' ? 'd-block' : 'd-none'
                  }`}
                  onLoad={() => setPostImgOnLoadStatus('success')}
                  onError={() => setPostImgOnLoadStatus('error')}
                />
                {postImgOnLoadStatus === 'base' && <MediaLoader />}
                {postImgOnLoadStatus === 'error' && (
                  <div className='error-img'>couldn't load img</div>
                )}
              </div>
            ) : (
              <div className='post-video'>
                <video
                  controls
                  className={`${
                    postVideoOnLoadStatus === 'success' ? 'd-block' : 'd-none'
                  }`}
                  onLoadedMetadata={() => setPostVideoOnLoadStatus('success')}
                  onError={() => setPostVideoOnLoadStatus('error')}
                >
                  <source src={post?.postVideoUrl} type='video/mp4' />
                </video>
                {postVideoOnLoadStatus === 'base' && <MediaLoader />}
                {postVideoOnLoadStatus === 'error' && (
                  <div className='error-img'>couldn't load img</div>
                )}
              </div>
            )}
          </>
        )}
      </div>
      <div className='post-card-footer'>
        <div className='post-card-footer-content'>
          <div className='d-flex align-items-center c-gap-10'>
            <button
              onClick={() => handleLikeUnlikePost(post)}
              className={`heart-icon ${post?.isLikedByCurrentUser && 'active'}`}
            >
              <Icon icon='heart' />
            </button>
            <span>{post?.likeCount}</span>
          </div>
          <div className='d-flex align-items-center c-gap-10'>
            <button
              onClick={() => {
                setShowCommentsSection(!showCommentsSection);
                setActivePostTemp(post);
              }}
            >
              <Icon icon='comment' />
            </button>
            <span>{post?.commentCount}</span>
          </div>
          <div className='d-flex align-items-center c-gap-10'>
            <button
              className='bookmark '
              onClick={() => handleSaveUnsavePost(post)}
            >
              {post?.isSavedByCurrentUser ? (
                <FaBookmark className='active' />
              ) : (
                <FaRegBookmark />
              )}
            </button>
            <span>{post?.saveCount}</span>
          </div>

          <div className='d-flex align-items-center c-gap-10 share-wrapper'>
            <button onClick={() => setActionAcctModal(true)}>
              <Icon icon='share' />
            </button>
            <OutsideClickHandler
              onOutsideClick={() => {
                setActionAcctModal(false);
              }}
            >
              <ShareModal show={actionAcctModal} />
            </OutsideClickHandler>
          </div>
        </div>
        {showCommentsSection && (
          <div className='comments-sec'>
            <CommentInput
              name={'comment'}
              onChange={handleChange}
              onSubmit={() => handleSubmit('comment', post)}
              value={comment}
            />
            {(commentType === 'comment' || post.commentedUsers?.length > 0) && (
              <>
                <div className='comments-box'>
                  {commentType === 'comment' && (
                    <SingleComment loader loaderContent={preloaderComment} />
                  )}
                  {post.commentedUsers
                    ?.slice()
                    .reverse()
                    .slice(0, numberOfCommentsToDisplay)
                    .map((commentedUser, index) => {
                      return (
                        <CommentedUser
                          key={index}
                          index={index}
                          commentedUser={commentedUser}
                          getAllPostsLocal={getAllPostsLocal}
                          setGetAllPostsLocal={setGetAllPostsLocal}
                          post={post}
                          forum={forum}
                          idType={idType}
                          createNewComment={createNewComment}
                          setCreateNewComment={setCreateNewComment}
                          activePostTemp={activePostTemp}
                        />
                      );
                    })}
                  {post.commentedUsers?.length > 2 && (
                    <div className='show-more-btn'>
                      <MainButton
                        text={'Load more comments'}
                        onClick={() =>
                          setNumberOfCommentsToDisplay(
                            (prevState) => prevState + 1
                          )
                        }
                        disabled={
                          post.commentedUsers.length ===
                          numberOfCommentsToDisplay
                        }
                        size={'small'}
                        // padding={'0'}
                        width={'30rem'}
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
