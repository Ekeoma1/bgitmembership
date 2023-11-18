import React from 'react';
import SearchBox from '../Molecules/SearchBox';
import { VscSettings } from 'react-icons/vsc';
import { HiChevronDown } from 'react-icons/hi';
import people1 from '../../assets/images/event-people1.svg';
import people2 from '../../assets/images/event-people2.svg';
import EventCard from './EventCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useSelector } from 'react-redux';

const LatestNews = () => {
  const data = [
    {
      title: 'BGIT Summer Mixer',
      date: '21 July 2023',
      info: 'We want to express our heartfelt appreciation and share the immense joy we experienced during the Community Mixer held on... ',
      img: people1,
      bookmark: '2',
      share: '7',
    },
    {
      title: 'BGIT x Showcode - Athena Hackathon',
      date: '21 July 2023',
      info: 'We are thrilled to share the remarkable success of our recent partnership with Showcode...',
      img: people2,
      bookmark: '5',
      share: '8',
    },
    {
      title: 'BGIT x Showcode - Athena Hackathon',
      date: '21 July 2023',
      info: 'We are thrilled to share the remarkable success of our recent partnership with Showcode...',
      img: people2,
      bookmark: '5',
      share: '8',
    },
    {
      title: 'BGIT x Showcode - Athena Hackathon',
      date: '21 July 2023',
      info: 'We are thrilled to share the remarkable success of our recent partnership with Showcode...',
      img: people2,
      bookmark: '5',
      share: '8',
    },
    {
      title: 'BGIT x Showcode - Athena Hackathon',
      date: '21 July 2023',

      info: 'We are thrilled to share the remarkable success of our recent partnership with Showcode...',
      img: people2,
      bookmark: '5',
      share: '8',
    },
  ];
  const { getAllNews } = useSelector((state) => state.news);
  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className='latest-news-wrapper'>
      <div className='container'>
        <div className='latest-news-content'>
          <div className='section-header row align-items-end'>
            <div className='col-md'>
              <h2>Latest news</h2>
            </div>
            <div className='col-md'>
              <div className='search-wrapper'>
                <div className='search-box-wrapper'>
                  <div className='search-box-con'>
                    <SearchBox placeholder={'Search news or events'} />
                  </div>
                </div>
                <div className='filter-wrapper shadow'>
                  <div className='filter'>
                    <VscSettings />
                    <p>Filter</p>
                  </div>
                  <div className='sort'>
                    <p>SORT BY: LATEST</p>
                    <HiChevronDown />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='section-content'>
            <div className='cards-wrapper'>
              {getAllNews.status === 'base' ||
              getAllNews.status === 'loading' ? (
                <>Loading...</>
              ) : getAllNews.status === 'successful' ? (
                <>
                  <Carousel responsive={responsive}>
                    {getAllNews?.data?.news?.map((item, index) => (
                      <EventCard news item={item} key={index} />
                    ))}
                  </Carousel>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className='section-bottom'>
            <div className='see-all'>
              <h5 className=''>See all</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
