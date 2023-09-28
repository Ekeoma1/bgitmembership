import React, { useState } from 'react';
import '../../../src/assets/scss/communityForums.scss';

import SearchBox from '../Molecules/SearchBox';
import CommunityCard from './CommunityCard';
import community1 from '../../../src/assets/images/community1.svg';
import community2 from '../../../src/assets/images/community2.svg';
import community3 from '../../../src/assets/images/community3.svg';
import EmptyState from '../Molecules/EmptyState';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const Communities = () => {
  const [searchValue, setSearchValue] = useState('');
  const [userHasForums] = useState(false);

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
  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  return (
    <div className='communities-wrapper'>
      <div className='container'>
        <div className='content-wrapper'>
          {userHasForums && (
            <div className='forums-true'>
              <div className='search-box'>
                <div className='search-box-wrapper'>
                  <SearchBox
                    onChange={onChange}
                    value={searchValue}
                    placeholder='Search'
                  />
                </div>
              </div>
              <div className='section-title'>
                <h3 className='text-color'>Communities </h3>
                <p className='text-color2'> (3)</p>
              </div>
              <div className='cards-wrapper'>
                <Carousel responsive={responsive}>
                {communities.map((community, index) => (
                  <CommunityCard community={community} key={index} />
                ))}
                </Carousel>
              </div>
            </div>
          )}
          {!userHasForums && (
            <EmptyState
              title={'No forums yet?!'}
              info={'Search or browse suggested forums below.'}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Communities;
