import { useEffect } from "react";
import "../assets/scss/home.scss";
import Post from "../components/home/Post";
import CommunityForums from "../components/home/CommunityForumsComponent";
import MyUpdates from "../components/home/MyUpdates";
import Icon from "../components/Icon";
import Resources from "../components/home/Resources";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="home-wrapper">
      <div className="container">
        <div className="search-box-wrapper ms-auto d-lg-block d-none">
          <input type="text" placeholder="Search members or forums" />
          <Icon icon="searchIcon" />
        </div>
        <div className="row mt-lg-5">
          <div className="col-3 d-lg-block d-none">
            <MyUpdates />
            <Resources />
          </div>
          <div className="col-lg-6 col-12">
            <Post />
            {/* <div className="post">hello</div> */}
          </div>
          <div className="col-3 d-lg-block d-none">
            <CommunityForums />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
