import React from 'react';
import '../../../../assets/scss/atoms.scss';

const PostsLoader = () => {
  return (
    <>
      <div className='posts-loader shadow-sm'>
        <div className='card-top'>
          <div className='profile-photo skeleton-loader'></div>
          <div className='card-details'>
            <div className='name skeleton-loader'></div>
            <div className='role skeleton-loader'></div>
            <div className='time skeleton-loader'></div>
          </div>
        </div>
        <div className='card-content skeleton-loader'></div>
      </div>
      <div className='posts-loader shadow-sm'>
        <div className='card-top'>
          <div className='profile-photo skeleton-loader'></div>
          <div className='card-details'>
            <div className='name skeleton-loader'></div>
            <div className='role skeleton-loader'></div>
            <div className='time skeleton-loader'></div>
          </div>
        </div>
        <div className='card-content2 skeleton-loader'></div>
      </div>
      <div className='posts-loader shadow-sm'>
        <div className='card-top'>
          <div className='profile-photo skeleton-loader'></div>
          <div className='card-details'>
            <div className='name skeleton-loader'></div>
            <div className='role skeleton-loader'></div>
            <div className='time skeleton-loader'></div>
          </div>
        </div>
        <div className='card-content skeleton-loader'></div>
      </div>
      <div className='posts-loader shadow-sm'>
        <div className='card-top'>
          <div className='profile-photo skeleton-loader'></div>
          <div className='card-details'>
            <div className='name skeleton-loader'></div>
            <div className='role skeleton-loader'></div>
            <div className='time skeleton-loader'></div>
          </div>
        </div>
        <div className='card-content2 skeleton-loader'></div>
      </div>
    </>
  );
};
export const PostsLoader2 = () => {
  return (
    <div className='posts-loader-2'>
      <div className='posts-loader shadow-sm'>
        <div className='card-top'>
          <div className='profile-photo skeleton-loader'></div>
          <div className='card-details'>
            <div className='name skeleton-loader'></div>
            <div className='role skeleton-loader'></div>
            <div className='time skeleton-loader'></div>
          </div>
        </div>
        <div className='card-content2 skeleton-loader'></div>
      </div>
      <div className='posts-loader shadow-sm'>
        <div className='card-top'>
          <div className='profile-photo skeleton-loader'></div>
          <div className='card-details'>
            <div className='name skeleton-loader'></div>
            <div className='role skeleton-loader'></div>
            <div className='time skeleton-loader'></div>
          </div>
        </div>
        <div className='card-content2 skeleton-loader'></div>
      </div>
    </div>
  );
};
export default PostsLoader;
