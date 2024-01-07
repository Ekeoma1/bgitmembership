import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SocialLinksLoader from '../Atoms/skeleton-loaders/dashboard-page/SocialLinksLoader';
import useWindowSize from '../../hooks/useWindowSize';
import { renderToast } from '../Molecules/CustomToastify';
import {
  resetAddSocialLinks,
  triggerGetSocialLinks,
} from '../../Features/social-links/social_links_slice';
import { triggerGetMyProfile } from '../../Features/users/users_slice';
import OutsideClickHandler from 'react-outside-click-handler';
import AddSocialLinksModalModal, {
  AddSocialLinksModalModal2,
} from '../Modals/AddSocialLinksModal';

const SocialLinksCard = ({ othersView, data }) => {
  const { isMobile } = useWindowSize();
  const dispatch = useDispatch();
  const { getMyProfile } = useSelector((state) => state.users);
  const { addSocialLinks, getSocialLinks } = useSelector(
    (state) => state.socialLinks
  );
  const [showSocialLinksModal, setShowSocialLinksModal] = useState(false);

  const handleChange = (e) => {
    const data = formData.map((item) => {
      if (item.Title === e.target.name) {
        item.Url = e.target.value;
      }
    });
    setFormData(data);
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

  useEffect(() => {
    dispatch(triggerGetSocialLinks());
  }, []);

  const [formData, setFormData] = useState([
    { title: 'Facebook', Url: '' },
    { title: 'Twitter', Url: '' },
    { title: 'Instagram', Url: '' },
    { title: 'LinkedIn', Url: '' },
    { title: 'Dribble', Url: '' },
  ]);

  useEffect(() => {
    if (getSocialLinks.status === 'successful') {
      // const formDataTemp = [...formData];
      // const data = getSocialLinks.data.forEach((item, index) => {
      //   formDataTemp[item.title] = item.Url;
      // });
      console.log('formDataTemp########', getSocialLinks.data);
      setFormData(getSocialLinks.data);
    }
  }, [getSocialLinks]);
  console.log('formData', formData);
  console.log('getSocialLinks', getSocialLinks);

  return (
    <div className='dashboard-card'>
      {data.status === 'loading' ? (
        <SocialLinksLoader />
      ) : data.status === 'successful' ? (
        <>
          <div className='dashboard-header'>Social Links</div>
          {data.data?.socials?.length > 0 ? (
            <>
              {data.data?.socials?.map((link, key) => {
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
              <div className='dashboard-text'>No social links</div>
            </>
          )}
          {data.data?.userId === getMyProfile.data?.userId && (
            <div className='add-text-btn-wrapper'>
              {data?.data?.userId && (
                <div className='con'>
                  {getSocialLinks.status === 'successful' && (
                    <button
                      onClick={() => {
                        addSocialLinks.status !== 'loading' &&
                          setShowSocialLinksModal(true);
                      }}
                      className={`add-text-btn ${
                        addSocialLinks.status === 'loading' && 'add-text-btn-2'
                      } `}
                    >
                      {addSocialLinks.status === 'loading'
                        ? 'Adding Social link..'
                        : '+ Add Social Link'}
                    </button>
                  )}
                  <div className='social-links'>
                    <div className='social-links-modal-wrapper'>
                      {(showSocialLinksModal || true) && (
                        <OutsideClickHandler
                          onOutsideClick={() => {
                            setShowSocialLinksModal(false);
                          }}
                        >
                          <AddSocialLinksModalModal
                            // onChange={handleChange}
                            onCancel={() => {
                              setShowSocialLinksModal(false);
                            }}
                            onClearValues={handleClearValues}
                            formData={formData}
                            setFormData={setFormData}
                          />
                        </OutsideClickHandler>
                      )}
                    </div>
                  </div>
                </div>
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
