import { useState } from 'react';
import CloseAccountModal from '../Modals/CloseAccountModal';
import { useSelector } from 'react-redux';
import UserProfilePhotoLoader from '../Atoms/skeleton-loaders/dashboard-page/UserProfilePhotoLoader';

const CloseAccount = () => {
  const { getMyProfile } = useSelector((state) => state.users);
  const [modal, setModal] = useState(false);
  const [profileImgOnLoadStatus, setProfileImgOnLoadStatus] = useState('base');

  const hideModal = () => {
    setModal(false);
  };

  return (
    <div className='settings-card shadow position-relative '>
      <div className='header mb-3'>Close Account</div>

      <div className='profile-details'>
        <div className='profile-img '>
          {getMyProfile.status === 'base' ||
          getMyProfile.status === 'loading' ? (
            <>
              <UserProfilePhotoLoader />
            </>
          ) : (
            <>
              <img
                src={getMyProfile?.data?.imageUrl}
                alt={`${getMyProfile?.data?.firstName} ${getMyProfile?.data?.secondName}`}
                className={`${
                  profileImgOnLoadStatus === 'success' ? 'd-block' : 'd-none'
                }`}
                onLoad={() => setProfileImgOnLoadStatus('success')}
                onError={() => setProfileImgOnLoadStatus('error')}
              />
              {profileImgOnLoadStatus === 'base' && <UserProfilePhotoLoader />}
              {profileImgOnLoadStatus === 'error' && (
                <div className='error-img'>couldn't load img</div>
              )}
            </>
          )}
        </div>

        <div className='profile-info-wrapper'>
          <div className='name'>
            {getMyProfile?.data?.firstName} {getMyProfile?.data?.secondName}
          </div>
          <div className='role'>{getMyProfile?.data?.profession}</div>
          <div className='location'>{getMyProfile?.data?.city}</div>
        </div>
      </div>

      <div className='header mt-3'>This will Deactivate your Account</div>
      <p>
        You’re about to deactivate your account. Your profile will no longer be
        viewable on our website.
      </p>

      <div className='header mt-3'>What Else you should Know</div>
      <p>
        You can restore your account in 30 days if it was accidentally or
        wrongfully deactivated.
      </p>
      <p>
        Some information may still be available in search engines such as google
        and bing.
      </p>
      <p>If you want to change your username you can edit it in settings</p>

      <div className='text-center mt-5'>
        <button onClick={() => setModal(true)} className='del-btn'>
          Close Account
        </button>
      </div>

      <CloseAccountModal show={modal} hide={hideModal} />
    </div>
  );
};

export default CloseAccount;
