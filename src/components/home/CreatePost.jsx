import React, { useEffect, useState } from 'react';
import Icon from '../Icon';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetCreatePost,
  triggerCreatePost,
} from '../../Features/posts/posts_slice';
import { renderToast } from '../Molecules/CustomToastify';

const CreatePost = () => {
  const dispatch = useDispatch();
  const { createPost } = useSelector((state) => state.posts);
  const [postContent, setPostContent] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedMediaDispatch, setSelectedMediaDispatch] = useState(null);
  const [mediaType, setMediaType] = useState('image');
  const [postReach, setPostReach] = useState('anyone');

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
    let values = { content: postContent };
    if (selectedMediaDispatch) {
      if (mediaType === 'image') {
        values = { ...values, postPhoto: selectedMediaDispatch };
      } else if (mediaType === 'video') {
        values = { ...values, postVideo: selectedMediaDispatch };
      }
    }
    dispatch(triggerCreatePost(values));
  };
  useEffect(() => {
    if (createPost.status === 'successful') {
      renderToast({
        status: 'success',
        message: 'post added',
      });
      setPostContent('');
      setSelectedMedia(null);
      setPostReach('anyone');
      dispatch(resetCreatePost());
    }
  }, [createPost.status]);
  console.log('selectedMedia', selectedMediaDispatch);

  return (
    <div className='create-post-card shadow-sm mx-auto '>
      <div className='d-flex flex-wrap gap-2 align-items-center'>
        <h2>Create a Post</h2>

        <select
          onChange={(e) => setPostReach(e.target.value)}
          name='postReach'
          id=''
        >
          <option value='anyone'>Anyone</option>
          <option value='onlyFriends'>Only Friends</option>
        </select>
      </div>

      <form onSubmit={handleSubmit}>
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
          <button type='submit' className='primary-btn small-btn'>
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
