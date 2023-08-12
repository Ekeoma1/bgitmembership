import React from "react";
import Image from "../../assets/images/author1.png";
import { Link } from "react-router-dom";

const memberData = [
  {
    name: "Jane Smith",
    role: "UX Engineer",
    location: "Birmingham, UK",
    img: Image,
  },

  {
    name: "Celia Dekunle",
    role: "UX/UI Learner",
    location: "London, UK",
    img: Image,
  },

  {
    name: "Nneka Ugwu",
    role: "UX Intern",
    location: "Dublin Ireland",
    img: Image,
  },
  {
    name: "Alisha Akossa",
    role: "Service Designer",
    location: "Los angeles, US",
    img: Image,
  },
];

const Member = () => {
  return (
    <div className="members-you-may-know-wrapper">
      <div className="header text-center">Members you may know</div>

      <div className="member-card-wrapper">
        <div className="row">
          {memberData.map((data, key) => {
            return (
              <div key={key} className="col-lg-12 col-md-6 ">
                <div className="member-card mt-3 mx-auto">
                  <div className="d-flex flex-wrap gap-3">
                    <div style={{ backgroundImage: `url(${data.img})` }} className="member-img"></div>
                    <div>
                      <div className="name">{data.name}</div>
                      <div className="other-data">{data.role}</div>
                      <div className="other-data">{data.location}</div>
                    </div>
                  </div>

                  <div className="text-center mt-3">
                    <button className="sec-btn">+ Connect</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center mt-3 d-lg-block d-none">
        <Link className="see-more-btn" to="#">
          See More
        </Link>
      </div>
    </div>
  );
};

export default Member;
