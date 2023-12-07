import { useEffect, useState } from 'react';
import AccountActionModal from '../Modals/AccountActionModal';
import IndividualActionModal from '../Modals/IndividualActionModal';
import { useNavigate } from 'react-router-dom';
import ReportModal from '../Modals/ReportModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  triggerGetMyProfile,
  triggerUpdateBackgroundPicture,
  triggerUpdateProfilePicture,
} from '../../Features/users/users_slice';
import UserProfilePhotoLoader from '../Atoms/skeleton-loaders/dashboard-page/UserProfilePhotoLoader';
import DetailsLoader from '../Atoms/skeleton-loaders/dashboard-page/DetailsLoader';
// import defaultImg from '../../assets/images/default-photo.jpeg';
import defaultImg from '../../assets/images/main2.png';
import spinner from '../../assets/images/spinner2.png';
import { FaChevronRight } from 'react-icons/fa';
import { FaCamera } from 'react-icons/fa6';
import { GoPencil } from 'react-icons/go';
import { SingleLineLoader2 } from '../Atoms/skeleton-loaders/SingleLineLoader';
import { BsImage } from 'react-icons/bs';
import OutsideClickHandler from 'react-outside-click-handler/build/OutsideClickHandler';
import { LuMoreVertical } from 'react-icons/lu';
import UpdateCoverPhotoModal from '../Modals/UpdateCoverPhotoModal';
import {
  triggerSendConnectionRequest,
  triggerCancelConnectionRequest,
  resetSendConnectionRequest,
} from '../../Features/connections/connections_slice';

