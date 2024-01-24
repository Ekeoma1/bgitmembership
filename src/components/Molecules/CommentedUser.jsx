import React, { useEffect, useState } from 'react';
import {
  triggerReplyComment,
  resetCreateComment,
  resetReplyComment,
  triggerGetCommentsByPostId,
  resetGetCommentsByPostId,
} from '../../Features/posts/posts_slice';
import { useDispatch, useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import CommentInput from './CommentInput';
import {
  resetCreateCommentForumsPost,
  resetGetAllCommentsByForumPostId,
  resetReplyCommentForumsPost,
  triggerGetAllCommentsByForumPostId,
  triggerReplyCommentForumsPost,
} from '../../Features/forums-post/forums_post_slice';
import SingleCommentRepliesWrapper from './SingleCommentRepliesWrapper';

const CommentedUser = ({
  commentedUser,
  getAllPostsLocal,
  setGetAllPostsLocal,
  post,
  forum,
  idType,
  createNewComment,
  setCreateNewComment,
  activePostTemp,
}) => {
  const { replyComment: replyCommentRedux, getCommentsByPostId } = useSelector(
    (state) => state.posts
  );
  const { getAllCommentsByForumPostId, replyCommentForumsPost } = useSelector(
    (state) => state.forumsPost
  );
  const dispatch = useDispatch();
  const { getMyProfile } = useSelector((state) => state.users);
  const [preloaderCommentReply, setPreloaderCommentReply] = useState('');

  const [reply, setReply] = useState('');
  const [replyPreloaderContent, setReplyPreloaderContent] = useState('');
  const [activeCommentedUser, setActiveCommentedUser] = useState({});
  const handleReplyComment = (commentedUserParam) => {
    setCreateNewComment(false);
    setActiveCommentedUser(commentedUser);
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
      dispatch(resetReplyComment());
      // new
      setShowLoader(false);
    }
  }, [getCommentsByPostId]);

  // forums
  useEffect(() => {
    if (
      replyCommentForumsPost.status === 'successful' &&
      replyCommentForumsPost.data?.commentId === commentedUser.commentId
    ) {
      console.log('true');
      // const data = {
      //   queryParams: { [idType]: replyCommentForumsPost[idType] },
      // };
      // remove
      const data = {
        queryParams: { [idType]: activePostTemp[idType] },
      };
      dispatch(triggerGetAllCommentsByForumPostId(data));
    }
  }, [replyCommentForumsPost]);

  useEffect(() => {
    // so that useefffect will run only once
    if (
      getAllCommentsByForumPostId.status === 'successful' &&
      replyCommentForumsPost.data?.commentId === commentedUser.commentId
    ) {
      console.log('two');

      const data = getAllPostsLocal.map((item) => {
        let itemObj = { ...item };
        if (item.postId === getAllCommentsByForumPostId.data.postId) {
          //  const itemObj2 = { ...getCommentsByPostId.data };
          const commentedUsers = itemObj.commentedUsers.map((commentedUser) => {
            const commentedUserObj = { ...commentedUser };
            if (
              commentedUser.commentId === replyCommentForumsPost.data?.commentId
            ) {
              console.log('commentedUserObj', commentedUserObj);
              console.log(
                'replyCommentForumsPost.data',
                replyCommentForumsPost.data
              );
              commentedUserObj.numberOfRepliesToDisplay =
                commentedUserObj.numberOfRepliesToDisplay + 1;
              commentedUserObj.replies = [
                ...commentedUserObj.replies,
                replyCommentForumsPost.data,
              ];
            }
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
      dispatch(resetGetAllCommentsByForumPostId());
      setPreloaderCommentReply('');
      // new
      setShowLoader(false);
    }
  }, [getAllCommentsByForumPostId]);

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
            {commentedUser?.replies?.length > 2 &&
              commentedUser.numberOfRepliesToDisplay <
                commentedUser.replies.length && (
                <div className='prev-posts-btn-wrapper'>
                  <p
                    onClick={() => {
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
                                    commentedUserObj.numberOfRepliesToDisplay +
                                    1;
                                }
                                return commentedUserObj;
                              }
                            );
                            postObj.commentedUsers = [...commentedUsers];
                          }

                          return postObj;
                        }
                      );
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
              setReplyComment={() => handleReplyComment()}
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
                focus={
                  commentedUser.showReplyCommentBox &&
                  !createNewComment &&
                  commentedUser.commentId === activeCommentedUser.commentId
                }
              />
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default CommentedUser;
