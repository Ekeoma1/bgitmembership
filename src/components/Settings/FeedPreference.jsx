import { useState } from "react";
import RadioGroup from "../Form-Input/RadioGroup";

const FeedPreference = () => {
  const [selectedValue, setSelectedValue] = useState(true);

  const handleRadioChange = (newValue) => {
    setSelectedValue(newValue);
    console.log(newValue);
  };
  return (
    <div className="settings-card shadow">
      <div className="header">Feed Preference</div>

      <div className="mt-3 feed-details">
        <p>Take control of your feed and choose what type of content you’d like to see</p>

        <p>Select Preferred feed view</p>

        <RadioGroup
          selectedValue={selectedValue}
          onRadioChange={handleRadioChange}
          firstValue="Most relevant posts (interests)"
          secondValue="Most recent posts"
        />

        <div className="mt-3 text-end">
          <button onClick={() => console.log(selectedValue)} type="submit" className="primary-btn small-btn">
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedPreference;
