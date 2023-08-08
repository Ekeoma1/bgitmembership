import React from "react";
import Icon from "../Icon";

const BioCard = () => {
  return (
    <div className="dashboard-card">
      <div className="row">
        <div className="col-md-11 col-12">
          <div className="dashboard-header d-flex justify-content-between">
            <span>Bio</span>
            <span className="d-md-none">
              <button>
                <Icon icon="edit" />
              </button>
            </span>
          </div>
          <div className="dashboard-text">
            I'm Claire, a UX designer passionate about crafting intuitive and delightful user experiences. With a background in graphic design and
            psychology, I combine empathy and research to create seamless interactions. I thrive in collaborative environments, working closely with
            cross-functional teams to translate complex problems into elegant design solutions.
          </div>

          <div className="dashboard-header mt-1">What best desribe you?</div>
          <div className="dashboard-text">I want to be mentored</div>
          <div className="dashboard-header mt-1">What your experience level?</div>
          <div className="dashboard-text">Entry Level</div>
        </div>
        <div className="col-md-1 d-md-block d-none">
          <button>
            <Icon icon="edit" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BioCard;
