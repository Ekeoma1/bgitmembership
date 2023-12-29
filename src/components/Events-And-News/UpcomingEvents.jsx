import React, { useEffect } from "react";
import EventCard from "./EventCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import SearchBox from "../Molecules/SearchBox";
import EventsAndNewsCardsLoader from '../Atoms/skeleton-loaders/events-and-news-page/EventsAndNewsCardsLoader';

const UpcomingEvents = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 2,
    },
    miniLaptop: {
      breakpoint: { max: 1024, min: 950 },
      items: 1.5,
    },

    tablet: {
      breakpoint: { max: 940, min: 500 },
      items: 1.1,
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1,
    },
  };
  const { getAllEvents } = useSelector((state) => state.events);

  useEffect(() => {}, []);
  return (
    <div className='upcoming-events-wrapper'>
      <div className='container'>
        <div className='upcoming-events-content'>
          <div className='section-header row align-items-end'>
            <div className='col-md'>
              <h2>Upcoming Events</h2>
            </div>
            <div className='col-md'>
              <div className='search-wrapper'>
                <div className='search-box-wrapper'>
                  <div className='search-box-con'>
                    <SearchBox placeholder={'Search events'} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='section-content'>
            <div className='cards-wrapper'>
              {getAllEvents.status === 'base' ||
              getAllEvents.status === 'loading' ? (
                <EventsAndNewsCardsLoader />
              ) : getAllEvents.status === 'successful' ? (
                <>
                  {getAllEvents.data.length === 0 ? (
                    <>No events...</>
                  ) : (
                    <>
                      <Carousel responsive={responsive}>
                        {getAllEvents?.data.map((item, index) => (
                          <EventCard event item={item} key={index} />
                        ))}
                      </Carousel>
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
