import React from "react";
import "../assets/scss/navFooter.scss";
import Icon from "./Icon";
import { Link } from "react-router-dom";

const MobileFooterNav = () => {
  return (
    <div className="mobile-footer-nav-wrapper d-lg-none">
      <div className="mobile-footer-nav">
        <Link to="#" className="menu-item-wrapper active">
          <Icon icon="home" />
          <div className="menu-item">Home</div>
        </Link>

        <Link to="#" className="menu-item-wrapper ">
          <Icon icon="notificationBell" />
          <div className="menu-item">Updates</div>
        </Link>

        <Link to="#" className="menu-item-wrapper">
          <Icon icon="postAddIcon" />
          <div className="menu-item">Post</div>
        </Link>

        <Link className="menu-item-wrapper">
          <Icon icon="chatIcon" />
          <div className="menu-item">Forums</div>
        </Link>

        <Link to="#" className="menu-item-wrapper">
          <Icon icon="folder" />
          <div className="menu-item">Resources</div>
        </Link>
      </div>
    </div>
  );
};

export default MobileFooterNav;
