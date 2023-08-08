import React from "react";
import IMG from "../../assets/images/re-img.png";

const resourceList = [
  {
    title: "Bnkly Web Design",
    content: "Ut suscipit mi cursus hendrerit ac nuncol leo pellentesque mauris mattis egetel.",
    image: IMG,
  },

  {
    title: "Bnkly Web Design",
    content: "Ut suscipit mi cursus hendrerit ac nuncol leo pellentesque mauris mattis egetel.",
    image: IMG,
  },

  {
    title: "Bnkly Web Design",
    content: "Ut suscipit mi cursus hendrerit ac nuncol leo pellentesque mauris mattis egetel.",
    image: IMG,
  },
];

const Resources = () => {
  return (
    <div className="dashboard-card resources-wrapper">
      <div className="d-flex justify-content-between align-items-center">
        <div className="dashboard-header">Resources</div>
        <div>
          <button className="dashboard-text">See more</button>
        </div>
      </div>

      <div className="mt-4 d-flex flex-wrap gap-3 ">
        {resourceList.map((data, key) => {
          return (
            <div key={key} className="resource-card mx-auto">
              <div style={{ backgroundImage: `url(${data.image})` }} className="resource-card-img"></div>
              <div className="resource-card-content">
                <div className="dashboard-header">{data.title}</div>
                <div className="dashboard-text">{data.content}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Resources;
