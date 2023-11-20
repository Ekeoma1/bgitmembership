import React from 'react';
import '../../assets/scss/modal.scss';

import { FaCamera, FaChevronRight } from 'react-icons/fa';
import { BsImage } from 'react-icons/bs';

const UpdateCoverPhotoModal = ({ onChangeCoverPhoto }) => {
  return (
    <div className='update-profile-photo-modal'>
      <h5>Add photo</h5>
      <div className='btn-group-wrapper'>
        <label htmlFor='take-photo' className='btn-con'>
          <div className='text-wrapper'>
            <FaCamera className='icon' />
            <p>Take a photo</p>
          </div>
          <FaChevronRight className='icon' />
          <input
            name='take-photo'
            type='file'
            capture='user'
            accept='image/png'
            id='take-photo'
            onChange={onChangeCoverPhoto}
          />
        </label>
        <label htmlFor='upload' className='btn-con'>
          <div className='text-wrapper'>
            <BsImage className='icon' />
            <p>Upload from photos</p>
          </div>
          <FaChevronRight className='icon' />
          <input
            name='upload'
            type='file'
            capture='user'
            accept='image/*'
            id='upload'
            onChange={onChangeCoverPhoto}
          />
        </label>
      </div>
    </div>
  );
};

export default UpdateCoverPhotoModal;
