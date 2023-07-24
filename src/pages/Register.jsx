import React, { useState } from "react";
import "../assets/scss/loginRegister.scss";
import PersonalDetailsForm from "../components/Auth/PersonalDetailsForm";
import ProfileDetails from "../components/Auth/ProfileDetails";
import DescriptionSection from "../components/Auth/DescriptionSection";
import ExperienceLevel from "../components/Auth/ExperienceLevel";
import AcceptTerms from "../components/Auth/AcceptTerms";

const Register = () => {
  const [currentTab, setCurrentTab] = useState(2);

  const changeTab = (num) => {
    setCurrentTab(num);
  };
  return (
    <div className="registration-page">
      <div className="register-wrapper">
        <div>
          Progress stepper comes in here
          <hr />
        </div>

        {currentTab === 1 && <PersonalDetailsForm currentTab={currentTab} tabChanger={changeTab} />}
        {currentTab === 2 && <ProfileDetails currentTab={currentTab} tabChanger={changeTab} />}
        {currentTab === 3 && <DescriptionSection currentTab={currentTab} tabChanger={changeTab} />}
        {currentTab === 4 && <ExperienceLevel currentTab={currentTab} tabChanger={changeTab} />}
        {currentTab === 5 && <AcceptTerms currentTab={currentTab} tabChanger={changeTab} />}
      </div>
    </div>
  );
};

export default Register;
