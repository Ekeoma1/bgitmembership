import React, { useState, useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './SocialLinksModal.css';
import MainButton from '../../Molecules/MainButton';
import TextInput2 from '../../Form-Input/TextInput2';
import { triggerAddSocialLink } from '../../../Features/social-links/social_links_slice';

const SocialLinksModal = ({ close }) => {
  const dispatch = useDispatch();
  const { getMyProfile } = useSelector((state) => state.users);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    userId: '',
  });
  const { addSocialLinks } = useSelector((state) => state.socialLinks);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    console.log(formData);
    dispatch(triggerAddSocialLink(formData));
    close();
  };

  useEffect(() => {
    if (getMyProfile.status === 'successful') {
      setFormData({ ...formData, userId: getMyProfile?.data?.userId ?? '' });
    }
  }, [getMyProfile.status]);

  useEffect(() => {
    if (addSocialLinks.status === 'successful') {
      setFormData({
        title: '',
        url: '',
        userId: '',
      });
    }
  }, [addSocialLinks.status]);

  return (
    <div className='transaction-successful-modal '>
      <div className='fixed-top'>
        <div className='line' />
        <div className='top-bar'></div>
      </div>
      <div className='modal-box-content'>
        <div className='modal-box'>
          <div className='form-content'>
            <header>
              <>
                <h2>Add Social link</h2>
                <div>Add social link below</div>
              </>
            </header>
            <div className='input-field-wrapper'>
              <TextInput2
                name='title'
                label='Enter Title'
                type='text'
                onChange={handleChange}
                value={formData.title}
              />
            </div>
            <div className='input-field-wrapper'>
              <TextInput2
                name='url'
                label='Enter url'
                type='text'
                onChange={handleChange}
                value={formData.url}
              />
            </div>
          </div>

          <div className='text-center'>
            <div className='btn-wrapper'>
              <MainButton
                text={'Add'}
                width={'25.5rem'}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLinksModal;
