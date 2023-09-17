import React from "react";
import Img1 from "../../assets/images/connect-img1.png";
import Img2 from "../../assets/images/connect-img2.png";
import Img3 from "../../assets/images/connect-img3.png";
import { Link } from "react-router-dom";
import RImg1 from "../../assets/images/r-image.png";
import RImg2 from "../../assets/images/r-image2.png";
import RImg3 from "../../assets/images/r-image3.png";
import RImg4 from "../../assets/images/r-image4.png";
import Icon from "../Icon";

const memberList = [
  {
    duration: "BGIT Member since 2002",
    image: Img1,
    name: "ese roberts",
    interest: "Software Engineering & books",
  },
  {
    duration: "BGIT Member since 2002",
    image: Img2,
    name: "Sarah Hope",
    interest: "UX design & Shopping",
  },
  {
    duration: "BGIT Member since 2002",
    image: Img3,
    name: "Lydia Love",
    interest: "All things tech tbh ",
  },
];

const resourceList = [
  {
    image: RImg1,
    text: "Receive interesting news, events, and information first.",
  },
  {
    image: RImg2,
    text: "Access several tech resources.",
  },
  {
    image: RImg3,
    text: "Access several tech resources.",
  },
  {
    image: RImg4,
    text: "Access several tech resources.",
  },
];

const Connect = () => {
  return (
    <section className="connect-section">
      <div className="container">
        <div className="row gap-lg-0 gap-4">
          <div className="col-lg mt-lg-4">
            <header className="text-center d-lg-none">
              <h2> Membership Created Just for You</h2>
            </header>
            <div className="d-flex gap-5 flex-wrap">
              {resourceList.map((res, index) => {
                return (
                  <div key={index} className="resources-card mx-lg-0 mx-auto">
                    <div style={{ backgroundImage: `url(${res.image})` }} className="resource-card-img"></div>
                    <div className="resource-card-body w-100 d-flex justify-content-betweem align-items-center gap-2">
                      <div className="card-text">{res.text}</div>
                      <Icon icon="chevronRight" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-lg-6">
            <header className="text-center">
              <h2>Connect with Our Members</h2>
              <p className="mt-4">Meet some of our BGIT members and form long-lasting relationships right now! </p>
            </header>

            <div className="row gap-md-0 gap-3 flex-wrap member-card-wrapper">
              {memberList.map((list, index) => {
                return (
                  <div key={index} className="col-md-4">
                    <div className="member-card text-center mx-md-0 mx-auto">
                      <div className="member-duration">{list.duration}</div>
                      <div style={{ backgroundImage: `url(${list.image})` }} className="member-img-frame mx-auto mt-3"></div>
                      <div className="member-name mt-3">{list.name}</div>
                      <p className="member-interest mb-3 mt-2">Interests: {list.interest}</p>

                      <div>
                        <Link className="pri-btn" to="#">
                          + Follow
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connect;
