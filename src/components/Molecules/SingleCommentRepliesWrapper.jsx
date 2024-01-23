import React from 'react';
import '../../assets/scss/molecules.scss';

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
