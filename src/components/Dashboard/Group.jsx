import React from "react";
import { useSelector } from 'react-redux';

const Group = () => {
   const { getAllForums, joinForum, leaveForum } = useSelector(
     (state) => state.forums
   );
  return (
    <div className="dashboard-card group-wrapper">
      <div className="d-flex justify-content-between align-items-center">
        <div className="dashboard-header">Groups</div>
        <div>
          <button className="dashboard-text">See morep</button>
        </div>
      </div>
      <div className="row mt-2 gap-md-0 gap-3 flex-wrap">
        <div className="col-md">
          <div className="d-flex gap-3 flex-wrap align-items-start">
            <div className="group-image"></div>
            <div>
              <div className="dashboard-header">Coding Girls Connect</div>
              <div className="d-flex justify-content-between">
                <div className="dashboard-text">57 Members</div>
                <div className="d-xl-none">
                  <button className="join-btn ">+Joined</button>
                </div>
              </div>
            </div>
            <div className="d-xl-block d-none">
              <button className="join-btn">+Joined</button>
            </div>
          </div>
        </div>

        <div className="col-md">
          <div className="d-flex flex-wrap gap-3 align-items-start">
            <div className="group-image"></div>
            <div>
              <div className="dashboard-header">Coding Girls Connect</div>
              <div className="d-flex justify-content-between">
                <div className="dashboard-text">57 Members</div>
                <div className="d-xl-none">
                  <button className="join-btn ">+Joined</button>
                </div>
              </div>
            </div>
            <div className="d-xl-block d-none">
              <button className="join-btn">+Joined</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
