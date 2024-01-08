import { useEffect, useState } from 'react';
import AccountActionModal from '../Modals/AccountActionModal';
import _ from 'lodash';
import IndividualActionModal from '../Modals/IndividualActionModal';
import { useNavigate, useParams } from 'react-router-dom';
import ReportModal from '../Modals/ReportModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  triggerGetConnectionStatusByUserId,
  triggerGetMyProfile,
  triggerGetUserProfileById,
  triggerUpdateBackgroundPicture,
  triggerUpdateProfilePicture,
} from '../../Features/users/users_slice';
import UserProfilePhotoLoader from '../Atoms/skeleton-loaders/dashboard-page/UserProfilePhotoLoader';
import DetailsLoader from '../Atoms/skeleton-loaders/dashboard-page/DetailsLoader';
// import defaultImg from '../../assets/images/default-photo.jpeg';
import defaultImg from '../../assets/images/main2.png';
import spinner from '../../assets/images/spinner2.png';
import { FaUserClock, FaUserTimes } from 'react-icons/fa';
import { FaCamera } from 'react-icons/fa6';
import { GoPencil } from 'react-icons/go';
import { SingleLineLoader2 } from '../Atoms/skeleton-loaders/SingleLineLoader';
import OutsideClickHandler from 'react-outside-click-handler/build/OutsideClickHandler';
import { LuMoreVertical } from 'react-icons/lu';
import UpdateCoverPhotoModal from '../Modals/UpdateCoverPhotoModal';
import {
  triggerSendConnectionRequest,
  triggerCancelConnectionRequest,
  resetSendConnectionRequest,
  resetCancelConnectionRequest,
  triggerRemoveConnection,
  resetRemoveConnection,
  triggerAcceptConnectionRequest,
  triggerRejectConnectionRequest,
  resetAcceptConnectionRequest,
} from '../../Features/connections/connections_slice';
import { resetReportUser } from '../../Features/reports/reports_slice';
import { renderToast } from '../Molecules/CustomToastify';
import {
  resetBlockUser,
  resetMuteUser,
  resetUnblockUser,
  resetUnmuteUser,
} from '../../Features/account-privacies/account_privacies_slice';

