import React from "react";
import "./../assets/scss/navFooter.scss";
import Icon from "./Icon";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MobileNav = ({ hide, nav }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className={`mobile-nav shadow d-lg-none ${!nav && "d-none"}`}>
      <button onClick={hide}>
        <Icon icon="close" />
      </button>
      {isLoggedIn ? (
        <div className=" text-center">
          <div onClick={hide} className="mobile-menu-item">
            <Link to="#">Dashboard</Link>
          </div>
          <div onClick={hide} className="mobile-menu-item">
            <Link to="/events-and-news">News & Events</Link>
          </div>
          <div onClick={hide} className="mobile-menu-item">
            <Link to="/settings">Settings</Link>
          </div>
          <button className="mobile-nav-log-out-btn">Log Out</button>
        </div>
      ) : (
        <div className=" text-center">
          <div onClick={hide} className="mobile-menu-item">
            <Link to="/login">Login / Register</Link>
          </div>
          <div onClick={hide} className="mobile-menu-item">
            <Link to="#">Contact Us</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
