import React from "react";
import Icon from "../Icon";

const resourcesList = [
  {
    title: "CV Builder",
    content: "Learn and create job-ready CVs with our dedicated HR team.",
  },
  {
    title: "Tech Guides (PDF)",
    content: "Tech guides specifically designed for your field of interest whether it’s UX design, Data, or Engineering we’ve got you covered.",
  },
  {
    title: "Event Recordings",
    content: "Missed an event? Here’s our official BGIT recordings to keep you in the loop.",
  },
  {
    title: "Interview Prep",
    content: "Practice with one of our HR professionals to get you ready for your next opportunity",
  },
];

const Resources = () => {
  return (
    <div className="resources-wrapper shadow-sm mt-4">
      <h3 className="mt-3">Resources</h3>

      {resourcesList.map((list, key) => {
        return (
          <div key={key} className="resources-content">
            <h4 className="resources-title">{list.title}</h4>
            <div className="row align-items-center">
              <div className="col-10">
                <div className="resources-text">{list.content}</div>
              </div>
              <div className="col-2">
                <Icon icon="chevronRightBig" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Resources;
