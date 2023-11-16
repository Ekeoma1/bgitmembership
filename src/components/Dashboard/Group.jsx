import React from 'react';
import { useSelector } from 'react-redux';
import SocialLinksLoader from '../Atoms/skeleton-loaders/dashboard-page/SocialLinksLoader';
import GroupLoader from '../Atoms/skeleton-loaders/dashboard-page/GroupLoader';

const Group = () => {
  const { getAllForums, joinForum, leaveForum } = useSelector(
    (state) => state.forums
  );
  return (
    <div className='dashboard-card group-wrapper'>
      {getAllForums.status === 'base' || getAllForums.status === 'loading' ? (
        <>
          <GroupLoader />
        </>
      ) : getAllForums.status === 'successful' ? (
        <>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='dashboard-header'>Groups</div>
            {getAllForums.data?.length > 2 && (
              <div>
                <button className='dashboard-text'>See more</button>
              </div>
            )}
          </div>
          <div className='row mt-2 gap-md-0 gap-3 flex-wrap'>
            {getAllForums.data.slice(0, 2)?.map((group, index) => (
              <div key={index} className='col-md'>
                <div className='d-flex gap-3 flex-wrap align-items-start'>
                  <div className='group-image'></div>
                  <div>
                    <div className='dashboard-header'>{group.forumName}</div>
                    <div className='d-flex justify-content-between'>
                      <div className='dashboard-text'>
                        {group.userCount}{' '}
                        {`Member${group.userCount > 0 ? 's' : ''}`}
                      </div>
                      <div className='d-xl-none'>
                        <button className='join-btn '>+Joined</button>
                      </div>
                    </div>
                  </div>
                  <div className='d-xl-block d-none'>
                    <button className='join-btn'>+Joined</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Group;
