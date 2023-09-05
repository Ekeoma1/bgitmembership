import React from "react";
import Icon from "../Icon";
import { Link, useNavigate } from "react-router-dom";

const recentlyViewed = [
  {
    text: "Tech Talks with Tasha",
  },
  {
    text: "Introduction to UX Design",
  },
];

const upcomingEvent = [
  {
    text: "Staycation Retreat",
  },
  {
    text: "Bonfire night & Vibez (TBC)",
  },
];

const MyUpdates = () => {
  return (
    <div className="my-updates-wrapper shadow-sm">
      <h3 className="mt-3">My updates</h3>

      <div>
        <div className="section-header mt-4">Recently Viewed</div>
        <div className="section-list-wrapper">
          {recentlyViewed.map((list, key) => {
            return (
              <div key={key} className="section-list d-flex align-items-center c-gap-10">
                <div className="circle"></div>
                <div className="text">{list.text} </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="section-header mt-4">Upcoming Events</div>
        <div className="section-list-wrapper">
          {upcomingEvent.map((list, key) => {
            return (
              <div key={key} className="section-list d-flex align-items-center c-gap-10">
                <div className="circle"></div>
                <div className="text">{list.text} </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="section-header">New</div>
        <div className="section-list-wrapper">
          <div className="big-text">
            <Link to="#">
              <span>Request</span> (4)
            </Link>
          </div>

          <div className="big-text">
            <Link to="#">
              <span>Comments</span> (1)
            </Link>
          </div>
        </div>
      </div>

      <div className=" my-4">
        <Link to="/updates" className="sec-btn mx-auto c-gap-5 smallert-text added-width d-flex align-items-center justify-content-center">
          <span>View all</span> <Icon icon="arrowRight" />
        </Link>
      </div>
    </div>
  );
};

export default MyUpdates;
