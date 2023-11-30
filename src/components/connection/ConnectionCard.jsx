import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon";

const ConnectionCard = ({ withoutAction }) => {
  const [showAction, setShowAction] = useState(false);
  const toggleAction = () => {
    setShowAction(!showAction);
  };
  return (
    <div className="connection-card shadow">
      <div className="connection-details">
        <div className="connection-img"></div>
        <div className="nameRole-wrapper">
          <h3 className="name">Miss. Alice</h3>
          <div className="role">Product Manager</div>
        </div>
      </div>

      <div className={`connection-action ${withoutAction && "d-none"}`}>
        <Link to="#">
          <div className="msg-btn d-lg-flex d-none">Message</div>
          <span className="d-lg-none">
            <Icon icon="envelope" />
          </span>
        </Link>

        <button onClick={() => toggleAction()}>
          <Icon icon="elipse-horizontal" />
        </button>

        <div className={`delete-connection-wrapper ${!showAction && "d-none"} `}>
          <Icon icon="deleteIcon" />
          Remove connection
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
