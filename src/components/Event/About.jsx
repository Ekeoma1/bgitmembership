import React, { useEffect, useState } from 'react';
import bgitlogo from '../../assets/images/bgit-logo.svg';
import { LuCalendarDays } from 'react-icons/lu';
import { MdOutlineLocationOn } from 'react-icons/md';
import '../../assets/scss/event.scss';
import Tag from '../Atoms/Tag';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { triggerGetUserProfileById } from '../../Features/users/users_slice';
import { UserProfilePhotoLoader2 } from '../Atoms/skeleton-loaders/dashboard-page/UserProfilePhotoLoader';
import defaultImg from '../../assets/images/default-user-photo.png';
const About = ({ setTab }) => {
  const { getEventById } = useSelector((state) => state.events);
  const { getUserProfileById } = useSelector((state) => state.users);
  const [profileImgOnLoadStatus, setProfileImgOnLoadStatus] = useState('base');

  console.log('profileImgOnLoadStatus', profileImgOnLoadStatus);
  return (
    <div className='about-wrapper'>
      <div className='about-content-wrapper'>
        <div className='details'>
          <div className='event-details-card'>
            <h3 className='title'>{getEventById?.data?.title}</h3>
            <div className='info'>
              <div className='date-wrapper'>
                <LuCalendarDays className='icon' />
                <div className=''>
                  <h5 className=''>Date</h5>
                  <p className=''>
                    {moment(getEventById?.data?.eventDate).format(
                      'dddd, MMMM Do YYYY, h:mm:ss a'
                    )}
                  </p>
                </div>
              </div>
              <div className='location-wrapper'>
                <MdOutlineLocationOn className='icon' />
                <div className=''>
                  <h5 className=''>Location</h5>
                  <p className=''>{getEventById?.data?.location} </p>
                </div>
              </div>
            </div>
          </div>
          <div className='about'>
            <h3 className='title'>About</h3>
            <div className='info'>
              <p>{getEventById?.data?.description}</p>
            </div>
          </div>
          <div className='tags'>
            <h3 className='title'>Tags</h3>
            <div className='tags-wrapper'>
              {getEventById?.data?.tag.split(',').map((item, index) => (
                <Tag key={index} text={item} />
              ))}
            </div>
          </div>
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
        </div>
        <div className='price'>
          <div className='price-card'>
            <button onClick={() => setTab('booking')}>Get tickets</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
