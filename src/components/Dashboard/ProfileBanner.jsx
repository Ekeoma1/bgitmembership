import { useState } from "react";
import Icon from "../Icon";
import AccountActionModal from "../Modals/AccountActionModal";
import IndividualActionModal from "../Modals/IndividualActionModal";
import { Link } from "react-router-dom";
import ReportModal from "../Modals/ReportModal";

const ProfileBanner = ({ othersView }) => {
  const [actionAcctModal, setActionAcctModal] = useState(false);
  const [individalAcctModal, setIndividualAcctModal] = useState(false);
  const [contentToShow, setContentToShow] = useState(null);
  const [reportModal, setReportModal] = useState(false);

  const toggleAcctModal = () => {
    setActionAcctModal(!actionAcctModal);
  };

  const showIndividualAcctModal = (num) => {
    setContentToShow(num);
    setIndividualAcctModal(true);
  };

  const hideIndividualAcctModal = () => {
    setIndividualAcctModal(false);
  };

  return (
    <div className="profile-banner-wrapper">
      <div className="banner-image"></div>
      <div className="profile-image"></div>
      <div className="profile-details-card">
        <div className="row">
          <div className="col-md-11 col-10">
            <div className="row gap-md-0 gap-2">
              <div className="col-md-6">
                <h2 className="profile-name">Claire Jenkins</h2>
                <div className="job">UI/UX Designer</div>
                <div className="job">Product</div>
                <div className="other-details location">London</div>
                <div className="other-details connect">21 connections</div>
              </div>
              <div className="col-md-6">
                <div className="tag-header">Tags</div>
                <div className="d-flex gap-2 flex-wrap align-items-center">
                  <div className="other-details tag-names">UX design</div>
                  <div className="other-details tag-names">UI design</div>
                  <div className="other-details tag-names">Figma</div>
                  {!othersView && <div className="see-more-btn d-lg-flex d-none">see 2 more</div>}
                </div>

                <div className="tag-header mt-2">Featured Skill</div>
                <div className="d-flex gap-3 flex-wrap align-items-center">
                  <div className="other-details tag-names">Research</div>
                  <div className="other-details tag-names">Interaction Design</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-1 col-2">
            {othersView ? (
              <button onClick={toggleAcctModal}>
                <Icon icon="elipse" />
              </button>
            ) : (
              <button>
                <Icon icon="edit" />
              </button>
            )}
          </div>
        </div>

        {othersView && (
          <div className="d-flex c-gap-10 flex-wrap mt-3">
            <button className="reach-btn">+ Connect</button>

            <Link className="reach-btn" to="#">
              Message
            </Link>
          </div>
        )}
      </div>

      {othersView && <AccountActionModal reportAction={setReportModal} show={actionAcctModal} action={showIndividualAcctModal} />}
      {othersView && <IndividualActionModal show={individalAcctModal} tab={contentToShow} close={hideIndividualAcctModal} />}
      {othersView && <ReportModal showReport={reportModal} reportAction={setReportModal} />}
    </div>
  );
};

export default ProfileBanner;
