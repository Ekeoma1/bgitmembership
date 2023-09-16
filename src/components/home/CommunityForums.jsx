import React from "react";
import Icon from "../Icon";
import { Link } from "react-router-dom";

const communityList = [
  {
    title: "Data Analysts 👩🏾‍💻",
    content: `Lorem ipsum dolor sit amet consectetur. Purus fringilla mi amet urna. Proin lectus adipiscing enim elit at a pharetra elit. Sit suspendisse enim elit hendrerit.`,
  },

  {
    title: "Coding Girlies Connect",
    content: `Lorem ipsum dolor sit amet consectetur. Purus fringilla mi amet urna. Proin lectus adipiscing enim elit at a pharetra elit. Sit suspendisse enim elit hendrerit.`,
  },

  {
    title: "Software Engineers :)",
    content: `Lorem ipsum dolor sit amet consectetur. Purus fringilla mi amet urna. Proin lectus adipiscing enim elit at a pharetra elit. Sit suspendisse enim elit hendrerit.`,
  },
];

const CommunityForums = () => {
  return (
    <div className="community-forum-wrapper">
      <div className="community-forum-card-wrapper shadow-sm">
        <h3>Community Forums</h3>

        {communityList.map((list, key) => {
          return (
            <div key={key} className="community-forum-card">
              <h4 className="mt-3">{list.title}</h4>

              <div className="community-forum-content">{list.content}</div>

              <div className="text-center">
                <button className="sec-btn smaller-text">Join</button>
              </div>
            </div>
          );
        })}

        <div className="text-center my-4">
          <Link to="/community-forums" className="sec-btn mx-auto c-gap-5 smallert-text added-width d-flex align-items-center justify-content-center">
            <span>View all</span> <Icon icon="arrowRight" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CommunityForums;
