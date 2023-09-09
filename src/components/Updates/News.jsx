import React from 'react';
import news1 from '../../assets/images/news1.svg';
import news2 from '../../assets/images/news2.svg';
import news3 from '../../assets/images/news3.svg';
import NewsCard from '../Molecules/NewsCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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
    {
      img: news3,
      title: 'Trends to watch',
      date: 'November 21',
    },
    {
      img: news3,
      title: 'Trends to watch',
      date: 'November 21',
    },
  ];
  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 2,
    },
  };

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
              <Carousel responsive={responsive}>
                {newsData.map((item, index) => (
                  <NewsCard news={item} key={index} />
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
