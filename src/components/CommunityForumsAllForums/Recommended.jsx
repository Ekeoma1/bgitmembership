import React from "react";
import "../../../src/assets/scss/communityForums.scss";
import ForumCard from "../Molecules/ForumCard";
import forumImg1 from "../../../src/assets/images/forumcard1.svg";
import forumImg2 from "../../../src/assets/images/forumcard2.svg";
import forumImg3 from "../../../src/assets/images/forumcard3.svg";
import forumImg4 from "../../../src/assets/images/forumcard4.svg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const Recommended = ({ basedOn }) => {
  const communities = [
    {
      community_img: forumImg1,
      community_name: "UX/UI Design",
      info: "Dorem ipsum dolor sit amet consectetur. Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu",
    },
    {
      community_img: forumImg2,
      community_name: "Engineer Girls",
      info: "Lorem ipsum dolor sit amet consectetur. Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu",
    },
    {
      community_img: forumImg3,
      community_name: "Data Babes 😍👩🏾‍💻",
      info: "Lorem ipsum dolor sit amet consectetur. Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu",
    },
    {
      community_img: forumImg4,
      community_name: "Data Babes 😍👩🏾‍💻",
      info: "Lorem ipsum dolor sit amet consectetur. Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu",
    },
    {
      community_img: forumImg1,
      community_name: "Data Babes 😍👩🏾‍💻",
      info: "Lorem ipsum dolor sit amet consectetur. Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu Urus fringilla mi. Lorem ipsu consectetur. Urus fringilla mi. Lorem ipsu",
    },
  ];
  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2.4,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1.4,
    },
  };
  return (
    <div className="recommended-section">
      <div className="container">
        <div className="recommended-section-content">
          <div className="section-title-wrapper">
            <h5 className="text-colo">Recommended based on your {basedOn}</h5>
          </div>
          {basedOn === "industry" && (
            <div className="forums-cards-wrapper">
              <Carousel responsive={responsive}>
                {communities.map((forum, index) => (
                  <ForumCard forum={forum} key={index} />
                ))}
              </Carousel>
            </div>
          )}
          {basedOn === "location" && (
            <div className="forums-cards-wrapper">
              <Carousel responsive={responsive}>
                {communities.map((forum, index) => (
                  <ForumCard forum={forum} key={index} />
                ))}
              </Carousel>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommended;
