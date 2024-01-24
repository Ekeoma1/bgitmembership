import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SocialLinksLoader from '../Atoms/skeleton-loaders/dashboard-page/SocialLinksLoader';
import useWindowSize from '../../hooks/useWindowSize';
import { renderToast } from '../Molecules/CustomToastify';
import {
  resetAddSocialLinks,
  resetUpdateSocialLinks,
  triggerGetSocialLinks,
  triggerGetSocialLinksByUserId,
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
import { Link, useNavigate, useParams } from 'react-router-dom';

const SocialLinksCard = ({ othersView, data }) => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { getMyProfile } = useSelector((state) => state.users);
  const { addSocialLinks, getSocialLinksByUserId, updateSocialLinks } =
    useSelector((state) => state.socialLinks);
  const [showSocialLinksModal, setShowSocialLinksModal] = useState(false);
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
    const data = { queryParams: { userId: params.id } };
    dispatch(triggerGetSocialLinksByUserId(data));
  }, [params.id]);

  const [formData, setFormData] = useState([
    { title: 'facebook', url: '' },
    { title: 'twitter', url: '' },
    { title: 'instagram', url: '' },
    { title: 'linkedIn', url: '' },
    { title: 'dribble', url: '' },
  ]);

  useEffect(() => {
    if (getSocialLinksByUserId.status === 'successful') {
      if (getSocialLinksByUserId.data?.length === 0) {
      } else {
        setFormData(getSocialLinksByUserId.data);
      }
    }
  }, [getSocialLinksByUserId]);

  console.log(getSocialLinksByUserId)

  return (
    <div className='dashboard-card social-links-wrapper'>
      <>
        <div className='dashboard-header'>Social Links</div>
        {getSocialLinksByUserId.status === 'base' ||
          getSocialLinksByUserId.status === 'loading' ? (
          <SocialLinksLoader />
        ) : getSocialLinksByUserId.status === 'successful' ? (
          <>
            {Array.isArray(getSocialLinksByUserId.data) &&
              getSocialLinksByUserId.data?.length > 0 ? (
              <div className='social-links-con'>
                {getSocialLinksByUserId?.data?.map((link, key) => {
                  if (link.url !== '') {
                    return (
                      <div
                        key={key}
                        className='d-flexs '
                        onClick={() => {
                        }}
                      >
                        <div className=''>
                          <a rel='noreferrer'
                            href={`/${link.url}`}
                            target='_blank'>
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
                          </a>
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
                    {getSocialLinksByUserId.status === 'successful' && (
                      <button
                        onClick={() => {
                          addSocialLinks.status !== 'loading' &&
                            setShowSocialLinksModal(true);
                        }}
                        className={`add-text-btn ${(addSocialLinks.status === 'loading' ||
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
