import React, { useEffect, useRef, useState } from 'react';
import SearchBox from '../Molecules/SearchBox';
import { VscSettings } from 'react-icons/vsc';
import { HiChevronDown } from 'react-icons/hi';
import { BsBookmark } from 'react-icons/bs';
import { PiShareFat } from 'react-icons/pi';
import people1 from '../../assets/images/people3.svg';
import people2 from '../../assets/images/people4.svg';
import { Scrollbar } from 'react-scrollbars-custom';
import EventCard from './EventCard';

const UpcomingEvents = () => {
  const data = [
    {
      title: 'BGIT Staycation',
      date: '8 October 2023',
      location: 'London, UK',
      info: 'We want to express our heartfelt appreciation and share the immense joy we experienced during the Community Mixer held on...',
      img: people1,
      bookmark: '2',
      share: '7',
    },
    {
      title: 'BGIT Network Day',
      date: '21 July 2023',
      location: 'Lagos, Nigeria',
      info: 'We are thrilled to share the remarkable success of our recent partnership with Showcode...',
      img: people2,
      bookmark: '5',
      share: '8',
    },
    {
      title: 'BGIT Network Day',
      date: '21 July 2023',
     location: 'Lagos, Nigeria',
      info: 'We are thrilled to share the remarkable success of our recent partnership with Showcode...',
      img: people2,
      bookmark: '5',
      share: '8',
    },
    {
      title: 'BGIT x Showcode - Athena Hackathon',
      date: '21 July 2023',
     location: 'Lagos, Nigeria',
      info: 'We are thrilled to share the remarkable success of our recent partnership with Showcode...',
      img: people2,
      bookmark: '5',
      share: '8',
    },
    {
      title: 'BGIT x Showcode - Athena Hackathon',
      date: '21 July 2023',
     location: 'Lagos, Nigeria',
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

  useEffect(() => {}, []);
  return (
    <div className='upcoming-events-wrapper'>
      <div className='upcoming-events-content'>
        <div className='section-header'>
          <h5>Upcoming Events</h5>
          <div className='search-wrapper'>
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
          <div ref={elementRef} className='cards-wrapper' onScroll={() => {}}>
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
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
