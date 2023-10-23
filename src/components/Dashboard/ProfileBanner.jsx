import { useEffect, useState } from 'react';
import Icon from '../Icon';
import AccountActionModal from '../Modals/AccountActionModal';
import IndividualActionModal from '../Modals/IndividualActionModal';
import { Link } from 'react-router-dom';
import ReportModal from '../Modals/ReportModal';
import { useDispatch, useSelector } from 'react-redux';
import { triggerGetMyProfile } from '../../Features/users/users_slice';
import UserProfilePhotoLoader from '../Atoms/skeleton-loaders/dashboard-page/UserProfilePhotoLoader';
import DetailsLoader from '../Atoms/skeleton-loaders/dashboard-page/DetailsLoader';

const ProfileBanner = ({ othersView, data }) => {
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
  return (
    <div className='profile-banner-wrapper'>
      <div className='banner-image'></div>
      <div className='profile-image-wrapper'>
        <div className='profile-image'>
          {data?.status === 'base' || data?.status === 'loading' ? (
            <>
              <UserProfilePhotoLoader />
            </>
          ) : (
            <>
              <img
                src={data?.data?.imageUrl}
                alt={`${data?.data?.firstName} ${data?.data?.secondName}`}
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
      </div>
      <div className='profile-details-card'>
        <div className='row'>
          {data?.status === 'loading' ? (
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
                    <div className='job'>{data?.data?.niche}</div>
                    <div className='job'>{data?.data?.profession}</div>
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
                        <div className='other-details tag-names'>
                          You have no tags
                        </div>
                      )}
                      {!othersView && data.data?.tags?.length > 3 && (
                        <div className='see-more-btn d-lg-flex d-none'>
                          see 2 more
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
                    <Link to={'/settings'}>
                      <Icon icon='edit' />
                    </Link>
                  </button>
                )}
              </div>
            </>
          )}
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
