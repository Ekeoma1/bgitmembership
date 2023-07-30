import React from "react";
import CreatePost from "./CreatePost";
import Icon from "../Icon";
import PostImage from "../../assets/images/post-image.png";
import AuthorImg1 from "../../assets/images/author1.png";
import AuthorImg2 from "../../assets/images/author2.png";

const postList = [
  {
    author: "Karen Emelu",
    authorImage: AuthorImg1,
    role: "CEO",
    time: "2h",
    content:
      "Hey lovely ladies, it’s half way through the year!  Come unwind and party with us this Saturday, July 8th at our Summer Mixer. Hit the RSVP button to reserve your spot. You don’t want to miss this 💃🏾🍹🎉",
    image: PostImage,
    event: true,
    following: true,
  },

  {
    author: "Jenny Smith",
    authorImage: AuthorImg2,
    role: "UX Design Enthusiast",
    time: "2h",
    content: "Hey, does anyone fancy going to a brunch?? Lol in the mood for some food and music. Drop me a message if you’re down x",
    image: null,
    event: false,
    following: false,
  },
];

const Post = () => {
  return (
    <div className="post-wrapper">
      <CreatePost />
      <div className="post-card-wrapper">
        {postList.map((list, key) => {
          return (
            <div key={key} className="post-card shadow-sm mx-auto">
              <div className="post-card-header">
                <div className="post-owner-details">
                  <div style={{ backgroundImage: `url(${list.authorImage})` }} className="img-circle"></div>
                  <div>
                    <div className="d-flex align-items-center">
                      <span className="name">{list.author}</span>
                      <span className="small-circle"></span>
                      <span className="follow-btn">{list.following ? "following" : "follow"}</span>
                    </div>
                    <div className="job-role">{list.role}</div>
                    <div className="post-time">{list.time}</div>
                  </div>
                </div>

                <div>{list.event && <div className="rsvp-btn">RSVP</div>}</div>
              </div>

              <div className="post-content-wrapper">
                <div className="post-content">{list.content}</div>
                {list.image !== null && <div style={{ backgroundImage: `url(${list.image})` }} className="post-image"></div>}
              </div>

              <div className="post-card-footer">
                <div className="post-card-footer-content">
                  <div className="d-flex align-items-center c-gap-10">
                    <button className="heart-icon">
                      <Icon icon="heart" />
                    </button>
                    <span>5</span>
                  </div>

                  <div className="d-flex align-items-center c-gap-10">
                    <button>
                      <Icon icon="comment" />
                    </button>
                    <span>5</span>
                  </div>

                  <div className="d-flex align-items-center c-gap-10">
                    <button>
                      <Icon icon="bookmark" />
                    </button>
                    <span>5</span>
                  </div>

                  <div className="d-flex align-items-center c-gap-10">
                    <button>
                      <Icon icon="share" />
                    </button>
                    <span>5</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Post;
