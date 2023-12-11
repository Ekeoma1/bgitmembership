import React, { useEffect, useRef, useState } from 'react';
import user from '../../assets/images/author1.png';
import { FaRegSmile } from 'react-icons/fa';
import { TbPhoto } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { BsSend } from 'react-icons/bs';
const CommentInput = ({
  name,
  value,
  onChange,
  onSubmit,
  focus,
  onChangeEmoji,
  onChangeFile,
}) => {
  const { getMyProfile } = useSelector((state) => state.users);
  const textInput = useRef(null);
  useEffect(() => {
    if (focus) {
      textInput.current?.focus();
    }
  }, [focus]);
  return (
    <div className='comment-input-box-component'>
      <div className='input-box'>
        <img src={getMyProfile.data?.imageUrl} alt='user-img' className='' />
        <div className='input-wrapper'>
          <input
            onChange={onChange}
            type='text'
            placeholder={
              name === 'comment' ? 'Leave your thoughts here' : 'Add a reply...'
            }
            name={name}
            ref={textInput}
            value={value}
          />
          <div className='actions' onClick={onSubmit}>
            <BsSend />
            {/* <label htmlFor='emoji'>
              <FaRegSmile />
              <input id='emoji' type='file' onChange={onChangeEmoji} />
            </label>
            <label htmlFor='file'>
              <TbPhoto />
              <input id='file' type='file' onChange={onChangeFile} />
            </label> */}
          </div>
        </div>
      </div>
      {/* <div className='btn-wrapper'>
        <button>Post</button>
      </div> */}
    </div>
  );
};

export default CommentInput;
