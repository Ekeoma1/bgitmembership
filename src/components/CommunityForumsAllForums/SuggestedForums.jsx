import React, { useState } from 'react';
import '../../../src/assets/scss/communityForums.scss';

import { LuPlus } from 'react-icons/lu';
import community1 from '../../../src/assets/images/community1.svg';
import community2 from '../../../src/assets/images/community2.svg';
import community3 from '../../../src/assets/images/community3.svg';
import { useNavigate } from 'react-router-dom';
const SuggestedForums = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const onChange = (e) => {
    setSearchValue(e.target.value);
  };
  const communities = [
    {
      community_img: community1,
      recently_joined: true,
      community_name: 'UX/UI Design',
      community_members: 100,
      unreadMsg: false,
    },
    {
      community_img: community2,
      recently_joined: false,
      community_name: 'Engineer Girls',
      community_members: 67,
      unreadMsg: true,
    },
    {
      community_img: community3,
      recently_joined: true,
      community_name: 'Data Babes 😍👩🏾‍💻',
      community_members: 83,
      unreadMsg: true,
    },
    {
      community_img: community3,
      recently_joined: true,
      community_name: 'Data Babes 😍👩🏾‍💻',
      community_members: 83,
      unreadMsg: true,
    },
    {
      community_img: community3,
      recently_joined: true,
      community_name: 'Data Babes 😍👩🏾‍💻',
      community_members: 83,
      unreadMsg: true,
    },
  ];
  return (
    <div className='suggested-forums-wrapper'>
      <div className='container'>
        <div className='content-wrapper'>
          <h3 className='section-title'> Suggested Forums </h3>
          <div className='view-all'>
            <button onClick={() => navigate('/forums/all')}>
              View all
            </button>
          </div>
          <div className='forums-cards-wrapper'>
            <div className='forum-card'>
              <img src={community1} alt='forum-img' className='' />
              <h3>Data Analysts 👩🏾‍💻</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur. Urus fringilla mi. Lorem
                ipsu Lorem ipsi ... see more
              </p>
              <button>
                <LuPlus className='icon' />
                Join
              </button>
            </div>
            <div className='forum-card'>
              <img src={community1} alt='forum-img' className='' />
              <h3>Data Analysts 👩🏾‍💻</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur. Urus fringilla mi. Lorem
                ipsu Lorem ipsi ... see more
              </p>
              <button>
                <LuPlus className='icon' />
                Join
              </button>
            </div>
            <div className='forum-card'>
              <img src={community1} alt='forum-img' className='' />
              <h3>Data Analysts 👩🏾‍💻</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur. Urus fringilla mi. Lorem
                ipsu Lorem ipsi ... see more
              </p>
              <button>
                <LuPlus className='icon' />
                Join
              </button>
            </div>
            <div className='forum-card'>
              <img src={community1} alt='forum-img' className='' />
              <h3>Data Analysts 👩🏾‍💻</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur. Urus fringilla mi. Lorem
                ipsu Lorem ipsi ... see more
              </p>
              <button>
                <LuPlus className='icon' />
                Join
              </button>
            </div>
            <div className='forum-card'>
              <img src={community1} alt='forum-img' className='' />
              <h3>Data Analysts 👩🏾‍💻</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur. Urus fringilla mi. Lorem
                ipsu Lorem ipsi ... see more
              </p>
              <button>
                <LuPlus className='icon' />
                Join
              </button>
            </div>
            <div className='forum-card'>
              <img src={community1} alt='forum-img' className='' />
              <h3>Data Analysts 👩🏾‍💻</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur. Urus fringilla mi. Lorem
                ipsu Lorem ipsi ... see more
              </p>
              <button>
                <LuPlus className='icon' />
                Join
              </button>
            </div>
            <div className='forum-card'>
              <img src={community1} alt='forum-img' className='' />
              <h3>Data Analysts 👩🏾‍💻</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur. Urus fringilla mi. Lorem
                ipsu Lorem ipsi ... see more
              </p>
              <button>
                <LuPlus className='icon' />
                Join
              </button>
            </div>
            <div className='forum-card'>
              <img src={community1} alt='forum-img' className='' />
              <h3>Data Analysts 👩🏾‍💻</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur. Urus fringilla mi. Lorem
                ipsu Lorem ipsi ... see more
              </p>
              <button>
                <LuPlus className='icon' />
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedForums;
