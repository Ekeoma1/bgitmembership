import React from "react";
import "../assets/scss/connections.scss";
import ConnectionCard from "../components/connection/ConnectionCard";
import SearchBox from "../components/Molecules/SearchBox";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const navigate = useNavigate();
  return (
    <section className="connection-page">
      <div className="container">
        <button onClick={() => navigate(-1)}>
          <HiArrowLeft className="text-color22" />
        </button>

        <div className="connections-wrapper">
          <div className="connection-head">
            <h2>20 Connections</h2>
            <SearchBox placeholder="Search connections" />
          </div>

          <div className="connections-body">
            <ConnectionCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connections;
