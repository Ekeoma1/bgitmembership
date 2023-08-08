import React from "react";
import "./../assets/scss/navFooter.scss";
import Icon from "./Icon";
import { Link } from "react-router-dom";

const MobileNav = ({ hide, nav }) => {
  return (
    <div className={`mobile-nav shadow d-lg-none ${!nav && "d-none"}`}>
      <button onClick={hide}>
        <Icon icon="close" />
      </button>
      <div className=" text-center">
        <div className="mobile-menu-item">
          <Link to="#">My Profile</Link>
        </div>
        <div className="mobile-menu-item">
          <Link to="#">News & Events</Link>
        </div>
        <div className="mobile-menu-item">
          <Link to="#">Settings</Link>
        </div>
        <button className="mobile-nav-log-out-btn">Log Out</button>
      </div>
    </div>
  );
};

export default MobileNav;
