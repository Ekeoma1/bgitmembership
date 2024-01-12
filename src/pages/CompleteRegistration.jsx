import { useState, useEffect } from "react";
import "../assets/scss/loginRegister.scss";
import PersonalDetailsForm from "../components/Auth/PersonalDetailsForm";
import ProfileDetails from "../components/Auth/ProfileDetails";
import DescriptionSection from "../components/Auth/DescriptionSection";
import ExperienceLevel from "../components/Auth/ExperienceLevel";
import AcceptTerms from "../components/Auth/AcceptTerms";
import { Stepper } from "react-form-stepper";

const CompleteRegistration = ({ setStep1 }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const changeTab = (num) => {
    setCurrentTab(num);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='registration-page'>
      <div className='register-wrapper'>
        <div>
          <Stepper
            className='register-stepper'
            steps={[{}, {}, {}, {}, {}]}
            activeStep={currentTab}
            connectorStateColors={true}
            styleConfig={{
              circleFontSize: '16px',
              size: '34px',
              completedBgColor: '#33246A',
              activeBgColor: '#33246A',
              inactiveBgColor: '#EFF0F6',
              inactiveTextColor: '#6F6C90',
            }}
            connectorStyleConfig={{
              completedColor: '#33246A',
              size: 4,
              disabledColor: '#EFF0F6',
              activeColor: '#33246A',
            }}
          />
          <hr />
        </div>

        {currentTab === 0 && (
          <PersonalDetailsForm currentTab={currentTab} tabChanger={changeTab} />
        )}
        {currentTab === 1 && (
          <ProfileDetails currentTab={currentTab} tabChanger={changeTab} />
        )}
        {currentTab === 2 && (
          <DescriptionSection currentTab={currentTab} tabChanger={changeTab} />
        )}
        {currentTab === 3 && (
          <ExperienceLevel currentTab={currentTab} tabChanger={changeTab} />
        )}
        {currentTab === 4 && (
          <AcceptTerms
            currentTab={currentTab}
            tabChanger={changeTab}
            setStep1={setStep1}
          />
        )}
      </div>
    </div>
  );
};

export default CompleteRegistration;
