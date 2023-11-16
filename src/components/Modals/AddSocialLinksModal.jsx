import React from 'react';
import '../../assets/scss/modal.scss';

import { FaCamera, FaChevronRight, FaTimes } from 'react-icons/fa';
import { BsImage } from 'react-icons/bs';

const AddSocialLinksModalModal = ({
  onChange,
  onCancel,
  onClearValues,
  data,
}) => {
  return (
    <div className='add-social-links-modal'>
      <div className='top-card'>
        <p onClick={onCancel}>Cancel</p>
        <h5>Social link</h5>
        <p onClick={onCancel}>Done</p>
      </div>
      <div className='form'>
        <div className='input-con'>
          <p>URL</p>
          <div className='input-wrapper'>
            <input
              type='text'
              name='url'
              onChange={onChange}
              value={data.url}
            />
            <div className='icon-wrapper' onClick={onClearValues}>
              <FaTimes />
            </div>
          </div>
        </div>
        <div className='input-con'>
          <p>Title</p>
          <div className='input-wrapper'>
            <input
              type='text'
              name='title'
              onChange={onChange}
              value={data.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSocialLinksModalModal;
