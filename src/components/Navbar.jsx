import { useState } from "react";
import "../assets/scss/navFooter.scss";
import Logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import Icon from "./Icon";
import { useSelector } from "react-redux";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobNav, setMobNav] = useState(false);

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
    <nav className="">
      <div className="container">
        <div className="nav-divider">
          <Link to="/">
            <img src={Logo} alt="bgit logo" width="50" />
          </Link>

          <div className="d-lg-none menu-btn-wrapper">
            <button>
              <Icon icon="envelope" />
            </button>
            <button onClick={showMobNav}>
              <Icon icon="menu" />
            </button>
          </div>
          <div className="row d-lg-flex d-none mx-0 align-items-center justify-content-end">
            {isLoggedIn ? (
              <>
                <div className="col-3 px-0 text-center">
                  <Link className="menu-item" to="#">
                    Community Forums
                  </Link>
                </div>
                <div className="col-2 px-0 text-center">
                  <Link className="menu-item" to="#">
                    Events & News <Icon icon="chevronDown" />
                  </Link>
                </div>
                <div className="col-2 px-0 text-center">
                  <Link className="menu-item" to="#">
                    Job Board
                  </Link>
                </div>
                <div className="col-2 px-0 text-center">
                  <Link className="menu-item" to="#">
                    Resources <Icon icon="chevronDown" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="col text-end">
                <Link className="contact-btn" to="#">
                  Contact Us
                </Link>
              </div>
            )}
            <div className="col-2 left-menu-border px-0 text-end">
              {isLoggedIn ? (
                <div className="d-flex align-items-end justify-content-center">
                  <div onClick={toggleDropdown} className="user-profile-image"></div>
                  <Icon icon="triDown" />
                  <div className={`user-profile-dropdown shadow-sm ${!showDropdown && "d-none"}`}>
                    <Link onClick={hideDropdown} to="/dashboard">
                      My Dashboard
                    </Link>
                    <Link onClick={hideDropdown} to="#">
                      Settings
                    </Link>
                    <button>Log out</button>
                  </div>
                </div>
              ) : (
                <Link className="menu-item login-link" to="login">
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
