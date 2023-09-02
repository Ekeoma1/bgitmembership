import React, { useState } from 'react';
import '../../../src/assets/scss/communityForums.scss';
import forumImg1 from '../../../src/assets/images/forumcard1.svg';
import forumImg2 from '../../../src/assets/images/forumcard2.svg';
import forumImg3 from '../../../src/assets/images/forumcard3.svg';
import forumImg4 from '../../../src/assets/images/forumcard4.svg';

import { useNavigate } from 'react-router-dom';
import ForumCard from '../Molecules/ForumCard';
const SuggestedForums = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const onChange = (e) => {
    setSearchValue(e.target.value);
  };
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
    <div className='suggested-forums-wrapper'>
      <div className='container'>
        <div className='content-wrapper'>
          <h3 className='section-title text-color'> Suggested Forums </h3>
          <div className='view-all'>
            <button onClick={() => navigate('/community-forums/all')}>
              View all
            </button>
          </div>
          <div className='forums-cards-wrapper'>
            {communities.map((forum, index) => (
              <ForumCard key={index} forum={forum} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedForums;
