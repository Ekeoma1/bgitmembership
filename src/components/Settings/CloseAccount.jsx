import { useState } from "react";
import CloseAccountModal from "../Modals/CloseAccountModal";

const CloseAccount = () => {
  const [modal, setModal] = useState(false);
  const hideModal = () => {
    setModal(false);
  };
  return (
    <div className="settings-card shadow position-relative">
      <div className="header mb-3">Close Account</div>

      <div className="profile-details">
        <div className="profile-img bg-success"></div>

        <div className="profile-info-wrapper">
          <div className="name">Claire Jenkins</div>
          <div className="role">UX/UI Designer</div>
          <div className="location">London, UK</div>
        </div>
      </div>

      <div className="header mt-3">This will Deactivate your Account</div>
      <p>You’re about to deactivate your account. Your profile will no longer be viewable on our website.</p>

      <div className="header mt-3">What Else you should Know</div>
      <p>You can restore your account in 30 days if it was accidentally or wrongfully deactivated.</p>
      <p>Some information may still be available in search engines such as google and bing.</p>
      <p>If you want to change your username you can edit it in settings</p>

      <div className="text-center mt-5">
        <button onClick={() => setModal(true)} className="del-btn">
          Close Account
        </button>
      </div>

      <CloseAccountModal show={modal} hide={hideModal} />
    </div>
  );
};

export default CloseAccount;
