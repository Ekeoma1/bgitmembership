import React from "react";
import SearchBox from "../Molecules/SearchBox";
import EventCard from "./EventCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";

const LatestNews = () => {
  const { getAllNews } = useSelector((state) => state.news);
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

  return (
    <div className="latest-news-wrapper">
      <div className="container">
        <div className="latest-news-content">
          <div className="section-header row align-items-end">
            <div className="col-md">
              <h2>Latest news</h2>
            </div>
            <div className="col-md">
              <div className="search-wrapper">
                <div className="search-box-wrapper">
                  <div className="search-box-con">
                    <SearchBox placeholder={"Search news"} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section-content">
            <div className="cards-wrapper">
              {getAllNews.status === "base" || getAllNews.status === "loading" ? (
                <>Loading...</>
              ) : getAllNews.status === "successful" ? (
                <>
                  <Carousel responsive={responsive}>
                    {getAllNews?.data?.news?.map((item, index) => (
                      <EventCard news item={item} key={index} />
                    ))}
                  </Carousel>
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

export default LatestNews;
