import React from "react";
import Fb from "../../assets/images/logos_facebook.png";

const socialLinks = [
  {
    logo: Fb,
    link: "facebook.com/claire.jenkins",
  },
];

const SocialLinksCard = () => {
  return (
    <div className="dashboard-card">
      <div className="dashboard-header">Social Links</div>
      {socialLinks.map((link, key) => {
        return (
          <div key={key} className="d-flex gap-1 align-items-center mt-1">
            <img width={30} src={link.logo} alt="logo" />
            <span className="dashboard-text">{link.link}</span>
          </div>
        );
      })}

      <div className="text-center">
        <button className="add-text-btn">+Add Social Links</button>
      </div>
    </div>
  );
};

export default SocialLinksCard;
