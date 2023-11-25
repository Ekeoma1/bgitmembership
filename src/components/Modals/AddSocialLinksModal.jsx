import React, { useEffect, useState } from 'react';
import '../../assets/scss/modal.scss';

import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
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
    dispatch(triggerAddSocialLink(formData));
    onCancel();
    setFormData({ url: '', title: '' });
  };
  return (
    <div className='add-social-links-modal shadow'>
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
export const AddSocialLinksModalModal2 = ({
  onChange,
  onCancel,
  onClearValues,
}) => {
  const dispatch = useDispatch();
  const { getUserProfileById } = useSelector((state) => state.users);
  const [formData, setFormData] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    tiktok: '',
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    dispatch(triggerAddSocialLink(formData));
    onCancel();
  };
  useEffect(() => {
    const entries = Object.entries(getUserProfileById.data?.socialLinks);
    entries.forEach((link) => {
      if (Object.keys(formData).includes(link[0])) {
        setFormData({ ...formData, [link[0]]: link[1] });
      }
    });
  }, []);
  return (
    <div className='add-social-links-modal-2 shadow'>
      <div className='top-card'>
        <p onClick={onCancel}>Cancel</p>
        <h5>Social link</h5>
        <p onClick={handleSubmit}>Done</p>
      </div>
      <div className='form'>
        <div className='input-con'>
          <label htmlFor='facebook'>Facebook</label>
          <input
            value={formData.facebook}
            name='facebook'
            type='text'
            id='facebook'
            onChange={handleChange}
          />
        </div>
        <div className='input-con'>
          <label htmlFor='twitter'>Twitter</label>
          <input
            value={formData.twitter}
            name='twitter'
            type='text'
            id='twitter'
            onChange={handleChange}
          />
        </div>
        <div className='input-con'>
          <label htmlFor='instagram'>Instagram</label>
          <input
            value={formData.instagram}
            name='instagram'
            type='text'
            id='instagram'
            onChange={handleChange}
          />
        </div>
        <div className='input-con'>
          <label htmlFor='tiktok'>Tiktok</label>
          <input
            value={formData.tiktok}
            name='tiktok'
            type='text'
            id='tiktok'
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};
export default AddSocialLinksModalModal;
