import React from 'react';
import '../../assets/scss/molecules.scss';


const NewsCard = ({ news }) => {

  return (
    <div className='news-card'>
      <div className='card-top'>
        <img src={news.img} alt='' className='' />
      </div>
      <div className='card-footer'>
        <h5>{news.title}</h5>
        <p>{news.date}</p>
        <div className='btn-con'>
          <button>More info</button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
