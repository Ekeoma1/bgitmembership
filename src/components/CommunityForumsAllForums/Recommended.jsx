import React, { useState } from 'react';
import '../../../src/assets/scss/communityForums.scss';
import ForumCard from '../Molecules/ForumCard';
import forumImg1 from '../../../src/assets/images/forumcard1.svg';
import forumImg2 from '../../../src/assets/images/forumcard2.svg';
import forumImg3 from '../../../src/assets/images/forumcard3.svg';
import forumImg4 from '../../../src/assets/images/forumcard4.svg';

const Recommended = ({ basedOn }) => {
  const communities = [
    {
      community_img: forumImg1,
      community_name: 'UX/UI Design',
      info: 'Dorem ipsum dolor sit amet consectetur. Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu',
    },
    {
      community_img: forumImg2,
      community_name: 'Engineer Girls',
      info: 'Lorem ipsum dolor sit amet consectetur. Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu',
    },
    {
      community_img: forumImg3,
      community_name: 'Data Babes 😍👩🏾‍💻',
      info: 'Lorem ipsum dolor sit amet consectetur. Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu',
    },
    {
      community_img: forumImg4,
      community_name: 'Data Babes 😍👩🏾‍💻',
      info: 'Lorem ipsum dolor sit amet consectetur. Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu',
    },
    {
      community_img: forumImg1,
      community_name: 'Data Babes 😍👩🏾‍💻',
      info: 'Lorem ipsum dolor sit amet consectetur. Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu',
    },
  ];
  return (
    <div className='recommended-section'>
      <div className='container'>
        <div className='recommended-section-content'>
          <div className='section-title-wrapper'>
            <h5>Recommended based on your {basedOn}</h5>
          </div>
          {basedOn === 'industry' && (
            <div className='forums-cards-wrapper'>
              {communities.map((forum, index) => (
                <ForumCard forum={forum} key={index} />
              ))}
            </div>
          )}
          {basedOn === 'location' && (
            <div className='forums-cards-wrapper'>
              {communities.map((forum, index) => (
                <ForumCard forum={forum} key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommended;