const ProfileBanner = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    getMyProfile,
    updateProfilePicture,
    updateBackgroundPicture,
    getUserProfileById,
  } = useSelector((state) => state.users);
  const { sendConnectionRequest, cancelConnectionRequest } = useSelector(
    (state) => state.connections
  );
  const [actionAcctModal, setActionAcctModal] = useState(false);
  const [individalAcctModal, setIndividualAcctModal] = useState(false);
  const [contentToShow, setContentToShow] = useState(null);
  const [reportModal, setReportModal] = useState(false);
  const [profileImgOnLoadStatus, setProfileImgOnLoadStatus] = useState('base');
  const [coverImgOnLoadStatus, setCoverImgOnLoadStatus] = useState('base');
  const [showDropdowm, setShowDropdown] = useState(false);
  const [uploadProfilePicture, setUploadProfilePicture] = useState({
    profilePicture: '',
  });
  const [uploadCoverPicture, setUploadCoverPicture] = useState({
    backgroundImage: '',
  });
  const [uploadedProfilePicture, setUploadedprofilePicture] = useState(false);
  const [uploadedCoverPicture, setUploadedCoverPicture] = useState(false);

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
  const handleChangeProfilePhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadProfilePicture({ profilePicture: file });
    }
  };
  const handleChangeCoverPhoto = (event) => {
    const name = event.target.name;
    if (name === 'take-photo') {
      const file = event.target.files[0];
      if (file) {
        setUploadCoverPicture({ backgroundImage: file });
      }
    } else {
      const file = event.target.files[0];
      if (file) {
        setUploadCoverPicture({ backgroundImage: file });
      }
    }
    setShowDropdown(false);
  };
  const handleConnect = () => {
    if (sendConnectionRequest.status === 'base') {
      const values = { receiverUserId: getUserProfileById.data?.userId };
      dispatch(triggerSendConnectionRequest(values));
    } else if (sendConnectionRequest.status === 'successful') {
      const values = { receiverUserId: getUserProfileById.data?.userId };
      dispatch(triggerCancelConnectionRequest(values));
    }
  };

  useEffect(() => {
    if (cancelConnectionRequest.status === 'successful') {
      dispatch(resetSendConnectionRequest());
    }
  }, [cancelConnectionRequest]);

  useEffect(() => {
    if (uploadProfilePicture.profilePicture) {
      setUploadedprofilePicture(true);
      setProfileImgOnLoadStatus('base');
      dispatch(triggerUpdateProfilePicture(uploadProfilePicture));
    }
  }, [uploadProfilePicture]);
  
  useEffect(() => {
    if (uploadCoverPicture.backgroundImage) {
      setUploadedCoverPicture(true);
      setCoverImgOnLoadStatus('base');
      dispatch(triggerUpdateBackgroundPicture(uploadCoverPicture));
    }
  }, [uploadCoverPicture]);

  useEffect(() => {
    if (updateProfilePicture.status === 'successful') {
      dispatch(triggerGetMyProfile());
      setUploadProfilePicture({ profilePicture: '' });
    }
  }, [updateProfilePicture]);

  useEffect(() => {
    if (updateBackgroundPicture.status === 'successful') {
      setUploadCoverPicture({ backgroundImage: '' });
    }
  }, [updateBackgroundPicture]);

  return (
    <div className='profile-banner-wrapper'>
      {/* cover photo */}
      <div className='banner-image'>
        {data?.status === 'base' || data?.status === 'loading' ? (
          <div className='loading-state'>
            <SingleLineLoader2 />
          </div>
        ) : data.status === 'successful' ? (
          <>
            <div className='cover-img-wrapper'>
              {uploadedCoverPicture ? (
                <>
                  {updateBackgroundPicture.status === 'successful' && (
                    <img
                      src={updateBackgroundPicture?.data?.backgroundImageUrl}
                      alt={`${updateBackgroundPicture?.data?.firstName} ${updateBackgroundPicture?.data?.secondName}`}
                      className={`${
                        coverImgOnLoadStatus === 'success'
                          ? 'd-block'
                          : 'd-none'
                      }`}
                      onLoad={() => setCoverImgOnLoadStatus('success')}
                      onError={() => setCoverImgOnLoadStatus('error')}
                    />
                  )}
                  {(coverImgOnLoadStatus === 'base' ||
                    updateBackgroundPicture.status === 'base' ||
                    updateBackgroundPicture.status === 'loading') && (
                    <div className='cover-img-loader-wrapper'>
                      <SingleLineLoader2 />
                    </div>
                  )}
                  {coverImgOnLoadStatus === 'error' && (
                    <img
                      src={defaultImg}
                      alt={`${data?.data?.firstName} ${data?.data?.secondName}`}
                    />
                  )}
                </>
              ) : (
                <>
                  <img
                    src={data?.data?.backgroundImageUrl}
                    alt={`${data?.data?.firstName} ${data?.data?.secondName}`}
                    className={`${
                      coverImgOnLoadStatus === 'success' ? 'd-block' : 'd-none'
                    }`}
                    onLoad={() => setCoverImgOnLoadStatus('success')}
                    onError={() => setCoverImgOnLoadStatus('error')}
                  />
                  {coverImgOnLoadStatus === 'base' &&
                    data?.data?.backgroundImageUrl && (
                      <div className='cover-img-loader-wrapper'>
                        <SingleLineLoader2 />
                      </div>
                    )}
                  {(coverImgOnLoadStatus === 'error' ||
                    !data?.data?.backgroundImageUrl) && (
                    <img
                      src={defaultImg}
                      alt={`${data?.data?.firstName} ${data?.data?.secondName}`}
                    />
                  )}
                </>
              )}

              {data.data?.userId === getMyProfile.data?.userId &&
                data.status === 'successful' &&
                (coverImgOnLoadStatus === 'success' ||
                  coverImgOnLoadStatus === 'base') && (
                  <div className='dropdown-box-wrapper'>
                    <div
                      className='icon-wrapper'
                      onClick={() => setShowDropdown(!showDropdowm)}
                    >
                      <GoPencil className='icon' />
                    </div>
                    {showDropdowm && (
                      <OutsideClickHandler
                        onOutsideClick={() => {
                          setShowDropdown(false);
                        }}
                      >
                        <UpdateCoverPhotoModal
                          onChangeCoverPhoto={handleChangeCoverPhoto}
                        />
                      </OutsideClickHandler>
                    )}
                  </div>
                )}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      {/* profile photo */}
      <div className='profile-image-wrapper'>
        <div className='profile-image'>
          {data?.status === 'base' || data?.status === 'loading' ? (
            <div className='user-profile-loader-wrapper'>
              <UserProfilePhotoLoader />
            </div>
          ) : (
            <>
              <div className='img-wrapper'>
                {uploadedProfilePicture ? (
                  <>
                    {updateProfilePicture.status === 'successful' && (
                      <img
                        src={updateProfilePicture.data?.imageUrl}
                        alt={`${updateProfilePicture.data?.firstName} ${updateProfilePicture.data?.secondName}`}
                        className={`${
                          profileImgOnLoadStatus === 'success'
                            ? 'd-block'
                            : 'd-none'
                        }`}
                        onLoad={() => setProfileImgOnLoadStatus('success')}
                        onError={() => setProfileImgOnLoadStatus('error')}
                      />
                    )}
                    {(profileImgOnLoadStatus === 'base' ||
                      updateProfilePicture.status === 'base' ||
                      updateProfilePicture.status === 'loading') && (
                      <div className='user-profile-loader-wrapper'>
                        <UserProfilePhotoLoader />
                      </div>
                    )}
                    {profileImgOnLoadStatus === 'error' && (
                      <img
                        src={defaultImg}
                        alt={`${data?.data?.firstName} ${data?.data?.secondName}`}
                      />
                    )}
                    {(profileImgOnLoadStatus === 'success' ||
                      profileImgOnLoadStatus === 'error') &&
                      updateProfilePicture.data?.userId ===
                        getMyProfile.data?.userId && (
                        <label
                          className='icon-wrapper'
                          htmlFor='upload-profile-photo'
                        >
                          <FaCamera className='icon' />
                          <input
                            name='upload-profile-photo'
                            type='file'
                            capture='user'
                            accept='image/png'
                            id='upload-profile-photo'
                            onChange={handleChangeProfilePhoto}
                          />
                        </label>
                      )}
                  </>
                ) : (
                  <>
                    <img
                      src={data?.data?.imageUrl}
                      alt={`${data?.data?.firstName} ${data?.data?.secondName}`}
                      className={`${
                        profileImgOnLoadStatus === 'success'
                          ? 'd-block'
                          : 'd-none'
                      }`}
                      onLoad={() => setProfileImgOnLoadStatus('success')}
                      onError={() => setProfileImgOnLoadStatus('error')}
                    />
                    {profileImgOnLoadStatus === 'base' && (
                      <div className='user-profile-loader-wrapper'>
                        <UserProfilePhotoLoader />
                      </div>
                    )}
                    {profileImgOnLoadStatus === 'error' && (
                      <img
                        src={defaultImg}
                        alt={`${data?.data?.firstName} ${data?.data?.secondName}`}
                      />
                    )}
                    {(profileImgOnLoadStatus === 'success' ||
                      profileImgOnLoadStatus === 'error') &&
                      data.data?.userId === getMyProfile.data?.userId && (
                        <label
                          className='icon-wrapper'
                          htmlFor='upload-profile-photo'
                        >
                          <FaCamera className='icon' />
                          <input
                            name='upload-profile-photo'
                            type='file'
                            capture='user'
                            accept='image/png'
                            id='upload-profile-photo'
                            onChange={handleChangeProfilePhoto}
                          />
                        </label>
                      )}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {/* details */}
      <div className='profile-details-card'>
        <div className='row'>
          {data?.status === 'base' || data?.status === 'loading' ? (
            <DetailsLoader />
          ) : (
            <>
              <div className='col-md-11 col-10'>
                <div className='row gap-md-0 gap-2'>
                  <div className='col-md-6'>
                    <h2 className='profile-name'>
                      {data?.data?.firstName} {data?.data?.secondName}
                    </h2>
                    {/* Added  this so users can see their emails as well. It's not on the original design. Remove if it's not okay*/}
                    <div className='email'>{data?.data?.email}</div>
                    <div className='detail'>{data?.data?.niche}</div>
                    <div className='detail'>{data?.data?.profession}</div>
                    <div className='other-details location'>
                      {data?.data?.city}
                    </div>
                    <div className='other-details connect'>
                      {data?.data?.connectionCount} connections
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='tag-header'>Tags</div>
                    <div className='d-flex gap-2 flex-wrap align-items-center'>
                      {data?.data?.tags?.length > 0 ? (
                        data?.data?.tags?.map((tag, index) => (
                          <div key={index} className='other-details tag-names'>
                            {tag}
                          </div>
                        ))
                      ) : (
                        <div className='other-details tag-names'>No tags</div>
                      )}
                      {data.data?.tags?.length > 3 && (
                        <div className='see-more-btn d-lg-flex d-none'>
                          see more
                        </div>
                      )}
                    </div>
                    <div className='tag-header mt-2'>Featured Skill</div>
                    <div className='d-flex gap-3 flex-wrap align-items-center'>
                      {data?.data?.skills?.length > 0 ? (
                        data?.data?.skills?.map((skill, index) => (
                          <div key={index} className='other-details tag-names'>
                            {skill}
                          </div>
                        ))
                      ) : (
                        <div className='other-details tag-names'>No skills</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-1 col-2 more'>
                {data.data?.userId === getMyProfile.data?.userId ? (
                  <button>
                    <div onClick={() => navigate('/settings')}>
                      <GoPencil className='icon' />
                    </div>
                  </button>
                ) : (
                  <button onClick={toggleAcctModal}>
                    <LuMoreVertical className='icon' />
                  </button>
                )}
                {data.data?.userId !== getMyProfile.data?.userId && (
                  <OutsideClickHandler
                    onOutsideClick={() => {
                      setActionAcctModal(false);
                    }}
                  >
                    <AccountActionModal
                      reportAction={setReportModal}
                      show={actionAcctModal}
                      action={showIndividualAcctModal}
                    />
                  </OutsideClickHandler>
                )}
                {data.data?.userId !== getMyProfile.data?.userId && (
                  <OutsideClickHandler
                    onOutsideClick={() => {
                      setIndividualAcctModal(false);
                    }}
                  >
                    <IndividualActionModal
                      show={individalAcctModal}
                      tab={contentToShow}
                      close={hideIndividualAcctModal}
                    />
                  </OutsideClickHandler>
                )}
              </div>
            </>
          )}
        </div>

        {data.data?.userId !== getMyProfile.data?.userId &&
          data?.status === 'successful' && (
            <div className='d-flex c-gap-10 flex-wrap mt-3'>
              <button
                onClick={handleConnect}
                className={`reach-btn ${
                  sendConnectionRequest.status === 'loading' && 'loading'
                }`}
              >
                {sendConnectionRequest.status === 'loading' ||
                sendConnectionRequest.status === 'loading' ? (
                  <img src={spinner} alt='spinner' />
                ) : sendConnectionRequest.status === 'successful' ? (
                  <>
                    {sendConnectionRequest.data === 'Connection request sent' &&
                      'Cancel request'}
                  </>
                ) : (
                  '+ Connect'
                )}
              </button>

              <button onClick={() => {}} className='reach-btn'>
                Message
              </button>
            </div>
          )}
      </div>
      {/* Adjust this later */}
      {data.data?.userId !== getMyProfile.data?.userId && (
        <ReportModal showReport={reportModal} reportAction={setReportModal} />
      )}
    </div>
  );
};

export default ProfileBanner;
