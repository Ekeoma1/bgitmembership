import React from 'react';
import news1 from '../../assets/images/news1.svg';
import news2 from '../../assets/images/news2.svg';
import news3 from '../../assets/images/news3.svg';
import NewsCard from '../Molecules/NewsCard';

const News = () => {
  const newsData = [
    {
      img: news1,
      title: 'BGIT Staycation Retreat',
      date: 'October 6 - 8 (Fri - Sun)',
    },
    {
      img: news2,
      title: 'Bonfire night & Vibez',
      date: 'November 5',
    },
    {
      img: news3,
      title: 'Trends to watch',
      date: 'November 21',
    },
  ];

  return (
    <div className='news-wrapper'>
      <div className='container'>
        <div className='section-content'>
          <h5 className='title'>
            News and Events <span>{'(4)'}</span>
          </h5>
          <p className='info'>
            Save the dates for our upcoming tech events and fun-filled socials!
            Be sure to register ASAP and secure your tickets now.
          </p>
          <div className='cards-container'>
            <div className='view-all'>
              <button>View all</button>
            </div>
            <div className='cards-wrapper'>
              {newsData.map((item, index) => (
                <NewsCard news={item} key={index} />
              ))}
              {/* <div className='news-card'>
                <div className='card-top'>
                  <img src={news1} alt='' className='' />
                </div>
                <div className='card-footer'>
                  <h5>BGIT Staycation Retreat</h5>
                  <p>October 6 - 8 (Fri - Sun)</p>
                  <div className='btn-con'>
                    <button>More info</button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
