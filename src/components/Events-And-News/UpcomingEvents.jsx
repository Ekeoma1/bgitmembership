import React, { useEffect, useRef, useState } from "react";
import SearchBox from "../Molecules/SearchBox";
import { VscSettings } from "react-icons/vsc";
import { HiChevronDown } from "react-icons/hi";
import { BsBookmark } from "react-icons/bs";
import { PiShareFat } from "react-icons/pi";
import people1 from "../../assets/images/people3.svg";
import people2 from "../../assets/images/people4.svg";
import { Scrollbar } from "react-scrollbars-custom";
import EventCard from "./EventCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const UpcomingEvents = () => {
  const data = [
    {
      title: "BGIT Staycation",
      date: "8 October 2023",
      location: "London, UK",
      info: "We want to express our heartfelt appreciation and share the immense joy we experienced during the Community Mixer held on...",
      img: people1,
      bookmark: "2",
      share: "7",
    },
    {
      title: "BGIT Network Day",
      date: "21 July 2023",
      location: "Lagos, Nigeria",
      info: "We are thrilled to share the remarkable success of our recent partnership with Showcode...",
      img: people2,
      bookmark: "5",
      share: "8",
    },
    {
      title: "BGIT Network Day",
      date: "21 July 2023",
      location: "Lagos, Nigeria",
      info: "We are thrilled to share the remarkable success of our recent partnership with Showcode...",
      img: people2,
      bookmark: "5",
      share: "8",
    },
    {
      title: "BGIT x Showcode - Athena Hackathon",
      date: "21 July 2023",
      location: "Lagos, Nigeria",
      info: "We are thrilled to share the remarkable success of our recent partnership with Showcode...",
      img: people2,
      bookmark: "5",
      share: "8",
    },
    {
      title: "BGIT x Showcode - Athena Hackathon",
      date: "21 July 2023",
      location: "Lagos, Nigeria",
      info: "We are thrilled to share the remarkable success of our recent partnership with Showcode...",
      img: people2,
      bookmark: "5",
      share: "8",
    },
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  // const elementRef = useRef(null);
  // const scrollBarConRef = useRef(null);
  // const scrollBarRef = useRef(null);
  // const [scrollbarWidth, setScrollbarWidth] = useState(0);

  useEffect(() => {}, []);
  return (
    <div className="upcoming-events-wrapper">
      <div className="container">
        <div className="upcoming-events-content">
          <div className="section-header row align-items-end">
            <div className="col-md">
              <h2>Upcoming Events</h2>
            </div>
            <div className="col-md">
              <div className="search-wrapper">
                <div className="filter-wrapper">
                  <div className="filter">
                    <VscSettings />
                    <p>Filter</p>
                  </div>
                  <div className="sort">
                    <p>SORT BY: LATEST</p>
                    <HiChevronDown />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-content">
            <div className="cards-wrapper">
              <Carousel responsive={responsive}>
                {data.map((event, index) => (
                  <EventCard event={event} key={index} />
                ))}
              </Carousel>
            </div>
          </div>
          <div className="section-bottom">
            <div className="see-all">
              <h5 className="">See all</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
