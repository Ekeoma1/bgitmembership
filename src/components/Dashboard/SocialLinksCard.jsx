import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SocialLinksLoader from '../Atoms/skeleton-loaders/dashboard-page/SocialLinksLoader';
import useWindowSize from '../../hooks/useWindowSize';
import { renderToast } from '../Molecules/CustomToastify';
import { resetAddSocialLinks } from '../../Features/social-links/social_links_slice';
import { triggerGetMyProfile } from '../../Features/users/users_slice';
import OutsideClickHandler from 'react-outside-click-handler';
import AddSocialLinksModalModal from '../Modals/AddSocialLinksModal';

const SocialLinksCard = ({ othersView }) => {
  const { isMobile } = useWindowSize();
  const dispatch = useDispatch();
  const { getMyProfile } = useSelector((state) => state.users);
  const { addSocialLinks } = useSelector((state) => state.socialLinks);
  const [showSocialLinksModal, setShowSocialLinksModal] = useState(true);

  const [formData, setFormData] = useState({
    url: '',
    title: '',
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleClearValues = () => {
    setFormData({ ...formData, url: '' });
  };

  useEffect(() => {
    if (addSocialLinks.status === 'successful') {
      if (addSocialLinks.data.status === 400) {
        renderToast({
          status: 'error',
          message: 'Social Link could not be added',
        });
      } else {
        renderToast({
          status: 'success',
          message: 'Social Link successfully added',
        });
        dispatch(triggerGetMyProfile());
      }
      dispatch(resetAddSocialLinks());
    } else if (addSocialLinks.status === 'error') {
      renderToast({
        status: 'error',
        message: 'Social Link could not be added',
      });
      dispatch(resetAddSocialLinks());
    }
  }, [addSocialLinks.status]);
  return (
    <div className='dashboard-card'>
      {getMyProfile.status === 'loading' ? (
        <>
          <SocialLinksLoader />
        </>
      ) : getMyProfile.status === 'successful' ? (
        <>
          <div className='dashboard-header'>Social Links</div>
          {getMyProfile.data?.socials?.length > 0 ? (
            <>
              {getMyProfile.data?.socials?.map((link, key) => {
                return (
                  <div
                    key={key}
                    className='d-flex gap-1 align-items-center mt-1'
                  >
                    <img width={30} src={link.logo} alt='logo' />
                    <span className='dashboard-text'>{link.link}</span>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <div className='dashboard-text'>
                You have not added any social link yet
              </div>
            </>
          )}
          {!othersView && (
            <div className='add-text-btn-wrapper'>
              {getMyProfile?.data?.userId && (
                <button
                  onClick={() => {
                    setShowSocialLinksModal(true);
                  }}
                  className='add-text-btn'
                >
                  + Add Social Links
                  <div className='social-links-modal-wrapper'>
                    {showSocialLinksModal && (
                      <OutsideClickHandler
                        onOutsideClick={() => {
                          setShowSocialLinksModal(false);
                        }}
                      >
                        <AddSocialLinksModalModal
                          onChange={handleChange}
                          onCancel={() => showSocialLinksModal(false)}
                          onClearValues={handleClearValues}
                          data={formData}
                        />
                      </OutsideClickHandler>
                    )}
                  </div>
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        <></>
      )}
     
    </div>
  );
};

export default SocialLinksCard;
