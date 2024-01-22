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

const SingleCommentRepliesWrapper = ({
  commentedUser,
  getAllPostsLocal,
  setGetAllPostsLocal,
  post,
  forum,
  idType,
  activePostThatIsBeingReplied,
  handleSubmit,
}) => {
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
  return (
    <div className='single-comment-replies-wrapper'>
      {Array.isArray(commentedUser.replies) &&
        commentedUser.replies
          .slice(-commentedUser.numberOfRepliesToDisplay)
          .map((item, index) => (
            <SingleComment
              key={index}
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
              setGetAllPostsLocal={setGetAllPostsLocal}
            />
          ))}
    </div>
  );
};

export default SingleCommentRepliesWrapper;
