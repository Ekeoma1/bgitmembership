import React from 'react';
import './../assets/scss/navFooter.scss';
import Icon from './Icon';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, resetSignIn, resetSignUp } from '../Features/auth/auth_slice';
import OutsideClickHandler from 'react-outside-click-handler/build/OutsideClickHandler';

const MobileNav = ({ hide, nav }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { getMyProfile } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  return (
    <>
      <OutsideClickHandler onOutsideClick={hide}>
        <div className={`mobile-nav shadow d-lg-none ${!nav && 'd-none'}`}>
          <button onClick={hide}>
            <Icon icon='close' />
          </button>
          {isLoggedIn ? (
            <div className=' text-center'>
              <div onClick={hide} className='mobile-menu-item'>
                <Link to={`users/${getMyProfile.data?.userId}`}>Dashboard</Link>
              </div>
              <div onClick={hide} className='mobile-menu-item'>
                <Link to='/events-and-news'>News & Events</Link>
              </div>
              <div onClick={hide} className='mobile-menu-item'>
                <Link to='/settings'>Settings</Link>
              </div>
              <button
                onClick={() => {
                  dispatch(logout());
                  dispatch(resetSignIn());
                  dispatch(resetSignUp());
                }}
                className='mobile-nav-log-out-btn'
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className=' text-center'>
              <div onClick={hide} className='mobile-menu-item'>
                <Link to='/login'>Login / Register</Link>
              </div>
              <div onClick={hide} className='mobile-menu-item'>
                <Link to='#'>Contact Us</Link>
              </div>
            </div>
          )}
        </div>
      </OutsideClickHandler>
    </>
  );
};

export default MobileNav;
