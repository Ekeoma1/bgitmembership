import React from 'react';
import '../../assets/scss/modal.scss';

import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { triggerAddSocialLink } from '../../Features/social-links/social_links_slice';

const AddSocialLinksModalModal = ({
  onChange,
  onCancel,
  onClearValues,
  formData,
  setFormData,
}) => {
  const dispatch = useDispatch();
  const handleSubmit = () => {
    console.log({ formData });
    dispatch(triggerAddSocialLink(formData));
    onCancel();
    setFormData({ url: '', title: '' });
  };
  return (
    <div className='add-social-links-modal'>
      <div className='top-card'>
        <p onClick={onCancel}>Cancel</p>
        <h5>Social link</h5>
        <p onClick={handleSubmit}>Done</p>
      </div>
      <div className='form'>
        <div className='input-con'>
          <p>URL</p>
          <div className='input-wrapper'>
            <input
              type='text'
              name='url'
              onChange={onChange}
              value={formData.url}
              className='input-2'
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
              value={formData.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSocialLinksModalModal;
