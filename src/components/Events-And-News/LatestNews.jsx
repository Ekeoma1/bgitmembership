import React from 'react';
import SearchBox from '../Molecules/SearchBox';
import { VscSettings } from 'react-icons/vsc';
import { HiChevronDown } from 'react-icons/hi';
import { BsBookmark } from 'react-icons/bs';
import { PiShareFat } from 'react-icons/pi';
import people1 from '../../assets/images/event-people1.svg';
import people2 from '../../assets/images/event-people2.svg';

const LatestNews = () => {
  const data = [
    {
      title: 'BGIT Summer Mixer',
      date: '21 July 2023',
      info: 'We want to express our heartfelt appreciation and share the immense joy we experienced during the Community Mixer held on...',
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
  ];
  return (
    <div className='latest-news-wrapper'>
      <div className='latest-news-content'>
        <div className='section-header'>
          <h5>Latest news</h5>
          <div className='search-wrapper'>
            <div className='search-box-wrapper'>
              <div className='search-box-con'>
                <SearchBox placeholder={'Search news or events'} />
              </div>
            </div>
            <div className='filter-wrapper'>
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
        <div className='section-content'>
          <div className='cards-wrapper'>
            {data.map((item, index) => (
              <div className='event-card'>
                <div className='card-info'>
                  <h2>{item.title}</h2>
                  <p className='date'>{item.date}</p>
                  <p className='info'>{item.info}</p>
                </div>
                <div className='card-img'>
                  <img src={item.img} alt='event-people' className='' />
                </div>
                <div className='card-footer'>
                  <div className='icon-wrapper'>
                    <BsBookmark className='icon' />
                    <p>{item.bookmark}</p>
                  </div>
                  <div className='icon-wrapper'>
                    <PiShareFat className='icon' />
                    <p>{item.share}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
