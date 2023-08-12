import React from "react";
import { Link } from "react-router-dom";
import postImg from "../../assets/images/author1.png";
import Icon from "../Icon";

// const postList = [
//     {
//         author: "Claire Jenkins",
//         content: "Hi all, as I have just joined I would love to connect with other people in the UX/UI field. I am keen to find a community of link minded people to share resources and support!";
//         time: "15 minutes ago",
//         image: postImg
//     },
//     {
//         author: "Claire Jenkins",
//         content: "Hi all, as I have just joined I would love to connect with other people in the UX/UI field. I am keen to find a community of link minded people to share resources and support!";
//         time: "15 minutes ago",
//         image: postImg
//     },

//     {
//         author: "Claire Jenkins",
//         content: "Hi all, as I have just joined I would love to connect with other people in the UX/UI field. I am keen to find a community of link minded people to share resources and support!";
//         time: "15 minutes ago",
//         image: postImg
//     },
// ]

const Posts = () => {
  return (
    <div className="dashboard-card post-wrapper">
      <div className="d-flex justify-content-between align-items-center">
        <div className="dashboard-header">Post</div>
        <div>
          <Link to="#" className="dashboard-text">
            See more
          </Link>
        </div>
      </div>

      <div className="row mt-3 gap-md-0 gap-3">
        <div className="col-md">
          <div className="post-card">
            <div className="d-flex flex-wrap gap-2">
              <div style={{ backgroundImage: `url(${postImg})` }} className="post-image"></div>
              <div>
                <div className="author-name">Claire Jenkins</div>
                <div className="post-time">15 minutes ago</div>
              </div>
            </div>
            <div className="post-text mt-2">
              Hi all, as I have just joined I would love to connect with other people in the UX/UI field. I am keen to find a community of link minded
              people to share resources and support!
            </div>

            <div className=" d-flex gap-4 mt-3 pt-3 interaction-icon-wrapper">
              <button className="heart-icon">
                <Icon icon="heart" />
              </button>

              <button>
                <Icon icon="comment" />
              </button>

              <button>
                <Icon icon="bookmark" />
              </button>

              <button>
                <Icon icon="share" />
              </button>
            </div>
          </div>
        </div>

        <div className="col-md">
          <div className="post-card">
            <div className="d-flex flex-wrap gap-2">
              <div style={{ backgroundImage: `url(${postImg})` }} className="post-image"></div>
              <div>
                <div className="author-name">Claire Jenkins</div>
                <div className="post-time">15 minutes ago</div>
              </div>
            </div>
            <div className="post-text mt-2">
              Hi all, as I have just joined I would love to connect with other people in the UX/UI field. I am keen to find a community of link minded
              people to share resources and support!
            </div>

            <div className=" d-flex gap-4 mt-3 pt-3 interaction-icon-wrapper">
              <button className="heart-icon">
                <Icon icon="heart" />
              </button>

              <button>
                <Icon icon="comment" />
              </button>

              <button>
                <Icon icon="bookmark" />
              </button>

              <button>
                <Icon icon="share" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
