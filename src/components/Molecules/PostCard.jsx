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
import SingleComment from './SingleComment';
import CommentInput from './CommentInput';
import {
  resetCreateCommentForumPost,
  resetCreateCommentForumsPost,
  resetReplyCommentForumsPost,
  triggerCreateCommentForumsPost,
  triggerGetAllCommentsByForumPostId,
  triggerLikeForumPost,
  triggerReplyCommentForumsPost,
  triggerSaveForumPost,
  triggerUnlikeForumPost,
  triggerUnsaveForumPost,
} from '../../Features/forums-post/forums_post_slice';
import MainButton from './MainButton';

const PostCard = ({ post, getAllPostsLocal, setGetAllPostsLocal, forum }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    createComment,
    replyComment: replyCommentRedux,
    getCommentsByPostId,
  } = useSelector((state) => state.posts);
  const {
    createCommentForumsPost,
    getAllCommentsByForumPostId,
    replyCommentForumsPost,
  } = useSelector((state) => state.forumsPost);
  const { getMyProfile } = useSelector((state) => state.users);
  const [showCommentsSection, setShowCommentsSection] = useState(false);
  const [comment, setComment] = useState('');
  const [preloaderComment, setPreloaderComment] = useState('');
  const [reply, setReply] = useState('');
  const [preloaderCommentReply, setPreloaderCommentReply] = useState('');
  const [numOfCommentsCon, setNumOfCommentsCon] = useState([]);
  const [replyChildComment, setReplyChildComment] = useState(false);
  const [commentThatIsBeingReplied, setCommentThatIsBeingReplied] = useState(
    {}
  );

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

  // comment and reply
  const handleChange = (e) => {
    if (e.target.name === 'comment') {
      setComment(e.target.value);
    } else if (e.target.name === 'reply') {
      setReply(e.target.value);
    }
  };
  const handleReplyComment = (comment) => {
    setCommentThatIsBeingReplied(comment);
    setReplyChildComment(true);
  };
  const [commentType, setCommentType] = useState('');
  const handleSubmit = (name, post) => {
    setActivePostTemp(post);
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
    } else if (name === 'reply' && reply !== '') {
      const data = {
        commentId: commentThatIsBeingReplied.commentId,
        content: reply,
      };
      !forum && dispatch(triggerReplyComment(data));
      forum && dispatch(triggerReplyCommentForumsPost(data));
      setCommentType('reply');
      setPreloaderCommentReply(reply);
      setReply('');
    }
  };
  // comment
  const [activePostTemp, setActivePostTemp] = useState({});
  useEffect(() => {
    if (
      createComment.status === 'successful' ||
      createCommentForumsPost.status === 'successful' ||
      replyCommentRedux.status === 'successful' ||
      replyCommentForumsPost.status === 'successful'
    ) {
      if (activePostTemp[idType] === post[idType]) {
        const data = { queryParams: { [idType]: activePostTemp[idType] } };
        !forum && dispatch(triggerGetCommentsByPostId(data));
        forum && dispatch(triggerGetAllCommentsByForumPostId(data));
      }
    }
    // if (
    //   replyCommentRedux.status === 'successful' ||
    //   replyCommentForumsPost.status === 'successful'
    // ) {
    //   if (activePostTemp[idType] === post[idType]) {
    //     const data = { queryParams: { [idType]: activePostTemp[idType] } };
    //     !forum && dispatch(triggerGetCommentsByPostId(data));
    //     forum && dispatch(triggerGetAllCommentsByForumPostId(data));
    //   }
    // }
  }, [
    createComment,
    replyCommentRedux,
    createCommentForumsPost,
    replyCommentForumsPost,
  ]);

  useEffect(() => {
    if (
      (getCommentsByPostId.status === 'successful' ||
        getAllCommentsByForumPostId.status === 'successful') &&
      post[idType] === activePostTemp[idType]
    ) {
      let data;
      if (!forum) {
        data = getAllPostsLocal.map((item) => {
          if (item[idType] === getCommentsByPostId.data[idType]) {
            item = { ...getCommentsByPostId.data };
          }
          return item;
        });
      } else if (forum) {
        data = getAllPostsLocal.map((item) => {
          if (item[idType] === getAllCommentsByForumPostId.data[idType]) {
            item = { ...getAllCommentsByForumPostId.data };
          }
          return item;
        });
      }
      setGetAllPostsLocal([...data]);
      dispatch(resetCreateComment());
      dispatch(resetReplyComment());
      dispatch(resetCreateCommentForumsPost());
      dispatch(resetReplyCommentForumsPost());
      dispatch(resetGetCommentsByPostId());
      setPreloaderComment('');
      setPreloaderCommentReply('');
      setCommentType('');
      setCommentThatIsBeingReplied('');
      setActivePostTemp({});
    }
  }, [
    dispatch,
    getAllPostsLocal,
    getCommentsByPostId,
    setGetAllPostsLocal,
    getAllCommentsByForumPostId,
  ]);
  const [activePostThatIsBeingReplied, setActivePostThatIsBeingReplied] =
    useState({});
  const [numberOfCommentsToDisplay, setNumberOfCommentsToDisplay] = useState(2);
  const [numberOfRepliesToDisplay, setNumberOfRepliesToDisplay] = useState(2);
  const [commentedUsersState, setCommentedUsersState] = useState([]);

  if (post.postId === '06642326-4034-4d74-41bc-08dc1532c7c5') {
    console.log('getallpostslocal post', post);
  }
  if (post.postId === '06642326-4034-4d74-41bc-08dc1532c7c5') {
    console.log('commentedUsersState', commentedUsersState);
  }
  // console.log('getPostsLocal', getAllPostsLocal);
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
                setActivePostThatIsBeingReplied(post);
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
                    .slice(0, numberOfCommentsToDisplay)
                    .map((comment, index) => {
                      return (
                        <div className='single-comments-wrapper'>
                          <SingleComment
                            key={index}
                            img={comment.userProfilePicture}
                            name={comment.userName}
                            role={comment.profession}
                            comment={comment.content}
                            comment2={comment}
                            // setLikeComment={setLikeComment}
                            setReplyComment={() => handleReplyComment(comment)}
                            forum={forum}
                            idType={idType}
                          />
                          <>
                            <div className='child-comments-wrapper'>
                              <div className='hidden'></div>
                              <div className='con'>
                                {comment?.replies?.length > 2 && (
                                  <div className='prev-posts-btn-wrapper'>
                                    <p
                                      onClick={() => {
                                        const getAllPostsLocalTemp =
                                          getAllPostsLocal.map((item) => {
                                            const objMain = { ...item };

                                            if (item.postId === post.postId) {
                                              console.log('#######first');
                                              const commentedUsers =
                                                objMain.commentedUsers.map(
                                                  (commentedUser) => {
                                                    const obj = {
                                                      ...commentedUser,
                                                    };
                                                    if (
                                                      commentedUser.commentId ===
                                                      comment.commentId
                                                    ) {
                                                      console.log(
                                                        '#######second'
                                                      );
                                                      if (
                                                        obj.numberOfRepliesToDisplay
                                                      ) {
                                                        obj.numberOfRepliesToDisplay =
                                                          obj.numberOfRepliesToDisplay +
                                                          1;
                                                      } else {
                                                        obj.numberOfRepliesToDisplay = 3;
                                                      }
                                                    }
                                                    return obj;
                                                  }
                                                );
                                              objMain.commentedUsers = [
                                                ...commentedUsers,
                                              ];
                                            }

                                            return objMain;
                                          });
                                        console.log(
                                          'getAllPostsLocalTemp',
                                          getAllPostsLocalTemp
                                        );
                                        setGetAllPostsLocal(
                                          getAllPostsLocalTemp
                                        );
                                        // setNumberOfRepliesToDisplay(
                                        //   (prevState) => prevState + 1
                                        // );
                                      }}
                                    >
                                      Load prev comments
                                    </p>
                                  </div>
                                )}
                                {Array.isArray(comment.replies) &&
                                  comment.replies
                                    // .slice()
                                    // .reverse()
                                    // .slice(
                                    //   -numOfCommentsCon.find(
                                    //     (item) => item.commentId === comment.commentId
                                    //   )?.numberOfComments || -2
                                    // )
                                    // ?.slice()
                                    // .reverse()
                                    .slice(
                                      -comment.numberOfRepliesToDisplay || -2
                                    )
                                    .map((item, index) => (
                                      <SingleComment
                                        key={index}
                                        img={item.userProfilePicture}
                                        name={`${item.firstName} ${item.secondName}`}
                                        role={item.profession ?? 'test'}
                                        comment={item.content}
                                        comment2={item}
                                        childComment
                                        setReplyComment={() => {
                                          setReplyChildComment(true);
                                          setCommentThatIsBeingReplied(comment);
                                        }}
                                        forum={forum}
                                        idType={idType}
                                        post={post}
                                        getAllPostsLocal={getAllPostsLocal}
                                        setGetAllPostsLocal={
                                          setGetAllPostsLocal
                                        }
                                        activePostThatIsBeingReplied={
                                          activePostThatIsBeingReplied
                                        }
                                      />
                                    ))}
                                {commentType === 'reply' &&
                                  commentThatIsBeingReplied.commentId ===
                                    comment.commentId && (
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
                                      onSubmit={() =>
                                        handleSubmit('reply', post)
                                      }
                                      value={reply}
                                      focus={replyChildComment}
                                    />
                                  )}
                              </div>
                            </div>
                          </>
                        </div>
                      );
                    })}
                  {post.commentedUsers.length > 2 && (
                    <MainButton
                      text={'Show more'}
                      onClick={() =>
                        setNumberOfCommentsToDisplay(
                          (prevState) => prevState + 1
                        )
                      }
                      disabled={
                        post.commentedUsers.length === numberOfCommentsToDisplay
                      }
                      size={'small'}
                      // padding={'0'}
                      width={'30rem'}
                    />
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
