import React from 'react';
import '../assets/scss/navFooter.scss';
import Icon from './Icon';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setShowPostModalMobile } from '../Features/other/other_slice';
import CreateCommunityModal from './home/PostModal';
import PostModal from './home/PostModal';

const MobileFooterNav = () => {
  const { getMyProfile } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  return (
    <div className='mobile-footer-nav-wrapper d-lg-none'>
      <div className='mobile-footer-nav'>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive ? 'menu-item-wrapper active' : 'menu-item-wrapper'
          }
        >
          <Icon icon='home' />
          <div className='menu-item'>Home</div>
        </NavLink>

        <NavLink
          to={`/updates/user/${getMyProfile.data?.userId}`}
          className={({ isActive }) =>
            isActive ? 'menu-item-wrapper active' : 'menu-item-wrapper'
          }
        >
          <Icon icon='notificationBell' />
          <div className='menu-item'>Updates</div>
        </NavLink>

        <NavLink
          to='#'
          className={({ isActive }) =>
            isActive ? 'menu-item-wrapper active' : 'menu-item-wrapper'
          }
        >
          <div onClick={() => dispatch(setShowPostModalMobile())} className=''>
            <Icon icon='postAddIcon' />
            <div className='menu-item'>Post</div>
          </div>
        </NavLink>

        <NavLink
          to={'/forums'}
          className={({ isActive }) =>
            isActive ? 'menu-item-wrapper active' : 'menu-item-wrapper'
          }
        >
          <Icon icon='chatIcon' />
          <div className='menu-item'>Forums</div>
        </NavLink>

        <NavLink
          to='/resources'
          className={({ isActive }) =>
            isActive ? 'menu-item-wrapper active' : 'menu-item-wrapper'
          }
        >
          <Icon icon='folder' />
          <div className='menu-item'>Resources</div>
        </NavLink>
      </div>
    </div>
  );
};

export default MobileFooterNav;
