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
import SingleCommentRepliesWrapper from './SingleCommentRepliesWrapper';

const CommentedUser = ({
  commentedUser,
  getAllPostsLocal,
  setGetAllPostsLocal,
  post,
  forum,
  idType,
  replyChildCommentMain,
  setReplyChildCommentMain,
}) => {
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
  const dispatch = useDispatch();
  const { getMyProfile } = useSelector((state) => state.users);

  const [comment, setComment] = useState('');
  const [preloaderCommentReply, setPreloaderCommentReply] = useState('');
  const [replyChildComment, setReplyChildComment] = useState(
    replyChildCommentMain ? false : false
  );
  const [commentThatIsBeingReplied, setCommentThatIsBeingReplied] = useState(
    {}
  );

  const [actionAcctModal, setActionAcctModal] = useState(false);
  const [profileImgOnLoadStatus, setProfileImgOnLoadStatus] = useState('base');
  const [postImgOnLoadStatus, setPostImgOnLoadStatus] = useState('base');
  const [postVideoOnLoadStatus, setPostVideoOnLoadStatus] = useState('base');

  const [reply, setReply] = useState('');
  const [replyPreloaderContent, setReplyPreloaderContent] = useState('');
  const handleReplyComment = (commentedUserParam) => {
    // setReplyChildComment(true);
    console.log('commentedUserParam', commentedUserParam);
    const getAllPostsLocalTemp = getAllPostsLocal.map((postItem) => {
      const postObj = { ...postItem };
      if (postItem.postId === post.postId) {
        const commentedUsers = postItem.commentedUsers?.map(
          (commentedUserItem) => {
            let commentedUserObj = { ...commentedUserItem };
            if (commentedUserItem.commentId === commentedUser.commentId) {
              console.log(
                'true#####',
                commentedUserItem.commentId,
                commentedUser.commentId
              );
              commentedUserObj.showReplyCommentBox = true;
            }
            return commentedUserObj;
          }
        );
        console.log('commentedusers', commentedUsers);
        postObj.commentedUsers = commentedUsers;
      }
      return postObj;
    });
    console.log('getAllPostsLocalTempcommentedUser', getAllPostsLocalTemp);
    setGetAllPostsLocal(getAllPostsLocalTemp);
  };
  const handleSubmit = (name, post) => {
    const data = {
      commentId: post.commentId,
      content: reply,
    };
    !forum && dispatch(triggerReplyComment(data));
    forum && dispatch(triggerReplyCommentForumsPost(data));
    setPreloaderCommentReply(reply);
    setReply('');
    setShowLoader(true);
  };
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (
      replyCommentRedux.status === 'successful' &&
      replyCommentRedux.data?.commentId === commentedUser.commentId
    ) {
      console.log('1##');
      const data = {
        queryParams: { postId: replyCommentRedux.data.postId },
      };
      dispatch(triggerGetCommentsByPostId(data));
    }
  }, [replyCommentRedux]);

  useEffect(() => {
    // so that useefffect will run only once
    if (
      getCommentsByPostId.status === 'successful' &&
      replyCommentRedux.data?.commentId === commentedUser.commentId
    ) {
      const data = getAllPostsLocal.map((item) => {
        let itemObj = { ...item };

        if (item.postId === getCommentsByPostId.data.postId) {
          //  const itemObj2 = { ...getCommentsByPostId.data };

          const commentedUsers = itemObj.commentedUsers.map((commentedUser) => {
            const commentedUserObj = { ...commentedUser };
            if (commentedUser.commentId === replyCommentRedux.data?.commentId) {
              console.log('commentedUserObj', commentedUserObj);
              console.log('replyCommentRedux.data', replyCommentRedux.data);
              commentedUserObj.numberOfRepliesToDisplay =
                commentedUserObj.numberOfRepliesToDisplay + 1;
              commentedUserObj.replies = [
                ...commentedUserObj.replies,
                replyCommentRedux.data,
              ];
            }
            return commentedUserObj;
          });
          itemObj.commentedUsers = commentedUsers;
        }

        return itemObj;
      });
      setGetAllPostsLocal([...data]);
      dispatch(resetGetCommentsByPostId());
      setPreloaderCommentReply('');
      setCommentThatIsBeingReplied('');
      dispatch(resetReplyComment());
      // new
      setShowLoader(false);
    }
  }, [getCommentsByPostId]);

  // forums
  useEffect(() => {
    if (
      replyCommentForumsPost.status === 'successful' &&
      replyCommentForumsPost.data.forumPostId === post.postId
    ) {
      const data = {
        queryParams: { [idType]: replyCommentForumsPost[idType] },
      };
      dispatch(triggerGetAllCommentsByForumPostId(data));
    }
  }, [replyCommentForumsPost]);

  useEffect(() => {
    // so that useefffect will run only once
    if (
      getAllCommentsByForumPostId.status === 'successful' &&
      post[idType] === getCommentsByPostId.data[idType]
    ) {
      console.log('two');
      let data;
      data = getAllPostsLocal.map((item) => {
        let itemObj = { ...item };
        if (item.id === getAllCommentsByForumPostId.data.forumPostId) {
          itemObj = { ...getCommentsByPostId.data };
          const commentedUsers = itemObj.commentedUsers.map((commentedUser) => {
            const commentedUserObj = { ...commentedUser };
            commentedUserObj.numberOfRepliesToDisplay = 2;
            return commentedUserObj;
          });
          itemObj.commentedUsers = commentedUsers;
        }
        return itemObj;
      });
      setGetAllPostsLocal([...data]);
      dispatch(resetCreateComment());
      dispatch(resetReplyComment());
      dispatch(resetCreateCommentForumsPost());
      dispatch(resetReplyCommentForumsPost());
      dispatch(resetGetCommentsByPostId());
      setPreloaderCommentReply('');
      setCommentThatIsBeingReplied('');
    }
  }, [getAllCommentsByForumPostId]);
  // console.log('replyChildComment', replyChildComment);
  // console.log(
  //   'commentThatIsBeingReplied.commentId ',
  //   commentThatIsBeingReplied.commentId
  // );
  // console.log('comment.commentId ', comment.commentId);

  return (
    <div className='single-comments-wrapper'>
      <SingleComment
        comment2={commentedUser}
        setReplyComment={() => handleReplyComment(commentedUser)}
        forum={forum}
        idType={idType}
        post={post}
        getAllPostsLocal={getAllPostsLocal}
        setGetAllPostsLocal={setGetAllPostsLocal}
      />
      <>
        <div className='child-comments-wrapper'>
          <div className='hidden'></div>
          <div className='con'>
            {commentedUser?.replies?.length > 2 && (
              <div className='prev-posts-btn-wrapper'>
                <p
                  onClick={() => {
                    // const getAllPostsLocalTemp = [...getAllPostsLocal];
                    console.log('########################main');
                    const getAllPostsLocalTemp = getAllPostsLocal.map(
                      (item) => {
                        const postObj = { ...item };

                        if (item.postId === post.postId) {
                          console.log('#######first');
                          const commentedUsers = postObj.commentedUsers.map(
                            (commentedUserItem) => {
                              const commentedUserObj = {
                                ...commentedUserItem,
                              };
                              if (
                                commentedUserItem.commentId ===
                                commentedUser.commentId
                              ) {
                                console.log('#######second');
                                commentedUserObj.numberOfRepliesToDisplay =
                                  commentedUserObj.numberOfRepliesToDisplay + 1;
                              }
                              return commentedUserObj;
                            }
                          );
                          postObj.commentedUsers = [...commentedUsers];
                        }

                        return postObj;
                      }
                    );
                    console.log('getAllPostsLocalTemp2', getAllPostsLocalTemp);
                    setGetAllPostsLocal(getAllPostsLocalTemp);
                  }}
                >
                  Load prev comments
                </p>
              </div>
            )}
            <SingleCommentRepliesWrapper
              commentedUser={commentedUser}
              childComment
              setReplyComment={() => {
                setReplyChildComment(true);
                setCommentThatIsBeingReplied(comment);
              }}
              forum={forum}
              idType={idType}
              post={post}
              getAllPostsLocal={getAllPostsLocal}
              setGetAllPostsLocal={setGetAllPostsLocal}
            />
            {showLoader && (
              <SingleComment
                img={getMyProfile.data?.imageUrl}
                name={`${getMyProfile.data?.firstName} ${getMyProfile.data?.secondName}`}
                role={getMyProfile.data?.profession || ''}
                loaderContent={preloaderCommentReply}
                childComment
                loader
              />
            )}
            {commentedUser.showReplyCommentBox && (
              <CommentInput
                name={'reply'}
                onChange={(e) => {
                  setReply(e.target.value);
                  setReplyPreloaderContent(e.target.value);
                }}
                onSubmit={() => handleSubmit('reply', commentedUser)}
                value={reply}
                focus={replyChildComment}
              />
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default CommentedUser;
