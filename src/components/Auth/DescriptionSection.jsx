import { useState } from "react";

const descriptionData = [
  {
    id: 1,
    text: "I want to be mentored",
  },

  {
    id: 2,
    text: "I want to Network",
  },

  {
    id: 3,
    text: "I want to upskill",
  },

  {
    id: 4,
    text: "I want to get into tech",
  },

  {
    id: 5,
    text: "I want to attend events",
  },

  {
    id: 6,
    text: "I want to mentor others",
  },
];

const DescriptionSection = ({ tabChanger, currentTab }) => {
  const [desc, setDesc] = useState(0);
  return (
    <div className="details-wrapper">
      <header>
        <h3>What best describes you?</h3>
        <p>Please select what best describes you.</p>
      </header>

      <div className="radio-wrapper row flex-wrap">
        {descriptionData.map((data) => {
          return (
            <div key={data.id} className="col-md-4">
              <div onClick={() => setDesc(data.id)} className="radio-box mx-md-0 mx-auto">
                <div className={`radio-out-circle ${desc === data.id && "active"}`}>
                  <div className="radio-in-circle"></div>
                </div>

                <div className="radio-text">{data.text}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center my-5">
        <button onClick={() => tabChanger(currentTab + 1)} className="primary-btn" type="submit">
          Next
        </button>
      </div>
    </div>
  );
};

export default DescriptionSection;
