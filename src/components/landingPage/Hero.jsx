import React from "react";
import { Link } from "react-router-dom";
import HeroImg from "../../assets/images/hero-bg.png";

const Hero = () => {
  return (
    <div className="hero">
      <div className="container">
        <div className="row gap-xl-0 gap-5">
          <div className="col-lg">
            <div className="hero-content mt-lg-5">
              <h1>
                BGIT <span>Exclusive</span> Membership <span>Portal</span>
              </h1>
              <p className="mt-lg-4">
                Join our fast-growing global black girls in tech network, and be part of an incredible community of black women who uplift and support
                each other while sharing their valuable experiences. By joining, you'll gain access to exclusive offers, exciting opportunities, and
                unlimited advantages that will empower and propel you forward in the world of technology.
              </p>
            </div>

            <div className="learn-more-btn text-lg-start text-center">
              <Link to="#">learn more</Link>
            </div>
          </div>
          <div className="col-lg px-0">
            <div className="color-box ms-lg-auto mx-lg-0 mx-auto">
              <div style={{ backgroundImage: `url(${HeroImg})` }} className="img-box"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
