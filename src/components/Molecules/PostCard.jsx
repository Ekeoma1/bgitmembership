import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import Icon from '../Icon';
import '../../assets/scss/molecules.scss';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { UserProfilePhotoLoader2 } from '../Atoms/skeleton-loaders/dashboard-page/UserProfilePhotoLoader';
import MediaLoader from '../Atoms/skeleton-loaders/home-page/MediaLoader';
import {
  // resetActivePostIdForOngoingRequest,
  // resetSaveCurrentPost,
  // resetLikePost,
  // setActivePostIdForOngoingRequest,
  // setSaveCurrentPost,
  triggerLikePost,
  triggerSavePost,
  triggerUnsavePost,
  triggerUnlikePost,
  triggerCreateComment,
  triggerReplyComment,
  resetCreateComment,
  resetReplyComment,
  triggerGetCommentsByPostId,
  resetGetCommentsByPostId,
} from '../../Features/posts/posts_slice';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

import OutsideClickHandler from 'react-outside-click-handler';
import ShareModal from '../Modals/ShareModal';
import user from '../../assets/images/author1.png';
import SingleComment from './SingleComment';
import CommentInput from './CommentInput';
const PostCard = ({ post, getAllPostsLocal, setGetAllPostsLocal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    likePost,
    savePost,
    unsavePost,
    activePostIdForOngoingRequest,
    createComment,
    replyComment: replyCommentRedux,
    getCommentsByPostId,
  } = useSelector((state) => state.posts);
  const { getMyProfile } = useSelector((state) => state.users);
  const [showCommentsSection, setShowCommentsSection] = useState(false);
  const [comment, setComment] = useState('');
  const [preloaderComment, setPreloaderComment] = useState('');
  const [reply, setReply] = useState('');
  const [preloaderCommentReply, setPreloaderCommentReply] = useState('');
  const [replyComment, setReplyComment] = useState(false);
  const [replyChildComment, setReplyChildComment] = useState(false);
  const [commentThatIsBeingReplied, setCommentThatIsBeingReplied] = useState(
    {}
  );

  const [actionAcctModal, setActionAcctModal] = useState(false);
  const [profileImgOnLoadStatus, setProfileImgOnLoadStatus] = useState('base');
  const [postImgOnLoadStatus, setPostImgOnLoadStatus] = useState('base');
  const [postVideoOnLoadStatus, setPostVideoOnLoadStatus] = useState('base');

  // Like unlike post
  const [likeCurrentPost, setLikeCurrentPost] = useState(
    post?.isLikedByCurrentUser
  );
  const timeoutIdRef2 = useRef(null);
  const handleLikeUnlikePost = (postParam) => {
    const data = _.cloneDeep(getAllPostsLocal);
    const startTimeout = () => {
      timeoutIdRef2.current = setTimeout(() => {
        const values = { queryParams: { postId: postParam.postId } };
        if (!likeCurrentPost) {
          dispatch(triggerLikePost(values));
        } else {
          dispatch(triggerUnlikePost(values));
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
    data.forEach((item) => {
      if (item.postId === postParam.postId) {
        setLikeCurrentPost(!likeCurrentPost);
        item.isLikedByCurrentUser = !item.isLikedByCurrentUser;
        item.likeCount = item.isLikedByCurrentUser
          ? item.likeCount + 1
          : item.likeCount - 1;
      }
    });
    setGetAllPostsLocal(data);
  };

  // Save unsave post
  const [saveCurrentPost, setSaveCurrentPost] = useState(
    post?.isSavedByCurrentUser
  );
  const timeoutIdRef = useRef(null);
  const handleSaveUnsavePost = (postParam) => {
    const data = _.cloneDeep(getAllPostsLocal);
    const startTimeout = () => {
      timeoutIdRef.current = setTimeout(() => {
        const values = { queryParams: { postId: postParam.postId } };
        if (!saveCurrentPost) {
          dispatch(triggerSavePost(values));
        } else {
          dispatch(triggerUnsavePost(values));
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
    data.forEach((item) => {
      if (item.postId === postParam.postId) {
        setSaveCurrentPost(!saveCurrentPost);
        item.isSavedByCurrentUser = !item.isSavedByCurrentUser;
        item.saveCount = item.isSavedByCurrentUser
          ? item.saveCount + 1
          : item.saveCount - 1;
      }
    });
    setGetAllPostsLocal(data);
  };

  // Like unlike comment
  const [likeComment, setLikeComment] = useState(post?.isLikedByCurrentUser);
  const timeoutIdRef3 = useRef(null);
  const handleLikeUnlikeComment = () => {
    const startTimeout = () => {
      timeoutIdRef3.current = setTimeout(() => {
        const data = { queryParams: { postId: post.postId } };
        if (!likeCurrentPost) {
          dispatch(triggerLikePost(data));
        } else {
          dispatch(triggerUnlikePost(data));
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
    setLikeCurrentPost(!likeCurrentPost);
  };
  useEffect(() => {
    // const data = [...getAllPostsLocal];
    const data = _.cloneDeep(getAllPostsLocal);
    if (likeCurrentPost) {
      data?.forEach((item) => {
        if (item.postId === post.postId) {
          item.isLikedByCurrentUser = true;
          item.likeCount = item.likeCount + 1;
        }
      });
    } else {
      data?.forEach((item) => {
        if (item.postId === post.postId) {
          item.isLikedByCurrentUser = false;
          item.likeCount = item.likeCount - 1;
        }
      });
    }
    // setGetAllPostsLocal(data);
  }, [likeCurrentPost]);
  // other

  const handleChange = (e) => {
    if (e.target.name === 'comment') {
      setComment(e.target.value);
    } else if (e.target.name === 'reply') {
      setReply(e.target.value);
    }
  };
  const handleReplyComment = (comment) => {
    console.log('comment', comment);
    setReplyComment(true);
    setCommentThatIsBeingReplied(comment);
    setReplyChildComment(true);
  };
  const [commentType, setCommentType] = useState('');
  const handleSubmit = (name, post) => {
    console.log(name, post);
    setActivePostTemp(post);
    if (name === 'comment') {
      const data = {
        postId: post.postId,
        content: comment,
      };
      dispatch(triggerCreateComment(data));
      setCommentType('comment');
      setPreloaderComment(comment);
      setComment('');
    } else if (name === 'reply') {
      const data = {
        commentId: commentThatIsBeingReplied.commentId,
        content: reply,
      };
      dispatch(triggerReplyComment(data));
      setCommentType('reply');
      setPreloaderCommentReply(reply);
      setReply('');
      setCommentThatIsBeingReplied('');
    }
  };
  // comment
  const [activePostTemp, setActivePostTemp] = useState({});
  useEffect(() => {
    if (createComment.status === 'successful') {
      if (activePostTemp.postId === post.postId) {
        const data = { queryParams: { postId: activePostTemp?.postId } };
        dispatch(triggerGetCommentsByPostId(data));
      }
    }
    if (replyCommentRedux.status === 'successful') {
      if (activePostTemp.postId === post.postId) {
        const data = { queryParams: { postId: activePostTemp?.postId } };
        dispatch(triggerGetCommentsByPostId(data));
      }
    }
  }, [createComment, replyCommentRedux]);

  useEffect(() => {
    if (getCommentsByPostId.status === 'successful') {
      const data = _.cloneDeep(getAllPostsLocal);
      // Find the object with the matching ID
      const updatedArray = data.map((obj) =>
        obj.postId === getCommentsByPostId.data.postId
          ? { ...obj, ...getCommentsByPostId.data }
          : obj
      );
      console.log('dataupdated#############', updatedArray);
      setGetAllPostsLocal([...updatedArray]);
      dispatch(resetCreateComment());
      dispatch(resetReplyComment());
      dispatch(resetGetCommentsByPostId());
      setPreloaderComment('');
      setPreloaderCommentReply('');
      setCommentType('');
    }
  }, [getCommentsByPostId]);
  // console.log('getCommentsByPostId', getCommentsByPostId);
  console.log('savepost###', saveCurrentPost, post.isSavedByCurrentUser);
  // console.log('comment', commentThatIsBeingReplied);
  // console.log('comment', createComment);
  // console.log('replycommentRedux', replyCommentRedux);
  const handleLikeComment = (id) => {};
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
            <div className='d-flex align-items-center'>
              <span
                className='name'
                onClick={() => navigate(`/users/${post?.userId}`)}
              >
                {post?.firstName} {post?.secondName}
              </span>
              <span className='small-circle'></span>
              <span className='follow-btn'>
                {post?.following ? 'following' : 'follow'}
              </span>
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
            <div className='comments-box'>
              {commentType === 'comment' && (
                <SingleComment
                  img={getMyProfile.data?.imageUrl}
                  name={`${getMyProfile.data?.firstName} ${getMyProfile.data?.secondName}`}
                  role={getMyProfile.data?.profession || ''}
                  comment={preloaderComment}
                  loader
                />
              )}
              {post.commentedUsers
                ?.slice()
                .reverse()
                .slice(0, 2)
                .map((comment, index) => (
                  <>
                    <SingleComment
                      key={index}
                      img={comment.userProfilePicture}
                      name={comment.userName}
                      role={comment.profession}
                      comment={comment.content}
                      setLikeComment={setLikeComment}
                      setReplyComment={() => handleReplyComment(comment)}
                    />
                    <>
                      <div className='child-comments-wrapper'>
                        <div className='hidden'></div>
                        <div className='con'>
                          {Array.isArray(comment.replies) &&
                            comment.replies.slice(-10).map((item, index) => (
                              <SingleComment
                                key={index}
                                img={item.userProfilePicture}
                                name={`${item.firstName} ${item.secondName}`}
                                role={item.profession ?? 'test'}
                                comment={item.content}
                                childComment
                                setReplyComment={() => {
                                  setReplyChildComment(true);
                                  setCommentThatIsBeingReplied(comment);
                                }}
                              />
                            ))}
                          {commentType === 'reply' && (
                            <SingleComment
                              img={getMyProfile.data?.imageUrl}
                              name={`${getMyProfile.data?.firstName} ${getMyProfile.data?.secondName}`}
                              role={getMyProfile.data?.profession || ''}
                              comment={preloaderCommentReply}
                              childComment
                              loader
                            />
                          )}
                          {replyChildComment &&
                            commentThatIsBeingReplied.commentId ===
                              comment.commentId && (
                              <CommentInput
                                name={'reply'}
                                onChange={handleChange}
                                onSubmit={() => handleSubmit('reply', post)}
                                value={reply}
                                focus={replyChildComment}
                              />
                            )}
                        </div>
                      </div>
                    </>
                  </>
                ))}
              {/* <div className='child-comments-wrapper'>
                <div className='hidden'></div>
                <div className='con'>
                  <SingleComment
                    img={user}
                    name={'Chidiebere Ezeokwelume'}
                    role={'UX Design Enthusiast'}
                    comment={'So excited, can’t wait!'}
                    childComment
                    setReplyComment={setReplyComment}
                  />
                  <SingleComment
                    img={user}
                    name={'Chidiebere Ezeokwelume'}
                    role={'UX Design Enthusiast'}
                    comment={'So excited, can’t wait!'}
                    childComment
                    setReplyComment={setReplyComment}
                  />
                  <SingleComment
                    img={user}
                    name={'Chidiebere Ezeokwelume'}
                    role={'UX Design Enthusiast'}
                    comment={'So excited, can’t wait!'}
                    childComment
                    setReplyComment={setReplyComment}
                  />
                  {replyComment && (
                    <CommentInput
                      name={'reply'}
                      onChange={handleChange}
                      onSubmit={handleSubmit}
                      value={reply}
                      focus={replyComment}
                    />
                  )}
                </div>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
