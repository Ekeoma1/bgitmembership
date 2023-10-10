import React from 'react';
import Icon from '../Icon';
import { useSelector } from 'react-redux';
import BioLoader from '../Atoms/skeleton-loaders/dashboard-page/BioLoader';

const BioCard = ({ othersView, data }) => {
  const { getMyProfile } = useSelector((state) => state.users);
  return (
    <div className='dashboard-card'>
      {getMyProfile.status === 'loading' ? (
        <>
          <BioLoader />
        </>
      ) : getMyProfile.status === 'successful' ? (
        <>
          <div className='row'>
            <div className='col-md-11 col-12'>
              <div className='dashboard-header d-flex justify-content-between'>
                <span>Bio</span>
                {!othersView && (
                  <span className='d-md-none'>
                    <button>
                      <Icon icon='edit' />
                    </button>
                  </span>
                )}
              </div>
              <div className='dashboard-text'>{data?.data?.biography}</div>

              <div className='dashboard-header mt-1'>
                What best desribe you?
              </div>
              <div className='dashboard-text'>{data?.data?.purpose}</div>
              <div className='dashboard-header mt-1'>
                What your experience level?
              </div>
              <div className='dashboard-text'>{data?.data?.experience}</div>
            </div>
            {/* Not sure if we need this here anymore since we have it on the profile banner section */}
            {/* {!othersView && (
          <div className='col-md-1 d-md-block d-none'>
            <button>
              <Icon icon='edit' />
            </button>
          </div>
        )} */}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BioCard;
