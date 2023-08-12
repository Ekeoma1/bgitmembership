import React from "react";
import Icon from "../components/Icon";
import "../assets/scss/dashboard.scss";
import ProfileBanner from "../components/Dashboard/ProfileBanner";
import BioCard from "../components/Dashboard/BioCard";
import SocialLinksCard from "../components/Dashboard/SocialLinksCard";
import Group from "../components/Dashboard/Group";
import Posts from "../components/Dashboard/Posts";
import { Link, useNavigate } from "react-router-dom";

const ViewOtherUsers = () => {
  const Navigate = useNavigate();
  return (
    <div className="user-dashboard">
      <div className="container">
        <div>
          <button onClick={() => Navigate(-1)}>
            <Icon icon="arrowLeft" />
          </button>
        </div>

        <div className="row mt-5">
          <div className="col-lg-9 col-12">
            <ProfileBanner othersView={true} />
            <BioCard othersView={true} />
            <Posts />
            <SocialLinksCard othersView={true} />
            <Group />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOtherUsers;
