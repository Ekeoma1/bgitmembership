import { useEffect, useState } from 'react';
import Icon from '../Icon';
import AccountActionModal from '../Modals/AccountActionModal';
import IndividualActionModal from '../Modals/IndividualActionModal';
import { Link } from 'react-router-dom';
import ReportModal from '../Modals/ReportModal';
import { useDispatch, useSelector } from 'react-redux';
import { triggerGetMyProfile } from '../../Features/users/users_slice';
import UserProfilePhotoLoader from '../Atoms/skeleton-loaders/usercoinsLoader/UserProfilePhotoLoader';

const ProfileBanner = ({ othersView }) => {
  const [actionAcctModal, setActionAcctModal] = useState(false);
  const [individalAcctModal, setIndividualAcctModal] = useState(false);
  const [contentToShow, setContentToShow] = useState(null);
  const [reportModal, setReportModal] = useState(false);
  const [profileImgOnLoadStatus, setProfileImgOnLoadStatus] = useState('base');

  const toggleAcctModal = () => {
    setActionAcctModal(!actionAcctModal);
  };

  const showIndividualAcctModal = (num) => {
    setContentToShow(num);
    setIndividualAcctModal(true);
  };

  const hideIndividualAcctModal = () => {
    setIndividualAcctModal(false);
  };
  const dispatch = useDispatch();
  const { getMyProfile } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(triggerGetMyProfile());
  }, []);

  // console.log('profile', getMyProfile);
  console.log('status', profileImgOnLoadStatus);
  return (
    <div className='profile-banner-wrapper'>
      <div className='banner-image'></div>
      <div className='profile-image-wrapper'>
        <div className='profile-image'>
          <img
            src={getMyProfile.data.imageUrl}
            alt={`${getMyProfile.data.firstName} ${getMyProfile.data.secondName}`}
            className={`${
              profileImgOnLoadStatus === 'success' ? 'd-block' : 'd-none'
            }`}
            onLoad={() => setProfileImgOnLoadStatus('success')}
            onError={() => setProfileImgOnLoadStatus('error')}
          />

          {profileImgOnLoadStatus === 'base' && <UserProfilePhotoLoader />}
          {profileImgOnLoadStatus === 'error' && (
            <div className='error-img'>couldn't load img</div>
            // <ErrorState3 text="Couldn't load image" borderNone height='2rem' />
          )}
        </div>
      </div>
      <div className='profile-details-card'>
        <div className='row'>
          <div className='col-md-11 col-10'>
            <div className='row gap-md-0 gap-2'>
              <div className='col-md-6'>
                <h2 className='profile-name'>
                  {getMyProfile.data.firstName} {getMyProfile.data.secondName}
                </h2>
                <div className='job'>{getMyProfile.data.niche}</div>
                <div className='job'>Product</div>
                <div className='other-details location'>
                  {getMyProfile.data.city}
                </div>
                <div className='other-details connect'>21 connections</div>
              </div>
              <div className='col-md-6'>
                <div className='tag-header'>Tags</div>
                <div className='d-flex gap-2 flex-wrap align-items-center'>
                  {getMyProfile.data.tags?.length > 0 ? (
                    getMyProfile.data.tags?.map((tag) => (
                      <div className='other-details tag-names'>{tag}</div>
                    ))
                  ) : (
                    <div className='other-details tag-names'>
                      You have no tags
                    </div>
                  )}
                  {!othersView && getMyProfile.data.tags?.length > 3 && (
                    <div className='see-more-btn d-lg-flex d-none'>
                      see 2 more
                    </div>
                  )}
                </div>

                <div className='tag-header mt-2'>Featured Skill</div>
                <div className='d-flex gap-3 flex-wrap align-items-center'>
                  {getMyProfile.data.skills?.length > 0 ? (
                    getMyProfile.data.skills?.map((skill) => (
                      <div className='other-details tag-names'>{skill}</div>
                    ))
                  ) : (
                    <div className='other-details tag-names'>
                      No skills added yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-1 col-2'>
            {othersView ? (
              <button onClick={toggleAcctModal}>
                <Icon icon='elipse' />
              </button>
            ) : (
              <button>
                <Icon icon='edit' />
              </button>
            )}
          </div>
        </div>

        {othersView && (
          <div className='d-flex c-gap-10 flex-wrap mt-3'>
            <button className='reach-btn'>+ Connect</button>

            <Link className='reach-btn' to='#'>
              Message
            </Link>
          </div>
        )}
      </div>

      {othersView && (
        <AccountActionModal
          reportAction={setReportModal}
          show={actionAcctModal}
          action={showIndividualAcctModal}
        />
      )}
      {othersView && (
        <IndividualActionModal
          show={individalAcctModal}
          tab={contentToShow}
          close={hideIndividualAcctModal}
        />
      )}
      {othersView && (
        <ReportModal showReport={reportModal} reportAction={setReportModal} />
      )}
    </div>
  );
};

export default ProfileBanner;
