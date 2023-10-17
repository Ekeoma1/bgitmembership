import { useEffect } from "react";
import "../../src/assets/scss/eventsAndNews.scss";
import Banner from "../components/Events-And-News/Banner";
import LatestNews from "../components/Events-And-News/LatestNews";
import UpcomingEvents from "../components/Events-And-News/UpcomingEvents";

const EventsAndNews = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="events-wrapper">
      <Banner />
      <LatestNews />
      <UpcomingEvents />
    </div>
  );
};

export default EventsAndNews;
