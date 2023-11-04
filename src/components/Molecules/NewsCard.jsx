import React, { useState } from 'react';
import '../../assets/scss/molecules.scss';
import moment from 'moment';
import defaultImg from '../../assets/images/event.png';
import PhotoLoader from '../Atoms/skeleton-loaders/dashboard-page/UserProfilePhotoLoader';

const NewsCard = ({ news }) => {
  const [imgOnLoadStatus, setImgOnLoadStatus] = useState('base');

  return (
    <div className='news-card'>
      <div className='card-top'>
        <img
          src={news.img ?? defaultImg}
          alt=''
          className={`${imgOnLoadStatus === 'success' ? 'd-block' : 'd-none'}`}
          onLoad={() => setImgOnLoadStatus('success')}
          onError={() => setImgOnLoadStatus('error')}
        />
        {imgOnLoadStatus === 'base' && <PhotoLoader />}
        {/* If the img couldn't load for some reason */}
        {imgOnLoadStatus === 'error' && (
          <img src={defaultImg} alt='default-img' />
        )}
      </div>
      <div className='card-footer'>
        <h5>{news.title}</h5>
        <p>{moment(news?.createdDate).fromNow()}</p>
        <div className='btn-con'>
          <button>More info</button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
