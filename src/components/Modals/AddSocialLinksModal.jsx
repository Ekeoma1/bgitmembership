import React, { useEffect, useState } from 'react';
import '../../assets/scss/modal.scss';

import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  triggerAddSocialLink,
  triggerUpdateSocialLinks,
} from '../../Features/social-links/social_links_slice';

const AddSocialLinksModalModal = ({
  onChange,
  onCancel,
  onClearValues,
  formData,
  setFormData,
}) => {
  const dispatch = useDispatch();
  const { getSocialLinks } = useSelector((state) => state.socialLinks);
  const handleSubmit = () => {
    console.log(formData);
    const values = formData.map((item) => {
      const obj = { ...item };
      delete obj.userId;
      return obj;
    });
    if (getSocialLinks.data.length === 0) {
      console.log('data add', values);
      dispatch(triggerAddSocialLink(values));
    } else {
      console.log('data update', values);
      dispatch(triggerUpdateSocialLinks(values));
    }
    onCancel();
  };
  return (
    <div className='add-social-links-modal shadow'>
      <div className='top-card'>
        <p onClick={onCancel}>Cancel</p>
        <h5>Social link</h5>
        <p onClick={handleSubmit}>Done</p>
      </div>
      <div className='form'>
        {formData.map((item, index) => (
          <div className='input-con' key={index}>
            <p>{item?.title}</p>
            <div className='input-wrapper'>
              <input
                type='text'
                name={item?.title}
                onChange={(e) => {
                  const data = formData.map((item) => {
                    const obj = { ...item };
                    if (item.title === e.target.name) {
                      obj.url = e.target.value;
                    }
                    return obj;
                  });
                  setFormData(data);
                }}
                value={item?.url}
                className='input-2'
              />
              <div
                className='icon-wrapper'
                onClick={(obj) => {
                  const data = formData.map((item2) => {
                    const obj = { ...item2 };
                    if (item2.title === item.title) {
                      obj.url = '';
                    }
                    return obj;
                  });
                  setFormData(data);
                }}
              >
                <FaTimes />
              </div>
            </div>
          </div>
        ))}
        {/* <div className='input-con'>
          <p>Twitter</p>
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
          <p>Instagram</p>
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
          <p>Dribble</p>
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
        </div> */}
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
