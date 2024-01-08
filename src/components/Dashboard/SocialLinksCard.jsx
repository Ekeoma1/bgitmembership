import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SocialLinksLoader from '../Atoms/skeleton-loaders/dashboard-page/SocialLinksLoader';
import useWindowSize from '../../hooks/useWindowSize';
import { renderToast } from '../Molecules/CustomToastify';
import {
  resetAddSocialLinks,
  resetUpdateSocialLinks,
  triggerGetSocialLinks,
} from '../../Features/social-links/social_links_slice';
import { triggerGetMyProfile } from '../../Features/users/users_slice';
import OutsideClickHandler from 'react-outside-click-handler';
import AddSocialLinksModalModal, {
  AddSocialLinksModalModal2,
} from '../Modals/AddSocialLinksModal';
import {
  FaDribbble,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const SocialLinksCard = ({ othersView, data }) => {
  const { isMobile } = useWindowSize();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getMyProfile } = useSelector((state) => state.users);
  const { addSocialLinks, getSocialLinks, updateSocialLinks } = useSelector(
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
        dispatch(triggerGetSocialLinks());
      }
      dispatch(resetAddSocialLinks());
    } else if (addSocialLinks.status === 'error') {
      renderToast({
        status: 'error',
        message: 'Social Link could not be added',
      });
      dispatch(resetAddSocialLinks());
    }
    // update social links
    if (updateSocialLinks.status === 'successful') {
      if (updateSocialLinks.data.status === 400) {
        renderToast({
          status: 'error',
          message: 'Social Link could not be added',
        });
      } else {
        renderToast({
          status: 'success',
          message: 'Social Link successfully added',
        });
        dispatch(triggerGetSocialLinks());
      }
      dispatch(resetUpdateSocialLinks());
    } else if (updateSocialLinks.status === 'error') {
      renderToast({
        status: 'error',
        message: 'Social Link could not be added',
      });
      dispatch(resetUpdateSocialLinks());
    }
  }, [addSocialLinks.status, updateSocialLinks.status]);

  useEffect(() => {
    dispatch(triggerGetSocialLinks());
  }, []);

  const [formData, setFormData] = useState([
    { title: 'facebook', url: '' },
    { title: 'twitter', url: '' },
    { title: 'instagram', url: '' },
    { title: 'linkedIn', url: '' },
    { title: 'dribble', url: '' },
  ]);

  useEffect(() => {
    if (getSocialLinks.status === 'successful') {
      console.log('formDataTemp########', getSocialLinks.data);
      if (getSocialLinks.data?.length === 0) {
        // console.log('0##############');
      } else {
        setFormData(getSocialLinks.data);
      }
    }
  }, [getSocialLinks]);
  // console.log('formData', formData);
  // console.log('getSocialLinks', getSocialLinks);

  return (
    <div className='dashboard-card social-links-wrapper'>
      <>
        <div className='dashboard-header'>Social Links</div>
        {getSocialLinks.status === 'base' ||
        getSocialLinks.status === 'loading' ? (
          <SocialLinksLoader />
        ) : getSocialLinks.status === 'successful' ? (
          <>
            {getSocialLinks.data?.length > 0 ? (
              <div className='social-links-con'>
                {getSocialLinks?.data?.map((link, key) => {
                  if (link.url !== '') {
                    return (
                      <div
                        key={key}
                        className='d-flexs '
                        onClick={() => {
                          // navigate(`${link.url}`, '_blank');
                          // window.open(`${link.url}`, '_blank').focus();
                          // const newTab = window.open(link.url, '_blank');
                          // if (newTab) {
                          //   newTab.focus(); // Ensure the new tab is focused
                          // }
                        }}
                      >
                        {/* <a
                          href={'shshak'}
                          target='_blank'
                          className=''
                          rel='noreferrer'
                        > */}
                        <div className=''>
                          <Link to={`${link.url}`} target='_blank'>
                            {link.title === 'facebook' ? (
                              <FaFacebook />
                            ) : link.title === 'twitter' ? (
                              <FaTwitter />
                            ) : link.title === 'linkedIn' ? (
                              <FaLinkedin />
                            ) : link.title === 'dribble' ? (
                              <FaDribbble />
                            ) : link.title === 'instagram' ? (
                              <FaInstagram />
                            ) : (
                              ''
                            )}
                            <span className='dashboard-text'>{link.url}</span>
                          </Link>
                        </div>

                        {/* </a> */}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
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
                          (addSocialLinks.status === 'loading' ||
                            updateSocialLinks.status === 'loading') &&
                          'add-text-btn-2'
                        } `}
                      >
                        {addSocialLinks.status === 'loading'
                          ? 'Adding Social links..'
                          : updateSocialLinks.status === 'loading'
                          ? 'Updating Social links..'
                          : '+ Add Social Link'}
                      </button>
                    )}
                    <div className='social-links'>
                      <div className='social-links-modal-wrapper'>
                        {showSocialLinksModal && (
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
      </>
    </div>
  );
};

export default SocialLinksCard;
