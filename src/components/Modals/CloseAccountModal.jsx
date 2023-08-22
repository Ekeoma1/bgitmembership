import React from "react";
import "../../assets/scss/modal.scss";

const CloseAccountModal = ({ show, hide }) => {
  return (
    <div className={`close-account-modal ${!show && "d-none"}`}>
      <div className="text-center mb-3">Are you sure you want to close your BGIT membership account?</div>

      <div className="d-flex gap-3 align-items-center flex-column">
        <button className="secondary-btn small-btn">Yes</button>
        <button onClick={() => hide()} className="primary-btn small-btn">
          No
        </button>
      </div>
    </div>
  );
};

export default CloseAccountModal;
