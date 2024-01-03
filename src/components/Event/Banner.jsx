import React from 'react';
import backgroundImage1 from '../../assets/images/people1.svg';
import { HiArrowLeft } from 'react-icons/hi';
import { FaRegBookmark } from 'react-icons/fa';
import { MdIosShare } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserProfilePhotoLoader from '../Atoms/skeleton-loaders/dashboard-page/UserProfilePhotoLoader';

const Banner = ({ tab }) => {
  const navigate = useNavigate();
  const { getEventById } = useSelector((state) => state.events);
  return (
    <>
      {getEventById.status === 'base' || getEventById.status === 'loading' ? (
        <div className='banner-wrapper'>
          <UserProfilePhotoLoader />
        </div>
      ) : getEventById.status === 'successful' ? (
        <div
          style={{
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            minHeight: '30vh',
            backgroundPosition: 'center',
            width: '100%',
            backgroundImage: `url(${getEventById?.data.imageUrl ?? `#bdc3c7`})`,
          }}
          className='banner-wrapper'
        >
          <div className='banner-content'>
            <div className='arrow' onClick={() => navigate(-1)}>
              <HiArrowLeft />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* 
      {getEventById.status === 'base' || getEventById.status === 'loading' ? (
        <div className='bookmark-share-wrapper-loader'></div>
      ) : getEventById.status === 'successful' ? (
        <>
          {tab === 'about' && (
            <div className='bookmark-share-wrapper'>
              <div className='bookmark'>
                <FaRegBookmark />
                <p>Bookmark</p>
              </div>
              <div className='share'>
                <MdIosShare />
                <p>share</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <></>
      )} */}
    </>
  );
};

export default Banner;
