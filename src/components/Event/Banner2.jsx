import React from 'react';
import backgroundImage1 from '../../assets/images/people1.svg';
import { HiArrowLeft } from 'react-icons/hi';
import { FaRegBookmark } from 'react-icons/fa';
import { MdIosShare } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserProfilePhotoLoader from '../Atoms/skeleton-loaders/dashboard-page/UserProfilePhotoLoader';

const Banner2 = ({ tab }) => {
  const navigate = useNavigate();
  const { getNewsById } = useSelector((state) => state.news);
  return (
    <>
      {tab !== 'order-success' && (
        <>
          {getNewsById.status === 'base' ||
          getNewsById.status === 'loading' ? (
            <div className='banner-wrapper'>
              <UserProfilePhotoLoader />
            </div>
          ) : getNewsById.status === 'successful' ? (
            <div
              style={{
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                // background: `${
                //   getNewsById?.data.imageUrl ?? `url(${backgroundImage1})`
                // }`,
                background: `${getNewsById?.data.imageUrl ?? `#bdc3c7`}`,
              }}
              className='banner-wrapper'
            >
              <div className='banner-content'>
                <div
                  className='arrow'
                  onClick={() => navigate('/events-and-news')}
                >
                  <HiArrowLeft />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          {getNewsById.status === 'base' ||
          getNewsById.status === 'loading' ? (
            <div className='bookmark-share-wrapper-loader'></div>
          ) : getNewsById.status === 'successful' ? (
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
          )}
        </>
      )}
    </>
  );
};

export default Banner2;
