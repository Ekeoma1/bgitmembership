import React, { useEffect, useState } from "react";
import Icon from "../components/Icon";
import "../assets/scss/dashboard.scss";
import ProfileBanner from "../components/Dashboard/ProfileBanner";
import BioCard from "../components/Dashboard/BioCard";
import SocialLinksCard from "../components/Dashboard/SocialLinksCard";
import Group from "../components/Dashboard/Group";
import Resources from "../components/Dashboard/Resources";
import Posts from "../components/Dashboard/Posts";
import { Link, useNavigate } from "react-router-dom";
import Member from "../components/Dashboard/Member";
import { useDispatch, useSelector } from "react-redux";
import { triggerGetMyProfile } from "../Features/users/users_slice";
import { triggerGetAllPosts } from "../Features/posts/posts_slice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getMyProfile } = useSelector((state) => state.users);
  const { getAllPosts } = useSelector((state) => state.posts);
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  useEffect(() => {
    dispatch(triggerGetMyProfile());
    const data = { queryParams: { pageNumber, pageSize } };
    dispatch(triggerGetAllPosts(data));
  }, []);
  console.log("getAllPosts", getAllPosts);
  return (
    <div className="user-dashboard">
      <div className="container">
        <div>
          <button onClick={() => navigate(-1)}>
            <Icon icon="arrowLeft" />
          </button>
        </div>
        <div className="row mt-5">
          <div className="col-lg-9 col-12">
            <ProfileBanner data={getMyProfile} />
            <div className="dashboard-card d-lg-none">
              <div className="text-end mb-2">
                <Link className="see-more-btn">See more</Link>
              </div>
              <div className="row gap-md-0 gap-3">
                <div className="col-md">
                  <Link className="" to="#">
                    <div className="other-pages-btn mb-0">
                      <div>settings</div>

                      <Icon icon="chevronRightBig" />
                    </div>
                  </Link>
                </div>

                <div className="col-md">
                  <Link to="#">
                    <div className="other-pages-btn mb-0">
                      <div>Event Tickets</div>

                      <Icon icon="chevronRightBig" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <BioCard data={getMyProfile} />
            <SocialLinksCard />
            <div className="dashboard-card d-lg-none">
              <div className="text-end mb-2">
                <Link className="see-more-btn">See more</Link>
              </div>
              <Member />
            </div>
            <Group />
            <Resources />
            <Posts data={getAllPosts} />
          </div>
          <div className="col-lg-3 d-lg-block d-none">
            <Link className="" to="#">
              <div className="other-pages-btn">
                <div>settings</div>

                <Icon icon="chevronRightBig" />
              </div>
            </Link>

            <Link to="#">
              <div className="other-pages-btn">
                <div>Event Tickets</div>

                <Icon icon="chevronRightBig" />
              </div>
            </Link>

            <Member />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
