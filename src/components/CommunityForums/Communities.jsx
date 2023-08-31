import React, { useState } from 'react';
import '../../../src/assets/scss/communityForums.scss';

import SearchBox from '../Molecules/SearchBox';
import CommunityCard from './CommunityCard';
import community1 from '../../../src/assets/images/community1.svg';
import community2 from '../../../src/assets/images/community2.svg';
import community3 from '../../../src/assets/images/community3.svg';
import emptyForum from '../../../src/assets/images/empty-forum.svg';
const Communities = () => {
  const [searchValue, setSearchValue] = useState('');
  const [userHasForums, setUserHasForums] = useState(true);

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
                <h3>Communities </h3>
                <p> (3)</p>
              </div>
              <div className='cards-wrapper'>
                {communities.map((community, index) => (
                  <CommunityCard community={community} key={index} />
                ))}
              </div>
            </div>
          )}
          {!userHasForums && (
            <div className='forums-false'>
              <img src={emptyForum} alt='empty forum' className='' />
              <h5>No forums yet</h5>
              <p>Search or browse suggested forums below.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Communities;
