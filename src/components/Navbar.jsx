import { useEffect, useState } from 'react';
import '../assets/scss/navFooter.scss';
import Logo from '../assets/images/logo.png';
import { Link, NavLink } from 'react-router-dom';
import Icon from './Icon';
import { useSelector, useDispatch } from 'react-redux';
import MobileNav from './MobileNav';
import { FiChevronDown } from 'react-icons/fi';
// import { AppContext } from '../context/Context';
// import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { logout, resetSignIn } from '../Features/auth/auth_slice';
import OutsideClickHandler from 'react-outside-click-handler';
import { UserProfilePhotoLoader2 } from './Atoms/skeleton-loaders/dashboard-page/UserProfilePhotoLoader';
import { triggerGetMyProfile } from '../Features/users/users_slice';

const Navbar = () => {
  // const { toggleTheme, theme } = useContext(AppContext);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { getMyProfile } = useSelector((state) => state.users);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobNav, setMobNav] = useState(false);
  const dispatch = useDispatch();
  const [profileImgOnLoadStatus, setProfileImgOnLoadStatus] = useState('base');

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
  useEffect(() => {
    dispatch(triggerGetMyProfile());
  }, []);
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
          <div className='nav-buttons row d-lg-flex d-none mx-0 align-items-center justify-content-end'>
            {isLoggedIn ? (
              <>
                <div className='col-3 px-0 text-center'>
                  <NavLink
                    to='/community-forums'
                    className={({ isActive }) =>
                      isActive ? 'active-link' : 'menu-item'
                    }
                  >
                    Community Forums
                  </NavLink>
                </div>
                <div className='col-2 px-0 text-center'>
                  <NavLink
                    to='/events-and-news'
                    className={({ isActive }) =>
                      isActive ? 'active-link' : 'menu-item'
                    }
                  >
                    Events & News <FiChevronDown />
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
                    Resources <FiChevronDown />
                  </NavLink>
                </div>
              </>
            ) : (
              <div className='col text-end'>
                <NavLink
                  to='#'
                  // className={({ isActive }) => (isActive ? '' : 'contact-btn')}
                  className='contact-btn'
                >
                  Contact us
                </NavLink>
              </div>
            )}
            <div className='col-2 left-menu-border px-0 text-end'>
              {isLoggedIn ? (
                <OutsideClickHandler
                  onOutsideClick={() => {
                    setShowDropdown(false);
                  }}
                >
                  <div className='left-menu-border-content'>
                    <div className='d-flex align-items-end justify-content-center'>
                      <div
                        onClick={toggleDropdown}
                        className='user-profile-image'
                      >
                        {getMyProfile.status === 'base' ||
                        getMyProfile.status === 'loading' ? (
                          <>
                            <UserProfilePhotoLoader2 />
                          </>
                        ) : (
                          <>
                            <img
                              src={getMyProfile.data?.imageUrl}
                              alt='post-img'
                              className={`${
                                profileImgOnLoadStatus === 'success'
                                  ? 'd-block'
                                  : 'd-none'
                              }`}
                              onLoad={() =>
                                setProfileImgOnLoadStatus('success')
                              }
                              onError={() => setProfileImgOnLoadStatus('error')}
                            />
                            {profileImgOnLoadStatus === 'base' && (
                              <UserProfilePhotoLoader2 />
                            )}
                            {profileImgOnLoadStatus === 'error' && (
                              <div className='error-img'>couldn't load img</div>
                            )}
                          </>
                        )}
                      </div>
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
                        <button
                          onClick={() => {
                            dispatch(logout());
                            dispatch(resetSignIn());
                            setShowDropdown(false);
                          }}
                        >
                          Log out
                        </button>
                      </div>
                    </div>
                    {/* <button
                    onClick={() => {
                      toggleTheme();
                    }}
                  >
                    {theme === 'light' ? <BsFillMoonFill /> : <BsFillSunFill />}
                  </button> */}
                  </div>
                </OutsideClickHandler>
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
