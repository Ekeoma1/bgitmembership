import React from 'react';
import Icon from '../Icon';
import { useSelector } from 'react-redux';
import BioLoader from '../Atoms/skeleton-loaders/dashboard-page/BioLoader';

const BioCard = ({ data }) => {
  const { getMyProfile } = useSelector((state) => state.users);
  return (
    <div className='dashboard-card'>
      {data.status === 'loading' ? (
        <>
          <BioLoader />
        </>
      ) : data.status === 'successful' ? (
        <>
          <div className='row'>
            <div className='col-md-11 col-12'>
              <div className='dashboard-header d-flex justify-content-between'>
                <span>Bio</span>
                {data.data?.userId === getMyProfile.data?.userId && (
                  <span className='d-md-none'>
                    <button>
                      <Icon icon='edit' />
                    </button>
                  </span>
                )}
              </div>
              <div className='dashboard-text mb-3'>{data?.data?.biography}</div>

              <div className='dashboard-header mt-1'>
                {/* What best desribe you? */}
                Description
              </div>
              <div className='dashboard-text mb-3'>{data?.data?.purpose}</div>
              <div className='dashboard-header mt-1'>
                {/* What your experience level? */}
                Experience level
              </div>
              <div className='dashboard-text'>{data?.data?.experience}</div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BioCard;
