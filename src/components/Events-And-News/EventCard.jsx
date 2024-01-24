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
      className="event-card"
      onClick={() => navigate(news ? `/events-and-news/news/${item.newsId}` : `/events-and-news/event/${item.eventId}`)}
    >
      <div className="card-main">
        <div className="card-img mt-lg-5 m-0">
          <img src={item?.imageUrl || news ? newsImg : newsImg} alt="event-people" className="img-card" />
        </div>
        <div className="card-info">
          <div className="title">{item?.title}</div>
          <div className="date">{item?.date}</div>
          {event?.location && <div className="location">{item?.location}</div>}
          <div className="content">{item?.content}</div>
        </div>

      </div>
      {/* <div className="card-footer">
        <div className="icon-wrapper">
          <Icon icon="bookmark" />
        </div>
        <div className="icon-wrapper">
          <Icon icon="share" />
        </div>
      </div> */}
    </div>
  );
};

export default EventCard;
