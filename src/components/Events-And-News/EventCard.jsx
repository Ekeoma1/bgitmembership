import React from "react";
import { BsBookmark } from "react-icons/bs";
import { PiShareFat } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Icon from "../Icon";
import newsImg from "../../assets/images/news1.svg";

const EventCard = ({ event, news, item }) => {
  const navigate = useNavigate();
  return (
    <div
      className="event-card shadow"
      onClick={() => navigate(news ? `/events-and-news/news/${item.newsId}` : `/events-and-news/event/${item.eventId}`)}
    >
      <div className="card-main">
        <div className="card-info">
          <h2 className="mt-lg-0 mt-3">{item?.title}</h2>
          <p className="date">{item?.date}</p>
          {event?.location && <p className="location">{item?.location}</p>}
          <p className="info">{item?.content}</p>
        </div>
        <div className="card-img mt-lg-5 m-0">
          <img src={item?.imageUrl || news ? newsImg : newsImg} alt="event-people" className="img-card" />
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
