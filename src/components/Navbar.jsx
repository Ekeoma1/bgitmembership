import { useState } from 'react';
import '../assets/scss/navFooter.scss';
import Logo from '../assets/images/logo.png';
import { Link, NavLink } from 'react-router-dom';
import Icon from './Icon';
import { useSelector, useDispatch } from 'react-redux';
import MobileNav from './MobileNav';
import { logout } from '../Features/authSlice';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobNav, setMobNav] = useState(false);
  const dispatch = useDispatch();

  const hideMobNav = () => {
    setMobNav(false);
  };

  const showMobNav = () => {
    setMobNav(true);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const hideDropdown = () => {
    setShowDropdown(false);
  };
  return (
    <nav className=''>
      <div className='container'>
        <div className='nav-divider'>
          <Link to='/'>
            <img src={Logo} alt='bgit logo' width='50' />
          </Link>

          <div className='d-lg-none menu-btn-wrapper'>
            <button>
              <Icon icon='envelope' />
            </button>
            <button onClick={showMobNav}>
              <Icon icon='menu' />
            </button>
          </div>
          <div className='row d-lg-flex d-none mx-0 align-items-center justify-content-end'>
            {isLoggedIn ? (
              <>
                <div className='col-3 px-0 text-center'>
                  <NavLink
                    to='/community'
                    className={({ isActive }) =>
                      isActive ? 'active-link' : 'menu-item'
                    }
                  >
                    Community Forums
                  </NavLink>
                </div>
                <div className='col-2 px-0 text-center'>
                  <NavLink
                    to='/events'
                    className={({ isActive }) =>
                      isActive ? 'active-link' : 'menu-item'
                    }
                  >
                    Events & News <Icon icon='chevronDown' />
                  </NavLink>
                </div>
                <div className='col-2 px-0 text-center'>
                  <NavLink
                    to='/job-board'
                    className={({ isActive }) =>
                      isActive ? 'active-link' : 'menu-item'
                    }
                  >
                    Job Board
                  </NavLink>
                </div>
                <div className='col-2 px-0 text-center'>
                  <NavLink
                    to='/resources'
                    className={({ isActive }) =>
                      isActive ? 'active-link' : 'menu-item'
                    }
                  >
                    Resources <Icon icon='chevronDown' />
                  </NavLink>
                </div>
              </>
            ) : (
              <div className='col text-end'>
                <NavLink
                  to='#'
                  className={({ isActive }) => (isActive ? '' : 'contact-btn')}
                >
                  Contact us
                </NavLink>
              </div>
            )}
            <div className='col-2 left-menu-border px-0 text-end'>
              {isLoggedIn ? (
                <div className='d-flex align-items-end justify-content-center'>
                  <div
                    onClick={toggleDropdown}
                    className='user-profile-image'
                  ></div>
                  <Icon icon='triDown' />
                  <div
                    className={`user-profile-dropdown shadow-sm ${
                      !showDropdown && 'd-none'
                    }`}
                  >
                    <Link onClick={hideDropdown} to='/dashboard'>
                      My Dashboard
                    </Link>
                    <Link onClick={hideDropdown} to='/settings'>
                      Settings
                    </Link>
                    <button onClick={() => dispatch(logout())}>Log out</button>
                  </div>
                </div>
              ) : (
                <Link className='menu-item login-link' to='login'>
                  Log in / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <MobileNav hide={hideMobNav} nav={mobNav} />
    </nav>
  );
};

export default Navbar;
