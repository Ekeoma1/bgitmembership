import React from "react";
import { BsBookmark } from "react-icons/bs";
import { PiShareFat } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Icon from "../Icon";

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  return (
    <div className="event-card shadow" onClick={() => navigate("/events-and-news/event")}>
      <div className="card-main">
        <div className="card-info">
          <h2 className="mt-lg-0 mt-3">{event.title}</h2>
          <p className="date">{event.date}</p>
          {event.location && <p className="location">{event.location}</p>}
          <p className="info">{event.info}</p>
        </div>
        <div className="card-img mt-lg-5 m-0">
          <img src={event.img} alt="event-people" className="img-card" />
        </div>
      </div>
      <div className="card-footer">
        <div className="icon-wrapper">
          <Icon icon="bookmark" />
        </div>
        <div className="icon-wrapper">
          <Icon icon="share" />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
