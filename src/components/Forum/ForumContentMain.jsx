import React from 'react';
import '../../assets/scss/forum.scss';
import Resources from '../home/Resources';
import Post from '../home/Post';
import CommunityForums from '../home/CommunityForumsComponent';
import Info from './Info';
import MyUpdates from '../Molecules/MyUpdates';

const ForumContentMain = ({ forum }) => {
  return (
    <div className='forum-content-main-wrapper'>
      <div className='container'>
        {/* <div className='search-box-wrapper ms-auto d-lg-block d-none'>
          <input type='text' placeholder='Search members or forums' />
          <Icon icon='searchIcon' />
        </div> */}
        <div className='row mt-lg-5'>
          <div className='col-3 d-lg-block d-none'>
            {/* <Info forum={forum} /> */}
            <MyUpdates />
            <Resources />
          </div>
          <div className='col-lg-9 col-12'>
            <Post />
          </div>
          {/* <div className='col-3 d-lg-block d-none'>
            <CommunityForums />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ForumContentMain;
