import React, { useEffect, useState } from 'react';
import Icon from '../Icon';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetCreatePost,
  triggerCreatePost,
} from '../../Features/posts/posts_slice';
import { renderToast } from '../Molecules/CustomToastify';
import MainButton from '../Molecules/MainButton';
import {
  resetCreateForumPost,
  triggerCreateForumPost,
} from '../../Features/forums-post/forums_post_slice';

const CreatePost = ({ forum }) => {
  const dispatch = useDispatch();
  const { createPost } = useSelector((state) => state.posts);
  const { createForumPost } = useSelector((state) => state.forumsPost);
  const { getForumById } = useSelector((state) => state.forums);
  const [postContent, setPostContent] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedMediaDispatch, setSelectedMediaDispatch] = useState(null);
  const [mediaType, setMediaType] = useState('image');
  // const [postReach, setPostReach] = useState('anyone');

  const handleMediaChange = (e, type) => {
    setSelectedMedia(null);
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedMedia(event.target.result);
      };
      reader.readAsDataURL(file);
      setSelectedMediaDispatch(file);
      // Get the file extension from the file name
      const fileExtension = file.name.split('.').pop().toLowerCase();
      // Check if the file is an image or a video based on the extension
      const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(
        fileExtension
      );
      const isVideo = ['mp4', 'avi', 'mov', 'wmv'].includes(fileExtension);
      setMediaType(isImage ? 'image' : isVideo ? 'video' : 'unknown');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let values = { content: postContent, postPhoto: '', postVideo: '' };
    if (selectedMediaDispatch) {
      // console.log('selected media dispatch');
      if (mediaType === 'image') {
        values = { ...values, postPhoto: selectedMediaDispatch };
      } else if (mediaType === 'video') {
        values = { ...values, postVideo: selectedMediaDispatch };
      }
    }
    if (forum) {
      const forumId = getForumById.data?.forum?.[0]?.forumId;
      values.forumId = forumId;
      console.log('forumid', forumId);
      console.log('values', values);
      dispatch(triggerCreateForumPost(values));
    } else {
      dispatch(triggerCreatePost(values));
    }
  };
  useEffect(() => {
    if (createPost.status === 'successful') {
      if (createPost.data) {
        renderToast({
          status: 'success',
          message: 'post added',
        });
      }
      setPostContent('');
      setSelectedMedia(null);
      setSelectedMediaDispatch(null);
      // setPostReach('anyone');
      dispatch(resetCreatePost());
    }
    if (createForumPost.status === 'successful') {
      if (createForumPost.data === 'Forum not found.') {
        renderToast({
          status: 'error',
          message: createForumPost.data,
        });
      } else {
        renderToast({
          status: 'success',
          message: 'forum post added',
        });
      }
      setPostContent('');
      setSelectedMedia(null);
      setSelectedMediaDispatch(null);
      // setPostReach('anyone');
      dispatch(resetCreateForumPost());
    }
  }, [createPost.status, createForumPost.status]);

  return (
    <div className='create-post-card shadow-sm mx-auto '>
      <div className='d-flex flex-wrap gap-2 align-items-center'>
        <h2>Create a Post</h2>

        <select
          // onChange={(e) => setPostReach(e.target.value)}
          name='postReach'
          id=''
        >
          <option value='anyone'>Anyone</option>
          <option value='onlyFriends'>Only Friends</option>
        </select>
      </div>

      <div className='form'>
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder='Heyy, I’ve just joined. Excited to meet you allll! 🥳💜'
        ></textarea>
        {selectedMedia && (
          <>
            <div className='text-end'>
              <button onClick={() => setSelectedMedia(null)}>
                <Icon icon='close' />
              </button>
            </div>

            <div className='image-video-wrapper'>
              {mediaType === 'image' ? (
                <img
                  src={selectedMedia}
                  alt='Uploaded'
                  style={{ maxWidth: '100%' }}
                />
              ) : (
                <video width='100%' controls>
                  <source src={selectedMedia} type='video/mp4' />
                  {/* Your browser does not support the video tag. */}
                </video>
              )}
            </div>
          </>
        )}

        <div className='d-flex justify-content-between align-items-center mt-3'>
          <div className='d-flex gap-2 align-items-center'>
            <label htmlFor='imageUpload'>
              <Icon icon='photo' />
              <input
                type='file'
                id='imageUpload'
                accept='image/*'
                onChange={(e) => handleMediaChange(e, 'image')}
                style={{ display: 'none' }}
              />
            </label>

            <label htmlFor='videoUpload'>
              <Icon icon='video' />
              <input
                type='file'
                id='videoUpload'
                accept='video/*'
                onChange={(e) => handleMediaChange(e, 'video')}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          <MainButton
            onClick={handleSubmit}
            text={'Post'}
            size={'small'}
            width={'17.5rem'}
            disabled={!postContent && !selectedMediaDispatch}
            loading={createPost.status === 'loading'}
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