const ProfileBanner = ({ data, from, setFrom }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const {
    getMyProfile,
    updateProfilePicture,
    updateBackgroundPicture,
    getUserProfileById,
  } = useSelector((state) => state.users);
  const { blockUser, unblockUser, muteUser, unmuteUser } = useSelector(
    (state) => state.accountPrivacies
  );
  const {
    sendConnectionRequest,
    cancelConnectionRequest,
    removeConnection,
    acceptConnectionRequest,
    rejectConnectionRequest,
  } = useSelector((state) => state.connections);

  const { getConnectionStatusByUserId } = useSelector((state) => state.users);
  const { reportUser } = useSelector((state) => state.reports);
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
  const handleConnect = (e) => {
    setFrom('profile-banner');
    const values = { receiverUserId: getUserProfileById.data?.userId };
    if (getConnectionStatusByUserId.data?.connectionStatus === 'Pending') {
      dispatch(triggerCancelConnectionRequest(values));
    } else if (
      getConnectionStatusByUserId.data?.connectionStatus === 'Not Connected'
    ) {
      dispatch(triggerSendConnectionRequest(values));
    } else if (
      getConnectionStatusByUserId.data?.connectionStatus === 'Connected'
    ) {
      dispatch(triggerRemoveConnection(values));
    } else if (
      getConnectionStatusByUserId.data?.connectionStatus === 'Request Sent'
    ) {
      const values = {
        connectionId: getConnectionStatusByUserId.data?.connectionId,
      };
      if (e.target.closest('.accept-request')) {
        dispatch(triggerAcceptConnectionRequest(values));
      } else if (e.target.closest('.reject-request')) {
        dispatch(triggerRejectConnectionRequest(values));
      }
    }
  };
  const [dataLocal, setDataLocal] = useState(data);
  useEffect(() => {
    if (data.status === 'successful') {
      setDataLocal(data.data);
    }
  }, [data.status]);

  useEffect(() => {
    if (
      sendConnectionRequest.status === 'successful' &&
      from === 'profile-banner'
    ) {
      if (sendConnectionRequest.data.status === 'success') {
        renderToast({
          status: 'success',
          message: 'Connection request sent',
        });
        const data = { queryParams: { userId: param?.id } };
        dispatch(triggerGetConnectionStatusByUserId(data));
        dispatch(resetSendConnectionRequest());
      }
    }
    if (
      cancelConnectionRequest.status === 'successful' &&
      from === 'profile-banner'
    ) {
      if (cancelConnectionRequest.data.status === 'success') {
        renderToast({
          status: 'success',
          message: 'Connection request cancelled',
        });
        const data = { queryParams: { userId: param?.id } };
        dispatch(triggerGetConnectionStatusByUserId(data));
        dispatch(resetCancelConnectionRequest());
      }
    }
    if (removeConnection.status === 'successful') {
      if (removeConnection.data.status === 'success') {
        renderToast({
          status: 'success',
          message: 'Connection removed',
        });
        const data = { queryParams: { userId: param?.id } };
        dispatch(triggerGetConnectionStatusByUserId(data));
        dispatch(resetRemoveConnection());
        const dataLocalTemp = { ...dataLocal };
        setDataLocal({
          ...dataLocalTemp,
          connectionCount: dataLocalTemp.connectionCount - 1,
        });
      }
    }
    // accept connection request
    if (
      acceptConnectionRequest.status === 'successful' &&
      from === 'profile-banner'
    ) {
      if (acceptConnectionRequest.data.status === 'success') {
        renderToast({
          status: 'success',
          message: 'Connection request accepted',
        });
        const data = { queryParams: { userId: param?.id } };
        dispatch(triggerGetConnectionStatusByUserId(data));
        dispatch(resetAcceptConnectionRequest());
        const dataLocalTemp = { ...dataLocal };
        setDataLocal({
          ...dataLocalTemp,
          connectionCount: dataLocalTemp.connectionCount + 1,
        });
      }
    }

    // reject connection request
    if (
      rejectConnectionRequest.status === 'successful' &&
      from === 'profile-banner'
    ) {
      if (rejectConnectionRequest.data.status === 'success') {
        renderToast({
          status: 'success',
          message: 'Connection request rejected',
        });
        const data = { queryParams: { userId: param?.id } };
        dispatch(triggerGetConnectionStatusByUserId(data));
        dispatch(resetAcceptConnectionRequest());
      }
    }

    // report
    if (reportUser.status === 'successful') {
      renderToast({
        status: 'success',
        message: reportUser?.data,
      });
      dispatch(resetReportUser());
    }
    if (blockUser.status === 'successful') {
      if (blockUser.data.success) {
        renderToast({
          status: 'success',
          message: 'User blocked successfully',
        });
        navigate('/');
      } else {
        renderToast({
          status: 'error',
          message: 'Something went wrong',
        });
      }
      dispatch(resetBlockUser());
    }
    if (unblockUser?.status === 'successful') {
      if (unblockUser.data.success) {
        renderToast({
          status: 'success',
          message: 'User unblocked successfully',
        });
        const data = {
          queryParams: { userId: getUserProfileById.data?.userId },
        };
        dispatch(triggerGetUserProfileById(data));
      } else {
        renderToast({
          status: 'error',
          message: 'Something went wrong',
        });
      }
      dispatch(resetUnblockUser());
    }
    if (muteUser.status === 'successful') {
      if (muteUser.data.success) {
        renderToast({
          status: 'success',
          message: 'User muted successfully',
        });
        const data = {
          queryParams: { userId: getUserProfileById.data?.userId },
        };
        dispatch(triggerGetUserProfileById(data));
      } else {
        renderToast({
          status: 'error',
          message: 'Something went wrong',
        });
      }
      dispatch(resetMuteUser());
    }
    if (unmuteUser.status === 'successful') {
      if (unmuteUser.data.success) {
        renderToast({
          status: 'success',
          message: 'User unmuted successfully',
        });
        const data = {
          queryParams: { userId: getUserProfileById.data?.userId },
        };
        dispatch(triggerGetUserProfileById(data));
      } else {
        renderToast({
          status: 'error',
          message: 'Something went wrong',
        });
      }
      dispatch(resetUnmuteUser());
    }
  }, [
    sendConnectionRequest,
    cancelConnectionRequest,
    removeConnection,
    reportUser,
    blockUser,
    unblockUser,
    muteUser,
    unmuteUser,
    acceptConnectionRequest,
    rejectConnectionRequest,
  ]);
  // console.log('report user', reportUser);

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
  // connection status
  useEffect(() => {
    const data = { queryParams: { userId: param?.id } };
    // console.log('trigger');
    dispatch(triggerGetConnectionStatusByUserId(data));
  }, [param?.id]);

  // console.log('dataLocal', dataLocal);
  // console.log('acceptConnectionRequest', acceptConnectionRequest);
  console.log('removeConnection', removeConnection);

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
                    <div
                      onClick={() => navigate(`/connections/${param.id}`)}
                      className={`other-details connect ${
                        dataLocal?.connectionCount >= 0 && 'view'
                      }`}
                    >
                      {dataLocal?.connectionCount} connections
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
                {data.data?.userId !== getMyProfile.data?.userId &&
                  !reportModal && (
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
            <>
              <div className='d-flex c-gap-10 flex-wrap mt-3'>
                {(getConnectionStatusByUserId.status === 'base' ||
                  getConnectionStatusByUserId.status === 'loading') &&
                from === 'profile-banner' ? (
                  <>
                    <button className={`reach-btn loading`}>
                      <img src={spinner} alt='spinner' />
                    </button>
                  </>
                ) : getConnectionStatusByUserId.status === 'successful' ? (
                  <>
                    {getConnectionStatusByUserId.data.connectionStatus ===
                    'Request Sent' ? (
                      <div className='r-btns'>
                        <button
                          onClick={handleConnect}
                          className={`reach-btn accept-request ${
                            acceptConnectionRequest.status === 'loading' &&
                            'loading'
                          }`}
                        >
                          {acceptConnectionRequest.status === 'loading' ? (
                            <img src={spinner} alt='spinner' />
                          ) : (
                            <>Accept</>
                          )}
                        </button>
                        <button
                          onClick={handleConnect}
                          className={`reach-btn reject-request ${
                            rejectConnectionRequest.status === 'loading' &&
                            'loading'
                          }`}
                        >
                          {rejectConnectionRequest.status === 'loading' ? (
                            <img src={spinner} alt='spinner' />
                          ) : (
                            <>Reject</>
                          )}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={handleConnect}
                        className={`reach-btn ${
                          (sendConnectionRequest.status === 'loading' ||
                            cancelConnectionRequest.status === 'loading' ||
                            removeConnection.status === 'loading') &&
                          from === 'profile-banner' &&
                          'loading'
                        } ${
                          getConnectionStatusByUserId.data?.connectionStatus ===
                            'Pending' && 'pending'
                        }`}
                      >
                        {(sendConnectionRequest.status === 'loading' ||
                          cancelConnectionRequest.status === 'loading' ||
                          removeConnection.status === 'loading') &&
                        from === 'profile-banner' ? (
                          <img src={spinner} alt='spinner' />
                        ) : getConnectionStatusByUserId.data
                            ?.connectionStatus === 'Pending' ? (
                          <>
                            <span className='pending-con'>
                              <FaUserClock className='icon' /> {'Pending'}
                            </span>
                            <span className='cancel-con'>
                              <FaUserTimes className='icon' /> {'Cancel'}
                            </span>
                          </>
                        ) : getConnectionStatusByUserId.data
                            ?.connectionStatus === 'Not Connected' ? (
                          '+ Connect'
                        ) : getConnectionStatusByUserId.data
                            ?.connectionStatus === 'Connected' ? (
                          'Remove Connection'
                        ) : (
                          <></>
                        )}
                      </button>
                    )}
                  </>
                ) : (
                  <></>
                )}
                <button onClick={() => {}} className='reach-btn'>
                  Message
                </button>
              </div>
            </>
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
