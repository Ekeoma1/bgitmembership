import React, { useState } from 'react';
import '../../../src/assets/scss/updates.scss';
import request1 from '../../../src/assets/images/request1.svg';
import request2 from '../../../src/assets/images/request2.svg';
import request3 from '../../../src/assets/images/request3.svg';
import RequestCard from '../Molecules/RequestCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Requests = ({ basedOn }) => {
  const requests = [
    {
      img: request1,
      time: 'BGIT Member since 2023',
      name: 'Ediri Oluwa',
      interests: 'UX design & Shopping',
    },
    {
      img: request2,
      time: 'BGIT Member since 2013',
      name: 'Destini Love',
      interests: 'UX design & Shopping',
    },
    {
      img: request3,
      time: 'BGIT Member since 2020',
      name: 'Adeola Otun',
      interests: 'UX design & Shopping',
    },
    {
      img: request3,
      time: 'BGIT Member since 2020',
      name: 'Adeola Otun',
      interests: 'UX design & Shopping',
    },
    {
      img: request2,
      time: 'BGIT Member since 2013',
      name: 'Destini Love',
      interests: 'UX design & Shopping',
    },
    {
      img: request3,
      time: 'BGIT Member since 2020',
      name: 'Adeola Otun',
      interests: 'UX design & Shopping',
    },
    {
      img: request3,
      time: 'BGIT Member since 2020',
      name: 'Adeola Otun',
      interests: 'UX design & Shopping',
    },
  ];
  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 2,
    },
  };
  return (
    <div className='requests-wrapper'>
      <div className='container'>
        <div className='requests-section-content'>
          <div className='section-title-wrapper'>
            <h5 className=''>
              Requests <span>{'(4)'}</span>
            </h5>
          </div>
          <div className='requests-cards-wrapper'>
            <Carousel responsive={responsive}>
              {requests.map((item, index) => (
                <RequestCard item={item} key={index} />
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;
