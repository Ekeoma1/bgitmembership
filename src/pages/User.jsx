import React from 'react';
import '../assets/scss/user.scss';
import Info from '../components/Forum/Info';
import Post from '../components/User/Post';
import CommunityForums from '../components/home/CommunityForums';
import Resources from '../components/home/Resources';
import Icon from '../components/Icon';
import UserCard from '../components/User/UserCard';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const User = () => {
    const navigate=useNavigate()
  return (
    <div className='user-main-wrapper'>
      <div className='container'>
        <div className='search-box-wrapper ms-auto d-lg-block d-none'>
          <input type='text' placeholder='Search posts' />
          <Icon icon='searchIcon' />
        </div>
        <div className='row mt-lg-5'>
          <div className='col-3 d-lg-block user-card-con'>
            <HiOutlineArrowLeft className='back' onClick={()=>navigate('/')} />
            <UserCard />
          </div>
          <div className='col-lg-6 col-12'>
            <Post />
          </div>
          <div className='col-3 d-lg-block d-none'>
            <CommunityForums />
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
