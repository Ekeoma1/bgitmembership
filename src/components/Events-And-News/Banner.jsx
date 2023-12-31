import React from "react";
import backgroundImage1 from "../../assets/images/people1.svg";

const Banner = () => {
  
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage1})`,
        // backgroundPosition: 'center',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="banner-wrapper"
    >
      <div className="banner-gradient">
        <div className="banner-content">
          {/* <div className="arrow">
                <HiArrowLeft/>
            </div> */}
          <div className="container">
            <h2>Events and News</h2>
            <h5>Stay up to date with the latest BGIT News and Events. We always have something going on for our members!</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
