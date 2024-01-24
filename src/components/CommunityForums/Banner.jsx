import React from "react";
import "../../../src/assets/scss/communityForums.scss";
import backgroundImage1 from "../../../src/assets/images/the-girls.svg";

const Banner = () => {
  return (
    <div className="banner-section">

      <div
        style={{
          backgroundImage: `url(${backgroundImage1})`
        }}
        className="banner-wrapper"
      >
        <div className="banner-gradient">
          <div className="container banner-content">
            <div className="title-wrapper">
              <h2 className="text-color22">My Forums</h2>
              <h5>Chat and connect with your communities</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
