import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import Icon from '../Icon';
import '../../assets/scss/molecules.scss';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import SingleComment from './SingleComment';

const SingleCommentRepliesWrapper = ({
  commentedUser,
  getAllPostsLocal,
  setGetAllPostsLocal,
  post,
  forum,
  idType,
  setReplyComment,
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
              setReplyComment={() => setReplyComment()}
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
