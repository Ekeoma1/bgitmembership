import React, { useState } from 'react';
import { LuCalendarDays } from 'react-icons/lu';
import { MdOutlineLocationOn } from 'react-icons/md';
import '../../assets/scss/event.scss';
import Tag from '../Atoms/Tag';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { UserProfilePhotoLoader2 } from '../Atoms/skeleton-loaders/dashboard-page/UserProfilePhotoLoader';
import defaultImg from '../../assets/images/default-user-photo.png';
const About2 = ({}) => {
  const { getNewsById } = useSelector((state) => state.news);
  const { getUserProfileById } = useSelector((state) => state.users);
  const [profileImgOnLoadStatus, setProfileImgOnLoadStatus] = useState('base');

  return (
    <div className='about-wrapper'>
      <div className='about-content-wrapper'>
        <div className='details'>
          <div className='event-details-card'>
            <h3 className='title'>{getNewsById?.data?.title}</h3>
            <div className='info'>
              <div className='date-wrapper date-wrapper-2'>
                <LuCalendarDays className='icon' />
                <div className=''>
                  <h5 className=''>Date</h5>
                  <p className=''>
                    {moment(getNewsById?.data?.eventDate).format(
                      'dddd, MMMM Do YYYY, h:mm:ss a'
                    )}
                  </p>
                </div>
              </div>
              {getNewsById?.data?.location && (
                <div className='location-wrapper'>
                  <MdOutlineLocationOn className='icon' />
                  <div className=''>
                    <h5 className=''>Location</h5>
                    <p className=''>{getNewsById?.data?.location} </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className='about'>
            <h3 className='title'>About</h3>
            <div className='info'>
              <p>{getNewsById?.data?.content}</p>
            </div>
          </div>
          {getNewsById?.data?.tag && (
            <div className='tags'>
              <h3 className='title'>Tags</h3>
              <div className='tags-wrapper'>
                {getNewsById?.data?.tag?.split(',').map((item, index) => (
                  <Tag key={index} text={item} />
                ))}
              </div>
            </div>
          )}
          {getNewsById?.data?.creator && (
            <div className='event-creator'>
              <h3 className='title'>Event creators</h3>
              <div className='info'>
                <div className='img-con'>
                  {getUserProfileById?.status === 'base' ||
                  getUserProfileById?.status === 'loading' ? (
                    <UserProfilePhotoLoader2 />
                  ) : getUserProfileById?.status === 'successful' ? (
                    <>
                      <img
                        src={getUserProfileById?.data?.imageUrl}
                        alt='creator-img'
                        className={`${
                          profileImgOnLoadStatus === 'success'
                            ? 'd-block'
                            : 'd-none'
                        }`}
                        onLoad={() => setProfileImgOnLoadStatus('success')}
                        onError={() => setProfileImgOnLoadStatus('error')}
                      />
                      {profileImgOnLoadStatus === 'base' && (
                        <UserProfilePhotoLoader2 />
                      )}
                      {profileImgOnLoadStatus === 'error' && (
                        <img
                          src={defaultImg}
                          alt='user-img'
                          className='default-img'
                        />
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <h5>{`${getUserProfileById?.data?.firstName} ${getUserProfileById?.data?.secondName}`}</h5>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About2;
