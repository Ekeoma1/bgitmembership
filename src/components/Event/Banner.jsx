import React from 'react';
import backgroundImage1 from '../../assets/images/people1.svg';
import { HiArrowLeft } from 'react-icons/hi';
import { FaRegBookmark } from 'react-icons/fa';
import { MdIosShare, MdOutlineIosShare } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Banner = ({ tab }) => {
  const navigate = useNavigate();
  return (
    <>
      {tab !== 'order-success' && (
        <>
          <div
            style={{
              backgroundImage: `url(${backgroundImage1})`,
              // backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
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
      )}
    </>
  );
};

export default Banner;
