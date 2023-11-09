import { useEffect, useState } from 'react';
import Icon from '../Icon';
import AccountActionModal from '../Modals/AccountActionModal';
import IndividualActionModal from '../Modals/IndividualActionModal';
import { Link, useNavigate } from 'react-router-dom';
import ReportModal from '../Modals/ReportModal';
import { useDispatch, useSelector } from 'react-redux';
import { triggerGetMyProfile } from '../../Features/users/users_slice';
import UserProfilePhotoLoader from '../Atoms/skeleton-loaders/dashboard-page/UserProfilePhotoLoader';
import DetailsLoader from '../Atoms/skeleton-loaders/dashboard-page/DetailsLoader';
// import defaultImg from '../../assets/images/default-photo.jpeg';
import defaultImg from '../../assets/images/main2.png';
import bg from '../../assets/images/people1.svg';
import { FaChevronRight } from 'react-icons/fa';
import { FaCamera } from 'react-icons/fa6';
import { GoPencil } from 'react-icons/go';
import SingleLineLoader, {
  SingleLineLoader2,
} from '../Atoms/skeleton-loaders/SingleLineLoader';
import { BsImage } from 'react-icons/bs';
import OutsideClickHandler from 'react-outside-click-handler/build/OutsideClickHandler';
import { LuMoreVertical } from 'react-icons/lu';

const ProfileBanner = ({ othersView, data }) => {
  const navigate = useNavigate();
  const { getMyProfile } = useSelector((state) => state.users);
  const [actionAcctModal, setActionAcctModal] = useState(false);
  const [individalAcctModal, setIndividualAcctModal] = useState(false);
  const [contentToShow, setContentToShow] = useState(null);
  const [reportModal, setReportModal] = useState(false);
  const [profileImgOnLoadStatus, setProfileImgOnLoadStatus] = useState('base');
  const [coverImgOnLoadStatus, setCoverImgOnLoadStatus] = useState('base');
  const [showDropdowm, setShowDropdown] = useState(false);
  const [uploadProfilePicture, setUploadProfilePicture] = useState({});
  const [uploadCoverPicture, setUploadCoverPicture] = useState({});

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
    const file = event.target.files[0];
    if (file) {
      setUploadCoverPicture({ backgroundImage: file });
    }
    setShowDropdown(false);
  };
  // console.log(uploadProfilePicture);
  // console.log(uploadCoverPicture);
  console.log('data', data);
  console.log('getMyProfile', getMyProfile);
  return (
    <div className='profile-banner-wrapper'>
      <div className='banner-image'>
        {data?.status === 'base' || data?.status === 'loading' ? (
          <div className='loading-state'>
            <SingleLineLoader2 />
          </div>
        ) : data.status === 'successful' ? (
          <>
            <div className='cover-img-wrapper'>
              <img
                src={data?.data?.imageUrl}
                alt={`${data?.data?.firstName} ${data?.data?.secondName}`}
                className={`${
                  coverImgOnLoadStatus === 'success' ? 'd-block' : 'd-none'
                }`}
                onLoad={() => setCoverImgOnLoadStatus('success')}
                onError={() => setCoverImgOnLoadStatus('error')}
              />
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
                      console.log('outside click');
                    }}
                  >
                    <div className='dropdown-box'>
                      <h5>Add photo</h5>
                      <div className='btn-group-wrapper'>
                        <label htmlFor='take-photo' className='btn-con'>
                          <div className='text-wrapper'>
                            <FaCamera className='icon' />
                            <p>Take a photo</p>
                          </div>
                          <FaChevronRight className='icon' />
                          <input
                            name='take-photo'
                            type='file'
                            capture='user'
                            accept='image/*'
                            id='take-photo'
                            onChange={handleChangeCoverPhoto}
                          />
                        </label>
                        <label htmlFor='upload' className='btn-con'>
                          <div className='text-wrapper'>
                            <BsImage className='icon' />
                            <p>Upload from photos</p>
                          </div>
                          <FaChevronRight className='icon' />
                          <input
                            name='upload'
                            type='file'
                            capture='user'
                            accept='image/*'
                            id='upload'
                            onChange={handleChangeCoverPhoto}
                          />
                        </label>
                      </div>
                    </div>
                  </OutsideClickHandler>
                )}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className='profile-image-wrapper'>
        <div className='profile-image'>
          {data?.status === 'base' || data?.status === 'loading' ? (
            <div className='user-profile-loader-wrapper'>
              <UserProfilePhotoLoader />
            </div>
          ) : (
            <>
              <div className='img-wrapper'>
                <img
                  src={data?.data?.imageUrl}
                  alt={`${data?.data?.firstName} ${data?.data?.secondName}`}
                  className={`${
                    profileImgOnLoadStatus === 'success' ? 'd-block' : 'd-none'
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
                  profileImgOnLoadStatus === 'error') && (
                  <label
                    className='icon-wrapper'
                    htmlFor='upload-profile-photo'
                  >
                    <FaCamera className='icon' />
                    <input
                      name='upload-profile-photo'
                      type='file'
                      capture='user'
                      accept='image/*'
                      id='upload-profile-photo'
                      onChange={handleChangeProfilePhoto}
                    />
                  </label>
                )}
              </div>
            </>
          )}
        </div>
      </div>
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
                    <div className='other-details connect'>21 connections</div>
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
                      {!othersView && data.data?.tags?.length > 3 && (
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
                {/* <button onClick={toggleAcctModal}>
                  <LuMoreVertical className='icon' />
                </button> */}
                {othersView || true ? (
                  <button onClick={toggleAcctModal}>
                    <LuMoreVertical className='icon' />
                  </button>
                ) : (
                  <button>
                    <div onClick={() => navigate('/settings')}>
                      <GoPencil className='icon' />
                    </div>
                  </button>
                )}
                {othersView && (
                  <OutsideClickHandler
                    onOutsideClick={() => {
                    setActionAcctModal(false)
                    }}
                  >
                    <AccountActionModal
                      reportAction={setReportModal}
                      show={actionAcctModal}
                      action={showIndividualAcctModal}
                    />
                  </OutsideClickHandler>

                  // <div className='modal-wrapper'>
                  // </div>
                )}
              </div>
            </>
          )}
        </div>

        {othersView && data?.status === 'successful' && (
          <div className='d-flex c-gap-10 flex-wrap mt-3'>
            <button
              onClick={() => {
                console.log('connect');
              }}
              className='reach-btn'
            >
              + Connect
            </button>

            <button
              onClick={() => {
                console.log('message');
              }}
              className='reach-btn'
            >
              Message
            </button>
          </div>
        )}
      </div>

      {/* {othersView && (
        <AccountActionModal
          reportAction={setReportModal}
          show={actionAcctModal}
          action={showIndividualAcctModal}
        />
      )} */}
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
