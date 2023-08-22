import { useState } from "react";
import RadioGroup from "../Form-Input/RadioGroup";
import Icon from "../Icon";
import BlockedUser from "./BlockedUser";

const PrivacyOption = ({ title, selectedValue, onRadioChange }) => {
  return (
    <div className="mb-3">
      <p>{title}</p>
      <RadioGroup selectedValue={selectedValue} onRadioChange={onRadioChange} firstValue="Everyone" secondValue="Connections only" />
    </div>
  );
};

const Privacy = () => {
  const [showBlocked, setShowBlocked] = useState(false);
  const [privacySettings, setPrivacySettings] = useState([
    { title: "Manage who can see your Profile", selectedValue: true },
    { title: "Manage who can see your Posts", selectedValue: true },
    { title: "Manage who can see your Interests and Tags", selectedValue: true },
    { title: "Manage who can see your Location", selectedValue: true },
    { title: "Manage who can see members you follow", selectedValue: true },
  ]);

  const handleRadioChange = (index, newValue) => {
    const updatedSettings = [...privacySettings];
    updatedSettings[index].selectedValue = newValue;
    setPrivacySettings(updatedSettings);
    console.log(newValue);
  };

  return (
    <div className="settings-card shadow">
      <div className="header mb-3">Privacy Settings</div>

      {privacySettings.map((setting, index) => (
        <PrivacyOption
          key={index}
          title={setting.title}
          selectedValue={setting.selectedValue}
          onRadioChange={(newValue) => handleRadioChange(index, newValue)}
          firstValue={setting.firstValue}
          secondValue={setting.secondValue}
        />
      ))}
      <div className="my-5 position-relative">
        <div className="d-flex justify-content-between align-items-center">
          <div className="header">Blocked List</div>

          <button onClick={() => setShowBlocked(!showBlocked)}>
            <Icon icon={!showBlocked ? "chevronRightBigger" : "chevronDownBig"} />
          </button>
        </div>

        <div className={!showBlocked && "d-none"}>
          <BlockedUser />
        </div>
      </div>

      <div className="text-end">
        <button onClick={() => console.log(privacySettings)} type="submit" className="primary-btn small-btn">
          save
        </button>
      </div>
    </div>
  );
};

export default Privacy;
