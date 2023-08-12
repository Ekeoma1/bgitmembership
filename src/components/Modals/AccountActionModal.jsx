import React from "react";
import "../../assets/scss/modal.scss";
import Icon from "../Icon";

const AccountActionModal = ({ show, action }) => {
  return (
    <div className={`account-action-modal shadow-sm ${!show && "d-none"}`}>
      <button onClick={() => action(1)} className="acct-btn">
        <Icon icon="block" />
        <span>Block Account</span>
      </button>

      <button onClick={() => action(3)} className="acct-btn">
        <Icon icon="mute" />
        <span>Mute Account</span>
      </button>

      <button className="acct-btn">
        <Icon icon="report" />
        <span>Report Account</span>
      </button>
    </div>
  );
};

export default AccountActionModal;
