import React, { useEffect, useRef, useState } from 'react';
import SearchBox from '../Molecules/SearchBox';
import { VscSettings } from 'react-icons/vsc';
import { HiChevronDown } from 'react-icons/hi';
import { BsBookmark } from 'react-icons/bs';
import { PiShareFat } from 'react-icons/pi';
import people1 from '../../assets/images/event-people1.svg';
import people2 from '../../assets/images/event-people2.svg';
import { Scrollbar } from 'react-scrollbars-custom';
import EventCard from './EventCard';

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
  const elementRef = useRef(null);
  const scrollBarConRef = useRef(null);
  const scrollBarRef = useRef(null);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  // const getScrollBarWidth = () => {
  //   if (elementRef.current && scrollBarConRef.current && scrollBarRef.current) {
  //     const element = elementRef.current;

  //     const scrollLeft = element.scrollLeft;
  //     const cardsWrapperFullWidth = element.scrollWidth;
  //     const cardsWrapperVisibleWidth = element.offsetWidth;
  //     const scrollWidth = cardsWrapperFullWidth - cardsWrapperVisibleWidth;
  //     console.log('scroll width', scrollWidth);

  //     const scrollBarConWidth = scrollBarConRef.current.offsetWidth;
  //     const scrollbarWidth = scrollBarRef.current.offsetWidth;
  //     const availableSpace = scrollBarConWidth - scrollbarWidth;
  //     const scrollbarWidthPercentage =
  //       (scrollbarWidth / scrollBarConWidth) * 100;

  //     const x = (scrollBarConWidth * scrollLeft) / scrollWidth;
  //     const y = (100 * x) / scrollBarConWidth;
  //     const z = y - scrollbarWidthPercentage;
  //     let marginLeft;
  //     if (z < 0) {
  //       marginLeft = 0;
  //     } else {
  //       marginLeft = z;
  //     }
  //     setScrollbarWidth(marginLeft);
  //     console.log('scroll bar width temp', scrollLeft);
  //   }
  // };
  useEffect(() => {}, []);
  console.log('bottom', scrollBarConRef.current?.offsetWidth);
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
          <div
            ref={elementRef}
            className='cards-wrapper'
            onScroll={() => {
              // getScrollBarWidth();
            }}
          >
            {data.map((event, index) => (
              <EventCard event={event} key={index} />
            ))}
          </div>
        </div>
        <div className='section-bottom'>
          <div className='scroll-bar-wrapper' ref={scrollBarConRef}>
            <div
              ref={scrollBarRef}
              style={{ marginLeft: `${scrollbarWidth}%` }}
              className='scroll-bar'
            ></div>
          </div>
          <div className='see-all'>
            <h5 className=''>See all</h5>
          </div>
        </div>
        {/* <Scrollbar style={{ width: 250, height: 250 }}>
          <p>Hello world!</p>
        </Scrollbar> */}
      </div>
    </div>
  );
};

export default LatestNews;
