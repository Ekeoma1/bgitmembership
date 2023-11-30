import React from "react";
import "../assets/scss/connections.scss";
import SearchBox from "../components/Molecules/SearchBox";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import ConnectionCard from "../components/connection/ConnectionCard";

const ForumMembers = () => {
  const navigate = useNavigate();
  return (
    <div className="connection-page">
      <div className="container">
        <button onClick={() => navigate(-1)}>
          <HiArrowLeft className="text-color22" />
        </button>

        <div className="connections-wrapper">
          <div className="connection-head">
            <h2>Forum Members</h2>
            <SearchBox placeholder="Search memberrs" />
          </div>

          <div className="connections-body">
            <ConnectionCard withoutAction={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumMembers;
