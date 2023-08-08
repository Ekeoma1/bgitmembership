import React from "react";
import Icon from "../components/Icon";
import "../assets/scss/dashboard.scss";
import ProfileBanner from "../components/Dashboard/ProfileBanner";
import BioCard from "../components/Dashboard/BioCard";
import SocialLinksCard from "../components/Dashboard/SocialLinksCard";
import Group from "../components/Dashboard/Group";
import Resources from "../components/Dashboard/Resources";
import Posts from "../components/Dashboard/Posts";

const Dashboard = () => {
  return (
    <div className="user-dashboard">
      <div className="container">
        <div>
          <button>
            <Icon icon="arrowLeft" />
          </button>
        </div>
        <div className="row mt-5">
          <div className="col-lg-8">
            <ProfileBanner />
            <BioCard />
            <SocialLinksCard />
            <Group />
            <Resources />
            <Posts />
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
