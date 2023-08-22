import React from "react";
import Icon from "../components/Icon";
import { useNavigate } from "react-router-dom";
import "../assets/scss/settings.scss";
import Accordion from "react-bootstrap/Accordion";
import PersonalInfo from "../components/Settings/PersonalInfo";
import ChangePassword from "../components/Settings/ChangePassword";
import FeedPreference from "../components/Settings/FeedPreference";
import Privacy from "../components/Settings/Privacy";
import CloseAccount from "../components/Settings/CloseAccount";
import SocialLinks from "../components/Settings/SocialLinks";

const Settings = () => {
  const navigate = useNavigate();
  return (
    <div className="settings-page">
      <div className="container">
        <div className="d-flex">
          <button onClick={() => navigate(-1)}>
            <Icon icon="arrowLeft" />
          </button>
          <div className="page-title ms-3">Settings</div>
        </div>

        <div className="text-center">
          <div className="page-header">Account Settings</div>
        </div>

        <Accordion className="mt-3">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div className="d-flex align-items-center gap-3">
                <div className="icon-circle">
                  <Icon icon="personalInfo" />
                </div>
                <div className="header">Edit Personal Info</div>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <PersonalInfo />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <div className="d-flex align-items-center gap-3">
                <div className="icon-circle">
                  <Icon icon="lock" />
                </div>
                <div className="header">Change your password</div>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <ChangePassword />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <div className="d-flex align-items-center gap-3">
                <div className="icon-circle">
                  <Icon icon="feed" />
                </div>
                <div className="header">Feed preference</div>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <FeedPreference />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <div className="d-flex align-items-center gap-3">
                <div className="icon-circle">
                  <Icon icon="eye" />
                </div>
                <div className="header">Privacy Settings</div>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <Privacy />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <div className="d-flex align-items-center gap-3">
                <div className="icon-circle">
                  <Icon icon="globe" />
                </div>
                <div className="header">Social Links</div>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <SocialLinks />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
            <Accordion.Header>
              <div className="d-flex align-items-center gap-3">
                <div className="icon-circle">
                  <Icon icon="trash" />
                </div>
                <div className="header">Close Account</div>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <CloseAccount />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default Settings;
